'use client'

import React from 'react'
import { Icon } from '@/components/icons'
import { Pill, ScreenHeader } from '@/components/primitives'
import { HISTORY } from '@/lib/data'
import type { Session } from '@/lib/data'

function GroupHeader({ label }: { label: string }) {
  return (
    <div className="t-eyebrow" style={{ padding: '14px 4px 8px' }}>{label}</div>
  )
}

function HistoryCard({ session, onClick }: { session: Session; onClick: () => void }) {
  const splitColors: Record<string, { bg: string; fg: string }> = {
    push: { bg: '#FFF1E6', fg: '#C2410C' },
    pull: { bg: '#E6F0FF', fg: '#1E40AF' },
    legs: { bg: 'var(--wb-accent-wash)', fg: 'var(--wb-accent-deep)' },
  }
  const c = splitColors[session.splitKey]
  return (
    <div className="wb-tap" onClick={onClick} style={{
      background: 'var(--wb-surface)',
      border: '1px solid var(--wb-border)',
      borderRadius: 'var(--wb-r-md)',
      padding: 14,
      display: 'flex', gap: 14, alignItems: 'center',
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 'var(--wb-r-sm)',
        background: c.bg, color: c.fg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 1,
      }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>{session.label}</div>
        <div style={{ fontSize: 9, fontWeight: 600, opacity: 0.7 }}>{session.dateShort}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{session.label} day</div>
          {session.pr && <Pill tone="pr" icon="trophy">PR</Pill>}
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 11.5, color: 'var(--wb-ink-muted)' }}>
          <span><Icon name="clock" size={11} style={{ marginRight: 3, verticalAlign: '-2px' as unknown as undefined }} />{session.duration}</span>
          <span className="t-mono-num">{session.sets.length} ex</span>
          <span className="t-mono-num">{session.volume.toLocaleString()}kg</span>
        </div>
      </div>
      <Icon name="chevron-right" size={16} stroke="var(--wb-ink-subtle)" />
    </div>
  )
}

function SessionDetail({ session, onBack }: { session: Session; onBack: () => void }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 20px 16px' }}>
        <button className="wb-btn-reset wb-tap" onClick={onBack} style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 13, color: 'var(--wb-ink-muted)', fontWeight: 500, marginBottom: 12,
        }}>
          <Icon name="chevron-right" size={14} style={{ transform: 'rotate(180deg)' }} />
          Back
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div className="t-eyebrow" style={{ marginBottom: 4 }}>{session.date}</div>
            <div className="t-display">{session.label} day</div>
          </div>
          {session.pr && <Pill tone="pr" icon="trophy">New PR</Pill>}
        </div>

        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { label: 'Duration', value: session.duration },
            { label: 'Volume', value: `${(session.volume / 1000).toFixed(1)}t` },
            { label: 'Exercises', value: session.sets.length },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--wb-surface)', border: '1px solid var(--wb-border)',
              borderRadius: 'var(--wb-r-sm)', padding: '10px 12px',
            }}>
              <div className="t-eyebrow" style={{ marginBottom: 3, fontSize: 10 }}>{s.label}</div>
              <div className="t-mono-num" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {session.pr && (
          <div style={{
            marginTop: 12,
            background: 'var(--wb-pr-wash)',
            borderRadius: 'var(--wb-r-sm)',
            padding: '10px 12px',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Icon name="trophy" size={16} stroke="var(--wb-pr)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--wb-pr)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Personal record</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--wb-ink)', marginTop: 1 }}>{session.prDetail}</div>
            </div>
          </div>
        )}
      </div>

      <div className="wb-scroll" style={{ flex: 1 }}>
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {session.sets.map((ex, i) => (
            <div key={i} style={{
              background: 'var(--wb-surface)',
              border: '1px solid var(--wb-border)',
              borderRadius: 'var(--wb-r-md)',
              padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{ex.name}</div>
                <div className="t-mono-num" style={{ fontSize: 11, color: 'var(--wb-ink-muted)' }}>{ex.sets.length} sets</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {ex.sets.map((s, si) => (
                  <div key={si} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 0',
                    borderTop: si === 0 ? 'none' : '1px solid var(--wb-border-soft)',
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 'var(--wb-r-full)',
                      background: 'var(--wb-bg)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: 'var(--wb-ink-muted)',
                    }}>{si + 1}</div>
                    <div className="t-mono-num" style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>
                      {s.w === 0 ? 'Bodyweight' : `${s.w}kg`} <span style={{ color: 'var(--wb-ink-muted)' }}>×</span> {s.r}
                    </div>
                    {s.pr && <Pill tone="pr" icon="trophy" style={{ padding: '2px 8px', fontSize: 10 }}>PR</Pill>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }}/>
      </div>
    </div>
  )
}

// ── HistoryScreen ──────────────────────────────────────────────
interface HistoryScreenProps {
  selectedSession: Session | null
  onSelectSession: (s: Session) => void
  onBack: () => void
}

export function HistoryScreen({ selectedSession, onSelectSession, onBack }: HistoryScreenProps) {
  if (selectedSession) {
    return <SessionDetail session={selectedSession} onBack={onBack} />
  }

  const groups = [
    { label: 'This week', items: HISTORY.filter(s => ['Apr 27', 'Apr 25'].includes(s.dateShort)) },
    { label: 'Last week', items: HISTORY.filter(s => ['Apr 22', 'Apr 20', 'Apr 18'].includes(s.dateShort)) },
    { label: 'Earlier',   items: HISTORY.filter(s => ['Apr 15'].includes(s.dateShort)) },
  ].filter(g => g.items.length > 0)

  const totalSessions = HISTORY.length
  const totalPRs = HISTORY.filter(s => s.pr).length
  const totalVolume = HISTORY.reduce((a, s) => a + s.volume, 0)

  return (
    <div className="wb-scroll">
      <ScreenHeader title="History" />
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { label: 'Sessions', value: totalSessions, icon: 'calendar' },
            { label: 'PRs',      value: totalPRs,      icon: 'trophy' },
            { label: 'Volume',   value: `${(totalVolume / 1000).toFixed(0)}t`, icon: 'trend-up' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--wb-surface)', border: '1px solid var(--wb-border)',
              borderRadius: 'var(--wb-r-sm)', padding: '12px',
            }}>
              <Icon name={s.icon} size={14} stroke="var(--wb-ink-muted)" />
              <div className="t-mono-num" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 6 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--wb-ink-muted)', fontWeight: 500, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {groups.map(g => (
          <div key={g.label}>
            <GroupHeader label={g.label} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {g.items.map(s => (
                <HistoryCard key={s.id} session={s} onClick={() => onSelectSession(s)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
