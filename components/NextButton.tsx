'use client'

import Link from 'next/link'
import { motion, useSpring } from 'framer-motion'
import { TOTAL_LESSONS } from '@/data/lessons'

interface NextButtonProps {
  lessonId: number
  nextTitle: string
}

export default function NextButton({ lessonId, nextTitle }: NextButtonProps) {
  const nextId = lessonId + 1
  const arrowX = useSpring(0, { stiffness: 300, damping: 15 })

  if (lessonId >= TOTAL_LESSONS) return null

  return (
    <Link href={`/course/${nextId}`} tabIndex={-1}>
      <motion.div
        className="relative flex items-center justify-between gap-4 w-full rounded-2xl border border-accent/30 bg-accent/5 px-6 py-5 cursor-pointer overflow-hidden"
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => arrowX.set(7)}
        onHoverEnd={() => arrowX.set(0)}
        transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Background sweep */}
        <motion.div
          className="absolute inset-0 bg-accent/5 origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        />

        <div className="relative flex flex-col gap-0.5">
          <span className="font-mono text-xs text-muted uppercase tracking-widest">Next Lesson</span>
          <span className="text-base font-semibold text-white">{nextTitle}</span>
        </div>

        <motion.span className="relative text-2xl text-accent shrink-0" style={{ x: arrowX }}>
          →
        </motion.span>
      </motion.div>
    </Link>
  )
}
