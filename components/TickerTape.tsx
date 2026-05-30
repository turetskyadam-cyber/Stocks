'use client'

import { useEffect, useState } from 'react'
import { FALLBACK_GAINERS, type Gainer } from '@/lib/gainers'

export default function TickerTape() {
  // Start with the fallback list so the bar never renders empty, then swap in
  // the day's live top gainers and refresh once a minute.
  const [items, setItems] = useState<Gainer[]>(FALLBACK_GAINERS)

  useEffect(() => {
    let active = true

    const load = async () => {
      try {
        const res = await fetch('/api/gainers/', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (active && Array.isArray(data.items) && data.items.length) {
          setItems(data.items as Gainer[])
        }
      } catch {
        // Keep whatever we last had.
      }
    }

    load()
    const id = setInterval(load, 60_000)
    return () => {
      active = false
      clearInterval(id)
    }
  }, [])

  // Duplicate for seamless infinite loop
  const all = [...items, ...items]

  return (
    <div className="w-full overflow-hidden border-b border-border bg-card/40 py-2">
      <div className="ticker-track flex gap-8 w-max">
        {all.map((t, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs font-semibold text-white">{t.symbol}</span>
            <span className="font-mono text-xs text-muted">{t.price}</span>
            <span
              className={`font-mono text-xs ${
                t.change.startsWith('-') ? 'text-red-400' : 'text-accent'
              }`}
            >
              {t.change}
            </span>
            <span className="text-border ml-2">·</span>
          </div>
        ))}
      </div>
    </div>
  )
}
