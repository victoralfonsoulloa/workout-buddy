'use client'

import React from 'react'
import { Icon } from './icons'

// ── BottomNav ──────────────────────────────────────────────────
interface BottomNavProps {
  active: string
  onChange: (tab: string) => void
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const tabs = [
    { id: 'home',    label: 'Home',    icon: 'home' },
    { id: 'workout', label: 'Workout', icon: 'dumbbell' },
    { id: 'history', label: 'History', icon: 'history' },
  ]
  const activeIndex = tabs.findIndex(t => t.id === active)
  const spring = '420ms cubic-bezier(0.34, 1.56, 0.64, 1)'

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingBottom: 'max(28px, calc(12px + env(safe-area-inset-bottom)))', paddingTop: 8,
      paddingLeft: 12, paddingRight: 12,
      background: 'linear-gradient(to top, var(--wb-bg) 60%, rgba(244,243,238,0))',
      zIndex: 30,
    }}>
      <div style={{
        background: 'var(--wb-ink)',
        borderRadius: 'var(--wb-r-full)',
        padding: 6,
        display: 'flex',
        position: 'relative',
        boxShadow: '0 8px 24px -8px rgba(20,20,15,0.35)',
      }}>
        {/* sliding pill */}
        <div style={{
          position: 'absolute',
          top: 6, bottom: 6, left: 6,
          width: 'calc((100% - 12px) / 3)',
          borderRadius: 'var(--wb-r-full)',
          background: 'var(--wb-accent)',
          transform: `translateX(calc(${activeIndex} * 100%))`,
          transition: `transform ${spring}`,
          pointerEvents: 'none',
        }} />

        {tabs.map(t => {
          const isActive = active === t.id
          return (
            <button key={t.id}
              className="wb-tap wb-btn-reset"
              onClick={() => onChange(t.id)}
              style={{
                flex: 1, height: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--wb-r-full)',
                color: isActive ? 'var(--wb-on-accent)' : 'rgba(255,255,255,0.55)',
                fontSize: 13, fontWeight: 600,
                letterSpacing: '-0.01em',
                position: 'relative', zIndex: 1,
                transition: `color ${spring}`,
              }}>
              <Icon name={t.icon} size={18} strokeWidth={2} />
              <span style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxWidth: isActive ? '72px' : '0px',
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? '6px' : '0px',
                transition: `max-width ${spring}, opacity 220ms ease, margin-left ${spring}`,
              }}>{t.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Pill ───────────────────────────────────────────────────────
type PillTone = 'default' | 'accent' | 'ink' | 'good' | 'pr' | 'soft'

interface PillProps {
  children: React.ReactNode
  tone?: PillTone
  icon?: string
  style?: React.CSSProperties
}

export function Pill({ children, tone = 'default', icon, style = {} }: PillProps) {
  const tones: Record<PillTone, { bg: string; fg: string; bd: string }> = {
    default: { bg: 'var(--wb-bg)',           fg: 'var(--wb-ink-2)',     bd: 'var(--wb-border)' },
    accent:  { bg: 'var(--wb-accent-wash)',  fg: 'var(--wb-accent-deep)', bd: 'transparent' },
    ink:     { bg: 'var(--wb-ink)',          fg: '#fff',                bd: 'transparent' },
    good:    { bg: 'var(--wb-good-wash)',    fg: 'var(--wb-good)',      bd: 'transparent' },
    pr:      { bg: 'var(--wb-pr-wash)',      fg: 'var(--wb-pr)',        bd: 'transparent' },
    soft:    { bg: 'var(--wb-surface-2)',    fg: 'var(--wb-ink-muted)', bd: 'var(--wb-border)' },
  }
  const t = tones[tone]
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
  )
}

// ── ScreenHeader ───────────────────────────────────────────────
interface ScreenHeaderProps {
  greeting?: string
  title: string
  action?: React.ReactNode
}

export function ScreenHeader({ greeting, title, action }: ScreenHeaderProps) {
  return (
    <div style={{ padding: '20px 20px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          {greeting && <div className="t-eyebrow" style={{ marginBottom: 6 }}>{greeting}</div>}
          <div className="t-display">{title}</div>
        </div>
        {action}
      </div>
    </div>
  )
}

// ── Card ───────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode
  style?: React.CSSProperties
  padding?: number | string
  onClick?: () => void
  accent?: boolean
}

export function Card({ children, style = {}, padding = 18, onClick, accent = false }: CardProps) {
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
  )
}
