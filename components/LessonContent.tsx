'use client'

import { motion } from 'framer-motion'
import VocabCard from './VocabCard'
import NextButton from './NextButton'
import BackButton from './BackButton'
import SlotARenderer from './SlotARenderer'
import SlotBRenderer from './SlotBRenderer'
import QuizCheckpoint from './QuizCheckpoint'
import { Lesson, TOTAL_LESSONS } from '@/data/lessons'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
}

const item = {
  hidden: { y: 10, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring' as const, duration: 0.32, bounce: 0 } },
}

export default function LessonContent({ lesson }: { lesson: Lesson }) {
  return (
    <motion.main
      className="flex-1 w-full max-w-2xl mx-auto px-4 py-10 flex flex-col gap-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* ── Hero ── */}
      <motion.section variants={item} className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span
            className="section-dot"
            style={{ '--section-color': lesson.sectionColor } as React.CSSProperties}
          />
          <p className="font-mono text-xs text-muted uppercase tracking-widest">
            {lesson.section}
          </p>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
          {lesson.title}
        </h1>
        <p className="text-muted text-lg leading-relaxed">{lesson.subtitle}</p>
      </motion.section>

      {/* ── Core Concept ── */}
      <motion.section variants={item}>
        {/* Animated gradient border wrapper */}
        <div className="gradient-border-card rounded-2xl p-px">
          <div className="rounded-2xl bg-card p-6 flex flex-col sm:flex-row gap-6 items-center">
            {lesson.id === 1 && (
              <div className="shrink-0">
                <PizzaSlice />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-white">{lesson.coreHeading}</h2>
              <p className="text-muted leading-relaxed text-sm">{lesson.coreBody}</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Key Facts ── */}
      <motion.section variants={item} className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-widest">3 things to know</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {lesson.facts.map((f, i) => (
            <motion.div
              key={i}
              className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: 0.28 + i * 0.07 }}
            >
              <motion.span
                className="text-2xl"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.55, duration: 0.4, delay: 0.32 + i * 0.07 }}
              >
                {f.icon}
              </motion.span>
              <p className="text-sm text-white leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Slot A ── */}
      {lesson.slotA && lesson.slotA.type !== 'facts' && (
        <motion.div variants={item}>
          <SlotARenderer widget={lesson.slotA} />
        </motion.div>
      )}

      {/* ── Vocab Cards ── */}
      <motion.section variants={item} className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-muted uppercase tracking-widest">
          Key vocabulary — tap each card
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {lesson.vocab.map((v, i) => (
            <motion.div
              key={v.term}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: 0.42 + i * 0.08 }}
            >
              <VocabCard term={v.term} definition={v.definition} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Slot B ── */}
      {lesson.slotB && lesson.slotB.type !== 'vocab' && (
        <motion.div variants={item}>
          <SlotBRenderer widget={lesson.slotB} />
        </motion.div>
      )}

      {/* ── Did You Know ── */}
      <motion.section
        className="rounded-2xl border border-border bg-card px-6 py-5 flex gap-4 items-start"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.4, bounce: 0.1, delay: 0.52 }}
      >
        <span className="text-2xl shrink-0">💡</span>
        <div>
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-1">Did you know?</p>
          <p className="text-sm text-white leading-relaxed">{lesson.didYouKnow}</p>
        </div>
      </motion.section>

      {/* ── Navigation / Quiz ── */}
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.32, bounce: 0, delay: 0.62 }}
      >
        {lesson.id > 1 && <BackButton lessonId={lesson.id} />}
        {lesson.checkpointQuiz ? (
          <QuizCheckpoint
            questions={lesson.checkpointQuiz}
            lessonId={lesson.id}
            nextTitle={lesson.nextTitle}
            totalLessons={TOTAL_LESSONS}
          />
        ) : (
          lesson.id < TOTAL_LESSONS && (
            <NextButton lessonId={lesson.id} nextTitle={lesson.nextTitle} />
          )
        )}
      </motion.div>
    </motion.main>
  )
}

/* ─── Pizza slice SVG (only shown on lesson 1) ─── */
function PizzaSlice() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="48" r="40" fill="#1a1a24" stroke="#2d2d3d" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a1 = (i * 60 * Math.PI) / 180
        const a2 = ((i + 1) * 60 * Math.PI) / 180
        const r = 38; const cx = 48; const cy = 48
        const x1 = cx + r * Math.cos(a1 - Math.PI / 2)
        const y1 = cy + r * Math.sin(a1 - Math.PI / 2)
        const x2 = cx + r * Math.cos(a2 - Math.PI / 2)
        const y2 = cy + r * Math.sin(a2 - Math.PI / 2)
        return (
          <path
            key={i}
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
            fill={i === 0 ? '#00ff8820' : 'transparent'}
            stroke={i === 0 ? '#00ff88' : '#2d2d3d'}
            strokeWidth={i === 0 ? '1.5' : '1'}
          />
        )
      })}
      <text x="56" y="30" fill="#00ff88" fontSize="7" fontFamily="monospace" fontWeight="600" textAnchor="middle">
        YOU
      </text>
    </svg>
  )
}
