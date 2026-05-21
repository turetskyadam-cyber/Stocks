'use client'

import Link from 'next/link'
import { motion, useSpring } from 'framer-motion'

interface BackButtonProps {
  lessonId: number
}

export default function BackButton({ lessonId }: BackButtonProps) {
  const prevId = lessonId - 1
  const arrowX = useSpring(0, { stiffness: 300, damping: 15 })

  return (
    <Link href={`/course/${prevId}`} tabIndex={-1}>
      <motion.div
        className="relative flex items-center justify-between gap-4 w-full rounded-2xl border border-border bg-card/60 px-6 py-4 cursor-pointer overflow-hidden"
        whileTap={{ scale: 0.97 }}
        onHoverStart={() => arrowX.set(-7)}
        onHoverEnd={() => arrowX.set(0)}
        transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Background sweep (right-to-left) */}
        <motion.div
          className="absolute inset-0 bg-white/[0.03] origin-right"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        />

        <motion.span className="relative text-xl text-muted shrink-0" style={{ x: arrowX }}>
          ←
        </motion.span>

        <div className="relative flex flex-col gap-0.5 text-right">
          <span className="font-mono text-xs text-muted uppercase tracking-widest">Previous</span>
          <span className="text-sm font-medium text-muted">Lesson {prevId}</span>
        </div>
      </motion.div>
    </Link>
  )
}
