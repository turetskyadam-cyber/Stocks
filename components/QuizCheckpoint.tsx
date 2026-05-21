'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QuizQuestion } from '@/data/lessons'
import NextButton from './NextButton'

interface Props {
  questions: QuizQuestion[]
  lessonId: number
  nextTitle: string
  totalLessons: number
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function QuizCheckpoint({ questions, lessonId, nextTitle, totalLessons }: Props) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [shakeIdx, setShakeIdx] = useState<number | null>(null)
  const [completedQs, setCompletedQs] = useState<boolean[]>(questions.map(() => false))
  const [allDone, setAllDone] = useState(false)
  const [alreadyCompleted, setAlreadyCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const key = `quiz-done-${lessonId}`
      if (localStorage.getItem(key) === 'true') setAlreadyCompleted(true)
    }
  }, [lessonId])

  const isCorrect = selected !== null && selected === questions[currentQ].correct

  const handleSelect = (i: number) => {
    if (selected !== null && selected === questions[currentQ].correct) return
    setSelected(i)
    setShowExplanation(true)
    if (i !== questions[currentQ].correct) {
      setShakeIdx(i)
      setTimeout(() => setShakeIdx(null), 600)
    }
  }

  const handleNext = () => {
    const updated = completedQs.map((v: boolean, idx: number) => (idx === currentQ ? true : v))
    setCompletedQs(updated)
    if (currentQ + 1 >= questions.length) {
      setAllDone(true)
      if (typeof window !== 'undefined') {
        localStorage.setItem(`quiz-done-${lessonId}`, 'true')
      }
    } else {
      setCurrentQ((q: number) => q + 1)
      setSelected(null)
      setShowExplanation(false)
    }
  }

  const tryAgain = () => {
    setSelected(null)
    setShowExplanation(false)
    setShakeIdx(null)
  }

  if (alreadyCompleted || allDone) {
    return (
      <div className="flex flex-col gap-4">
        {alreadyCompleted ? (
          <div className="rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/5 px-4 py-3 flex items-center gap-3">
            <span className="text-lg">✅</span>
            <p className="text-sm text-[#00ff88] font-mono">Lesson already completed</p>
          </div>
        ) : (
          <CompletionBanner lessonId={lessonId} />
        )}
        {lessonId < totalLessons && (
          <NextButton lessonId={lessonId} nextTitle={nextTitle} />
        )}
      </div>
    )
  }

  const q = questions[currentQ]

  return (
    <motion.div
      className="flex flex-col gap-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted uppercase tracking-widest">🧠 Knowledge Check</h2>
          <span className="font-mono text-xs text-muted">{currentQ + 1} / {questions.length}</span>
        </div>
        {/* Progress dots */}
        <div className="flex gap-2 mt-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                completedQs[i]
                  ? 'bg-[#00ff88]'
                  : i === currentQ
                  ? 'bg-[#00ff88]/40'
                  : 'bg-[#2d2d3d]'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted mt-1">Answer all questions correctly to unlock the next lesson</p>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          className="flex flex-col gap-3"
        >
          <div className="rounded-2xl border border-[#2d2d3d] bg-[#1a1a24] p-5">
            <p className="text-base font-semibold text-white leading-snug">{q.q}</p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              const correct = i === q.correct
              let cls = 'border-[#2d2d3d] bg-[#1a1a24] text-white hover:border-[#6b7280]'
              if (isSelected && correct) cls = 'border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88]'
              else if (isSelected && !correct) cls = 'border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444]'

              return (
                <motion.button
                  key={i}
                  className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors ${cls}`}
                  onClick={() => handleSelect(i)}
                  disabled={isSelected && correct}
                  animate={shakeIdx === i ? { x: [0, -9, 9, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                      isSelected && correct
                        ? 'border-[#00ff88] bg-[#00ff88] text-black'
                        : isSelected && !correct
                        ? 'border-[#ef4444]'
                        : 'border-current'
                    }`}
                  >
                    {isSelected && correct ? '✓' : OPTION_LABELS[i]}
                  </span>
                  <span className="text-sm leading-relaxed">{opt}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && selected !== null && (
              <motion.div
                className={`rounded-xl border p-4 text-sm leading-relaxed ${
                  isCorrect
                    ? 'bg-[#00ff88]/5 border-[#00ff88]/30 text-[#00ff88]'
                    : 'bg-[#ef4444]/5 border-[#ef4444]/30 text-[#ef4444]'
                }`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p>
                  <span className="font-semibold">{isCorrect ? '✓ Correct! ' : '✗ Not quite. '}</span>
                  {q.explanation}
                </p>
                {isCorrect ? (
                  <button
                    className="mt-3 text-xs font-mono font-semibold text-white bg-[#00ff88]/20 hover:bg-[#00ff88]/30 border border-[#00ff88]/40 rounded-lg px-3 py-1.5 transition-colors"
                    onClick={handleNext}
                  >
                    {currentQ + 1 < questions.length ? 'Next Question →' : 'Complete Lesson 🎓'}
                  </button>
                ) : (
                  <button
                    className="mt-3 text-xs font-mono text-[#6b7280] hover:text-white underline"
                    onClick={tryAgain}
                  >
                    Try again →
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Completion Banner ── */
function CompletionBanner({ lessonId }: { lessonId: number }) {
  return (
    <motion.div
      className="rounded-2xl border border-[#00ff88]/30 bg-[#00ff88]/5 p-6 text-center"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.25 }}
    >
      <motion.div
        className="text-4xl mb-3"
        initial={{ scale: 0.5, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.5, delay: 0.1 }}
      >
        🎓
      </motion.div>
      <p className="text-lg font-bold text-white">Lesson Complete!</p>
      <p className="text-sm text-[#6b7280] mt-1">
        You crushed the knowledge check on lesson {lessonId}.
      </p>
      <motion.p
        className="font-mono text-[#00ff88] font-bold text-sm mt-3"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        +150 XP earned
      </motion.p>
    </motion.div>
  )
}
