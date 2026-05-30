/**
 * Top gainers data for the lesson ticker tape and the homepage live panel.
 *
 * Source page:  https://finance.yahoo.com/markets/stocks/gainers/
 * Backing API:  Yahoo's predefined "day_gainers" screener (snapshot) + the
 *               "spark" endpoint (one batched call) for intraday sparklines.
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
  prevClose: number // previous close (sparkline baseline)
  volume: string // formatted, e.g. "38.2M"
  exchange: string // e.g. "NYSE" / "NasdaqGS"
  marketState: string // PRE | REGULAR | POST | POSTPOST | CLOSED
  spark: number[] // intraday close series for the sparkline
}

// Build a gently rising synthetic intraday series for the offline fallback.
function fauxSpark(prev: number, last: number, n = 24): number[] {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    const wobble = Math.sin(i * 1.3) * (last - prev) * 0.12
    return +(prev + (last - prev) * t + wobble).toFixed(2)
  })
}

function fb(
  symbol: string,
  name: string,
  last: number,
  pct: number,
  low: number,
  high: number,
  volume: string,
  exchange = 'NASDAQ'
): Gainer {
  const prev = last / (1 + pct / 100)
  const chg = last - prev
  return {
    symbol,
    name,
    price: last.toFixed(2),
    change: `+${pct.toFixed(2)}%`,
    pct,
    changeAbs: `+${chg.toFixed(2)}`,
    dayLow: low,
    dayHigh: high,
    last,
    prevClose: prev,
    volume,
    exchange,
    marketState: 'REGULAR',
    spark: fauxSpark(prev, last),
  }
}

/** Last-resort values if Yahoo can't be reached. */
export const FALLBACK_GAINERS: Gainer[] = [
  fb('TSLA', 'Tesla, Inc.', 248.42, 3.8, 240.0, 250.1, '98.4M'),
  fb('NVDA', 'NVIDIA Corp.', 875.39, 2.1, 858.0, 880.2, '41.2M'),
  fb('AMD', 'Adv. Micro Devices', 168.75, 1.9, 165.2, 170.0, '36.7M'),
  fb('AMZN', 'Amazon.com, Inc.', 185.9, 1.3, 183.0, 186.7, '28.3M'),
  fb('AAPL', 'Apple Inc.', 189.84, 1.2, 187.1, 190.4, '52.1M'),
  fb('NFLX', 'Netflix, Inc.', 628.4, 1.1, 620.0, 631.0, '8.9M'),
  fb('GOOGL', 'Alphabet Inc.', 174.11, 0.9, 172.0, 175.0, '21.5M'),
  fb('MSFT', 'Microsoft Corp.', 415.06, 0.8, 411.0, 416.5, '19.8M'),
  fb('META', 'Meta Platforms', 502.12, 0.6, 497.5, 504.0, '14.1M'),
  fb('SPY', 'SPDR S&P 500 ETF', 521.67, 0.4, 518.0, 522.5, '61.0M'),
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

/** One batched call: intraday close series for every symbol at once. */
async function fetchSparks(symbols: string[]): Promise<Record<string, number[]>> {
  if (!symbols.length) return {}
  const qs = encodeURIComponent(symbols.join(','))
  for (const host of HOSTS) {
    const url = `https://${host}/v8/finance/spark?symbols=${qs}&range=1d&interval=5m`
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
        next: { revalidate: 60 },
      })
      if (!res.ok) continue
      const json: any = await res.json()
      const out: Record<string, number[]> = {}
      for (const sym of symbols) {
        const closes: unknown = json?.[sym]?.close
        if (Array.isArray(closes)) {
          const series = closes.filter((c): c is number => typeof c === 'number')
          if (series.length > 1) out[sym] = series
        }
      }
      if (Object.keys(out).length) return out
    } catch {
      // try next host
    }
  }
  return {}
}

/**
 * Fetch the day's top gainers from Yahoo Finance, with intraday sparklines.
 * Server-only.
 * @param count how many gainers to request (default 10)
 */
export async function fetchTopGainers(count = 10): Promise<Gainer[]> {
  for (const host of HOSTS) {
    const url = `https://${host}/v1/finance/screener/predefined/saved?scrIds=day_gainers&count=${count}`
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
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
        const prev = num(q?.regularMarketPreviousClose) ?? price
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
          prevClose: prev,
          volume: fmtVol(num(q?.regularMarketVolume)),
          exchange: q?.fullExchangeName || q?.exchange || '',
          marketState: q?.marketState || 'REGULAR',
          spark: [],
        })
      }
      if (!items.length) continue

      // Enrich with intraday sparklines (best-effort; never blocks the data).
      const sparks = await fetchSparks(items.map((i) => i.symbol))
      for (const it of items) {
        it.spark = sparks[it.symbol] ?? [it.prevClose, it.last]
      }
      return items
    } catch {
      // Try the next host.
    }
  }
  return FALLBACK_GAINERS
}
