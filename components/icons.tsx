'use client'

import React from 'react'

interface IconProps {
  name: string
  size?: number
  stroke?: string
  strokeWidth?: number
  fill?: string
  style?: React.CSSProperties
}

export function Icon({ name, size = 20, stroke = 'currentColor', strokeWidth = 1.75, fill = 'none', style = {} }: IconProps) {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill, stroke, strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style,
  }
  switch (name) {
    case 'home':
      return <svg {...common}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></svg>
    case 'dumbbell':
      return <svg {...common}><path d="M6 7v10M3 9v6M21 9v6M18 7v10M6 12h12"/></svg>
    case 'history':
      return <svg {...common}><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 8v4l3 2"/></svg>
    case 'flame':
      return <svg {...common}><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-1 .3-2 .7-2.7C8 9 9 11 9 11s.5-3 3-9z"/><path d="M7 16a5 5 0 0 0 10 0c0-2-1-3-2-4 0 2-1 3-2 3-1 0-2-1-2-2 0 0-4 1-4 3z"/></svg>
    case 'check':
      return <svg {...common}><path d="M4 12l5 5 11-11"/></svg>
    case 'plus':
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>
    case 'minus':
      return <svg {...common}><path d="M5 12h14"/></svg>
    case 'arrow-right':
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    case 'chevron-right':
      return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>
    case 'chevron-down':
      return <svg {...common}><path d="M6 9l6 6 6-6"/></svg>
    case 'chevron-up':
      return <svg {...common}><path d="M18 15l-6-6-6 6"/></svg>
    case 'target':
      return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill={stroke}/></svg>
    case 'trophy':
      return <svg {...common}><path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M16 4h3v3a3 3 0 0 1-3 3M8 4H5v3a3 3 0 0 0 3 3"/><path d="M10 14h4l-1 4h-2z"/><path d="M9 20h6"/></svg>
    case 'clock':
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
    case 'sparkles':
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>
    case 'bolt':
      return <svg {...common}><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill={stroke} stroke="none"/></svg>
    case 'bolt-outline':
      return <svg {...common}><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>
    case 'play':
      return <svg {...common}><path d="M6 4l14 8-14 8z" fill={stroke} stroke="none"/></svg>
    case 'more':
      return <svg {...common}><circle cx="5" cy="12" r="1.5" fill={stroke} stroke="none"/><circle cx="12" cy="12" r="1.5" fill={stroke} stroke="none"/><circle cx="19" cy="12" r="1.5" fill={stroke} stroke="none"/></svg>
    case 'trend-up':
      return <svg {...common}><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>
    case 'calendar':
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>
    case 'settings':
      return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    default:
      return <svg {...common}><circle cx="12" cy="12" r="6"/></svg>
  }
}
