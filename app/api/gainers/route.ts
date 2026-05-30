import { NextResponse } from 'next/server'
import { fetchTopGainers, FALLBACK_GAINERS } from '@/lib/gainers'

// Revalidate the cached result at most once per minute.
export const revalidate = 60

export async function GET() {
  let items = FALLBACK_GAINERS
  try {
    items = await fetchTopGainers()
  } catch {
    // fetchTopGainers already falls back, but guard against unexpected errors.
  }
  return NextResponse.json(
    { updatedAt: new Date().toISOString(), source: 'yahoo:day_gainers', items },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
  )
}
