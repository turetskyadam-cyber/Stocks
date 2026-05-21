import { notFound } from 'next/navigation'
import { getLessonById, TOTAL_LESSONS } from '@/data/lessons'
import ProgressBar from '@/components/ProgressBar'
import TickerTape from '@/components/TickerTape'
import VocabCard from '@/components/VocabCard'
import NextButton from '@/components/NextButton'

interface PageProps {
  params: { lesson: string }
}

export function generateStaticParams() {
  return Array.from({ length: TOTAL_LESSONS }, (_, i) => ({
    lesson: String(i + 1),
  }))
}

export default function LessonPage({ params }: PageProps) {
  const id = parseInt(params.lesson, 10)
  if (isNaN(id) || id < 1 || id > TOTAL_LESSONS) notFound()

  const lesson = getLessonById(id)
  if (!lesson) notFound()

  const facts = [
    { icon: '📈', text: 'Over 6,000 US companies trade publicly on stock exchanges.' },
    { icon: '⏱️', text: 'Stock prices update every second during market hours.' },
    { icon: '💰', text: 'You profit when price rises. You lose when it falls.' },
  ]

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <ProgressBar current={lesson.id} />
      <TickerTape />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-10 flex flex-col gap-10">

        {/* Hero */}
        <section className="flex flex-col gap-3">
          <p className="font-mono text-xs text-accent uppercase tracking-widest">
            Section 1 · Stock Fundamentals
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
            {lesson.title}
          </h1>
          <p className="text-muted text-lg leading-relaxed">{lesson.subtitle}</p>
        </section>

        {/* Core Concept */}
        <section className="flex flex-col gap-5">
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row gap-6 items-center">
            {/* Pizza SVG analogy */}
            <div className="shrink-0">
              <PizzaSlice />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-white">Think of a company like a pizza.</h2>
              <p className="text-muted leading-relaxed text-sm">
                A <span className="text-white font-medium">stock</span> is one slice. When a company
                like Apple divides itself into millions of slices and sells them, each slice is called
                a <span className="text-white font-medium">share</span>. Buy a share — own a piece.
              </p>
              <p className="text-muted leading-relaxed text-sm mt-1">
                If the company grows and becomes more valuable, your slice is worth more. That is how
                investors make money.
              </p>
            </div>
          </div>
        </section>

        {/* Key Facts */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-widest">3 things to know</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {facts.map((f, i) => (
              <div
                key={i}
                className={`fact-stagger-${i + 1} rounded-xl border border-border bg-card p-4 flex flex-col gap-2`}
              >
                <span className="text-2xl">{f.icon}</span>
                <p className="text-sm text-white leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vocab Cards */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-widest">
            Key vocabulary — tap each card
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lesson.vocab.map((v, i) => (
              <VocabCard key={v.term} term={v.term} definition={v.definition} index={i} />
            ))}
          </div>
        </section>

        {/* Did You Know */}
        <section className="dyk-enter">
          <div className="rounded-2xl border border-border bg-card px-6 py-5 flex gap-4 items-start">
            <span className="text-2xl shrink-0">💡</span>
            <div>
              <p className="font-mono text-xs text-accent uppercase tracking-widest mb-1">Did you know?</p>
              <p className="text-sm text-white leading-relaxed">{lesson.didYouKnow}</p>
            </div>
          </div>
        </section>

        {/* Next Button */}
        {lesson.id < TOTAL_LESSONS && (
          <NextButton lessonId={lesson.id} nextTitle={lesson.nextTitle} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 px-4">
        <p className="max-w-2xl mx-auto font-mono text-xs text-muted text-center">
          Lesson {lesson.id} of {TOTAL_LESSONS} · Momentum Trading Course
        </p>
      </footer>
    </div>
  )
}

/* ─── Pizza slice SVG ─── */
function PizzaSlice() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Full pie outline */}
      <circle cx="48" cy="48" r="40" fill="#1a1a24" stroke="#2d2d3d" strokeWidth="1.5" />

      {/* Slice segments (6 equal pieces) */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60 * Math.PI) / 180
        const nextAngle = ((i + 1) * 60 * Math.PI) / 180
        const r = 38
        const cx = 48
        const cy = 48
        const x1 = cx + r * Math.cos(angle - Math.PI / 2)
        const y1 = cy + r * Math.sin(angle - Math.PI / 2)
        const x2 = cx + r * Math.cos(nextAngle - Math.PI / 2)
        const y2 = cy + r * Math.sin(nextAngle - Math.PI / 2)
        const isHighlighted = i === 0
        return (
          <path
            key={i}
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
            fill={isHighlighted ? '#00ff8820' : 'transparent'}
            stroke={isHighlighted ? '#00ff88' : '#2d2d3d'}
            strokeWidth={isHighlighted ? '1.5' : '1'}
          />
        )
      })}

      {/* YOU label on the highlighted slice */}
      <text
        x="56"
        y="30"
        fill="#00ff88"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        textAnchor="middle"
      >
        YOU
      </text>
    </svg>
  )
}
