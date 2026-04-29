export interface Exercise {
  id: string
  name: string
  target: string
  sets: number
  lastWeight: number
  reps: number
}

export interface Split {
  key: string
  name: string
  subtitle: string
  accent: string
  duration: string
  exercises: Exercise[]
}

export interface SetEntry {
  w: number
  r: number
  pr?: boolean
}

export interface ExerciseHistory {
  name: string
  sets: SetEntry[]
}

export interface Session {
  id: string
  splitKey: string
  label: string
  date: string
  dateShort: string
  duration: string
  volume: number
  pr: boolean
  prDetail?: string
  sets: ExerciseHistory[]
}

export interface DayEntry {
  day: string
  label: string
  state: 'done' | 'rest' | 'today' | 'planned'
}

export interface WeekData {
  completed: number
  goal: number
  days: DayEntry[]
}

export const SPLITS: Record<string, Split> = {
  push: {
    key: 'push',
    name: 'Push',
    subtitle: 'Chest · Shoulders · Triceps',
    accent: 'lime',
    duration: '~55 min',
    exercises: [
      { id: 'p1', name: 'Bench Press',            target: 'Chest',       sets: 3, lastWeight: 80, reps: 8 },
      { id: 'p2', name: 'Incline Dumbbell Press', target: 'Upper chest', sets: 3, lastWeight: 30, reps: 10 },
      { id: 'p3', name: 'Overhead Press',         target: 'Shoulders',   sets: 3, lastWeight: 45, reps: 8 },
      { id: 'p4', name: 'Lateral Raise',          target: 'Side delts',  sets: 3, lastWeight: 12, reps: 12 },
      { id: 'p5', name: 'Tricep Pushdown',        target: 'Triceps',     sets: 3, lastWeight: 25, reps: 12 },
      { id: 'p6', name: 'Overhead Tricep Ext.',   target: 'Triceps',     sets: 3, lastWeight: 20, reps: 12 },
    ],
  },
  pull: {
    key: 'pull',
    name: 'Pull',
    subtitle: 'Back · Biceps',
    accent: 'lime',
    duration: '~50 min',
    exercises: [
      { id: 'pl1', name: 'Pull-Up',       target: 'Back',       sets: 3, lastWeight: 0,  reps: 8 },
      { id: 'pl2', name: 'Barbell Row',   target: 'Mid back',   sets: 3, lastWeight: 70, reps: 8 },
      { id: 'pl3', name: 'Lat Pulldown',  target: 'Lats',       sets: 3, lastWeight: 55, reps: 10 },
      { id: 'pl4', name: 'Face Pull',     target: 'Rear delts', sets: 3, lastWeight: 18, reps: 15 },
      { id: 'pl5', name: 'Barbell Curl',  target: 'Biceps',     sets: 3, lastWeight: 30, reps: 10 },
      { id: 'pl6', name: 'Hammer Curl',   target: 'Biceps',     sets: 3, lastWeight: 14, reps: 12 },
    ],
  },
  legs: {
    key: 'legs',
    name: 'Legs',
    subtitle: 'Quads · Hamstrings · Calves',
    accent: 'lime',
    duration: '~60 min',
    exercises: [
      { id: 'l1', name: 'Back Squat',          target: 'Quads',      sets: 3, lastWeight: 100, reps: 6 },
      { id: 'l2', name: 'Romanian Deadlift',   target: 'Hamstrings', sets: 3, lastWeight: 85,  reps: 8 },
      { id: 'l3', name: 'Leg Press',           target: 'Quads',      sets: 3, lastWeight: 140, reps: 10 },
      { id: 'l4', name: 'Walking Lunge',       target: 'Glutes',     sets: 3, lastWeight: 16,  reps: 12 },
      { id: 'l5', name: 'Leg Curl',            target: 'Hamstrings', sets: 3, lastWeight: 35,  reps: 12 },
      { id: 'l6', name: 'Standing Calf Raise', target: 'Calves',     sets: 3, lastWeight: 60,  reps: 15 },
    ],
  },
}

export const ROTATION = ['push', 'pull', 'legs']

export const HISTORY: Session[] = [
  {
    id: 'h-2026-04-27',
    splitKey: 'pull',
    label: 'Pull',
    date: 'Mon · Apr 27',
    dateShort: 'Apr 27',
    duration: '52 min',
    volume: 8420,
    pr: true,
    prDetail: 'Barbell Row 75kg × 8',
    sets: [
      { name: 'Pull-Up',      sets: [{ w: 0,  r: 8 }, { w: 0,  r: 8 }, { w: 0,  r: 7 }] },
      { name: 'Barbell Row',  sets: [{ w: 70, r: 8 }, { w: 75, r: 8, pr: true }, { w: 70, r: 7 }] },
      { name: 'Lat Pulldown', sets: [{ w: 55, r: 10 }, { w: 55, r: 10 }, { w: 55, r: 9 }] },
      { name: 'Face Pull',    sets: [{ w: 18, r: 15 }, { w: 18, r: 15 }, { w: 18, r: 13 }] },
      { name: 'Barbell Curl', sets: [{ w: 30, r: 10 }, { w: 30, r: 9 }, { w: 30, r: 8 }] },
      { name: 'Hammer Curl',  sets: [{ w: 14, r: 12 }, { w: 14, r: 12 }, { w: 14, r: 10 }] },
    ],
  },
  {
    id: 'h-2026-04-25',
    splitKey: 'push',
    label: 'Push',
    date: 'Sat · Apr 25',
    dateShort: 'Apr 25',
    duration: '58 min',
    volume: 9120,
    pr: false,
    sets: [
      { name: 'Bench Press',        sets: [{ w: 80, r: 8 }, { w: 80, r: 7 }, { w: 80, r: 6 }] },
      { name: 'Incline DB Press',   sets: [{ w: 30, r: 10 }, { w: 30, r: 10 }, { w: 30, r: 8 }] },
      { name: 'Overhead Press',     sets: [{ w: 45, r: 8 }, { w: 45, r: 7 }, { w: 45, r: 6 }] },
      { name: 'Lateral Raise',      sets: [{ w: 12, r: 12 }, { w: 12, r: 12 }, { w: 12, r: 10 }] },
      { name: 'Tricep Pushdown',    sets: [{ w: 25, r: 12 }, { w: 25, r: 12 }, { w: 25, r: 10 }] },
      { name: 'Overhead Tri. Ext.', sets: [{ w: 20, r: 12 }, { w: 20, r: 11 }, { w: 20, r: 10 }] },
    ],
  },
  {
    id: 'h-2026-04-22',
    splitKey: 'legs',
    label: 'Legs',
    date: 'Wed · Apr 22',
    dateShort: 'Apr 22',
    duration: '64 min',
    volume: 11240,
    pr: true,
    prDetail: 'Back Squat 100kg × 6',
    sets: [
      { name: 'Back Squat',          sets: [{ w: 95, r: 6 }, { w: 100, r: 6, pr: true }, { w: 100, r: 5 }] },
      { name: 'Romanian Deadlift',   sets: [{ w: 85, r: 8 }, { w: 85, r: 8 }, { w: 85, r: 7 }] },
      { name: 'Leg Press',           sets: [{ w: 140, r: 10 }, { w: 140, r: 10 }, { w: 140, r: 9 }] },
      { name: 'Walking Lunge',       sets: [{ w: 16, r: 12 }, { w: 16, r: 12 }, { w: 16, r: 10 }] },
      { name: 'Leg Curl',            sets: [{ w: 35, r: 12 }, { w: 35, r: 12 }, { w: 35, r: 11 }] },
      { name: 'Standing Calf Raise', sets: [{ w: 60, r: 15 }, { w: 60, r: 15 }, { w: 60, r: 13 }] },
    ],
  },
  {
    id: 'h-2026-04-20',
    splitKey: 'pull',
    label: 'Pull',
    date: 'Mon · Apr 20',
    dateShort: 'Apr 20',
    duration: '51 min',
    volume: 8150,
    pr: false,
    sets: [
      { name: 'Pull-Up',      sets: [{ w: 0,  r: 7 }, { w: 0,  r: 7 }, { w: 0,  r: 6 }] },
      { name: 'Barbell Row',  sets: [{ w: 70, r: 8 }, { w: 70, r: 8 }, { w: 70, r: 7 }] },
      { name: 'Lat Pulldown', sets: [{ w: 50, r: 10 }, { w: 55, r: 10 }, { w: 55, r: 9 }] },
      { name: 'Face Pull',    sets: [{ w: 18, r: 15 }, { w: 18, r: 14 }, { w: 18, r: 12 }] },
      { name: 'Barbell Curl', sets: [{ w: 28, r: 10 }, { w: 30, r: 9 }, { w: 30, r: 8 }] },
      { name: 'Hammer Curl',  sets: [{ w: 14, r: 12 }, { w: 14, r: 11 }, { w: 14, r: 10 }] },
    ],
  },
  {
    id: 'h-2026-04-18',
    splitKey: 'push',
    label: 'Push',
    date: 'Sat · Apr 18',
    dateShort: 'Apr 18',
    duration: '57 min',
    volume: 8950,
    pr: false,
    sets: [
      { name: 'Bench Press',        sets: [{ w: 77.5, r: 8 }, { w: 77.5, r: 7 }, { w: 77.5, r: 6 }] },
      { name: 'Incline DB Press',   sets: [{ w: 28, r: 10 }, { w: 30, r: 9 }, { w: 30, r: 8 }] },
      { name: 'Overhead Press',     sets: [{ w: 42.5, r: 8 }, { w: 42.5, r: 7 }, { w: 42.5, r: 6 }] },
      { name: 'Lateral Raise',      sets: [{ w: 10, r: 12 }, { w: 12, r: 12 }, { w: 12, r: 10 }] },
      { name: 'Tricep Pushdown',    sets: [{ w: 25, r: 12 }, { w: 25, r: 11 }, { w: 25, r: 10 }] },
      { name: 'Overhead Tri. Ext.', sets: [{ w: 18, r: 12 }, { w: 20, r: 11 }, { w: 20, r: 9 }] },
    ],
  },
  {
    id: 'h-2026-04-15',
    splitKey: 'legs',
    label: 'Legs',
    date: 'Wed · Apr 15',
    dateShort: 'Apr 15',
    duration: '62 min',
    volume: 10880,
    pr: false,
    sets: [
      { name: 'Back Squat',          sets: [{ w: 95, r: 6 }, { w: 95, r: 6 }, { w: 95, r: 5 }] },
      { name: 'Romanian Deadlift',   sets: [{ w: 82.5, r: 8 }, { w: 82.5, r: 8 }, { w: 82.5, r: 7 }] },
      { name: 'Leg Press',           sets: [{ w: 135, r: 10 }, { w: 135, r: 10 }, { w: 135, r: 9 }] },
      { name: 'Walking Lunge',       sets: [{ w: 14, r: 12 }, { w: 16, r: 12 }, { w: 16, r: 10 }] },
      { name: 'Leg Curl',            sets: [{ w: 32.5, r: 12 }, { w: 35, r: 12 }, { w: 35, r: 10 }] },
      { name: 'Standing Calf Raise', sets: [{ w: 60, r: 15 }, { w: 60, r: 14 }, { w: 60, r: 13 }] },
    ],
  },
]

export const THIS_WEEK: WeekData = {
  completed: 1,
  goal: 4,
  days: [
    { day: 'M', label: 'Pull',  state: 'done' },
    { day: 'T', label: '',      state: 'rest' },
    { day: 'W', label: 'Push',  state: 'today' },
    { day: 'T', label: 'Pull',  state: 'planned' },
    { day: 'F', label: '',      state: 'rest' },
    { day: 'S', label: 'Legs',  state: 'planned' },
    { day: 'S', label: '',      state: 'rest' },
  ],
}

export const STREAK = 12

export const MOTIVATIONS = [
  "Let's go. The reps don't lift themselves.",
  'Show up. Outwork yesterday. Repeat.',
  'Pain is temporary. Skipping is forever.',
  "You don't get the body you want by accident.",
  'One more rep. Always one more rep.',
  'Discipline is heavier than the bar.',
  'Be the energy you bring to the gym.',
  "Beast mode isn't a switch. It's a habit.",
  "Today's grind is tomorrow's flex.",
  'Don\'t wish for it. Work for it.',
  'Strong is a choice you make every day.',
  'The bar is calling. Answer it.',
]

export function getNextSplit(): Split {
  const last = HISTORY[0]?.splitKey || 'push'
  const idx = ROTATION.indexOf(last)
  return SPLITS[ROTATION[(idx + 1) % 3]]
}

export function getMotivation(): string {
  const today = new Date('2026-04-29')
  const seed = today.getDate() + today.getMonth() * 31
  return MOTIVATIONS[seed % MOTIVATIONS.length]
}
