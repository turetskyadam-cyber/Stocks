'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface VocabCardProps {
  term: string
  definition: string
}

export default function VocabCard({ term, definition }: VocabCardProps) {
  const [flipped, setFlipped] = useState(false)

  // Perspective tilt — tracks cursor, springs back on leave
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (flipped) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      style={{ perspective: '900px', rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full h-36 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
        whileTap={{ scale: 0.97 }}
        aria-label={`${term}: ${flipped ? 'showing definition, click to hide' : 'click to reveal definition'}`}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl border border-border bg-card flex flex-col items-center justify-center gap-2 p-4"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="font-mono text-xs text-muted uppercase tracking-widest">Term</span>
          <span className="text-xl font-bold text-white">{term}</span>
          <span className="font-mono text-xs text-accent/50 mt-0.5">tap to reveal →</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl border border-accent/30 bg-accent/5 flex flex-col items-center justify-center gap-2 p-5 text-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 shimmer-overlay pointer-events-none" />
          <span className="relative font-mono text-xs text-accent uppercase tracking-widest">Definition</span>
          <p className="relative text-sm text-white leading-relaxed">{definition}</p>
        </div>
      </motion.button>
    </motion.div>
  )
}
