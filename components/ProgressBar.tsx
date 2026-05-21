'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { TOTAL_LESSONS } from '@/data/lessons'

interface ProgressBarProps {
  current: number
}

export default function ProgressBar({ current }: ProgressBarProps) {
  const percent = (current / TOTAL_LESSONS) * 100

  return (
    <div className="w-full sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center gap-4">

        {/* Lesson counter with flip animation */}
        <span className="font-mono text-xs text-muted whitespace-nowrap flex items-center gap-1">
          LESSON{' '}
          <span className="relative inline-flex overflow-hidden h-[1em] items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current}
                className="text-white font-semibold"
                initial={{ y: -14, opacity: 0 }}
                animate={{ y: 0,   opacity: 1 }}
                exit={{    y:  14, opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              >
                {current}
              </motion.span>
            </AnimatePresence>
          </span>
          {' '}/ {TOTAL_LESSONS}
        </span>

        {/* Progress bar with spring overshoot */}
        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ type: 'spring', duration: 0.8, bounce: 0.2, delay: 0.1 }}
          />
        </div>

        <span className="font-mono text-xs text-accent whitespace-nowrap">
          {percent < 1 ? '<1' : percent.toFixed(0)}%
        </span>
      </div>
    </div>
  )
}
