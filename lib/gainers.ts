/**
 * Top gainers data for the lesson ticker tape and the homepage live panel.
 *
 * Source page:  https://finance.yahoo.com/markets/stocks/gainers/
 * Backing API:  Yahoo's predefined "day_gainers" screener.
 *
 * `fetchTopGainers()` runs on the server (Next.js / Vercel), so there are no
 * CORS issues. Responses are cached for 60s via Next's fetch revalidation so we
 * stay current without hammering Yahoo. If Yahoo is unreachable we fall back to
 * a static list so the ticker never renders empty.
 */

export interface Gainer {
  symbol: string
  name: string
  price: string // formatted, e.g. "420.91"
  change: string // % with sign, e.g. "+32.76%"  (used by the scrolling ticker)
  pct: number // raw percent change, e.g. 32.7582 (used for bar scaling / count-up)
  changeAbs: string // $ change with sign, e.g. "+103.86"
  dayLow: number // intraday low
  dayHigh: number // intraday high
  last: number // raw last price (for day-range position)
  volume: string // formatted, e.g. "38.2M"
}

/** Last-resort values if Yahoo can't be reached. */
export const FALLBACK_GAINERS: Gainer[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: '189.84', change: '+1.20%', pct: 1.2, changeAbs: '+2.25', dayLow: 187.1, dayHigh: 190.4, last: 189.84, volume: '52.1M' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: '248.42', change: '+3.80%', pct: 3.8, changeAbs: '+9.10', dayLow: 240.0, dayHigh: 250.1, last: 248.42, volume: '98.4M' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '875.39', change: '+2.10%', pct: 2.1, changeAbs: '+18.00', dayLow: 858.0, dayHigh: 880.2, last: 875.39, volume: '41.2M' },
  { symbol: 'AMD', name: 'Adv. Micro Devices', price: '168.75', change: '+1.90%', pct: 1.9, changeAbs: '+3.15', dayLow: 165.2, dayHigh: 170.0, last: 168.75, volume: '36.7M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: '415.06', change: '+0.80%', pct: 0.8, changeAbs: '+3.30', dayLow: 411.0, dayHigh: 416.5, last: 415.06, volume: '19.8M' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: '185.90', change: '+1.30%', pct: 1.3, changeAbs: '+2.40', dayLow: 183.0, dayHigh: 186.7, last: 185.9, volume: '28.3M' },
  { symbol: 'META', name: 'Meta Platforms', price: '502.12', change: '+0.60%', pct: 0.6, changeAbs: '+3.00', dayLow: 497.5, dayHigh: 504.0, last: 502.12, volume: '14.1M' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '174.11', change: '+0.90%', pct: 0.9, changeAbs: '+1.55', dayLow: 172.0, dayHigh: 175.0, last: 174.11, volume: '21.5M' },
  { symbol: 'NFLX', name: 'Netflix, Inc.', price: '628.40', change: '+1.10%', pct: 1.1, changeAbs: '+6.80', dayLow: 620.0, dayHigh: 631.0, last: 628.4, volume: '8.9M' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: '521.67', change: '+0.40%', pct: 0.4, changeAbs: '+2.05', dayLow: 518.0, dayHigh: 522.5, last: 521.67, volume: '61.0M' },
]

const HOSTS = ['query1.finance.yahoo.com', 'query2.finance.yahoo.com']
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

// Yahoo returns either a bare number or a { raw, fmt } object.
function num(field: unknown): number | null {
  if (typeof field === 'number') return field
  if (field && typeof field === 'object' && 'raw' in field) {
    const raw = (field as { raw: unknown }).raw
    if (typeof raw === 'number') return raw
  }
  return null
}

function fmtVol(n: number | null): string {
  if (n == null) return '—'
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return String(n)
}

/**
 * Fetch the day's top gainers from Yahoo Finance. Server-only.
 * @param count how many gainers to request (default 10)
 */
export async function fetchTopGainers(count = 10): Promise<Gainer[]> {
  for (const host of HOSTS) {
    const url = `https://${host}/v1/finance/screener/predefined/saved?scrIds=day_gainers&count=${count}`
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
        // Cache on the server; refresh at most once a minute.
        next: { revalidate: 60 },
      })
      if (!res.ok) continue
      const json: any = await res.json()
      const quotes = json?.finance?.result?.[0]?.quotes
      if (!Array.isArray(quotes) || quotes.length === 0) continue

      const items: Gainer[] = []
      for (const q of quotes) {
        const symbol = q?.symbol
        const price = num(q?.regularMarketPrice)
        const pct = num(q?.regularMarketChangePercent)
        if (!symbol || price == null || pct == null) continue
        const chg = num(q?.regularMarketChange)
        const low = num(q?.regularMarketDayLow) ?? price
        const high = num(q?.regularMarketDayHigh) ?? price
        items.push({
          symbol,
          name: q?.shortName || q?.longName || symbol,
          price: price.toFixed(2),
          change: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
          pct,
          changeAbs: chg == null ? '' : `${chg >= 0 ? '+' : ''}${chg.toFixed(2)}`,
          dayLow: low,
          dayHigh: high,
          last: price,
          volume: fmtVol(num(q?.regularMarketVolume)),
        })
      }
      if (items.length) return items
    } catch {
      // Try the next host.
    }
  }
  return FALLBACK_GAINERS
}
