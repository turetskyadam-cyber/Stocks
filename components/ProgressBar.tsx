'use client'

import { motion } from 'framer-motion'
import { TOTAL_LESSONS } from '@/data/lessons'

interface ProgressBarProps {
  current: number
}

export default function ProgressBar({ current }: ProgressBarProps) {
  const percent = (current / TOTAL_LESSONS) * 100

  return (
    <div className="w-full sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center gap-4">
        <span className="font-mono text-xs text-muted whitespace-nowrap">
          LESSON {current} / {TOTAL_LESSONS}
        </span>
        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          />
        </div>
        <span className="font-mono text-xs text-accent whitespace-nowrap">
          {percent.toFixed(0)}%
        </span>
      </div>
    </div>
  )
}
