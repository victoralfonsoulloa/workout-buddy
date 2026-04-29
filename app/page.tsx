'use client'

import React, { useState, useEffect } from 'react'
import { BottomNav } from '@/components/primitives'
import { IOSDevice } from '@/components/ios-frame'
import { TweaksPanel, TweakSection, TweakRadio, TweakToggle, useTweaks } from '@/components/tweaks-panel'
import { HomeScreen } from '@/screens/home'
import { WorkoutScreen } from '@/screens/workout'
import { HistoryScreen } from '@/screens/history'
import type { Session } from '@/lib/data'

type Tab = 'home' | 'workout' | 'history'

const TWEAK_DEFAULTS = {
  heroStyle: 'illustration',
  showFrame: false,
}

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS)
  const [tab, setTab] = useState<Tab>('home')
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  useEffect(() => {
    if (tab !== 'history') setSelectedSession(null)
  }, [tab])

  const openSession = (s: Session) => {
    setSelectedSession(s)
    setTab('history')
  }

  let screen: React.ReactNode = null
  if (tab === 'home') {
    screen = (
      <HomeScreen
        onStart={() => setTab('workout')}
        onSelectSession={openSession}
        heroStyle={tweaks.heroStyle as string}
      />
    )
  } else if (tab === 'workout') {
    screen = (
      <WorkoutScreen
        onFinish={() => setTab('home')}
        onCancel={() => setTab('home')}
      />
    )
  } else if (tab === 'history') {
    screen = (
      <HistoryScreen
        selectedSession={selectedSession}
        onSelectSession={setSelectedSession}
        onBack={() => setSelectedSession(null)}
      />
    )
  }

  const appShell = (
    <div className="wb-app"
      data-screen-label={
        tab === 'home' ? 'Home' :
        tab === 'workout' ? 'Workout' :
        selectedSession ? 'History · Detail' : 'History'
      }>
      <div key={tab + (selectedSession?.id || '')} className="screen-anim" style={{ height: '100%' }}>
        {screen}
      </div>
      <BottomNav active={tab} onChange={(t) => { setSelectedSession(null); setTab(t as Tab) }} />
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--wb-page)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div id="stage" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {tweaks.showFrame ? (
          <IOSDevice width={402} height={874}>
            {appShell}
          </IOSDevice>
        ) : (
          <div style={{
            width: 402, height: 874, borderRadius: 28, overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.10)',
          }}>{appShell}</div>
        )}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero card art">
          <TweakRadio
            value={tweaks.heroStyle as string}
            onChange={(v) => setTweak('heroStyle', v)}
            options={[
              { value: 'gradient',     label: 'Gradient' },
              { value: 'typographic',  label: 'Type' },
              { value: 'illustration', label: 'Illus.' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Display">
          <TweakToggle
            label="iPhone frame"
            value={tweaks.showFrame as boolean}
            onChange={(v) => setTweak('showFrame', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  )
}
