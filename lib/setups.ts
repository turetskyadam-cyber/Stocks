/**
 * "Setup Spotter" — tag a live gainer with the trading concept it's showing
 * right now, and link it to the lesson that teaches it. Pure derivation from
 * data we already have (no API).
 */
import type { Gainer } from './gainers'

export interface Setup {
  label: string
  icon: string
  lessonId: number // links to /course/<id>
  hint: string
}

// How close to the intraday high counts as "breaking out" (fraction of range).
const BREAKOUT_ZONE = 0.92

export function spotSetup(g: Gainer): Setup | null {
  const span = g.dayHigh - g.dayLow
  const posInRange = span > 0 ? (g.last - g.dayLow) / span : 1

  if (g.pct >= 20) {
    return {
      label: 'PARABOLIC',
      icon: '🚀',
      lessonId: 63, // The Parabolic Move
      hint: 'Extreme vertical move — learn how these reverse.',
    }
  }
  if (posInRange >= BREAKOUT_ZONE && g.pct >= 3) {
    return {
      label: 'BREAKOUT',
      icon: '⚡',
      lessonId: 65, // Scanning for Momentum Stocks
      hint: 'Trading near its high of day.',
    }
  }
  if (g.pct >= 8) {
    return {
      label: 'MOMENTUM',
      icon: '🔥',
      lessonId: 64, // Hot Sectors & Momentum
      hint: 'Strong momentum leader today.',
    }
  }
  return null
}
