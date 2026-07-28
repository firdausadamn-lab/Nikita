# DESIGN — Iron & Oxblood

**Direction:** the 5am weight room. Raw classical strength, iron, sweat. Chosen
over "classical marble" (too soft) and "arena blue/gold" (cliché + flag-adjacent).

**Theme:** dark-committed. Physical scene: an athlete in a dim pre-dawn gym.

**Palette** (tokens in `app/globals.css`, ramps in `tailwind.config.ts`):
- Base: warm charcoal `#0b0a09` → panels `#1a1716`. No pure black.
- Text: warm bone `#ece7df` / soft `#b8afa2` / mute `#837a6f`. No pure white.
- Accent (hot): oxblood `#9a2c25` / bright `#b8382e`. The single hot color.
- Secondary (cool): brushed steel `#9aa1a7` — deliberate temperature tension.

**Type** (all Cyrillic-verified via next/font subsets `latin` + `cyrillic`):
- Display: **Oswald** — condensed, athletic, uppercase headlines.
- Body: **Manrope**.
- Labels / data: **JetBrains Mono** — eyebrows, stats, tags.
- RU display gets a small positive tracking nudge (`:root[lang="ru"]`) so Cyrillic
  doesn't read cramped at the same scale as Latin.

**Motion** (`components/motion.tsx`, `cinematic-image.tsx`): scroll reveals with
directional intent + stagger (not blanket fades), hero line clip-reveals, image
parallax + scale-in, kinetic credential marquee, tactile `:active` scale on CTAs,
sliding oxblood pill on the language toggle. Ease-out expo/quint curves. Full
`prefers-reduced-motion` fallback (opacity kept, movement dropped).

**Bans respected:** no side-stripe accents, no gradient text, no glassmorphism
default, no hero-metric template, no identical 3-card grids (blocks are numbered
rows; features are a divided 2-col), no em dashes-as-crutch in copy.
