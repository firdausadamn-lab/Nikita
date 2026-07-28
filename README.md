# The Wrestler's Home — Дом борца

Bilingual (RU primary, EN secondary) training platform for Nikita. Next.js 16,
Tailwind, deployed on Netlify.

The public marketing pages are open to everyone. The whole program sits behind a
personal account.

```bash
npm install
npm run dev      # http://localhost:3100
npm run build
npm test
```

---

## 1. Accounts and codes — how Nikita runs this day to day

**A code is a one-time ticket, not a key.** Redeeming it creates one account and
kills the code. From then on the athlete signs in with their own email and
password, and the code does nothing for anybody.

That is the whole point. The old design set a cookie per browser, so one code
bought by one athlete could be forwarded round a whole team and every one of
them got in. Now, passing the code on gives the recipient nothing — it is
already spent. The only thing left to share is the buyer's own email and
password, which is the realistic ceiling for any digital product: they cannot
hand it to a stranger without handing over their own account.

Everything is done from the **Supabase dashboard**. No admin page, no developer.

### First-time setup (once, Adam)

1. Supabase → **SQL Editor** → **New query** → paste
   [`supabase/migrations/0001_access_codes.sql`](supabase/migrations/0001_access_codes.sql) → **Run**.
   (Skip if the `access_codes` table already exists.)
2. Same again with
   [`supabase/migrations/0002_accounts.sql`](supabase/migrations/0002_accounts.sql) → **Run**.
   This adds redemption tracking and the atomic redeem function. It is safe on a
   database that already has 0001, and safe to run twice.
3. Supabase → **Authentication → Sign In / Providers → Email**:
   - **Turn OFF "Allow new users to sign up".** Accounts are only ever created
     by the server after a code is claimed. Left on, somebody could register
     directly and skip the code. (The app also refuses accounts that never
     redeemed anything, so this is the second lock on the same door — close it
     anyway.)
   - **Turn OFF "Confirm email".** The code already proved they bought the
     program, and a confirmation step is one more email to land in spam.
4. Supabase → **Authentication → URL Configuration**: set **Site URL** to the
   live domain and add it under **Redirect URLs** as `https://yourdomain/**`.
   Password-reset links will not work until this matches.
5. Netlify → **Site configuration → Environment variables**:

| Variable | Where to find it | Notes |
| --- | --- | --- |
| `SUPABASE_URL` | Supabase → Project settings → API | |
| `SUPABASE_SERVICE_ROLE_KEY` | same page | **Server-side only.** Never rename to `NEXT_PUBLIC_*`. |
| `NEXT_PUBLIC_SUPABASE_URL` | same URL as above | Safe to expose. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | same page, the **anon** key | Safe to expose. |
| `NEXT_PUBLIC_SITE_URL` | the live domain | Reset emails are built from this. Wrong value, links to localhost. |

`ACCESS_COOKIE_SECRET` is no longer used. **Delete it from Netlify.**

6. Redeploy.

> Both `NEXT_PUBLIC_SUPABASE_*` names are required exactly as written. The gate
> runs in Next's middleware, which can only read variables under that prefix.
> Without them the site refuses everybody rather than letting everybody in,
> which is the right way round, but it does mean nobody can log in.

### Issue a code to a buyer

SQL Editor, one line:

```sql
select * from issue_access_codes(1, 'Ivan, Instagram, 5 Aug');
```

It returns something like `WH-K7M2-P9XQ`. Send it to the buyer. Ten codes for a
launch: `select * from issue_access_codes(10, 'August launch');`

By hand instead: Table Editor → `access_codes` → **Insert row** → type a `code`,
leave `active` ticked, leave `redeemed` unticked, put the buyer's name in
`label`.

The format avoids letters people confuse (no O/0, no I/1), so a buyer reading it
off a phone screen cannot mistype it.

### See who holds what

```sql
select * from access_code_holders;
```

One row per code: the code, the note you wrote, whether it is still active,
whether it has been redeemed, the email of the account that claimed it, and when
that account last signed in. This is how you answer "did Ivan ever actually use
his code".

### Revoke access

Table Editor → `access_codes` → find the row → untick **`active`** → save.

That blocks their next sign-in immediately. To also end a session that is open
*right now*, delete the account: **Authentication → Users** → find the email →
delete. The gate checks with Supabase on every page view, so a deleted account
is locked out on its very next click.

Deleting the account leaves the code marked redeemed. To give that athlete a
fresh start, issue them a new code.

### Sharing

There is nothing left to spot. A code cannot be used twice, so `use_count` is
now just a record that it was redeemed once. If you suspect somebody is passing
around their *login*, `access_code_holders.last_sign_in_at` plus Supabase's auth
logs are where to look — and the fix is to revoke and reissue.

### Bilingual auth emails

Only one email is ever sent: the password reset. Supabase → **Authentication →
Emails → Reset Password**. The default template is English. Nikita's buyers are
mostly Russian-speaking, so put both languages in one template, Russian first —
Supabase sends one template to everybody and does not know which language the
person was reading in.

Keep `{{ .ConfirmationURL }}` in the link. If you switch to `{{ .TokenHash }}`,
the callback handles that shape too.

### Existing users from the old code-gate

**The old `nikita_access` cookie is no longer honoured.** Anyone who unlocked the
site under the previous system will land on the access page next time they
visit. This is deliberate: continuing to accept that cookie would keep the
shareable loophole alive, which is the thing this rebuild exists to close.

Nobody loses what they paid for, but they do have to act once:

- **Their old code still works.** Every code in the table starts with
  `redeemed = false` and nothing has ever set it, so any code that is still
  `active` can be redeemed normally. The message to send is simply: *"the site
  now has proper logins — use the same code you already have, plus an email and
  password of your choosing, and you will never need the code again."*
- Codes you had already revoked stay revoked.
- If a buyer says their code no longer works, check `access_code_holders`. If it
  shows as redeemed by an email that is not theirs, somebody else claimed it:
  revoke it and issue a fresh one.

Before announcing, run `select * from access_code_holders;` and count how many
people this actually affects. If it is a handful, a personal DM each beats a
broadcast.

---

## 2. Adding a diary entry (Nikita, no developer needed)

The motivation diary is what brings people back between sessions. It never opens
on the same entry twice — it remembers what a device has already read.

To add an entry, open [`content/diary.ts`](content/diary.ts), copy one whole
`{ ... }` block, paste it at the **top** of the list, then change:

- `id` — any new unique word, no spaces
- `date` — `"YYYY-MM-DD"`
- `mood` — one of `empty`, `heavy`, `doubt`, `steady` (the "how do you feel
  today" filter)
- `title` and `body` — keep **both** `ru` and `en` filled in

Keep the quotes and commas exactly as they are. Save, and it is live on the next
deploy. The same instructions are written at the top of that file.

---

## 3. Content that still needs Nikita's confirmation

**None of this should go public before he has read it.** In priority order:

### 1. Injury and return — read this first

[`content/reference.ts`](content/reference.ts) → `injury`, `injurySafety`

Highest priority by a distance. Injury content acted on incorrectly causes
direct physical harm. Every claim, every auxiliary exercise, and the medical
callout wording need his explicit sign-off. Written throughout as *his
experience alongside professional guidance*, never as a DIY replacement for a
doctor or physiotherapist.

### 2. Supplements and sauna

[`content/reference-extra.ts`](content/reference-extra.ts) → `supplements`, `sauna`

Dosing, timing, and heat/cold exposure carry real risk. Both pages carry
mandatory safety callouts (cardiac load, never after alcohol, never alone,
clearance needed for existing conditions). Confirm the protocol matches what he
actually does.

**Two places where the copy deliberately differs from the source notes**, because
the popular claim overstates the evidence. He should confirm he is happy being
this honest:

- **Refeeds** are described as topping up glycogen and temporarily raising
  leptin — *not* as "boosting the thyroid and metabolism". They do not
  permanently speed up metabolism.
- **L-carnitine** is described as having mixed evidence and a small effect at
  best, not as a fat burner.

### 3. Nutrition, recovery, mindset, FAQ, tracking

`content/reference.ts` and `content/reference-extra.ts`

Written in his voice as his method rather than as universal fact. The nutrition
page carries the weight-cut warning kept from the earlier build (never copy
another athlete's cut).

### 4. Motivation diary — all 20 entries

[`content/diary.ts`](content/diary.ts)

These are **demo entries written as Nikita**: personal stories about losing,
starting again, and training when he does not want to. They are invented. He
should rewrite them in his own words or confirm each one — it is the most
personal writing on the site and reads as autobiography.

### 5. Everything else

- `content/platform.ts` — athlete credentials still marked "review pending"
- `content/training-program.ts` — the 8-week program
- Legal pages (privacy, terms, refunds, health disclaimer) — need real legal
  review, jurisdiction, and company details
- `SUPPORT_EMAIL` and the video host are still unset

---

## 4. Architecture, briefly

```
middleware.ts                 session check + locale routing. The only gate.
app/api/auth/redeem/          code -> one account. The atomic bit.
app/api/auth/login/           email + password, plus the entitlement re-check
app/api/auth/logout/          clears the session
app/api/auth/reset/           sends the password-reset email
app/api/auth/password/        sets a new password (needs a recovery session)
app/api/auth/session/         who am I (for the settings page)
app/auth/callback/            turns the emailed link into a session
lib/supabase/session.ts       the request-bound client; cookie plumbing
lib/supabase/admin.ts         service-role client. Node routes only.
lib/supabase/entitlement.ts   the program_access claim, on its own
lib/program-access.ts         which paths are gated, safe return paths
app/[locale]/access/          sign in / redeem a code
app/[locale]/reset-password/  set a new password
content/                      all copy, bilingual, no CMS
```

### How the gate works

The middleware asks two questions, not one:

1. **Is there a verified session?** `getUser()`, which checks the token with
   Supabase rather than trusting the cookie it was handed. A forged cookie
   decodes perfectly well; only Supabase can say whether it is real.
2. **Does that account carry the `program_access` claim?** A session proves
   somebody signed in, not that they bought anything. The claim lives in
   `app_metadata`, which only the service role can write — a signed-in user
   cannot grant it to themselves.

Both must be true. The claim is written once, by the redeem route, immediately
after a code has been successfully claimed.

### The atomic redemption

This is the part that carries the promise, and the part to be careful with if
anyone edits it later.

Claiming a code is a **single** SQL statement:

```sql
update access_codes set redeemed = true, redeemed_by = $1, redeemed_at = now()
 where code = $2 and active and not redeemed
returning code;
```

The `and not redeemed` inside the UPDATE is what makes it safe. Two people
submitting the same code in the same instant both hit that row; the second one
blocks on the row lock, then re-evaluates its `where` against the row the first
one just changed, matches nothing, and gets zero rows back. Exactly one account,
always.

Written as `select … then update …` instead, both callers would read
`redeemed = false`, both would pass the check, and one code would produce two
accounts — silently, with nothing in the logs to show for it.
`tests/redeem.test.ts` has a test that fails the moment that gap is
reintroduced.

The route's ordering exists for the same reason: create the account **without**
access, claim the code, and only grant access if the claim succeeded. If
anything fails in between, what is left behind is an account that cannot open
anything.

**Protected:** `/`, `/training/*`, `/dashboard/*`, `/onboarding`, `/welcome`.
**Public:** `/method`, `/program`, `/coach`, `/faq`, `/access`,
`/reset-password`, legal pages.

### Program sections

Grouped in the sidebar: Training (today, program, exercises) · Fuel (nutrition,
supplements) · Recovery (recovery, sauna, roller & ball, injury) · Mind
(discipline, diary) · Progress (measurements, questions).

### Deployment

Netlify builds from `netlify.toml`. Set the five environment variables above,
run both migrations, turn off public sign-ups, then redeploy.
