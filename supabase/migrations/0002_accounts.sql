-- ---------------------------------------------------------------------------
-- The Wrestler's Home — accounts
--
-- Replaces the shareable code gate with real accounts.
--
-- Before: a code set a cookie. The code stayed alive forever, and the cookie
-- could be set on any number of devices by any number of people, so one code
-- bought by one athlete let a whole team in.
--
-- After: a code is a ONE-TIME redemption ticket. Redeeming it creates exactly
-- one account and kills the code. Access then lives with that account's login,
-- so passing the code on grants nothing — the only thing left to share is the
-- buyer's own email and password.
--
-- Run once in Supabase: SQL Editor > New query > paste > Run.
-- Safe to run on a database that already has 0001 applied, and safe to re-run.
-- ---------------------------------------------------------------------------

-- --- 1. Redemption tracking on the existing table ---------------------------

alter table public.access_codes
  add column if not exists redeemed    boolean not null default false,
  add column if not exists redeemed_by uuid references auth.users(id) on delete set null,
  add column if not exists redeemed_at timestamptz;

-- One account per code, enforced by the database rather than by hope. Even if
-- application code were rewritten badly later, two accounts cannot end up
-- pointing at the same code row (the row itself only holds one redeemed_by).
-- This index is the mirror guarantee: one code per account.
create unique index if not exists access_codes_redeemed_by_key
  on public.access_codes (redeemed_by)
  where redeemed_by is not null;

-- Unredeemed active codes are what Nikita hands out, so make them easy to list.
create index if not exists access_codes_available_idx
  on public.access_codes (created_at desc)
  where active and not redeemed;

-- --- 2. The atomic redemption ----------------------------------------------
--
-- THIS FUNCTION IS THE WHOLE PRODUCT PROMISE. Read the comment before editing.
--
-- The naive version of this is three steps: read the row, check it is
-- unredeemed, then write it back as redeemed. That is broken. Two people
-- entering the same code within the same few milliseconds both read
-- `redeemed = false`, both pass the check, and both get an account. One code,
-- two accounts, sharing works again, and nothing in the logs looks wrong.
--
-- The fix is to make the check and the claim the SAME statement. A single
-- UPDATE ... WHERE redeemed = false takes a row lock; a concurrent UPDATE on
-- the same row blocks until the first commits, then RE-EVALUATES its WHERE
-- against the now-updated row, sees `redeemed = true`, and matches nothing.
-- So exactly one caller gets a RETURNING row and every other caller gets zero
-- rows. There is no window between the check and the claim, because there is
-- no gap between them for a window to open in.
--
-- Do not "improve" this into a select-then-update. Do not add an IF EXISTS
-- guard in front of it. The single statement IS the correctness.
-- ---------------------------------------------------------------------------

create or replace function public.redeem_code_and_link(
  p_user_id uuid,
  p_code    text
)
returns table (code text, label text)
language sql
security definer
set search_path = public
as $$
  update public.access_codes ac
     set redeemed     = true,
         redeemed_by  = p_user_id,
         redeemed_at  = now(),
         last_used_at = now(),
         use_count    = ac.use_count + 1
   where ac.code     = upper(btrim(p_code))
     and ac.active   = true
     and ac.redeemed = false
  returning ac.code, ac.label;
$$;

-- Only the service role may call it. The redeem route holds that key
-- server-side; a browser holding the anon key cannot claim a code by calling
-- the RPC directly.
revoke all on function public.redeem_code_and_link(uuid, text) from public;
revoke all on function public.redeem_code_and_link(uuid, text) from anon, authenticated;

-- --- 3. Read-only helper: is this code still claimable? ----------------------
--
-- Used only to fail fast on a typo BEFORE an account is created, so a bad code
-- never leaves a half-made account behind. It is advisory, never authoritative:
-- the UPDATE above is what actually decides.
-- ---------------------------------------------------------------------------

create or replace function public.access_code_is_claimable(p_code text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.access_codes ac
     where ac.code     = upper(btrim(p_code))
       and ac.active   = true
       and ac.redeemed = false
  );
$$;

revoke all on function public.access_code_is_claimable(text) from public;
revoke all on function public.access_code_is_claimable(text) from anon, authenticated;

-- --- 4. Issuing codes (unchanged behaviour, refreshed comment) --------------
--
--   select * from issue_access_codes(10, 'August launch');
--
-- Each returned code now converts to ONE account on first use and is spent.
-- ---------------------------------------------------------------------------

create or replace function public.issue_access_codes(
  quantity integer default 1,
  note     text    default null
)
returns table (code text, label text)
language plpgsql
as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  candidate text;
  i integer;
  j integer;
begin
  for i in 1..greatest(quantity, 1) loop
    loop
      candidate := 'WH-';
      for j in 1..4 loop
        candidate := candidate || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
      end loop;
      candidate := candidate || '-';
      for j in 1..4 loop
        candidate := candidate || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
      end loop;
      exit when not exists (select 1 from public.access_codes c where c.code = candidate);
    end loop;

    insert into public.access_codes (code, label)
    values (candidate, note);

    code := candidate;
    label := note;
    return next;
  end loop;
end;
$$;

-- --- 5. Who holds what ------------------------------------------------------
--
-- Nikita's day-to-day view: which code went to which athlete, and when.
--
--   select * from access_code_holders;
--
-- Reads auth.users, so it stays service-role only like everything else here.
-- ---------------------------------------------------------------------------

create or replace view public.access_code_holders as
  select
    ac.code,
    ac.label,
    ac.active,
    ac.redeemed,
    ac.redeemed_at,
    u.email as account_email,
    u.last_sign_in_at
  from public.access_codes ac
  left join auth.users u on u.id = ac.redeemed_by
  order by ac.redeemed_at desc nulls last, ac.created_at desc;

revoke all on public.access_code_holders from anon, authenticated;

-- ---------------------------------------------------------------------------
-- 6. Reminder, deliberately left in the migration where it cannot be missed.
--
-- Turn OFF public sign-ups in Supabase:
--   Authentication > Sign In / Providers > Email > "Allow new users to sign up"
--
-- Accounts here are only ever created server-side by the redeem route, using
-- the service role key, after a code has been claimed. With public sign-ups
-- left on, somebody could register an account directly against the anon key
-- and skip the code entirely. The app also refuses any account that lacks the
-- `program_access` claim, so this is the second lock on the same door rather
-- than the only one — but close it anyway.
-- ---------------------------------------------------------------------------
