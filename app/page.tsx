import Link from 'next/link'
import { getLessonById } from '@/data/lessons'

/* Build a flat array of lesson IDs in serpentine order so CSS grid
   naturally renders the Shoots & Ladders layout:
   Row 0: 1→10  Row 1: 20←11  Row 2: 21→30 … */
function buildBoard(): number[] {
  const flat: number[] = []
  for (let row = 0; row < 10; row++) {
    const base = row * 10
    const nums = Array.from({ length: 10 }, (_, i) => base + i + 1)
    if (row % 2 === 1) nums.reverse()
    flat.push(...nums)
  }
  return flat
}

const SECTIONS = [
  { label: 'Stock Fundamentals', range: [1, 15],   color: '#10b981' },
  { label: 'Market Mechanics',   range: [16, 30],  color: '#3b82f6' },
  { label: 'Chart Reading',      range: [31, 50],  color: '#8b5cf6' },
  { label: 'Momentum Basics',    range: [51, 70],  color: '#f97316' },
  { label: 'Pre-Market Prep',    range: [71, 85],  color: '#eab308' },
  { label: '9:30 AM Open',       range: [86, 100], color: '#ef4444' },
]

function sectionColor(id: number): string {
  return SECTIONS.find((s) => id >= s.range[0] && id <= s.range[1])!.color
}

export default function Home() {
  const board = buildBoard()

  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* ── Header ── */}
      <header className="text-center px-4 pt-12 pb-8 border-b border-border">
        <p className="font-mono text-xs text-accent uppercase tracking-[0.2em] mb-4">
          Course Map
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
          Momentum Trading<br className="hidden sm:block" /> Course
        </h1>
        <p className="text-muted mt-3 text-base max-w-xs mx-auto leading-relaxed">
          100 lessons. One goal: trade the open like a pro.
        </p>
      </header>

      {/* ── Section legend ── */}
      <nav
        aria-label="Course sections"
        className="flex flex-wrap gap-2 justify-center px-4 py-4 border-b border-border"
      >
        {SECTIONS.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-1.5 bg-card border border-border rounded-full px-3 py-1"
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-xs text-white">{s.label}</span>
            <span className="text-xs text-muted">{s.range[0]}–{s.range[1]}</span>
          </div>
        ))}
      </nav>

      {/* ── Game board ── */}
      <main className="flex-1 px-3 sm:px-6 py-8 max-w-3xl w-full mx-auto">
        <div className="board-enter grid grid-cols-10 gap-1 sm:gap-1.5">
          {board.map((id) => {
            const color     = sectionColor(id)
            const available = !!getLessonById(id)
            const isStart   = id === 1

            const cell = (
              <div
                className="aspect-square flex flex-col items-center justify-center rounded-md sm:rounded-lg border"
                style={{
                  borderTopWidth:  '2px',
                  borderTopColor:  color,
                  borderColor:     available ? `${color}44` : '#2d2d3d',
                  backgroundColor: available ? `${color}12` : '#1a1a2430',
                }}
              >
                <span
                  className="font-mono text-[9px] sm:text-xs font-bold leading-none"
                  style={{ color: available ? '#ffffff' : '#374151' }}
                >
                  {String(id).padStart(2, '0')}
                </span>
                {isStart && (
                  <span className="font-mono text-[6px] sm:text-[8px] text-accent mt-0.5 tracking-wider">
                    START
                  </span>
                )}
              </div>
            )

            if (!available) {
              return <div key={id}>{cell}</div>
            }

            return (
              <Link
                key={id}
                href={`/course/${id}`}
                className={`relative block transition-transform duration-[150ms] ease-out focus-visible:outline-none focus-visible:scale-110 [@media(hover:hover)]:hover:scale-110 [@media(hover:hover)]:hover:z-10 ${isStart ? 'lesson-start' : ''}`}
                aria-label={`Go to lesson ${id}`}
              >
                {cell}
              </Link>
            )
          })}
        </div>

        <p className="text-center font-mono text-[11px] text-muted mt-5">
          1 / 100 lessons available · more coming soon
        </p>
      </main>

      {/* ── Start CTA ── */}
      <div className="px-4 pb-14 pt-2 text-center">
        <Link
          href="/course/1"
          className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-8 py-3.5 rounded-xl transition-transform duration-150 ease-out [@media(hover:hover)]:hover:scale-105 active:scale-[0.97]"
        >
          Begin Lesson 1
          <span className="text-base leading-none">→</span>
        </Link>
      </div>
    </div>
  )
}
