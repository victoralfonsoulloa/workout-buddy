// components.jsx — shared UI primitives for Workout Buddy

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ──────────────────────────────────────────────
// Icons (custom-drawn, lucide-inspired, 24px)
// ──────────────────────────────────────────────
function Icon({ name, size = 20, stroke = 'currentColor', strokeWidth = 1.75, fill = 'none', style = {} }) {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill, stroke, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
    style,
  };
  switch (name) {
    case 'home':
      return <svg {...common}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></svg>;
    case 'dumbbell':
      return <svg {...common}><path d="M6 7v10M3 9v6M21 9v6M18 7v10M6 12h12"/></svg>;
    case 'history':
      return <svg {...common}><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v4l3 2"/></svg>;
    case 'flame':
      return <svg {...common}><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .3-2 .7-2.7C8 9 9 11 9 11s.5-3 3-9z"/><path d="M7 16a5 5 0 0 0 10 0c0-2-1-3-2-4 0 2-1 3-2 3-1 0-2-1-2-2 0 0-4 1-4 3z"/></svg>;
    case 'check':
      return <svg {...common}><path d="M4 12l5 5 11-11"/></svg>;
    case 'plus':
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus':
      return <svg {...common}><path d="M5 12h14"/></svg>;
    case 'arrow-right':
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'chevron-right':
      return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chevron-down':
      return <svg {...common}><path d="M6 9l6 6 6-6"/></svg>;
    case 'chevron-up':
      return <svg {...common}><path d="M18 15l-6-6-6 6"/></svg>;
    case 'target':
      return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={stroke}/></svg>;
    case 'trophy':
      return <svg {...common}><path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M16 4h3v3a3 3 0 0 1-3 3M8 4H5v3a3 3 0 0 0 3 3"/><path d="M10 14h4l-1 4h-2z"/><path d="M9 20h6"/></svg>;
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'sparkles':
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>;
    case 'bolt':
      return <svg {...common}><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill={stroke} stroke="none"/></svg>;
    case 'bolt-outline':
      return <svg {...common}><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>;
    case 'play':
      return <svg {...common}><path d="M6 4l14 8-14 8z" fill={stroke} stroke="none"/></svg>;
    case 'more':
      return <svg {...common}><circle cx="5" cy="12" r="1.5" fill={stroke} stroke="none"/><circle cx="12" cy="12" r="1.5" fill={stroke} stroke="none"/><circle cx="19" cy="12" r="1.5" fill={stroke} stroke="none"/></svg>;
    case 'trend-up':
      return <svg {...common}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>;
    case 'calendar':
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
    case 'settings':
      return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="6"/></svg>;
  }
}

// ──────────────────────────────────────────────
// Bottom Navigation
// ──────────────────────────────────────────────
function BottomNav({ active, onChange }) {
  const tabs = [
    { id: 'home',    label: 'Home',    icon: 'home' },
    { id: 'workout', label: 'Workout', icon: 'dumbbell' },
    { id: 'history', label: 'History', icon: 'history' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 28, paddingTop: 8,
      paddingLeft: 12, paddingRight: 12,
      background: 'linear-gradient(to top, var(--wb-bg) 60%, rgba(244,243,238,0))',
      zIndex: 30,
    }}>
      <div style={{
        background: 'var(--wb-ink)',
        borderRadius: 'var(--wb-r-full)',
        padding: 6,
        display: 'flex', gap: 4,
        boxShadow: '0 8px 24px -8px rgba(20,20,15,0.35)',
      }}>
        {tabs.map(t => {
          const isActive = active === t.id;
          return (
            <button key={t.id}
              className="wb-tap wb-btn-reset"
              onClick={() => onChange(t.id)}
              style={{
                flex: 1, height: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 6,
                borderRadius: 'var(--wb-r-full)',
                background: isActive ? 'var(--wb-accent)' : 'transparent',
                color: isActive ? 'var(--wb-on-accent)' : 'rgba(255,255,255,0.7)',
                fontSize: 13, fontWeight: 600,
                letterSpacing: '-0.01em',
                transition: 'background 180ms ease, color 180ms ease',
              }}>
              <Icon name={t.icon} size={18} strokeWidth={2} />
              {isActive && <span>{t.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Pill / Chip
// ──────────────────────────────────────────────
function Pill({ children, tone = 'default', icon, style = {} }) {
  const tones = {
    default: { bg: 'var(--wb-bg)',           fg: 'var(--wb-ink-2)',     bd: 'var(--wb-border)' },
    accent:  { bg: 'var(--wb-accent-wash)',  fg: 'var(--wb-accent-deep)', bd: 'transparent' },
    ink:     { bg: 'var(--wb-ink)',          fg: '#fff',                bd: 'transparent' },
    good:    { bg: 'var(--wb-good-wash)',    fg: 'var(--wb-good)',      bd: 'transparent' },
    pr:      { bg: 'var(--wb-pr-wash)',      fg: 'var(--wb-pr)',        bd: 'transparent' },
    soft:    { bg: 'var(--wb-surface-2)',    fg: 'var(--wb-ink-muted)', bd: 'var(--wb-border)' },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '4px 10px', borderRadius: 'var(--wb-r-full)',
      background: t.bg, color: t.fg, border: `1px solid ${t.bd}`,
      fontSize: 11, fontWeight: 600, letterSpacing: '-0.005em',
      lineHeight: 1, whiteSpace: 'nowrap',
      ...style,
    }}>
      {icon && <Icon name={icon} size={12} strokeWidth={2.2} />}
      {children}
    </span>
  );
}

// ──────────────────────────────────────────────
// Top header (title + day strip)
// ──────────────────────────────────────────────
function ScreenHeader({ greeting, title, action }) {
  return (
    <div style={{ padding: '20px 20px 12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          {greeting && <div className="t-eyebrow" style={{ marginBottom: 6 }}>{greeting}</div>}
          <div className="t-display">{title}</div>
        </div>
        {action}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Card primitive
// ──────────────────────────────────────────────
function Card({ children, style = {}, padding = 18, onClick, accent = false }) {
  return (
    <div onClick={onClick}
      className={onClick ? 'wb-tap' : ''}
      style={{
        background: accent ? 'var(--wb-ink)' : 'var(--wb-surface)',
        color: accent ? '#fff' : 'var(--wb-ink)',
        borderRadius: 'var(--wb-r-md)',
        border: accent ? 'none' : '1px solid var(--wb-border)',
        padding,
        boxShadow: 'var(--wb-sh-1)',
        ...style,
      }}>
      {children}
    </div>
  );
}

Object.assign(window, { Icon, BottomNav, Pill, ScreenHeader, Card });
