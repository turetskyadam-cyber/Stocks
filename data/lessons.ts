export interface VocabItem {
  term: string
  definition: string
}

export interface Lesson {
  id: number
  title: string
  subtitle: string
  vocab: VocabItem[]
  didYouKnow: string
  nextTitle: string
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'What is a Stock?',
    subtitle: 'Learn what you actually own when you buy a stock.',
    vocab: [
      {
        term: 'Share',
        definition: 'One unit of stock — the smallest piece of ownership you can buy in a company.',
      },
      {
        term: 'Ticker',
        definition: 'The short code used to identify a stock on an exchange. AAPL = Apple, TSLA = Tesla.',
      },
      {
        term: 'Exchange',
        definition: 'The marketplace where stocks are bought and sold. The two biggest US exchanges are NYSE and NASDAQ.',
      },
    ],
    didYouKnow:
      'The New York Stock Exchange opened in 1792 under a buttonwood tree on Wall Street — 24 brokers signed the first trading agreement.',
    nextTitle: 'What is the Stock Market?',
  },
]

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

export const TOTAL_LESSONS = 100
