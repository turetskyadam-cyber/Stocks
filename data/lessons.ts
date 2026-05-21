export interface VocabItem {
  term: string
  definition: string
}

export interface Lesson {
  id: number
  title: string
  subtitle: string
  section: string
  sectionColor: string
  coreHeading: string
  coreBody: string
  facts: { icon: string; text: string }[]
  vocab: VocabItem[]
  didYouKnow: string
  nextTitle: string
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'What is a Stock?',
    subtitle: 'Learn what you actually own when you buy a stock.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'Think of a company like a pizza.',
    coreBody:
      'A stock is one slice. When a company like Apple divides itself into millions of slices and sells them, each slice is called a share. Buy a share — own a piece. If the company grows and becomes more valuable, your slice is worth more. That is how investors make money.',
    facts: [
      { icon: '📈', text: 'Over 6,000 US companies trade publicly on stock exchanges.' },
      { icon: '⏱️', text: 'Stock prices update every second during market hours.' },
      { icon: '💰', text: 'You profit when price rises. You lose when it falls.' },
    ],
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
  {
    id: 2,
    title: 'What is the Stock Market?',
    subtitle: 'The place where buyers and sellers come together to trade stocks.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'Think of a farmers market — for companies.',
    coreBody:
      'The stock market is not one building. It is a network of exchanges, computers, and traders all connected. Every second, millions of buy and sell orders flow in. The price you see is simply the last price someone agreed to pay.',
    facts: [
      { icon: '📡', text: 'The US stock market processes over 10 billion shares on a normal trading day.' },
      { icon: '🕙', text: 'Regular trading hours are 9:30 AM – 4:00 PM ET, Monday through Friday.' },
      { icon: '🌍', text: 'There are stock markets in over 60 countries around the world.' },
    ],
    vocab: [
      {
        term: 'Market',
        definition: 'Any system where buyers and sellers trade an asset — stocks, bonds, even baseball cards.',
      },
      {
        term: 'Liquidity',
        definition: 'How easily you can buy or sell something without moving the price. High liquidity = instant fills.',
      },
      {
        term: 'Index',
        definition: 'A basket of stocks used to measure the overall market. The S&P 500 tracks the 500 largest US companies.',
      },
    ],
    didYouKnow:
      'The first stock market was created in Amsterdam in 1602 for the Dutch East India Company — the world\'s first publicly traded company.',
    nextTitle: 'How Companies Go Public (IPO)',
  },
  {
    id: 3,
    title: 'How Companies Go Public (IPO)',
    subtitle: 'The moment a private company sells shares to the public for the first time.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'Like a private pizza shop opening a franchise.',
    coreBody:
      'When a company wants to raise money to grow, it can sell pieces of itself to the public. This is called an IPO — Initial Public Offering. On IPO day, the company sets a price, sells shares, and the stock starts trading on an exchange. Investors who buy in early hope the price rises.',
    facts: [
      { icon: '💰', text: 'Companies raise billions on IPO day — Airbnb raised $3.5B in its 2020 IPO.' },
      { icon: '📅', text: 'The IPO process typically takes 6–12 months of preparation.' },
      { icon: '📉', text: 'Many IPOs drop below their debut price within the first year.' },
    ],
    vocab: [
      {
        term: 'IPO',
        definition: 'Initial Public Offering — the first time a company sells stock to the public.',
      },
      {
        term: 'Underwriter',
        definition: 'Usually an investment bank (like Goldman Sachs) that helps set the IPO price and sells the shares.',
      },
      {
        term: 'Prospectus',
        definition: 'The legal document a company files before its IPO explaining its business, finances, and risks.',
      },
    ],
    didYouKnow:
      "Google's 2004 IPO used an unusual auction format — anyone could bid, not just big banks. The stock opened at $85. It now trades above $150 post-split.",
    nextTitle: 'NYSE vs. NASDAQ',
  },
  {
    id: 4,
    title: 'NYSE vs. NASDAQ',
    subtitle: 'The two biggest US stock exchanges — and how they differ.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'Two different stadiums for the same sport.',
    coreBody:
      'Both exchanges let you buy and sell stocks, but they work differently. NYSE has a physical trading floor with human specialists. NASDAQ is fully electronic — no floor, no humans matching trades. Most tech giants (Apple, Google, Meta) list on NASDAQ. Blue-chip industrials (Coca-Cola, ExxonMobil) often list on NYSE.',
    facts: [
      { icon: '🏛️', text: 'NYSE was founded in 1792 and is the largest exchange in the world by market cap.' },
      { icon: '💻', text: 'NASDAQ was founded in 1971 as the world\'s first electronic stock market.' },
      { icon: '📊', text: 'Combined, NYSE and NASDAQ list over 8,000 companies.' },
    ],
    vocab: [
      {
        term: 'NYSE',
        definition: 'New York Stock Exchange — the largest US exchange by total market cap, located on Wall Street.',
      },
      {
        term: 'NASDAQ',
        definition: 'The world\'s first electronic exchange, home to most major tech companies.',
      },
      {
        term: 'Market Maker',
        definition: 'A firm that always stands ready to buy or sell a stock, keeping the market liquid.',
      },
    ],
    didYouKnow:
      'The famous NYSE opening bell rings every trading day at 9:30 AM ET. Companies pay for the privilege of ringing it — it is a marketing event.',
    nextTitle: 'How to Read a Stock Quote',
  },
  {
    id: 5,
    title: 'How to Read a Stock Quote',
    subtitle: 'Every number on a stock quote and what it tells you.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'A scoreboard for a company.',
    coreBody:
      'A stock quote packs a lot into a small space. The price is what the last trade happened at. The change shows how much it moved today. Volume tells you how many shares traded hands. Open and close mark the day\'s start and end. Together, these numbers tell you what the market thinks about a company right now.',
    facts: [
      { icon: '🔢', text: 'A stock quote updates in real time — the price you see is milliseconds old.' },
      { icon: '📈', text: 'The 52-week high/low shows the stock\'s full range over the past year.' },
      { icon: '💹', text: 'Volume spikes often signal big news — something is happening with that company.' },
    ],
    vocab: [
      {
        term: 'Open',
        definition: 'The price of the very first trade when the market opened this morning at 9:30 AM.',
      },
      {
        term: 'Close',
        definition: 'The price of the last trade when the market closed (4:00 PM ET yesterday, or today).',
      },
      {
        term: '52-Wk High',
        definition: 'The highest price the stock traded at in the past 52 weeks — gives context on where it sits now.',
      },
    ],
    didYouKnow:
      'Stock prices used to be quoted in fractions (1/8, 1/4, 1/2 of a dollar). The US switched to decimal pricing in 2001, saving investors billions in tighter spreads.',
    nextTitle: 'Understanding Ticker Symbols',
  },
  {
    id: 6,
    title: 'Understanding Ticker Symbols',
    subtitle: 'The short codes that identify every stock on the market.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'A license plate for every company.',
    coreBody:
      'Every publicly traded company has a unique ticker symbol — a short string of letters used to identify it. AAPL = Apple. TSLA = Tesla. SPY = S&P 500 ETF. Traders use tickers constantly. Knowing them by heart is like knowing players by their jersey numbers.',
    facts: [
      { icon: '🔤', text: 'NYSE tickers are 1–3 letters. NASDAQ tickers are usually 4–5 letters.' },
      { icon: '🌐', text: 'There are over 58,000 ticker symbols across all global exchanges.' },
      { icon: '⚡', text: 'Momentum traders scan by ticker — you need to recognize them instantly.' },
    ],
    vocab: [
      {
        term: 'Ticker',
        definition: 'The unique letter code assigned to a publicly traded security (e.g., MSFT = Microsoft).',
      },
      {
        term: 'Symbol',
        definition: 'Same as ticker — used interchangeably. Found on every trading platform and quote screen.',
      },
      {
        term: 'ETF',
        definition: 'Exchange-Traded Fund — a basket of stocks that trades like a single stock. SPY tracks the S&P 500.',
      },
    ],
    didYouKnow:
      "The ticker 'GOOG' was taken when Google listed in 2004, so Class C shares use it. Class A shares trade as 'GOOGL.' Two tickers, one company.",
    nextTitle: 'Market Cap: Small, Mid & Large',
  },
  {
    id: 7,
    title: 'Market Cap: Small, Mid & Large',
    subtitle: 'Market cap tells you the size of a company — and changes how it trades.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'Pond, lake, or ocean?',
    coreBody:
      'Market cap is the total value of all a company\'s shares. A $1 stock with 1 billion shares = $1B market cap. Size matters: large-cap stocks (ocean) move slowly and steadily. Small-cap stocks (pond) can double or crash in a day. Momentum traders love small caps — they move fast.',
    facts: [
      { icon: '🐟', text: 'Small cap: under $2B. Mid cap: $2B–$10B. Large cap: over $10B.' },
      { icon: '🚀', text: 'The biggest momentum movers are usually small-cap stocks with low float.' },
      { icon: '🏦', text: "Apple's market cap has exceeded $3 trillion — larger than most countries' GDP." },
    ],
    vocab: [
      {
        term: 'Market Cap',
        definition: 'Share price × total shares outstanding. What the market thinks the whole company is worth.',
      },
      {
        term: 'Float',
        definition: 'The number of shares available for the public to trade. Low float = bigger price swings.',
      },
      {
        term: 'Outstanding',
        definition: 'The total number of shares a company has issued, including those held by insiders.',
      },
    ],
    didYouKnow:
      "A stock's price per share tells you almost nothing about its size. A $5 stock can be worth more than a $500 stock if it has more shares outstanding.",
    nextTitle: 'Sectors & Industries',
  },
  {
    id: 8,
    title: 'Sectors & Industries',
    subtitle: 'How the market organizes itself into groups — and why it matters.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'Like aisles in a grocery store.',
    coreBody:
      'The stock market is divided into 11 sectors: Technology, Healthcare, Finance, Energy, and more. Stocks in the same sector often move together — when oil prices rise, all energy stocks tend to rise. Momentum traders watch which sectors are hot right now and ride that wave.',
    facts: [
      { icon: '🏗️', text: 'The 11 GICS sectors classify every public company on earth.' },
      { icon: '🔥', text: 'Sector rotation — money flowing sector to sector — drives big market trends.' },
      { icon: '💊', text: 'Healthcare and Technology are the two largest S&P 500 sectors by weight.' },
    ],
    vocab: [
      {
        term: 'Sector',
        definition: 'A broad category of the economy (e.g., Technology, Healthcare, Energy). There are 11 GICS sectors.',
      },
      {
        term: 'Industry',
        definition: 'A more specific group within a sector. Example: Semiconductors is an industry within Technology.',
      },
      {
        term: 'Rotation',
        definition: "When investors move money out of one sector into another, often based on the economy's direction.",
      },
    ],
    didYouKnow:
      "The worst-performing sector in one year is often the best-performing sector the next. This 'sector rotation' is one of the most reliable patterns in market history.",
    nextTitle: 'Bull Markets vs. Bear Markets',
  },
  {
    id: 9,
    title: 'Bull Markets vs. Bear Markets',
    subtitle: 'The two modes the market is always in — and how to tell them apart.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'A bull charges up. A bear swipes down.',
    coreBody:
      'A bull market is a prolonged period of rising stock prices — generally defined as a 20%+ rise. A bear market is a prolonged decline of 20% or more. Most of the time (roughly 75%) the market is in bull mode. Bear markets are shorter but brutal — and they create the best short-side momentum opportunities.',
    facts: [
      { icon: '📈', text: 'The average bull market lasts about 5 years and gains over 150%.' },
      { icon: '📉', text: 'The average bear market lasts about 10 months and loses around 35%.' },
      { icon: '⚡', text: 'The fastest bear market ever: March 2020 — a 33% drop in just 33 days.' },
    ],
    vocab: [
      {
        term: 'Bull Market',
        definition: 'A market trending upward — generally a 20%+ rise from a recent low over months or years.',
      },
      {
        term: 'Bear Market',
        definition: 'A market trending downward — a 20%+ decline from a recent high.',
      },
      {
        term: 'Correction',
        definition: 'A milder pullback of 10–20%. Not a full bear market, but enough to shake weak hands out.',
      },
    ],
    didYouKnow:
      'The longest bull market in history ran from March 2009 to February 2020 — nearly 11 years, gaining over 400%. It ended in exactly 33 days when COVID hit.',
    nextTitle: 'What Drives Stock Prices?',
  },
  {
    id: 10,
    title: 'What Drives Stock Prices?',
    subtitle: 'Why prices move — and what to watch for as a momentum trader.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'An auction happening every millisecond.',
    coreBody:
      "At any moment, a stock's price is simply the last price two people agreed on. A buyer thought it was worth at least that much. A seller thought it was worth no more. The price rises when more people want to buy than sell, and falls when more want to sell. As a momentum trader, your job is to find stocks where demand is exploding right now.",
    facts: [
      { icon: '📰', text: 'Earnings reports, news, and FDA decisions can move a stock 20–50% in minutes.' },
      { icon: '🤖', text: 'Roughly 70% of all US stock trades are made by algorithms, not humans.' },
      { icon: '💬', text: 'Social media can now move small stocks — retail traders have real power.' },
    ],
    vocab: [
      {
        term: 'Supply',
        definition: 'The number of shares available for sale at a given price. More supply = price pressure down.',
      },
      {
        term: 'Demand',
        definition: 'The desire to buy shares at a given price. More demand = price pressure up.',
      },
      {
        term: 'Catalyst',
        definition: 'An event that causes a sudden change in supply/demand — earnings, news, FDA result, tweet.',
      },
    ],
    didYouKnow:
      'In 2021, GameStop (GME) went from $17 to $483 in two weeks driven almost entirely by retail traders on Reddit. Demand overwhelmed supply. That is momentum trading in its purest form.',
    nextTitle: 'What is Market Timing?',
  },
]

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

export const TOTAL_LESSONS = 100
