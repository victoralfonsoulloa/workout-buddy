'use client'

import React, { useState, useMemo } from 'react'
import { Icon } from '@/components/icons'
import { getNextSplit } from '@/lib/data'
import type { Exercise } from '@/lib/data'

interface SetState {
  weight: number
  reps: number
  done: boolean
}

type SetMap = Record<string, SetState[]>

function makeInitialSets(exercises: Exercise[]): SetMap {
  const map: SetMap = {}
  exercises.forEach(ex => {
    map[ex.id] = Array.from({ length: ex.sets }, () => ({
      weight: ex.lastWeight,
      reps: ex.reps,
      done: false,
    }))
  })
  return map
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{
      height: 6, background: 'var(--wb-border)',
      borderRadius: 'var(--wb-r-full)', overflow: 'hidden',
    }}>
      <div style={{
        height: '100%', width: `${value * 100}%`,
        background: 'var(--wb-accent)',
        borderRadius: 'var(--wb-r-full)',
        transition: 'width 280ms cubic-bezier(0.2,0.8,0.2,1)',
      }}/>
    </div>
  )
}

interface NumStepperProps {
  value: number
  onChange: (v: number) => void
  step?: number
  suffix?: string
}

function NumStepper({ value, onChange, step = 2.5, suffix }: NumStepperProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: 'var(--wb-bg)', borderRadius: 'var(--wb-r-sm)',
      border: '1px solid var(--wb-border)',
      height: 36, overflow: 'hidden',
    }}>
      <button className="wb-btn-reset wb-tap" onClick={() => onChange(Math.max(0, value - step))}
        style={{ width: 32, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wb-ink-muted)' }}>
        <Icon name="minus" size={14} strokeWidth={2.2} />
      </button>
      <div className="t-mono-num" style={{
        flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 600,
        color: 'var(--wb-ink)', minWidth: 0,
      }}>
        {value}{suffix && <span style={{ fontSize: 11, color: 'var(--wb-ink-muted)', marginLeft: 2, fontWeight: 500 }}>{suffix}</span>}
      </div>
      <button className="wb-btn-reset wb-tap" onClick={() => onChange(value + step)}
        style={{ width: 32, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--wb-ink-muted)' }}>
        <Icon name="plus" size={14} strokeWidth={2.2} />
      </button>
    </div>
  )
}

interface SetRowProps {
  setIdx: number
  set: SetState
  prevWeight: number
  onChange: (ns: SetState) => void
  onComplete: () => void
}

function SetRow({ setIdx, set, prevWeight, onChange, onComplete }: SetRowProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '28px 1fr 1fr 44px',
      gap: 10, alignItems: 'center',
      padding: '8px 0',
      opacity: set.done ? 0.55 : 1,
      transition: 'opacity 200ms',
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 'var(--wb-r-full)',
        background: set.done ? 'var(--wb-accent)' : 'var(--wb-bg)',
        border: set.done ? 'none' : '1px solid var(--wb-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700, color: set.done ? 'var(--wb-on-accent)' : 'var(--wb-ink-muted)',
      }}>
        {setIdx + 1}
      </div>

      <NumStepper value={set.weight} step={2.5}
        onChange={(v) => onChange({ ...set, weight: v })} suffix="kg" />
      <NumStepper value={set.reps} step={1}
        onChange={(v) => onChange({ ...set, reps: v })} suffix="r" />

      <button className="wb-btn-reset wb-tap" onClick={onComplete}
        disabled={set.done}
        style={{
          width: 44, height: 36, borderRadius: 'var(--wb-r-sm)',
          background: set.done ? 'var(--wb-accent)' : 'var(--wb-ink)',
          color: set.done ? 'var(--wb-on-accent)' : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 160ms',
        }}>
        <Icon name="check" size={16} strokeWidth={2.6} stroke={set.done ? 'var(--wb-on-accent)' : 'var(--wb-accent)'} />
      </button>
    </div>
  )
}

interface ExerciseCardProps {
  exercise: Exercise
  sets: SetState[]
  onSetChange: (idx: number, ns: SetState) => void
  onSetComplete: (idx: number) => void
  expanded: boolean
  onToggle: () => void
  idx: number
}

function ExerciseCard({ exercise, sets, onSetChange, onSetComplete, expanded, onToggle, idx }: ExerciseCardProps) {
  const completed = sets.filter(s => s.done).length
  const allDone = completed === sets.length

  return (
    <div style={{
      background: 'var(--wb-surface)',
      borderRadius: 'var(--wb-r-md)',
      border: `1px solid ${allDone ? 'rgba(184,240,42,0.5)' : 'var(--wb-border)'}`,
      overflow: 'hidden',
      transition: 'border-color 200ms',
    }}>
      <div className="wb-tap" onClick={onToggle} style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--wb-r-full)',
          background: allDone ? 'var(--wb-accent)' : 'var(--wb-bg)',
          color: allDone ? 'var(--wb-on-accent)' : 'var(--wb-ink-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
        }}>
          {allDone ? <Icon name="check" size={14} strokeWidth={3} /> : idx + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>{exercise.name}</div>
          <div style={{ fontSize: 12, color: 'var(--wb-ink-muted)', marginTop: 1 }}>
            {exercise.target} · {completed}/{sets.length} sets
          </div>
        </div>
        <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={18} stroke="var(--wb-ink-muted)" />
      </div>

      {expanded && (
        <div style={{ padding: '4px 16px 16px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '28px 1fr 1fr 44px',
            gap: 10, marginBottom: 4,
            fontSize: 10, fontWeight: 600, color: 'var(--wb-ink-subtle)',
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            <div style={{ textAlign: 'center' }}>Set</div>
            <div style={{ textAlign: 'center' }}>Weight</div>
            <div style={{ textAlign: 'center' }}>Reps</div>
            <div></div>
          </div>
          {sets.map((s, i) => (
            <SetRow key={i} setIdx={i} set={s}
              prevWeight={exercise.lastWeight}
              onChange={(ns) => onSetChange(i, ns)}
              onComplete={() => onSetComplete(i)} />
          ))}
          <div style={{
            marginTop: 6, fontSize: 11, color: 'var(--wb-ink-subtle)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="clock" size={11} />
            Last: {exercise.lastWeight}kg × {exercise.reps}
          </div>
        </div>
      )}
    </div>
  )
}

interface PRCelebrationProps {
  visible: boolean
  exerciseName?: string
  weight?: number
  reps?: number
  onDismiss: () => void
}

function PRCelebration({ visible, exerciseName, weight, reps, onDismiss }: PRCelebrationProps) {
  if (!visible) return null
  return (
    <div onClick={onDismiss} style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(20,20,15,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, animation: 'fadeIn 200ms ease-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--wb-ink)', color: '#fff',
        borderRadius: 'var(--wb-r-lg)',
        padding: '28px 24px', width: '100%',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        animation: 'popIn 280ms cubic-bezier(0.2,0.9,0.3,1.2)',
      }}>
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 240, height: 240, borderRadius: '50%',
          background: 'radial-gradient(circle, var(--wb-accent) 0%, transparent 60%)',
          opacity: 0.35, pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 'var(--wb-r-full)',
            background: 'var(--wb-accent)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 14,
          }}>
            <Icon name="trophy" size={30} stroke="var(--wb-on-accent)" strokeWidth={2} />
          </div>
          <div className="t-eyebrow" style={{ color: 'var(--wb-accent)', marginBottom: 6 }}>NEW PERSONAL RECORD</div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            {exerciseName}
          </div>
          <div className="t-mono-num" style={{ marginTop: 10, fontSize: 36, fontWeight: 800, color: 'var(--wb-accent)' }}>
            {weight}kg × {reps}
          </div>
          <div style={{ marginTop: 10, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            That&apos;s a 5kg jump. Keep cooking.
          </div>
          <button onClick={onDismiss} className="wb-tap wb-btn-reset" style={{
            marginTop: 18, width: '100%', height: 48,
            background: 'var(--wb-accent)', color: 'var(--wb-on-accent)',
            borderRadius: 'var(--wb-r-md)', fontSize: 15, fontWeight: 700,
          }}>Keep going</button>
        </div>
      </div>
    </div>
  )
}

// ── WorkoutScreen ──────────────────────────────────────────────
interface WorkoutScreenProps {
  onFinish: () => void
  onCancel: () => void
}

export function WorkoutScreen({ onFinish, onCancel }: WorkoutScreenProps) {
  const split = getNextSplit()
  const [setMap, setSetMap] = useState<SetMap>(() => makeInitialSets(split.exercises))
  const [expandedId, setExpandedId] = useState<string | null>(split.exercises[0].id)
  const [pr, setPr] = useState<{ name: string; weight: number; reps: number } | null>(null)

  const totalSets = useMemo(() => split.exercises.reduce((acc, ex) => acc + ex.sets, 0), [split])
  const doneSets = useMemo(
    () => Object.values(setMap).flat().filter(s => s.done).length,
    [setMap]
  )
  const progress = doneSets / totalSets

  const updateSet = (exId: string, idx: number, newSet: SetState) => {
    setSetMap(m => ({ ...m, [exId]: m[exId].map((s, i) => i === idx ? newSet : s) }))
  }
  const completeSet = (ex: Exercise, idx: number) => {
    const cur = setMap[ex.id][idx]
    if (cur.done) return
    const newSet = { ...cur, done: true }
    setSetMap(m => ({ ...m, [ex.id]: m[ex.id].map((s, i) => i === idx ? newSet : s) }))
    if (newSet.weight > ex.lastWeight && newSet.weight > 0) {
      setPr({ name: ex.name, weight: newSet.weight, reps: newSet.reps })
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid var(--wb-border-soft)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div className="t-eyebrow" style={{ marginBottom: 4 }}>In progress · 18:24</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
              {split.name} day
            </div>
          </div>
          <button className="wb-btn-reset wb-tap" onClick={onCancel} style={{
            width: 36, height: 36, borderRadius: 'var(--wb-r-full)',
            background: 'var(--wb-bg)', border: '1px solid var(--wb-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--wb-ink-muted)', fontSize: 14, fontWeight: 600,
          }}>×</button>
        </div>
        <ProgressBar value={progress} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12 }}>
          <span style={{ color: 'var(--wb-ink-muted)' }} className="t-mono-num">{doneSets}/{totalSets} sets</span>
          <span style={{ color: 'var(--wb-accent-deep)', fontWeight: 600 }} className="t-mono-num">{Math.round(progress * 100)}%</span>
        </div>
      </div>

      <div className="wb-scroll" style={{ flex: 1, paddingTop: 12 }}>
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {split.exercises.map((ex, i) => (
            <ExerciseCard key={ex.id}
              idx={i}
              exercise={ex}
              sets={setMap[ex.id]}
              expanded={expandedId === ex.id}
              onToggle={() => setExpandedId(expandedId === ex.id ? null : ex.id)}
              onSetChange={(idx, ns) => updateSet(ex.id, idx, ns)}
              onSetComplete={(idx) => completeSet(ex, idx)} />
          ))}
        </div>

        <div style={{ padding: '20px' }}>
          <button onClick={onFinish} className="wb-tap wb-btn-reset" style={{
            width: '100%', height: 56,
            background: progress >= 0.99 ? 'var(--wb-accent)' : 'var(--wb-ink)',
            color: progress >= 0.99 ? 'var(--wb-on-accent)' : '#fff',
            borderRadius: 'var(--wb-r-md)',
            fontSize: 16, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: progress >= 0.99 ? 'var(--wb-sh-accent)' : 'var(--wb-sh-2)',
          }}>
            Finish Workout
            <Icon name="arrow-right" size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <PRCelebration visible={!!pr}
        exerciseName={pr?.name} weight={pr?.weight} reps={pr?.reps}
        onDismiss={() => setPr(null)} />
    </div>
  )
}
