'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface NextButtonProps {
  lessonId: number
  nextTitle: string
}

export default function NextButton({ lessonId, nextTitle }: NextButtonProps) {
  const nextId = lessonId + 1

  return (
    <div className="next-btn-enter">
      <Link href={`/course/${nextId}`} tabIndex={-1}>
        <motion.div
          className="group relative flex items-center justify-between gap-4 w-full rounded-2xl border border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent/60 px-6 py-5 cursor-pointer overflow-hidden"
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Subtle background sweep on hover */}
          <motion.div
            className="absolute inset-0 bg-accent/5 origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          />

          <div className="relative flex flex-col gap-0.5">
            <span className="font-mono text-xs text-muted uppercase tracking-widest">
              Next Lesson
            </span>
            <span className="text-base font-semibold text-white">{nextTitle}</span>
          </div>

          <motion.span
            className="relative text-2xl text-accent shrink-0"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            →
          </motion.span>
        </motion.div>
      </Link>
    </div>
  )
}
