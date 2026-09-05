/* ==========================================================================
   Icon library — plain inline SVG strings.
   UI icons: simple original line-icon set (stroke-based, 24x24 viewBox).
   Device icons: original line illustrations used as product imagery
   placeholders until real product photography is supplied.
   Brand marks: Apple / WhatsApp are simplified generic glyphs commonly
   used to indicate device compatibility; Samsung / Tecno / Itel are
   rendered as clean wordmark badges rather than reproduced logo art.
   ========================================================================== */

const ICONS = {
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,

  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.4"/><circle cx="18" cy="21" r="1.4"/><path d="M2.5 3h2.4l2.2 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6"/></svg>`,

  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>`,

  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`,

  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>`,

  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5.5 5.5L20 7"/></svg>`,

  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3.2v5.4c0 5-3.4 8.4-8 9.4-4.6-1-8-4.4-8-9.4V6.2L12 3z"/><path d="M9 12l2 2 4-4.2"/></svg>`,

  badge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5.5"/><path d="M8.3 13.8L7 21l5-2.6L17 21l-1.3-7.2"/></svg>`,

  support: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13a8 8 0 0 1 16 0"/><path d="M4 13v4a2 2 0 0 0 2 2h1v-6H5a1 1 0 0 0-1 1z"/><path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h1a1 1 0 0 1 1 1z"/><path d="M12 21a3 3 0 0 0 3-3"/></svg>`,

  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>`,

  phoneCall: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4.5h4l1.6 4.4-2 1.6a11 11 0 0 0 5.9 5.9l1.6-2 4.4 1.6v4a1 1 0 0 1-1.1 1C10.5 20.6 3.4 13.5 3 5.6A1 1 0 0 1 4 4.5z"/></svg>`,

  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4.5 7l7.5 6 7.5-6"/></svg>`,

  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,

  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,

  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10.5" width="14" height="9" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>`,

  bank: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-5.5L21 10"/><path d="M4.5 10v8M9 10v8M15 10v8M19.5 10v8"/><path d="M3 20.5h18"/></svg>`,

  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>`,

  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.6"/></svg>`,

  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7"/></svg>`,

  // ---- Brand marks (compatibility badges) --------------------------------
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.1c-5.5 0-10 4.4-10 9.9 0 1.7.5 3.4 1.3 4.9L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.4 10-9.9s-4.5-9.8-10-9.8zm0 18.1c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.1 14.5 3.6 13 3.6 12 3.6 7.4 7.4 3.7 12 3.7S20.4 7.4 20.4 12 16.6 20.2 12 20.2zm5-6.6c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5-.1-.1-.6-1.4-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s1 2.5 1.1 2.6c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3z"/></svg>`,

  apple: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12.6c0-2.4 2-3.6 2.1-3.6-1.1-1.6-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.7 0-1.9-.9-3.1-.8-1.6 0-3 .9-3.9 2.3-1.6 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 2.9 2.4 1.2 0 1.6-.8 3-.8s1.8.8 3.1.7c1.3 0 2.1-1.1 2.9-2.3.6-.9.9-1.4 1.4-2.5-3.7-1.4-3.5-4-3.5-4.0zM14.1 5.3c.7-.8 1.1-1.9 1-3-1 .1-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.4z"/></svg>`,

  samsungBadge: `<svg viewBox="0 0 84 24"><text x="0" y="17" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="0.5" fill="currentColor">SAMSUNG</text></svg>`,

  tecnoBadge: `<svg viewBox="0 0 60 24"><text x="0" y="17" font-family="Arial, sans-serif" font-size="16" font-weight="800" letter-spacing="0.5" fill="currentColor">TECNO</text></svg>`,

  itelBadge: `<svg viewBox="0 0 44 24"><text x="0" y="17" font-family="Arial, sans-serif" font-size="16" font-weight="800" font-style="italic" fill="currentColor">itel</text></svg>`,

  jblBadge: `<svg viewBox="0 0 44 24"><text x="0" y="17" font-family="Arial, sans-serif" font-size="15" font-weight="800" fill="currentColor">JBL</text></svg>`,

  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.9h2.6l.4-3.1h-3v-2c0-.9.2-1.5 1.6-1.5H16.6V3.3C16.3 3.3 15.3 3.2 14.1 3.2c-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.1h2.6V21h3.6z"/></svg>`,

  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none"/></svg>`,

  // ---- Device illustrations (used as product imagery placeholders) ------
  devicePhone: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="30" y="8" width="40" height="84" rx="7"/><path d="M43 16h14"/><circle cx="50" cy="83" r="2.6" fill="currentColor" stroke="none"/></svg>`,

  deviceLaptop: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="20" y="18" width="60" height="40" rx="3"/><path d="M12 74h76l-6 10H18l-6-10z"/><path d="M40 74h20"/></svg>`,

  deviceWatch: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="34" y="30" width="32" height="40" rx="9"/><path d="M40 30l2-14h16l2 14M40 70l2 14h16l2-14"/><path d="M50 42v9l6 5"/></svg>`,

  deviceEarbuds: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="18" y="30" width="26" height="38" rx="9"/><rect x="56" y="30" width="26" height="38" rx="9"/><path d="M31 68v6a6 6 0 0 0 6 6M69 68v6a6 6 0 0 1-6 6"/></svg>`,

  deviceHeadphones: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 58V46a32 32 0 0 1 64 0v12"/><rect x="12" y="54" width="18" height="26" rx="6"/><rect x="70" y="54" width="18" height="26" rx="6"/></svg>`,

  deviceSpeaker: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="24" width="68" height="52" rx="8"/><circle cx="50" cy="50" r="15"/><circle cx="50" cy="50" r="5"/><circle cx="70" cy="35" r="2.4" fill="currentColor" stroke="none"/></svg>`,

  deviceTablet: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="22" y="10" width="56" height="80" rx="7"/><circle cx="50" cy="82" r="2.4" fill="currentColor" stroke="none"/></svg>`,
};

function brandBadge(brand) {
  switch (brand) {
    case 'Apple': return ICONS.apple;
    case 'Samsung': return ICONS.samsungBadge;
    case 'Tecno': return ICONS.tecnoBadge;
    case 'Itel': return ICONS.itelBadge;
    case 'JBL': return ICONS.jblBadge;
    default: return '';
  }
}
