'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { SlotAWidget } from '@/data/lessons'

export default function SlotARenderer({ widget }: { widget: SlotAWidget }) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, duration: 0.4, bounce: 0 } },
  }

  return (
    <motion.section variants={sectionVariants} initial="hidden" animate="show">
      <h2 className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">Dive Deeper</h2>
      {(() => {
        switch (widget.type) {
          case 'facts':
            return null
          case 'stat-block':
            return <StatBlock stats={widget.stats} />
          case 'comparison':
            return <ComparisonTable leftLabel={widget.leftLabel} rightLabel={widget.rightLabel} rows={widget.rows} />
          case 'timeline':
            return <Timeline heading={widget.heading} events={widget.events} />
          case 'alert-trio':
            return <AlertTrio items={widget.items} />
          case 'quote-hero':
            return <QuoteHero quote={widget.quote} attribution={widget.attribution} />
          case 'leaderboard':
            return <Leaderboard heading={widget.heading} items={widget.items} />
          case 'checklist':
            return <Checklist heading={widget.heading} items={widget.items} />
          case 'before-after':
            return <BeforeAfter leftLabel={widget.leftLabel} rightLabel={widget.rightLabel} leftItems={widget.leftItems} rightItems={widget.rightItems} />
          case 'myth-busters':
            return <MythBusters myths={widget.myths} />
          default:
            return null
        }
      })()}
    </motion.section>
  )
}

/* ── StatBlock ── */
function StatBlock({ stats }: { stats: { value: string; label: string; sub?: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          className="rounded-xl border border-[#2d2d3d] bg-[#1a1a24] p-4 flex flex-col"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: i * 0.07 }}
        >
          <span className="text-2xl font-bold text-[#00ff88] font-mono">{s.value}</span>
          <span className="text-sm text-white font-semibold mt-1">{s.label}</span>
          {s.sub && <span className="text-xs text-[#6b7280] mt-0.5">{s.sub}</span>}
        </motion.div>
      ))}
    </div>
  )
}

/* ── ComparisonTable ── */
function ComparisonTable({
  leftLabel,
  rightLabel,
  rows,
}: {
  leftLabel: string
  rightLabel: string
  rows: { left: string; right: string }[]
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-[#2d2d3d]">
      {/* Header */}
      <div className="grid grid-cols-2">
        <div className="bg-[#1a1a24] p-3 font-mono text-xs uppercase tracking-wider text-[#00ff88] border-r border-[#2d2d3d]">
          {leftLabel}
        </div>
        <div className="bg-[#1a1a24] p-3 font-mono text-xs uppercase tracking-wider text-[#ef4444]">
          {rightLabel}
        </div>
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-2 ${i % 2 === 0 ? 'bg-[#1a1a24]' : 'bg-transparent'}`}
        >
          <div className="p-3 text-sm text-white border-r border-[#2d2d3d]">{row.left}</div>
          <div className="p-3 text-sm text-white">{row.right}</div>
        </div>
      ))}
    </div>
  )
}

/* ── Timeline ── */
function Timeline({ heading, events }: { heading: string; events: { label: string; body: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-4">{heading}</p>
      <div className="flex flex-col gap-0">
        {events.map((ev, i) => (
          <motion.div
            key={i}
            className="flex gap-4 mb-5"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: i * 0.08 }}
          >
            <div className="flex flex-col items-center shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#00ff88] mt-1" />
              {i < events.length - 1 && <div className="w-px flex-1 bg-[#2d2d3d] mt-1" />}
            </div>
            <div className="pb-4">
              <p className="text-sm font-semibold text-[#00ff88] font-mono">{ev.label}</p>
              <p className="text-sm text-[#6b7280] leading-relaxed mt-0.5">{ev.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ── AlertTrio ── */
function AlertTrio({
  items,
}: {
  items: { accent: string; icon: string; heading: string; body: string }[]
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-xl border p-4 flex gap-3"
          style={{
            borderColor: item.accent + '50',
            borderLeftWidth: '4px',
            borderLeftColor: item.accent,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: i * 0.08 }}
        >
          <span className="text-2xl shrink-0">{item.icon}</span>
          <div>
            <p className="text-sm font-bold text-white">{item.heading}</p>
            <p className="text-xs text-[#6b7280] leading-relaxed mt-1">{item.body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ── QuoteHero ── */
function QuoteHero({ quote, attribution }: { quote: string; attribution: string }) {
  return (
    <div className="gradient-border-card rounded-2xl p-px">
      <div className="rounded-2xl bg-[#1a1a24] p-8 relative">
        <span
          className="absolute top-2 left-6 text-6xl text-[#00ff88] opacity-20 font-serif leading-none select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="text-xl sm:text-2xl font-semibold text-white italic leading-relaxed relative z-10">
          {quote}
        </p>
        <p className="font-mono text-xs text-[#6b7280] mt-3 text-right">{attribution}</p>
      </div>
    </div>
  )
}

/* ── Leaderboard ── */
function Leaderboard({
  heading,
  items,
}: {
  heading: string
  items: { rank: number; label: string; sub: string; pct: number; color: string }[]
}) {
  const rankBadge = (rank: number) => {
    if (rank === 1) return 'bg-[#fbbf24] text-black'
    if (rank === 2) return 'bg-[#9ca3af] text-black'
    if (rank === 3) return 'bg-[#cd7c2f] text-black'
    return 'bg-[#2d2d3d] text-[#6b7280]'
  }

  return (
    <div>
      <p className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-4">{heading}</p>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a24] border border-[#2d2d3d] mb-2"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', duration: 0.35, bounce: 0, delay: i * 0.07 }}
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${rankBadge(item.rank)}`}
          >
            {item.rank}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{item.label}</p>
            <p className="text-xs text-[#6b7280]">{item.sub}</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-[#2d2d3d] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.pct}%` }}
                transition={{ type: 'spring', duration: 0.6, bounce: 0, delay: 0.1 + i * 0.07 }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Checklist ── */
function Checklist({ heading, items }: { heading: string; items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false))

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  const completedCount = checked.filter(Boolean).length

  return (
    <div>
      <p className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-4">{heading}</p>
      {items.map((item, i) => (
        <motion.button
          key={i}
          className={`w-full flex items-center gap-3 p-3 rounded-lg border cursor-pointer select-none text-left mb-2 transition-colors ${
            checked[i]
              ? 'border-[#00ff88]/30 bg-[#00ff88]/5'
              : 'border-[#2d2d3d] bg-[#1a1a24]'
          }`}
          onClick={() => toggle(i)}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
              checked[i] ? 'border-[#00ff88] bg-[#00ff88]' : 'border-[#2d2d3d]'
            }`}
          >
            {checked[i] && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#0f0f14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span
            className={`text-sm leading-relaxed ${
              checked[i] ? 'line-through text-[#6b7280]' : 'text-white'
            }`}
          >
            {item}
          </span>
        </motion.button>
      ))}
      <p className="text-xs text-[#6b7280] font-mono mt-2">
        {completedCount} / {items.length} completed
      </p>
    </div>
  )
}

/* ── BeforeAfter ── */
function BeforeAfter({
  leftLabel,
  rightLabel,
  leftItems,
  rightItems,
}: {
  leftLabel: string
  rightLabel: string
  leftItems: string[]
  rightItems: string[]
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-[#2d2d3d]">
      {/* Left column */}
      <div className="p-4 sm:border-r border-b sm:border-b-0 border-[#2d2d3d]">
        <p className="font-mono text-xs uppercase tracking-wider text-[#ef4444] mb-3">{leftLabel}</p>
        <ul className="flex flex-col gap-2">
          {leftItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {/* Right column */}
      <div className="p-4">
        <p className="font-mono text-xs uppercase tracking-wider text-[#00ff88] mb-3">{rightLabel}</p>
        <ul className="flex flex-col gap-2">
          {rightItems.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00ff88] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── MythBusters ── */
function MythBusters({ myths }: { myths: { myth: string; reality: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {myths.map((m, i) => (
        <motion.div
          key={i}
          className="rounded-xl overflow-hidden border border-[#2d2d3d]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: i * 0.09 }}
        >
          <div className="bg-[#ef4444]/10 border-b border-[#2d2d3d]/50 p-4">
            <p className="font-mono text-xs text-[#ef4444] uppercase mb-1">Myth</p>
            <p className="text-sm text-white leading-relaxed">{m.myth}</p>
          </div>
          <div className="bg-[#00ff88]/5 p-4">
            <p className="font-mono text-xs text-[#00ff88] uppercase mb-1">Reality</p>
            <p className="text-sm text-white leading-relaxed">{m.reality}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
