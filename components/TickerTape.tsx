'use client'

import { useEffect, useState } from 'react'

interface Ticker {
  symbol: string
  price: string
  change: string
  positive: boolean
}

const FALLBACK: Ticker[] = [
  { symbol: 'AAPL',  price: '---', change: '---', positive: true },
  { symbol: 'TSLA',  price: '---', change: '---', positive: true },
  { symbol: 'NVDA',  price: '---', change: '---', positive: true },
  { symbol: 'AMZN',  price: '---', change: '---', positive: true },
  { symbol: 'MSFT',  price: '---', change: '---', positive: true },
  { symbol: 'GOOGL', price: '---', change: '---', positive: true },
  { symbol: 'META',  price: '---', change: '---', positive: true },
  { symbol: 'SPY',   price: '---', change: '---', positive: true },
  { symbol: 'AMD',   price: '---', change: '---', positive: true },
  { symbol: 'GME',   price: '---', change: '---', positive: true },
]

export default function TickerTape() {
  const [tickers, setTickers] = useState<Ticker[]>(FALLBACK)
  const [loading, setLoading] = useState(true)

  const fetchQuotes = async () => {
    try {
      const res = await fetch('/api/quotes')
      if (!res.ok) return
      const data: Ticker[] = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        setTickers(data)
        setLoading(false)
      }
    } catch {
      // keep fallback
    }
  }

  useEffect(() => {
    fetchQuotes()
    const id = setInterval(fetchQuotes, 60_000)
    return () => clearInterval(id)
  }, [])

  // Duplicate for seamless infinite scroll
  const all = [...tickers, ...tickers]

  return (
    <div className="w-full overflow-hidden border-b border-border bg-card/40 py-2">
      <div className={`ticker-track flex gap-8 w-max transition-opacity duration-500 ${loading ? 'opacity-40' : 'opacity-100'}`}>
        {all.map((t, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs font-semibold text-white">{t.symbol}</span>
            <span className="font-mono text-xs text-muted">{t.price}</span>
            <span
              className={`font-mono text-xs ${
                t.positive ? 'text-accent' : 'text-red-400'
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
