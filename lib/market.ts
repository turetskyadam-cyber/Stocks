/**
 * US equity market hours helper (client-side, no API).
 *
 * Regular session is 9:30 AM – 4:00 PM America/New_York, Mon–Fri.
 * We read the wall clock in New York via Intl (handles DST automatically) and
 * derive the session status + a countdown to the next 9:30 open. Holidays are
 * not accounted for — this is a vibe/countdown feature, not a trading clock.
 */

export type Session = 'pre' | 'open' | 'after' | 'weekend'

export interface MarketInfo {
  session: Session
  /** seconds until the next 9:30 AM ET open (0 while already open) */
  secondsToOpen: number
  /** seconds until 4:00 PM ET close (only meaningful while open) */
  secondsToClose: number
}

const OPEN_MIN = 9 * 60 + 30 // 570
const CLOSE_MIN = 16 * 60 // 960

interface ETParts {
  hour: number
  minute: number
  second: number
  dow: number // 0=Sun … 6=Sat
}

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function etParts(date: Date = new Date()): ETParts {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour12: false,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const parts = fmt.formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  let hour = parseInt(get('hour'), 10)
  if (hour === 24) hour = 0 // some runtimes emit "24" at midnight
  return {
    hour,
    minute: parseInt(get('minute'), 10),
    second: parseInt(get('second'), 10),
    dow: Math.max(0, WD.indexOf(get('weekday'))),
  }
}

export function marketInfo(date: Date = new Date()): MarketInfo {
  const { hour, minute, second, dow } = etParts(date)
  const minutesNow = hour * 60 + minute
  const secsLeftToday = (1440 - minutesNow) * 60 - second
  const isWeekend = dow === 0 || dow === 6

  // How many *extra* whole days to skip after today before the next weekday.
  const extraDaysAfterToday = (d: number): number => {
    // tomorrow's dow:
    const t = (d + 1) % 7
    if (t === 6) return 2 // tomorrow Sat -> skip to Mon
    if (t === 0) return 1 // tomorrow Sun -> skip to Mon
    return 0
  }

  const secondsToNextOpen = (): number =>
    secsLeftToday + extraDaysAfterToday(dow) * 86400 + OPEN_MIN * 60

  if (isWeekend) {
    return { session: 'weekend', secondsToOpen: secondsToNextOpen(), secondsToClose: 0 }
  }
  if (minutesNow < OPEN_MIN) {
    return {
      session: 'pre',
      secondsToOpen: (OPEN_MIN - minutesNow) * 60 - second,
      secondsToClose: 0,
    }
  }
  if (minutesNow < CLOSE_MIN) {
    return {
      session: 'open',
      secondsToOpen: 0,
      secondsToClose: (CLOSE_MIN - minutesNow) * 60 - second,
    }
  }
  return { session: 'after', secondsToOpen: secondsToNextOpen(), secondsToClose: 0 }
}

/** Format a seconds count as H:MM:SS (or D:HH:MM:SS for multi-day). */
export function fmtCountdown(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const days = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  if (days > 0) return `${days}d ${pad(h)}:${pad(m)}:${pad(sec)}`
  return `${pad(h)}:${pad(m)}:${pad(sec)}`
}
