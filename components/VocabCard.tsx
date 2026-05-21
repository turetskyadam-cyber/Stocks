'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface VocabCardProps {
  term: string
  definition: string
  index: number
}

export default function VocabCard({ term, definition, index }: VocabCardProps) {
  const [flipped, setFlipped] = useState(false)

  const staggerClass = ['card-stagger-1', 'card-stagger-2', 'card-stagger-3'][index] ?? ''

  return (
    <div
      className={`${staggerClass}`}
      style={{ perspective: '900px' }}
    >
      <motion.button
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full h-36 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
        whileTap={{ scale: 0.97 }}
        aria-label={`Vocab card: ${term}. ${flipped ? 'Click to hide definition' : 'Click to reveal definition'}`}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl border border-border bg-card flex flex-col items-center justify-center gap-2 p-4"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="font-mono text-xs text-muted uppercase tracking-widest">Term</span>
          <span className="text-xl font-bold text-white">{term}</span>
          <span className="font-mono text-xs text-accent/60 mt-1">tap to reveal →</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl border border-accent/30 bg-accent/5 flex flex-col items-center justify-center gap-2 p-5 text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="font-mono text-xs text-accent uppercase tracking-widest">Definition</span>
          <p className="text-sm text-white leading-relaxed">{definition}</p>
        </div>
      </motion.button>
    </div>
  )
}
