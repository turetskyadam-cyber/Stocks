import { NextResponse } from 'next/server'

const SYMBOLS = ['AAPL', 'TSLA', 'NVDA', 'AMZN', 'MSFT', 'GOOGL', 'META', 'SPY', 'AMD', 'GME']

export const revalidate = 60 // cache 60 s

export async function GET() {
  try {
    const url =
      `https://query1.finance.yahoo.com/v7/finance/quote` +
      `?symbols=${SYMBOLS.join(',')}&fields=regularMarketPrice,regularMarketChangePercent`

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        Accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) throw new Error(`Yahoo Finance responded ${res.status}`)

    const json = await res.json()
    const results: Record<string, unknown>[] = json?.quoteResponse?.result ?? []

    const tickers = results.map((q) => {
      const pct = q.regularMarketChangePercent as number | undefined
      return {
        symbol: q.symbol as string,
        price: typeof q.regularMarketPrice === 'number'
          ? (q.regularMarketPrice as number).toFixed(2)
          : '--',
        change:
          pct != null
            ? `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`
            : '--',
        positive: (pct ?? 0) >= 0,
      }
    })

    return NextResponse.json(tickers, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    })
  } catch (err) {
    console.error('[/api/quotes]', err)
    return NextResponse.json({ error: 'upstream_error' }, { status: 502 })
  }
}
