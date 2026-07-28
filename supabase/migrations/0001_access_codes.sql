-- ---------------------------------------------------------------------------
-- The Wrestler's Home — access codes
--
-- The ONLY table in this project. One row per buyer. There are no accounts,
-- no profiles, no purchases table: a buyer types a code, the server checks it.
--
-- Run once in Supabase: SQL Editor > New query > paste > Run.
-- ---------------------------------------------------------------------------

create table if not exists public.access_codes (
  code         text primary key,
  active       boolean     not null default true,
  label        text,                            -- who it was issued to (Nikita's note)
  created_at   timestamptz not null default now(),
  last_used_at timestamptz,
  use_count    integer     not null default 0   -- a high count suggests sharing
);

-- Sorting the table by "most used" is the sharing check, so index it.
create index if not exists access_codes_use_count_idx
  on public.access_codes (use_count desc);

-- ---------------------------------------------------------------------------
-- Lock the table down.
--
-- RLS is enabled and NO policies are created. That is deliberate: with RLS on
-- and zero policies, the anon and authenticated keys can read and write
-- nothing at all. Only the service role key bypasses RLS, and that key lives
-- server-side in the /api/check-access route. Never expose it to the browser.
-- ---------------------------------------------------------------------------

alter table public.access_codes enable row level security;

revoke all on public.access_codes from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Helper: issue codes without hand-typing them.
--
--   select * from issue_access_codes(5, 'Instagram launch');
--
-- Returns the new codes so they can be copied straight into DMs. Format is
-- WH-XXXX-XXXX using an unambiguous alphabet (no O/0, no I/1) so a buyer
-- reading it off a phone screen cannot mistype it.
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
