'use client'

import React from 'react'
import { Icon } from '@/components/icons'
import { Pill, ScreenHeader, Card } from '@/components/primitives'
import { getNextSplit, getMotivation, HISTORY, THIS_WEEK, STREAK } from '@/lib/data'
import type { Session, WeekData, Split } from '@/lib/data'

// ── HeroCard ───────────────────────────────────────────────────
interface HeroCardProps {
  split: Split
  streak: number
  onStart: () => void
  heroStyle: string
}

function HeroCard({ split, streak, onStart, heroStyle }: HeroCardProps) {
  const renderArt = () => {
    if (heroStyle === 'typographic') {
      return (
        <div style={{
          position: 'absolute', inset: 0, overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
          padding: 18, pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: 180, fontWeight: 800, letterSpacing: '-0.06em',
            color: 'rgba(201,255,61,0.10)', lineHeight: 0.85,
            textTransform: 'uppercase',
          }}>{split.name}</div>
        </div>
      )
    }
    if (heroStyle === 'illustration') {
      return (
        <svg style={{ position: 'absolute', right: -30, top: -20, opacity: 0.7 }} width="260" height="260" viewBox="0 0 260 260" fill="none">
          <circle cx="200" cy="60" r="100" fill="var(--wb-accent)" opacity="0.15"/>
          <g stroke="var(--wb-accent)" strokeWidth="3" strokeLinecap="round">
            <path d="M120 130h60"/>
            <rect x="105" y="115" width="14" height="30" rx="3"/>
            <rect x="180" y="115" width="14" height="30" rx="3"/>
            <rect x="92" y="105" width="12" height="50" rx="3"/>
            <rect x="195" y="105" width="12" height="50" rx="3"/>
          </g>
        </svg>
      )
    }
    return (
      <>
        <div style={{
          position: 'absolute', top: -80, right: -80, width: 280, height: 280,
          background: 'radial-gradient(circle, var(--wb-accent) 0%, transparent 70%)',
          opacity: 0.35, pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', bottom: -120, left: -60, width: 260, height: 260,
          background: 'radial-gradient(circle, #7C5CFF 0%, transparent 70%)',
          opacity: 0.18, pointerEvents: 'none',
        }}/>
      </>
    )
  }

  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--wb-ink)', color: '#fff',
      borderRadius: 'var(--wb-r-lg)',
      padding: 22,
      boxShadow: '0 12px 32px -12px rgba(20,20,15,0.30)',
    }}>
      {renderArt()}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="t-eyebrow" style={{ color: 'var(--wb-accent)' }}>Next session</div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', borderRadius: 'var(--wb-r-full)',
            background: 'rgba(255,255,255,0.08)', color: '#fff',
            fontSize: 11, fontWeight: 600,
          }}>
            <Icon name="flame" size={12} stroke="var(--wb-accent)" strokeWidth={2.2} />
            {streak} day streak
          </div>
        </div>

        <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            {split.name}
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Day</div>
        </div>

        <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.65)', fontSize: 13, fontWeight: 500 }}>
          {split.subtitle}
        </div>

        <div style={{
          marginTop: 18, paddingTop: 16, paddingBottom: 4,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', gap: 18,
        }}>
          <Stat label="Exercises" value={split.exercises.length} />
          <Stat label="Sets" value={split.exercises.length * 3} />
          <Stat label="Time" value={split.duration.replace('~', '')} />
        </div>

        <button onClick={onStart} className="wb-tap wb-btn-reset"
          style={{
            marginTop: 18, width: '100%', height: 56,
            background: 'var(--wb-accent)', color: 'var(--wb-on-accent)',
            borderRadius: 'var(--wb-r-md)',
            fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: 'var(--wb-sh-accent)',
          }}>
          <Icon name="play" size={16} stroke="var(--wb-on-accent)" />
          Start Workout
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }} className="t-mono-num">{value}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginTop: 2 }}>{label}</div>
    </div>
  )
}

function MotivationCard({ phrase }: { phrase: string }) {
  return (
    <div style={{
      background: 'var(--wb-accent-wash)',
      borderRadius: 'var(--wb-r-md)',
      padding: '16px 18px',
      display: 'flex', gap: 14, alignItems: 'flex-start',
      border: '1px solid rgba(184,240,42,0.30)',
    }}>
      <div style={{
        flexShrink: 0, width: 32, height: 32, borderRadius: 'var(--wb-r-full)',
        background: 'var(--wb-accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="bolt" size={16} stroke="var(--wb-on-accent)" />
      </div>
      <div style={{ flex: 1 }}>
        <div className="t-eyebrow" style={{ color: 'var(--wb-accent-deep)', marginBottom: 4 }}>Today&apos;s fuel</div>
        <div style={{
          fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
          color: 'var(--wb-ink)', lineHeight: 1.3,
        }}>{phrase}</div>
      </div>
    </div>
  )
}

function WeekProgress({ data }: { data: WeekData }) {
  return (
    <Card padding={18}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div>
          <div className="t-eyebrow" style={{ marginBottom: 4 }}>This week</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }} className="t-mono-num">{data.completed}</span>
            <span style={{ fontSize: 14, color: 'var(--wb-ink-muted)', fontWeight: 500 }}>of {data.goal} sessions</span>
          </div>
        </div>
        <Pill tone="accent" icon="trend-up">On track</Pill>
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        {data.days.map((d, i) => {
          let bg = 'var(--wb-bg)', fg = 'var(--wb-ink-subtle)'
          let border = '1px solid var(--wb-border)'
          if (d.state === 'done')    { bg = 'var(--wb-ink)'; fg = 'var(--wb-accent)'; border = 'none' }
          if (d.state === 'today')   { bg = 'var(--wb-accent)'; fg = 'var(--wb-on-accent)'; border = 'none' }
          if (d.state === 'rest')    { bg = 'transparent'; fg = 'var(--wb-ink-subtle)'; border = '1px dashed var(--wb-border)' }
          return (
            <div key={i} style={{
              flex: 1, height: 56, borderRadius: 'var(--wb-r-sm)',
              background: bg, border,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 2,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: fg }}>{d.day}</div>
              {d.state === 'done' && <Icon name="check" size={11} stroke="var(--wb-accent)" strokeWidth={3} />}
              {d.state === 'today' && <div style={{ fontSize: 9, fontWeight: 700, color: fg }}>TODAY</div>}
              {d.state === 'planned' && <div style={{ width: 4, height: 4, borderRadius: 4, background: 'var(--wb-ink-subtle)' }} />}
            </div>
          )
        })}
      </div>
    </Card>
  )
}

function RecentSession({ session, onClick }: { session: Session; onClick: () => void }) {
  const splitColors: Record<string, { bg: string; fg: string; label: string }> = {
    push: { bg: '#FFF1E6', fg: '#C2410C', label: 'Push' },
    pull: { bg: '#E6F0FF', fg: '#1E40AF', label: 'Pull' },
    legs: { bg: 'var(--wb-accent-wash)', fg: 'var(--wb-accent-deep)', label: 'Legs' },
  }
  const c = splitColors[session.splitKey]
  return (
    <div className="wb-tap" onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 0',
      borderBottom: '1px solid var(--wb-border-soft)',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 'var(--wb-r-sm)',
        background: c.bg, color: c.fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em',
      }}>{c.label}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{session.label} day</div>
          {session.pr && <Pill tone="pr" icon="trophy">PR</Pill>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--wb-ink-muted)', marginTop: 2 }}>
          {session.date} · {session.duration} · {session.volume.toLocaleString()}kg
        </div>
      </div>
      <Icon name="chevron-right" size={16} stroke="var(--wb-ink-subtle)" />
    </div>
  )
}

// ── HomeScreen ─────────────────────────────────────────────────
interface HomeScreenProps {
  onStart: () => void
  onSelectSession: (s: Session) => void
  heroStyle: string
}

export function HomeScreen({ onStart, onSelectSession, heroStyle }: HomeScreenProps) {
  const split = getNextSplit()
  const motivation = getMotivation()

  return (
    <div className="wb-scroll">
      <ScreenHeader greeting="Wednesday · Apr 29" title="Hey, Alex 👋" />

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <MotivationCard phrase={motivation} />
        <HeroCard split={split} streak={STREAK} onStart={onStart} heroStyle={heroStyle} />
        <WeekProgress data={THIS_WEEK} />

        <div style={{ marginTop: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <div className="t-h2">Recent</div>
            <button className="wb-tap wb-btn-reset" style={{
              fontSize: 12, fontWeight: 600, color: 'var(--wb-ink-muted)',
              display: 'inline-flex', alignItems: 'center', gap: 2,
            }}>
              View all <Icon name="chevron-right" size={12} />
            </button>
          </div>
          <Card padding={'0 18px'}>
            {HISTORY.slice(0, 4).map((s, i, arr) => (
              <div key={s.id} style={{ borderBottom: i === arr.length - 1 ? 'none' : undefined }}>
                <RecentSession session={s} onClick={() => onSelectSession(s)} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
