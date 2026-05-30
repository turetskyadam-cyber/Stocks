'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FALLBACK_GAINERS, type Gainer } from '@/lib/gainers'
import { spotSetup } from '@/lib/setups'
import { marketInfo, fmtCountdown, type Session } from '@/lib/market'

const REFRESH_MS = 30_000
const COLLAPSED_CARDS = 3 // hero + 2 cards underneath (even row)
const EXPANDED_CARDS = 10

/* ──────────────────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────────────────── */

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

function yahooUrl(sym: string): string {
  return `https://finance.yahoo.com/quote/${encodeURIComponent(sym)}`
}

/* ──────────────────────────────────────────────────────────────────────────
   Sparkline — intraday close series as an SVG line + soft area fill
   ────────────────────────────────────────────────────────────────────────── */

function Sparkline({ g, h = 30 }: { g: Gainer; h?: number }) {
  const data = g.spark
  if (!data || data.length < 2) return null
  const w = 100
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / range) * h])
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L ${w} ${h} L 0 ${h} Z`
  const up = g.last >= g.prevClose
  const color = up ? '#00ff88' : '#ff5c5c'
  const gid = `spark-${g.symbol}`
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: h }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Market clock / countdown to the 9:30 open
   ────────────────────────────────────────────────────────────────────────── */

const SESSION_UI: Record<Session, { dot: string; label: string }> = {
  pre: { dot: '#eab308', label: 'Pre-market' },
  open: { dot: '#00ff88', label: 'Market open' },
  after: { dot: '#6b7280', label: 'After hours' },
  weekend: { dot: '#6b7280', label: 'Closed' },
}

function MarketClock() {
  const [info, setInfo] = useState<ReturnType<typeof marketInfo> | null>(null)
  useEffect(() => {
    const update = () => setInfo(marketInfo(new Date()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  if (!info) {
    return <div className="h-[34px] w-[150px] rounded-full border border-border bg-card/60" />
  }

  const ui = SESSION_UI[info.session]
  const isOpen = info.session === 'open'
  const headline = isOpen
    ? `Closes in ${fmtCountdown(info.secondsToClose)}`
    : `Opens in ${fmtCountdown(info.secondsToOpen)}`

  return (
    <div
      className="flex items-center gap-2 rounded-full border px-3 py-1.5"
      style={{
        borderColor: `${ui.dot}55`,
        backgroundColor: `${ui.dot}14`,
      }}
    >
      <span
        className={isOpen ? 'live-pulse' : 'inline-block h-2 w-2 rounded-full'}
        style={isOpen ? undefined : { backgroundColor: ui.dot }}
        aria-hidden
      />
      <div className="leading-tight">
        <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: ui.dot }}>
          {ui.label}
        </p>
        <p className="font-mono text-[11px] font-semibold text-white tabular-nums">{headline}</p>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Main panel
   ────────────────────────────────────────────────────────────────────────── */

type View = 'cards' | 'heatmap'

export default function MarketMovers() {
  const [items, setItems] = useState<Gainer[]>(FALLBACK_GAINERS)
  const [updated, setUpdated] = useState<Date | null>(null)
  const [live, setLive] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [view, setView] = useState<View>('cards')
  const [flash, setFlash] = useState<Record<string, 'up' | 'down'>>({})
  const prevPrices = useRef<Record<string, number>>({})

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

  // Detect price changes between refreshes to flash the affected cards.
  useEffect(() => {
    const next: Record<string, 'up' | 'down'> = {}
    for (const g of items) {
      const p = prevPrices.current[g.symbol]
      if (p !== undefined && g.last !== p) next[g.symbol] = g.last > p ? 'up' : 'down'
      prevPrices.current[g.symbol] = g.last
    }
    if (Object.keys(next).length) {
      setFlash(next)
      const t = setTimeout(() => setFlash({}), 900)
      return () => clearTimeout(t)
    }
  }, [items])

  const maxPct = Math.max(...items.map((g) => g.pct), 0.0001)
  const avgPct = items.reduce((s, g) => s + g.pct, 0) / (items.length || 1)
  const energy = Math.max(0, Math.min(1, avgPct / 12)) // ambient intensity
  const marquee = [...items, ...items]
  const visibleCount = expanded ? EXPANDED_CARDS : COLLAPSED_CARDS
  const visible = items.slice(0, visibleCount)
  const canExpand = items.length > COLLAPSED_CARDS

  const [hero, ...rest] = visible

  return (
    <section
      className="relative w-full border-b border-border overflow-hidden"
      style={{
        background: `radial-gradient(140% 120% at 50% -10%, rgba(0,255,136,${(
          0.05 +
          energy * 0.1
        ).toFixed(3)}) 0%, transparent 55%)`,
      }}
    >
      {/* ── Header row ── */}
      <div className="max-w-5xl mx-auto px-4 pt-4 pb-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="live-pulse" aria-hidden />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
            {live ? 'Live' : 'Loading'}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white">Top Gainers Today</h2>
        </div>
        <div className="flex items-center gap-3">
          <MarketClock />
          <motion.p
            key={updated?.getTime() ?? 'init'}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[10px] text-muted leading-tight text-right hidden sm:block"
          >
            {updated ? `updated ${updated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}` : 'connecting…'}
          </motion.p>
        </div>
      </div>

      {/* ── Scrolling marquee strip ── */}
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

      {/* ── View toggle ── */}
      <div className="max-w-5xl mx-auto px-4 pt-3 flex items-center justify-between gap-2">
        <div className="flex rounded-full border border-border bg-card/60 p-0.5">
          {(['cards', 'heatmap'] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                view === v ? 'bg-accent text-black font-bold' : 'text-muted hover:text-white'
              }`}
            >
              {v === 'cards' ? 'Cards' : 'Heatmap'}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] text-muted">
          avg <span className="text-accent">+{avgPct.toFixed(1)}%</span> · {items.length} movers
        </span>
      </div>

      {/* ── Body ── */}
      {view === 'heatmap' ? (
        <HeatGrid items={visible} maxPct={maxPct} />
      ) : (
        <div className="max-w-5xl mx-auto px-4 pt-3 flex flex-col gap-2.5">
          {hero && <HeroMover g={hero} maxPct={maxPct} flash={flash[hero.symbol]} />}
          <div className="grid grid-cols-2 gap-2.5">
            {rest.map((g, i) => (
              <MoverCard
                key={g.symbol}
                g={g}
                rank={i + 2}
                maxPct={maxPct}
                flash={flash[g.symbol]}
                wide={rest.length % 2 === 1 && i === rest.length - 1}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Green drop-down toggle ── */}
      {canExpand && (
        <div className="flex justify-center pt-3 pb-3">
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
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>
        </div>
      )}
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Setup badge (links to the matching lesson) — sibling of the stretched
   Yahoo link so we never nest <a> inside <a>.
   ────────────────────────────────────────────────────────────────────────── */

function SetupBadge({ g }: { g: Gainer }) {
  const setup = spotSetup(g)
  if (!setup) return null
  return (
    <Link
      href={`/course/${setup.lessonId}`}
      title={`${setup.hint} — open the lesson`}
      className="relative z-20 inline-flex items-center gap-1 self-start rounded-full border border-accent/40 bg-accent/15 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-accent transition-colors hover:bg-accent/30"
    >
      <span>{setup.icon}</span>
      {setup.label}
    </Link>
  )
}

function flashRing(flash?: 'up' | 'down'): string {
  if (flash === 'up') return 'ring-2 ring-accent/70'
  if (flash === 'down') return 'ring-2 ring-red-400/70'
  return 'ring-0 ring-transparent'
}

/* ── Hero spotlight for the #1 mover ── */
function HeroMover({ g, maxPct, flash }: { g: Gainer; maxPct: number; flash?: 'up' | 'down' }) {
  const pct = useCountUp(g.pct)
  const price = useCountUp(g.last)
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
      className={`relative overflow-hidden rounded-xl border border-accent/30 bg-card p-3 transition-shadow ${flashRing(
        flash
      )}`}
    >
      <a
        href={yahooUrl(g.symbol)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${g.name} (${g.symbol}) up ${g.change} — open on Yahoo Finance`}
        className="absolute inset-0 z-0"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(90% 120% at 100% 0%, rgba(0,255,136,0.12) 0%, transparent 60%)` }}
      />
      <div className="relative z-10 pointer-events-none flex items-center gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] rounded bg-accent/20 px-1 py-0.5 text-accent">TOP MOVER</span>
            <span className="font-mono text-lg font-bold text-white">{g.symbol}</span>
            <SetupBadge g={g} />
          </div>
          <p className="text-[11px] text-muted truncate max-w-[150px]">{g.name}</p>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-base text-white tabular-nums">{price.toFixed(2)}</span>
            {g.changeAbs && <span className="font-mono text-[11px] text-accent">{g.changeAbs}</span>}
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1">
          <span className="font-mono text-2xl font-bold text-accent leading-none">+{pct.toFixed(2)}%</span>
          <div className="w-28">
            <Sparkline g={g} h={34} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Standard gainer card ── */
function MoverCard({
  g,
  rank,
  maxPct,
  flash,
  wide,
}: {
  g: Gainer
  rank: number
  maxPct: number
  flash?: 'up' | 'down'
  wide?: boolean
}) {
  const pct = useCountUp(g.pct)
  const price = useCountUp(g.last)
  const barW = Math.max(4, (g.pct / maxPct) * 100)
  const pos = rangePct(g)

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
      className={`group relative overflow-hidden rounded-xl border border-border bg-card p-3 flex flex-col gap-2 transition-[box-shadow,border-color] hover:border-accent/60 ${
        wide ? 'col-span-2' : ''
      } ${flashRing(flash)}`}
    >
      {/* stretched Yahoo link (sibling, not a wrapper) */}
      <a
        href={yahooUrl(g.symbol)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${g.name} (${g.symbol}) up ${g.change} — open on Yahoo Finance`}
        className="absolute inset-0 z-0"
      />

      {/* glow that scales with the size of the move */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: `radial-gradient(120% 90% at 0% 0%, rgba(0,255,136,${Math.min(0.16, g.pct / 400)}) 0%, transparent 60%)` }}
      />

      <div className="relative z-10 pointer-events-none flex items-start justify-between gap-1">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-muted">#{rank}</span>
            <span className="font-mono text-sm font-bold text-white">{g.symbol}</span>
          </div>
          <p className="text-[10px] text-muted truncate max-w-[110px]">{g.name}</p>
        </div>
        <span className="flex items-center gap-1 font-mono text-sm font-bold text-accent whitespace-nowrap">
          +{pct.toFixed(2)}%
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden className="opacity-40 transition-opacity duration-150 group-hover:opacity-100">
            <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* sparkline */}
      <div className="relative z-10 pointer-events-none -mx-0.5">
        <Sparkline g={g} h={26} />
      </div>

      <div className="relative z-10 pointer-events-none flex items-baseline justify-between gap-1">
        <span className="font-mono text-sm text-white tabular-nums">{price.toFixed(2)}</span>
        {g.changeAbs && <span className="font-mono text-[10px] text-accent">{g.changeAbs}</span>}
      </div>

      {/* gain bar */}
      <div className="relative z-10 pointer-events-none h-1.5 rounded-full bg-border/50 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-dim to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${barW}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      </div>

      {/* live intraday position + volume + setup badge */}
      <div className="relative z-10">
        <div className="pointer-events-none flex justify-between font-mono text-[8px] text-muted mb-0.5">
          <span>L {g.dayLow.toFixed(2)}</span>
          <span>{g.volume} vol</span>
          <span>H {g.dayHigh.toFixed(2)}</span>
        </div>
        <div className="pointer-events-none relative h-[3px] rounded-full bg-border/60">
          <motion.span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_6px_1px_rgba(0,255,136,0.7)]"
            initial={{ left: '50%' }}
            animate={{ left: `${pos}%` }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
          />
        </div>
        <div className="mt-1.5">
          <SetupBadge g={g} />
        </div>
      </div>
    </motion.div>
  )
}

/* ── Heatmap view: tiles sized by gain, shaded by intensity ── */
function HeatGrid({ items, maxPct }: { items: Gainer[]; maxPct: number }) {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-3">
      <div className="flex flex-wrap gap-1.5">
        {items.map((g) => {
          const intensity = Math.min(1, g.pct / maxPct)
          const grow = 1 + intensity * 4
          return (
            <motion.a
              layout
              key={g.symbol}
              href={yahooUrl(g.symbol)}
              target="_blank"
              rel="noopener noreferrer"
              title={`${g.name} — open on Yahoo Finance`}
              whileHover={{ scale: 1.03 }}
              className="relative flex min-h-[66px] min-w-[78px] flex-col justify-between rounded-lg border border-accent/20 p-2"
              style={{
                flex: `${grow.toFixed(2)} 1 78px`,
                background: `rgba(0,255,136,${(0.12 + intensity * 0.5).toFixed(3)})`,
              }}
            >
              <span className="font-mono text-xs font-bold text-white drop-shadow">{g.symbol}</span>
              <span className="font-mono text-[11px] font-semibold text-white/95 drop-shadow">
                +{g.pct.toFixed(1)}%
              </span>
            </motion.a>
          )
        })}
      </div>
    </div>
  )
}
