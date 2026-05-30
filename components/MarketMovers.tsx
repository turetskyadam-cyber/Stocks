'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FALLBACK_GAINERS, type Gainer } from '@/lib/gainers'

const REFRESH_MS = 30_000
const COLLAPSED_CARDS = 4
const EXPANDED_CARDS = 10

/* Smoothly animate a number toward `target` whenever it changes — gives the
   panel its "live, ticking" feel on every refresh. */
function useCountUp(target: number, duration = 900): number {
  const [val, setVal] = useState(target)
  const prev = useRef(target)
  useEffect(() => {
    const from = prev.current
    const to = target
    if (from === to) return
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(from + (to - from) * eased)
      if (t < 1) raf = requestAnimationFrame(tick)
      else prev.current = to
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

function rangePct(g: Gainer): number {
  const span = g.dayHigh - g.dayLow
  if (span <= 0) return 100
  return Math.max(0, Math.min(100, ((g.last - g.dayLow) / span) * 100))
}

function timeLabel(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function MarketMovers() {
  const [items, setItems] = useState<Gainer[]>(FALLBACK_GAINERS)
  const [updated, setUpdated] = useState<Date | null>(null)
  const [live, setLive] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const res = await fetch('/api/gainers/', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (active && Array.isArray(data.items) && data.items.length) {
          setItems(data.items as Gainer[])
          setUpdated(new Date(data.updatedAt ?? Date.now()))
          setLive(true)
        }
      } catch {
        // keep last-known data
      }
    }
    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  const maxPct = Math.max(...items.map((g) => g.pct), 0.0001)
  const marquee = [...items, ...items]
  const visibleCount = expanded ? EXPANDED_CARDS : COLLAPSED_CARDS
  const cards = items.slice(0, visibleCount)
  const canExpand = items.length > COLLAPSED_CARDS

  return (
    <section className="w-full border-b border-border bg-gradient-to-b from-accent/[0.04] to-transparent">
      {/* ── Header row ── */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="live-pulse" aria-hidden />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
            {live ? 'Live' : 'Loading'}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white">Top Gainers Today</h2>
        </div>
        <motion.p
          key={updated?.getTime() ?? 'init'}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[10px] text-muted leading-tight text-right"
        >
          {updated ? `updated ${timeLabel(updated)}` : 'connecting…'}
        </motion.p>
      </div>

      {/* ── Scrolling marquee strip (movement) ── */}
      <div className="w-full overflow-hidden border-y border-border/60 bg-card/30 py-1.5">
        <div className="ticker-track flex gap-6 w-max">
          {marquee.map((t, i) => (
            <span key={i} className="flex items-center gap-2 shrink-0">
              <span className="font-mono text-[11px] font-semibold text-white">{t.symbol}</span>
              <span className="font-mono text-[11px] text-muted">{t.price}</span>
              <span className="font-mono text-[11px] text-accent">▲ {t.change}</span>
              <span className="text-border ml-1">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Animated gainer cards ── */}
      <div className="max-w-5xl mx-auto px-4 pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {cards.map((g, i) => (
          <MoverCard
            key={g.symbol}
            g={g}
            rank={i + 1}
            maxPct={maxPct}
            delay={(i % COLLAPSED_CARDS) * 0.05}
          />
        ))}
      </div>

      {/* ── Green drop-down toggle ── */}
      {canExpand && (
        <div className="flex justify-center pt-2 pb-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-accent transition-colors hover:bg-accent/20 active:scale-[0.97]"
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider">
              {expanded ? 'Show less' : `Show top ${Math.min(EXPANDED_CARDS, items.length)}`}
            </span>
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ type: 'spring', duration: 0.4, bounce: 0.3 }}
              className="drop-shadow-[0_0_4px_rgba(0,255,136,0.6)]"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </div>
      )}
    </section>
  )
}

function MoverCard({
  g,
  rank,
  maxPct,
  delay,
}: {
  g: Gainer
  rank: number
  maxPct: number
  delay: number
}) {
  const pct = useCountUp(g.pct)
  const price = useCountUp(g.last)
  const barW = Math.max(4, (g.pct / maxPct) * 100)
  const pos = rangePct(g)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.15, delay }}
      className="relative overflow-hidden rounded-xl border border-border bg-card p-3 flex flex-col gap-2"
    >
      {/* glow that scales with the size of the move */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(120% 90% at 0% 0%, rgba(0,255,136,${Math.min(
            0.16,
            g.pct / 400
          )}) 0%, transparent 60%)`,
        }}
      />

      <div className="relative flex items-start justify-between gap-1">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-muted">#{rank}</span>
            <span className="font-mono text-sm font-bold text-white">{g.symbol}</span>
          </div>
          <p className="text-[10px] text-muted truncate max-w-[110px]">{g.name}</p>
        </div>
        <span className="font-mono text-sm font-bold text-accent whitespace-nowrap">
          +{pct.toFixed(2)}%
        </span>
      </div>

      <div className="relative flex items-baseline justify-between gap-1">
        <span className="font-mono text-sm text-white tabular-nums">
          {price.toFixed(2)}
        </span>
        {g.changeAbs && (
          <span className="font-mono text-[10px] text-accent">{g.changeAbs}</span>
        )}
      </div>

      {/* gain bar, proportional to the biggest mover */}
      <div className="relative h-1.5 rounded-full bg-border/50 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-dim to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${barW}%` }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: delay + 0.1 }}
        />
      </div>

      {/* live intraday position: where price sits between day low and high */}
      <div className="relative">
        <div className="flex justify-between font-mono text-[8px] text-muted mb-0.5">
          <span>L {g.dayLow.toFixed(2)}</span>
          <span>{g.volume} vol</span>
          <span>H {g.dayHigh.toFixed(2)}</span>
        </div>
        <div className="relative h-[3px] rounded-full bg-border/60">
          <motion.span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_6px_1px_rgba(0,255,136,0.7)]"
            initial={{ left: '50%' }}
            animate={{ left: `${pos}%` }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
