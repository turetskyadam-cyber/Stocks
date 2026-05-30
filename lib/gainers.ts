/**
 * Top gainers data for the lesson ticker tape.
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
  price: string // formatted, e.g. "420.91"
  change: string // formatted with sign, e.g. "+32.76%"
}

/** Last-resort values if Yahoo can't be reached. */
export const FALLBACK_GAINERS: Gainer[] = [
  { symbol: 'AAPL', price: '189.84', change: '+1.20%' },
  { symbol: 'TSLA', price: '248.42', change: '+3.80%' },
  { symbol: 'NVDA', price: '875.39', change: '+2.10%' },
  { symbol: 'AMD', price: '168.75', change: '+1.90%' },
  { symbol: 'MSFT', price: '415.06', change: '+0.80%' },
  { symbol: 'AMZN', price: '185.90', change: '+1.30%' },
  { symbol: 'META', price: '502.12', change: '+0.60%' },
  { symbol: 'GOOGL', price: '174.11', change: '+0.90%' },
  { symbol: 'NFLX', price: '628.40', change: '+1.10%' },
  { symbol: 'SPY', price: '521.67', change: '+0.40%' },
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
        items.push({
          symbol,
          price: price.toFixed(2),
          change: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
        })
      }
      if (items.length) return items
    } catch {
      // Try the next host.
    }
  }
  return FALLBACK_GAINERS
}
