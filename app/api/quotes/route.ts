import { NextResponse } from 'next/server'

const SYMBOLS = ['AAPL', 'TSLA', 'NVDA', 'AMZN', 'MSFT', 'GOOGL', 'META', 'SPY', 'AMD', 'GME']

export const revalidate = 60

export async function GET() {
  try {
    const url =
      `https://query1.finance.yahoo.com/v8/finance/spark` +
      `?symbols=${SYMBOLS.join(',')}&range=1d&interval=5m`

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        Accept: 'application/json',
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) throw new Error(`Yahoo spark responded ${res.status}`)

    const json = await res.json()

    const tickers = SYMBOLS.map((sym) => {
      const data = json[sym]
      if (!data) return { symbol: sym, price: '--', change: '--', positive: true }

      const closes: number[] = data.close ?? []
      const prev: number = data.previousClose ?? 0
      const current = closes.length > 0 ? closes[closes.length - 1] : prev

      const pct = prev > 0 ? ((current - prev) / prev) * 100 : 0

      return {
        symbol: sym,
        price: current > 0 ? current.toFixed(2) : '--',
        change: prev > 0 ? `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%` : '--',
        positive: pct >= 0,
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
