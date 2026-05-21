'use client'

const TICKERS = [
  { symbol: 'AAPL', price: '189.42', change: '+1.23%' },
  { symbol: 'TSLA', price: '248.17', change: '+3.41%' },
  { symbol: 'NVDA', price: '875.39', change: '+2.18%' },
  { symbol: 'AMZN', price: '185.06', change: '+0.87%' },
  { symbol: 'MSFT', price: '414.82', change: '+0.54%' },
  { symbol: 'GOOGL', price: '174.11', change: '-0.32%' },
  { symbol: 'META', price: '521.64', change: '+1.76%' },
  { symbol: 'SPY',  price: '524.30', change: '+0.43%' },
  { symbol: 'AMD',  price: '178.94', change: '+4.12%' },
  { symbol: 'GME',  price: '14.82',  change: '-2.05%' },
]

// Duplicate for seamless infinite loop
const ALL = [...TICKERS, ...TICKERS]

export default function TickerTape() {
  return (
    <div className="w-full overflow-hidden border-b border-border bg-card/40 py-2">
      <div className="ticker-track flex gap-8 w-max">
        {ALL.map((t, i) => (
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
