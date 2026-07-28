export function PlatformStyle() {
  return (
    <style>{`
      .hero-scrim { background: linear-gradient(90deg, rgba(11,10,9,.94) 0%, rgba(11,10,9,.66) 48%, rgba(11,10,9,.25) 100%), linear-gradient(0deg, rgba(11,10,9,.9) 0%, transparent 48%); }
      .action-button { display:inline-flex; align-items:center; gap:.75rem; min-height:2.75rem; padding:.72rem 1.15rem; background:var(--oxblood); color:var(--ink); font-family:var(--font-mono); font-size:.68rem; line-height:1; letter-spacing:.12em; text-transform:uppercase; border:1px solid var(--oxblood); transition:transform 160ms var(--e-quint), background-color 160ms ease; }
      .action-button:hover { background:var(--oxblood-bright); }
      .action-button:active { transform:scale(.98); }
      .quiet-button { display:inline-flex; align-items:center; min-height:2.75rem; padding:.7rem 1rem; border:1px solid var(--line-strong); font-family:var(--font-mono); font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-soft); transition:border-color 160ms ease,color 160ms ease,transform 160ms var(--e-quint); }
      .quiet-button:hover { color:var(--ink); border-color:var(--steel); }
      .quiet-button:active { transform:scale(.98); }
      .footer-links { display:flex; flex-direction:column; align-items:flex-start; gap:.7rem; font-size:.82rem; color:var(--ink-soft); }
      .pathway-panel { border:1px solid var(--line-strong); background:var(--bg-panel); padding:clamp(1.5rem,5vw,4rem); }
      .choice-chip { min-height:2.75rem; padding:.65rem 1rem; border:1px solid var(--line-strong); color:var(--ink-soft); font-size:.82rem; transition:background-color 160ms ease,border-color 160ms ease,transform 160ms var(--e-quint); }
      .choice-chip:active { transform:scale(.98); }
      .choice-chip-active { background:var(--oxblood-deep); border-color:var(--oxblood-bright); color:var(--ink); }
      .method-row { display:grid; grid-template-columns:3rem minmax(12rem,.8fr) 1fr; gap:clamp(1rem,4vw,4rem); align-items:center; padding:clamp(1.75rem,5vw,3.5rem) 0; border-bottom:1px solid var(--line); }
      .pricing-panel { border:1px solid var(--line-strong); background:var(--bg-panel); padding:clamp(1.5rem,5vw,3.5rem); box-shadow:0 26px 80px rgba(64,21,16,.18); }
      .member-grid { display:grid; min-height:100dvh; grid-template-columns:16rem minmax(0,1fr); }
      .member-sidebar { position:sticky; top:0; height:100dvh; border-right:1px solid var(--line); background:var(--bg-raise); padding:1.5rem; }
      .member-content { width:min(1120px,92%); margin-inline:auto; padding:2rem 0 7rem; }
      .member-nav-link { display:flex; align-items:center; gap:.75rem; min-height:2.75rem; padding:.65rem .75rem; color:var(--ink-mute); font-size:.82rem; border:1px solid transparent; }
      .member-nav-link:hover,.member-nav-link-active { color:var(--ink); background:var(--bg-panel); border-color:var(--line); }
      .metric-line { padding:1.25rem 0; border-top:1px solid var(--line); }
      .progress-track { height:.4rem; background:var(--line); overflow:hidden; }
      .progress-fill { height:100%; background:var(--oxblood-bright); transform-origin:left; }
      .workout-exercise { border-top:1px solid var(--line); padding:1.25rem 0; }
      .mobile-member-nav { display:none; }
      @media (max-width:767px) {
        .hero-scrim { background:linear-gradient(0deg,rgba(11,10,9,.96) 0%,rgba(11,10,9,.52) 65%,rgba(11,10,9,.35) 100%); }
        .method-row { grid-template-columns:2.5rem 1fr; align-items:start; }
        .method-row p { grid-column:2; }
        .member-grid { display:block; }
        .member-sidebar { display:none; }
        .member-content { width:min(100% - 2rem,700px); padding-top:1.5rem; }
        .mobile-member-nav { position:fixed; inset:auto 0 0 0; z-index:40; display:grid; grid-template-columns:repeat(5,1fr); border-top:1px solid var(--line-strong); background:rgba(11,10,9,.96); backdrop-filter:blur(12px); }
        .mobile-member-nav a { display:flex; min-height:4.25rem; flex-direction:column; align-items:center; justify-content:center; gap:.25rem; font-size:.6rem; color:var(--ink-mute); }
      }
      @media (prefers-reduced-motion:reduce) { .action-button,.quiet-button,.choice-chip { transition:none; } }
    `}</style>
  );
}
