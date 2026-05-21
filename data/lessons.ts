export interface VocabItem {
  term: string
  definition: string
}

export type SlotAWidget =
  | { type: 'facts' }
  | { type: 'stat-block'; stats: { value: string; label: string; sub?: string }[] }
  | { type: 'comparison'; leftLabel: string; rightLabel: string; rows: { left: string; right: string }[] }
  | { type: 'timeline'; heading: string; events: { label: string; body: string }[] }
  | { type: 'alert-trio'; items: { accent: string; icon: string; heading: string; body: string }[] }
  | { type: 'quote-hero'; quote: string; attribution: string }
  | { type: 'leaderboard'; heading: string; items: { rank: number; label: string; sub: string; pct: number; color: string }[] }
  | { type: 'checklist'; heading: string; items: string[] }
  | { type: 'before-after'; leftLabel: string; rightLabel: string; leftItems: string[]; rightItems: string[] }
  | { type: 'myth-busters'; myths: { myth: string; reality: string }[] }

export type SlotBWidget =
  | { type: 'vocab' }
  | { type: 'steps'; heading: string; steps: { num: number; title: string; body: string }[] }
  | { type: 'diagram'; heading: string; svgContent: string; caption?: string }
  | { type: 'scenario'; setup: string; options: { label: string; correct: boolean; explanation: string }[] }
  | { type: 'true-false'; heading: string; statements: { text: string; answer: boolean; explanation: string }[] }
  | { type: 'myth-buster'; myths: { myth: string; reality: string }[] }
  | { type: 'calculator'; heading: string; inputLabel: string; inputDefault: number; inputMin: number; inputMax: number; inputStep: number; factor: number; resultLabel: string; resultPrefix?: string; resultSuffix?: string; note?: string }
  | { type: 'pros-cons'; heading: string; pros: string[]; cons: string[] }

export type DykStyle = 'default' | 'pro-tip' | 'mistake' | 'data' | 'quote'

export interface QuizQuestion {
  q: string
  options: string[]
  correct: number
  explanation: string
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
  slotA?: SlotAWidget
  slotB?: SlotBWidget
  dykStyle?: DykStyle
  didYouKnow: string
  nextTitle: string
  checkpointQuiz?: QuizQuestion[]
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
    slotA: {
      type: 'stat-block',
      stats: [
        { value: '6,000+', label: 'US public companies', sub: 'available to buy right now on US exchanges' },
        { value: '$1', label: 'Minimum investment', sub: 'fractional shares available at most brokers' },
        { value: '233 yrs', label: 'Market age', sub: 'US stock market running since 1792' },
      ],
    },
    slotB: {
      type: 'scenario',
      setup: 'Apple has 15 billion shares outstanding. You buy 1 share at $185. Six months later, Apple\'s total company value increases by 20%. What is your 1 share now worth?',
      options: [
        { label: '$185 — you only get back what you paid', correct: false, explanation: 'Incorrect. As a partial owner, you benefit from the company\'s growth. When total value rises 20%, so does every share you hold.' },
        { label: '$222 — up 20% along with the whole company', correct: true, explanation: 'Correct! $185 × 1.20 = $222. As a shareholder, your piece rises when the company\'s total value rises. This is how stock investors build wealth.' },
        { label: '$370 — doubled because you bought at the right time', correct: false, explanation: 'Incorrect. Stock price = total company value ÷ shares outstanding. A 20% rise in company value means a 20% rise in each share — not a doubling.' },
      ],
    },
    didYouKnow:
      'The New York Stock Exchange opened in 1792 under a buttonwood tree on Wall Street — 24 brokers signed the first trading agreement.',
    nextTitle: 'What is the Stock Market?',
    checkpointQuiz: [
      {
        q: 'When you buy one share of a company\'s stock, you become...',
        options: ['A creditor lending money to the company', 'A partial owner of that company', 'An employee eligible for a salary', 'A bondholder with guaranteed returns'],
        correct: 1,
        explanation: 'Stocks represent ownership. Buy a share = own a piece. If the company grows, your piece grows too. If it shrinks, so does your investment — there are no guarantees.',
      },
      {
        q: 'What primarily drives a stock\'s price during market hours?',
        options: ['The CEO\'s decisions each morning', 'The government setting daily prices', 'Supply and demand between buyers and sellers', 'The company\'s board voting each day'],
        correct: 2,
        explanation: 'Every stock price is determined by the most recent trade between a willing buyer and seller. Millions of transactions per second — pure supply and demand in real time.',
      },
      {
        q: 'Apple\'s stock ticker symbol is...',
        options: ['APPL', 'APLE', 'APL', 'AAPL'],
        correct: 3,
        explanation: 'AAPL — four letters on NASDAQ. NYSE tickers are 1–3 letters. NASDAQ tickers are usually 4–5 letters. Knowing tickers cold is a core trader skill.',
      },
    ],
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
    slotA: {
      type: 'comparison',
      leftLabel: 'Without a Stock Market',
      rightLabel: 'With a Stock Market',
      rows: [
        { left: 'Companies fund growth only from private investors or loans', right: 'Companies raise millions instantly by selling shares publicly' },
        { left: 'Ordinary people cannot invest in private companies', right: 'Anyone with $1 can own a piece of Apple, Tesla, or Amazon' },
        { left: 'No standard pricing — hard to know fair value', right: 'Transparent real-time prices for every public company' },
        { left: 'Illiquid — difficult to sell your stake quickly', right: 'Highly liquid — sell your shares in seconds during market hours' },
      ],
    },
    slotB: {
      type: 'true-false',
      heading: 'Market Mechanics — True or False?',
      statements: [
        { text: 'The NYSE and NASDAQ are the only two stock exchanges in the world.', answer: false, explanation: 'False. There are exchanges in 60+ countries — London, Tokyo, Hong Kong, and more. US markets are just the largest by total market cap.' },
        { text: 'The price you see for a stock is the price of the most recent completed trade.', answer: true, explanation: 'True. Every price is the last price at which a buyer and seller agreed. It\'s a live auction happening millions of times per second.' },
        { text: 'You can only buy stocks during regular 9:30 AM – 4:00 PM ET hours.', answer: false, explanation: 'False. Pre-market (4–9:30 AM) and after-hours (4–8 PM) trading exist, but with lower liquidity, wider spreads, and higher risk.' },
      ],
    },
    didYouKnow:
      'The first stock market was created in Amsterdam in 1602 for the Dutch East India Company — the world\'s first publicly traded company.',
    nextTitle: 'How Companies Go Public (IPO)',
    checkpointQuiz: [
      {
        q: 'The first stock market in history was created in...',
        options: ['New York, 1792', 'London, 1801', 'Amsterdam, 1602', 'Paris, 1724'],
        correct: 2,
        explanation: 'Amsterdam, 1602 — the Dutch East India Company needed to raise massive capital for trade expeditions and invented the concept of selling shares to the public. Markets haven\'t stopped since.',
      },
      {
        q: 'Regular US stock market trading hours are...',
        options: ['8:00 AM – 5:00 PM ET', '9:30 AM – 4:00 PM ET', '10:00 AM – 3:30 PM ET', '9:00 AM – 4:30 PM ET'],
        correct: 1,
        explanation: '9:30 AM to 4:00 PM Eastern Time, Monday through Friday. The opening bell at 9:30 AM is the most volatile minute of the trading day — everything is repriced at once.',
      },
      {
        q: 'The S&P 500 is best described as a market...',
        options: ['Single blue-chip stock', 'Government savings bond', 'Index — a basket of the 500 largest US company stocks', 'Cryptocurrency trading platform'],
        correct: 2,
        explanation: 'An index tracks a basket of stocks and measures overall market performance. The S&P 500 follows the 500 largest US companies by market cap — it\'s the benchmark everyone watches.',
      },
    ],
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
    slotA: {
      type: 'timeline',
      heading: 'The IPO Process',
      events: [
        { label: 'Months 1–3: Hire Underwriters', body: 'The company hires investment banks to manage the IPO. They evaluate the business, conduct due diligence, and structure the offering.' },
        { label: 'Months 3–6: File the S-1 Prospectus', body: 'A detailed public filing with the SEC containing all financials, risks, and business details. Required by law — investors read this before buying.' },
        { label: 'Month 6: The Roadshow', body: 'Executives tour major cities presenting to institutional investors to drum up demand and gauge what price the market will bear.' },
        { label: 'IPO Day: Price and List', body: 'Underwriters set the final price the night before. Shares open for public trading at 9:30 AM on the debut exchange. Chaos and opportunity.' },
        { label: 'Post-IPO: Lock-up Expiry', body: 'Insiders are locked out from selling for 90–180 days. When the lock-up expires, insider selling often creates predictable selling pressure.' },
      ],
    },
    slotB: {
      type: 'pros-cons',
      heading: 'Buying IPO Shares',
      pros: [
        'Potential to catch a major growth story early (Google, Amazon in their early days)',
        'IPO day momentum can drive sharp short-term gains',
        'Access to companies at their first public market valuation',
      ],
      cons: [
        'Most IPOs are priced above fair value — hype premium built in at issuance',
        '70% of IPOs trade below their debut price after one year',
        'No track record as a public company — limited data to analyze',
        'Lock-up expiry (90–180 days) creates predictable insider selling pressure',
        'Retail investors rarely get IPO allocation — usually buy at the secondary market top',
      ],
    },
    didYouKnow:
      "Google's 2004 IPO used an unusual auction format — anyone could bid, not just big banks. The stock opened at $85. It now trades above $150 post-split.",
    nextTitle: 'NYSE vs. NASDAQ',
    checkpointQuiz: [
      {
        q: 'IPO stands for...',
        options: ['International Portfolio Offering', 'Initial Private Offering', 'Index Price Optimization', 'Initial Public Offering'],
        correct: 3,
        explanation: 'Initial Public Offering — the first time a private company sells shares to the general public. It\'s the moment a private company becomes a publicly traded one.',
      },
      {
        q: 'The legal document filed with the SEC before an IPO is called a...',
        options: ['Term Sheet', 'Prospectus (S-1 filing)', 'Balance Sheet', 'Market Charter'],
        correct: 1,
        explanation: 'The Prospectus (S-1 filing with the SEC) discloses all financial details, risks, and business information. It\'s required by law — and the most important document to read before investing in any IPO.',
      },
      {
        q: 'Why do most IPOs drop below their debut price within one year?',
        options: ['Companies falsify their financials', 'IPOs are priced above fair value at peak hype — reality sets in later', 'The SEC forces the price down after 6 months', 'Underwriters always set prices too low intentionally'],
        correct: 1,
        explanation: 'IPO pricing captures maximum hype. Underwriters price at what the market will bear, often above intrinsic value. When hype fades and lock-up periods expire, selling pressure pushes prices down.',
      },
    ],
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
    slotA: {
      type: 'comparison',
      leftLabel: 'NYSE',
      rightLabel: 'NASDAQ',
      rows: [
        { left: 'Founded 1792 — oldest US exchange', right: 'Founded 1971 — first electronic exchange' },
        { left: 'Physical floor + human specialists', right: 'Fully electronic — no trading floor' },
        { left: 'Blue-chip industrials (Coke, Exxon)', right: 'Tech giants (Apple, Google, Meta)' },
        { left: 'Largest by market cap ($25T+)', right: 'Second largest by market cap ($20T+)' },
        { left: 'Higher listing requirements', right: 'Lower listing requirements — popular with IPOs' },
      ],
    },
    slotB: {
      type: 'scenario',
      setup: 'You\'re launching a high-growth software startup and it\'s time to IPO. Your company has $50M annual revenue, 200 employees, and a tech-savvy investor base. Which exchange makes more sense?',
      options: [
        { label: 'NYSE — it\'s the largest and most prestigious exchange', correct: false, explanation: 'NYSE favors established blue-chip companies with longer track records. A high-growth tech startup is unusual there. Stricter listing requirements and an industrial investor base make it a poor fit.' },
        { label: 'NASDAQ — the natural home for tech companies', correct: true, explanation: 'Correct! NASDAQ is the default for technology. Apple, Google, Meta, Amazon, Microsoft — all on NASDAQ. Lower listing requirements and a tech-focused investor base make it the obvious choice.' },
        { label: 'It doesn\'t matter — both exchanges are identical for investors', correct: false, explanation: 'They differ in trading infrastructure, listing requirements, typical industries, and investor base. Exchange choice sends a clear signal to the market about what kind of company you are.' },
      ],
    },
    didYouKnow:
      'The famous NYSE opening bell rings every trading day at 9:30 AM ET. Companies pay for the privilege of ringing it — it is a marketing event.',
    nextTitle: 'How to Read a Stock Quote',
    checkpointQuiz: [
      {
        q: 'Which US stock exchange has a physical trading floor with human specialists?',
        options: ['NASDAQ — it has the largest floor in New York', 'NYSE — located at 11 Wall Street', 'Both exchanges have physical floors', 'Neither — all US trading is fully electronic'],
        correct: 1,
        explanation: 'NYSE has a famous physical trading floor at 11 Wall Street with specialist firms that facilitate trading. NASDAQ is fully electronic — no floor, no humans matching trades.',
      },
      {
        q: 'Apple, Alphabet (Google), and Meta all list their shares on...',
        options: ['NYSE', 'London Stock Exchange', 'NASDAQ', 'Both NYSE and NASDAQ'],
        correct: 2,
        explanation: 'NASDAQ is the home of Big Tech. Apple (AAPL), Alphabet (GOOGL/GOOG), Meta (META), Microsoft (MSFT), and Amazon (AMZN) all trade on NASDAQ.',
      },
      {
        q: 'A Market Maker is...',
        options: ['The CEO of a stock exchange', 'A firm that always stands ready to buy or sell a stock, keeping the market liquid', 'A government regulator who sets stock prices', 'The person who rings the NYSE opening bell each day'],
        correct: 1,
        explanation: 'Market makers post continuous bid and ask quotes, ensuring you can always buy or sell. Without them, you might submit a buy order and find no seller at all. They profit from the bid-ask spread.',
      },
    ],
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
    slotA: {
      type: 'stat-block',
      stats: [
        { value: '<$2B', label: 'Small cap', sub: 'biggest % movers for momentum traders' },
        { value: '$2–10B', label: 'Mid cap', sub: 'balance of growth and stability' },
        { value: '$10B+', label: 'Large cap', sub: 'slow-moving — institutional names' },
      ],
    },
    slotB: {
      type: 'pros-cons',
      heading: 'Small cap vs large cap for momentum trading',
      pros: [
        'Massive % gains possible in a single session',
        'Less institutional coverage = more inefficiency to exploit',
        'Catalyst-driven moves are sharper and faster',
        'Lower price per share = more shares for same dollar risk',
      ],
      cons: [
        'Wide spreads = higher cost to enter and exit',
        'Thin liquidity = slippage on large share sizes',
        'Can crash as fast as it rises — risk is high',
        'Harder to find reliable data and analyst coverage',
      ],
    },
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
    slotA: {
      type: 'comparison',
      leftLabel: 'Bull Market',
      rightLabel: 'Bear Market',
      rows: [
        { left: '20%+ rise from a recent low', right: '20%+ decline from a recent high' },
        { left: 'Avg duration: ~5 years', right: 'Avg duration: ~10 months' },
        { left: 'Avg gain: +150%+', right: 'Avg loss: -35%' },
        { left: 'Momentum longs dominate', right: 'Short-selling opportunities emerge' },
        { left: 'Easy — just ride the wave', right: 'Brutal — requires discipline and hedging' },
      ],
    },
    slotB: {
      type: 'true-false',
      heading: 'True or false?',
      statements: [
        { text: 'The average bear market lasts longer than the average bull market.', answer: false, explanation: 'Bears average ~10 months. Bulls average ~5 years. Bears are shorter but feel longer because losses hurt more than gains feel good.' },
        { text: 'A "correction" is defined as a 20% or more decline from a recent high.', answer: false, explanation: 'A correction is a 10–20% decline. A 20%+ decline is a full bear market. Corrections are common — bear markets are rarer.' },
        { text: 'Momentum traders can profit in both bull and bear markets.', answer: true, explanation: 'Long momentum in bull markets, short momentum in bear markets. The strategies differ but the skill — finding explosive moves — is the same.' },
        { text: 'The fastest bear market ever was March 2020 — a 33% crash in 33 days.', answer: true, explanation: 'The COVID crash was the fastest bear market in history. The S&P 500 recovered fully within 5 months.' },
      ],
    },
    dykStyle: 'data',
    didYouKnow:
      'The longest bull market in history ran from March 2009 to February 2020 — nearly 11 years, gaining over 400%. It ended in exactly 33 days when COVID hit.',
    nextTitle: 'What Drives Stock Prices?',
    checkpointQuiz: [
      {
        q: 'A bear market is technically defined as a decline of what percentage or more?',
        options: ['5% — any meaningful pullback', '10% — same as a correction', '20% — sustained decline from a recent high', '50% — only extreme crashes qualify'],
        correct: 2,
        explanation: 'A 20%+ decline from a recent high over a sustained period = bear market. A 10–20% decline is called a "correction." The distinction matters for adjusting your momentum strategy.',
      },
      {
        q: 'Which was the fastest bear market in modern history?',
        options: ['The 2008 Financial Crisis', 'The 2000 Dot-com crash', 'The COVID crash in March 2020', 'The 1987 Black Monday crash'],
        correct: 2,
        explanation: 'March 2020 — a 33% collapse in just 33 days. The S&P 500 then recovered fully within 5 months, making it also one of the fastest recoveries. Speed in both directions.',
      },
      {
        q: 'Momentum traders can profit in a bear market primarily by...',
        options: ['Buying and holding blue-chip dividend stocks', 'Short-selling stocks that are declining sharply', 'Switching entirely to government bonds', 'Ignoring the market until it fully recovers'],
        correct: 1,
        explanation: 'Short-selling lets you profit when stocks fall. In bear markets, momentum shifts from long to short setups. The skill is the same — find explosive moves — only the direction changes.',
      },
    ],
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
  {
    id: 11,
    title: 'Supply & Demand in the Market',
    subtitle: 'The single force that moves every stock price, every second.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'More buyers than sellers = price goes up.',
    coreBody:
      'Every price movement is supply and demand in action. When a company announces great earnings, demand spikes — buyers flood in faster than sellers can keep up, so price rises. When bad news hits, supply overwhelms demand — sellers dump shares and price falls. Understanding this is the foundation of every trade you will ever make.',
    facts: [
      { icon: '⚖️', text: 'Price is always finding the level where buyers and sellers agree to trade.' },
      { icon: '📣', text: 'News, earnings, and rumors all instantly shift the supply/demand balance.' },
      { icon: '🔁', text: 'Momentum traders profit by getting in early when demand is just starting to surge.' },
    ],
    vocab: [
      {
        term: 'Bid',
        definition: 'The highest price a buyer is currently willing to pay for a stock.',
      },
      {
        term: 'Ask',
        definition: 'The lowest price a seller is currently willing to accept for a stock.',
      },
      {
        term: 'Spread',
        definition: 'The gap between the bid and ask price. The tighter the spread, the more liquid the stock.',
      },
    ],
    slotA: {
      type: 'before-after',
      leftLabel: 'Before catalyst',
      rightLabel: 'After catalyst',
      leftItems: [
        'Stock flat at $20 for 3 days',
        'Volume: 200K shares/day (avg)',
        'Balanced buyers and sellers',
        'Spread: $0.02',
        'No news, no catalyst',
      ],
      rightItems: [
        'FDA approval announced 8 AM',
        'Pre-market volume: 2M shares (10×)',
        'Buyers overwhelm sellers 10:1',
        'Price gaps to $28 (+40%)',
        'Spread widens to $0.25 at open',
      ],
    },
    slotB: {
      type: 'steps',
      heading: 'The supply/demand cycle in real time',
      steps: [
        { num: 1, title: 'Catalyst hits', body: 'News creates an imbalance. Buyers flood in faster than sellers can provide shares.' },
        { num: 2, title: 'Price rises', body: 'Sellers raise their asks. The bid chases upward. Every new trade prints at a higher price.' },
        { num: 3, title: 'Momentum builds', body: 'Rising price attracts more buyers. Volume accelerates. RVOL spikes above 5×.' },
        { num: 4, title: 'Supply dries up', body: 'Sellers have filled their orders. Asks thin out above — a potential gap forms.' },
        { num: 5, title: 'Equilibrium restores', body: 'New supply meets demand at the new higher level. Price stabilizes. Volume declines.' },
      ],
    },
    didYouKnow:
      "During the 2021 meme stock frenzy, GameStop's bid-ask spread briefly hit $10 wide — meaning buyers and sellers were $10 per share apart on a stock worth ~$200. Pure chaos.",
    nextTitle: 'What is a Broker?',
  },
  {
    id: 12,
    title: 'What is a Broker?',
    subtitle: 'The middleman between you and the stock market.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'A broker is your gateway to the market.',
    coreBody:
      'You cannot walk onto the NYSE floor and buy stocks yourself. You need a broker — a licensed firm that executes trades on your behalf. Today most brokers are apps on your phone. You deposit money, place an order, and the broker routes it to the exchange in milliseconds. Most retail brokers now charge $0 commission.',
    facts: [
      { icon: '📱', text: 'Popular brokers: TD Ameritrade, Webull, Interactive Brokers, Robinhood.' },
      { icon: '🆓', text: 'Commission-free trading became standard after Robinhood launched in 2013.' },
      { icon: '⚡', text: 'Momentum traders need a broker with fast executions — milliseconds matter.' },
    ],
    vocab: [
      {
        term: 'Broker',
        definition: 'A licensed firm or platform that executes buy and sell orders on your behalf.',
      },
      {
        term: 'Commission',
        definition: 'A fee charged per trade. Most retail brokers now charge $0, making them free to use.',
      },
      {
        term: 'Account',
        definition: 'Your brokerage account holds your cash and securities. Cash accounts and margin accounts are the two main types.',
      },
    ],
    didYouKnow:
      'Before 1975, US stock commissions were fixed by law. Trading 100 shares cost the same at every broker. Deregulation sparked a price war that eventually led to $0 commissions today.',
    nextTitle: 'Types of Orders: Market, Limit & Stop',
  },
  {
    id: 13,
    title: 'Types of Orders: Market, Limit & Stop',
    subtitle: 'The three orders every trader must know before placing a single trade.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'Three tools, three different jobs.',
    coreBody:
      'A market order fills immediately at whatever the current price is — fast but imprecise. A limit order fills only at your specified price or better — precise but may not fill. A stop order triggers a market order once price hits a level — used to cut losses automatically. Knowing which to use and when separates disciplined traders from gamblers.',
    facts: [
      { icon: '🏃', text: 'Market orders guarantee execution but not price — avoid them on illiquid stocks.' },
      { icon: '🎯', text: 'Limit orders give you price control but risk missing the trade entirely.' },
      { icon: '🛑', text: 'Stop-loss orders are the most important risk management tool a trader has.' },
    ],
    vocab: [
      {
        term: 'Market Order',
        definition: 'Buy or sell immediately at the best available price. Fast — but you get whatever price the market gives.',
      },
      {
        term: 'Limit Order',
        definition: 'Buy or sell only at your specified price or better. You control the price, but the order may not fill.',
      },
      {
        term: 'Stop Order',
        definition: 'Becomes a market order once price reaches a trigger level. Used to automatically exit a losing trade.',
      },
    ],
    slotA: {
      type: 'alert-trio',
      items: [
        { accent: '#3b82f6', icon: '🏃', heading: 'Market Order', body: 'Fills immediately at the best available price. Fast but imprecise — on a thin stock, you may fill $0.50+ away from the quote.' },
        { accent: '#00ff88', icon: '🎯', heading: 'Limit Order', body: 'Fills only at your specified price or better. You control the entry cost but risk missing the trade if price moves away.' },
        { accent: '#ef4444', icon: '🛑', heading: 'Stop Order', body: 'Triggers a market order when price hits your stop level. Your primary risk management tool — it exits a losing trade automatically.' },
      ],
    },
    slotB: {
      type: 'steps',
      heading: 'How to use a stop-loss correctly',
      steps: [
        { num: 1, title: 'Enter with a limit order', body: 'Place your buy at your planned entry price. Limit orders control slippage at the open.' },
        { num: 2, title: 'Set your stop-loss immediately', body: 'Before the trade even moves, decide where you are wrong and set your stop there.' },
        { num: 3, title: 'Size based on stop distance', body: 'Position size = (Max $ risk) ÷ (Entry − Stop). Never risk more than your plan allows.' },
        { num: 4, title: 'Let the stop work', body: 'If your stop level hits, the order triggers automatically. No emotion. No hesitation.' },
        { num: 5, title: 'Trail as the trade works', body: 'As price rises, move your stop up to lock in gains. Never move it further away from entry.' },
      ],
    },
    dykStyle: 'mistake',
    didYouKnow:
      "On May 6, 2010 — the 'Flash Crash' — market orders sent during the chaos filled at pennies. Stocks worth $40 executed at $0.01. Market orders on volatile stocks are dangerous.",
    nextTitle: 'Bid, Ask & the Spread',
  },
  {
    id: 14,
    title: 'Bid, Ask & the Spread',
    subtitle: 'The hidden cost of every trade — and why it matters more than commission.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'The spread is the market\'s toll booth.',
    coreBody:
      'Every stock has two prices: the bid (what buyers will pay) and the ask (what sellers want). The spread is the gap between them. When you buy at the ask and immediately sell at the bid, you lose the spread. On liquid stocks like AAPL, the spread is $0.01. On thin small caps, it can be $0.50 or more — a hidden cost that matters enormously for momentum traders.',
    facts: [
      { icon: '💸', text: 'A $0.50 spread on a 1,000-share trade costs you $500 before the stock even moves.' },
      { icon: '🔬', text: 'AAPL and SPY often trade with a $0.01 spread — extremely liquid.' },
      { icon: '⚠️', text: 'Wide spreads signal low liquidity — harder to enter and exit cleanly.' },
    ],
    vocab: [
      {
        term: 'Bid',
        definition: 'The highest price a buyer is willing to pay right now. You sell at (or near) the bid.',
      },
      {
        term: 'Ask',
        definition: 'The lowest price a seller will accept right now. You buy at (or near) the ask.',
      },
      {
        term: 'Spread',
        definition: 'Ask minus bid. This is the immediate cost of entering a trade — even before commission.',
      },
    ],
    slotA: {
      type: 'stat-block',
      stats: [
        { value: '$0.01', label: 'Spread on AAPL / SPY', sub: 'liquid large-cap — nearly invisible cost' },
        { value: '$0.50+', label: 'Spread on thin small-caps', sub: 'volatile momentum stocks at the open' },
        { value: '$500', label: 'Hidden cost', sub: '1,000 shares × $0.50 spread, before commissions' },
      ],
    },
    slotB: {
      type: 'diagram',
      heading: 'Bid vs Ask — the spread visualized',
      svgContent: `<svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="180" fill="#0f0f14" rx="8"/>
  <rect x="20" y="40" width="110" height="90" rx="8" fill="#00ff8812" stroke="#00ff8840" stroke-width="1"/>
  <rect x="190" y="40" width="110" height="90" rx="8" fill="#ef444412" stroke="#ef444440" stroke-width="1"/>
  <text x="75" y="30" fill="#00ff88" font-size="11" font-family="monospace" text-anchor="middle" font-weight="600">BID</text>
  <text x="245" y="30" fill="#ef4444" font-size="11" font-family="monospace" text-anchor="middle" font-weight="600">ASK</text>
  <text x="75" y="72" fill="#00ff88" font-size="22" font-family="monospace" text-anchor="middle" font-weight="700">$24.85</text>
  <text x="75" y="92" fill="#9ca3af" font-size="11" font-family="monospace" text-anchor="middle">buyers pay here</text>
  <text x="75" y="110" fill="#9ca3af" font-size="10" font-family="monospace" text-anchor="middle">you SELL at bid</text>
  <text x="245" y="72" fill="#ef4444" font-size="22" font-family="monospace" text-anchor="middle" font-weight="700">$24.86</text>
  <text x="245" y="92" fill="#9ca3af" font-size="11" font-family="monospace" text-anchor="middle">sellers want here</text>
  <text x="245" y="110" fill="#9ca3af" font-size="10" font-family="monospace" text-anchor="middle">you BUY at ask</text>
  <line x1="130" y1="85" x2="190" y2="85" stroke="#2d2d3d" stroke-width="1"/>
  <text x="160" y="79" fill="#eab308" font-size="10" font-family="monospace" text-anchor="middle">$0.01</text>
  <text x="160" y="92" fill="#eab308" font-size="9" font-family="monospace" text-anchor="middle">SPREAD</text>
  <text x="160" y="150" fill="#9ca3af" font-size="10" font-family="monospace" text-anchor="middle">Buy at ask → sell at bid = instant loss of spread</text>
  <text x="160" y="166" fill="#9ca3af" font-size="10" font-family="monospace" text-anchor="middle">Stock must move UP before you break even</text>
</svg>`,
      caption: 'You always buy at the ask (higher) and sell at the bid (lower).',
    },
    didYouKnow:
      "Before 2001, US stocks were quoted in 1/8 increments ($0.125 minimum spread). Decimalization crushed spreads to $0.01 on major stocks, saving retail traders billions annually.",
    nextTitle: 'What is Volume?',
  },
  {
    id: 15,
    title: 'What is Volume?',
    subtitle: 'The number that tells you how much conviction is behind a price move.',
    section: 'Section 1 · Stock Fundamentals',
    sectionColor: '#10b981',
    coreHeading: 'Price tells you what. Volume tells you how much people care.',
    coreBody:
      'Volume is the total number of shares traded during a period. A stock jumping 10% on 10x normal volume is a real move — institutions are involved. The same move on low volume might be a fake-out with no follow-through. For momentum traders, volume is the fuel. No volume = no momentum. High volume = the crowd is here.',
    facts: [
      { icon: '📊', text: 'Average daily volume (ADV) is the benchmark — compare today\'s volume to the average.' },
      { icon: '🔥', text: 'Relative volume (RVOL) of 5x or higher is a strong momentum signal.' },
      { icon: '😴', text: 'Low-volume moves often reverse quickly — the move has no conviction behind it.' },
    ],
    vocab: [
      {
        term: 'Volume',
        definition: 'The total number of shares traded in a given time period (day, hour, minute).',
      },
      {
        term: 'ADV',
        definition: 'Average Daily Volume — the typical number of shares traded per day over the past 30 days.',
      },
      {
        term: 'RVOL',
        definition: 'Relative Volume — today\'s volume divided by ADV. RVOL of 3 means 3x normal trading activity.',
      },
    ],
    slotA: {
      type: 'leaderboard',
      heading: 'Relative volume (RVOL) signal strength',
      items: [
        { rank: 1, label: 'RVOL 10×+', sub: 'Extreme momentum — institutional involvement certain', pct: 95, color: '#00ff88' },
        { rank: 2, label: 'RVOL 3–5×', sub: 'Strong momentum — worth a close look', pct: 65, color: '#3b82f6' },
        { rank: 3, label: 'RVOL 1.5–2×', sub: 'Mildly elevated — confirm with price action', pct: 35, color: '#f97316' },
        { rank: 4, label: 'RVOL < 1×', sub: 'Below average — no momentum, likely to fade', pct: 10, color: '#ef4444' },
      ],
    },
    slotB: {
      type: 'scenario',
      setup: 'RXMD is up 45% today. At 10:00 AM you check volume — it has already traded 8× its average daily volume with 3 hours of trading left. What does this most likely tell you?',
      options: [
        { label: 'The move is over — high volume always signals the top', correct: false, explanation: 'High volume alone does not mean the top. Volume confirms participation. A top requires other signals: loss of momentum, reversal candle, T&S drying up.' },
        { label: 'Institutional buyers are participating — the move has real backing', correct: true, explanation: 'Correct. 8× RVOL means far more than retail traders are involved. Institutions are executing large orders — this gives the move credibility.' },
        { label: 'The stock is being manipulated — normal stocks do not have 8× volume', correct: false, explanation: 'Extreme RVOL is completely normal on strong catalysts. GME traded 40× normal volume during its squeeze. Volume reflects interest, not manipulation.' },
      ],
    },
    dykStyle: 'data',
    didYouKnow:
      "On the day of GameStop's biggest move (Jan 27, 2021), GME traded 93 million shares — roughly 40 times its average daily volume. That's what extreme momentum looks like.",
    nextTitle: 'Market Hours: Pre-Market, Regular & After-Hours',
  },
  {
    id: 16,
    title: 'Market Hours: Pre-Market, Regular & After-Hours',
    subtitle: 'The market never truly sleeps — but the best action happens at specific times.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'Three sessions, three different beasts.',
    coreBody:
      'The regular session runs 9:30 AM – 4:00 PM ET — this is when most volume and price action happens. Pre-market trading starts as early as 4:00 AM ET and runs until 9:30 AM. After-hours trading runs 4:00 PM – 8:00 PM ET. Both extended sessions have thin volume, wide spreads, and exaggerated moves. Momentum traders use pre-market to find their targets — and the open is when they strike.',
    facts: [
      { icon: '🌅', text: 'Pre-market: 4:00 AM – 9:30 AM ET. Earnings releases often drop here.' },
      { icon: '⚡', text: 'Regular session: 9:30 AM – 4:00 PM ET. 90% of volume happens here.' },
      { icon: '🌙', text: 'After-hours: 4:00 PM – 8:00 PM ET. Moves here often reverse at the open.' },
    ],
    vocab: [
      {
        term: 'Pre-Market',
        definition: 'Trading that occurs before 9:30 AM ET. Low volume, wide spreads, but critical for spotting momentum setups.',
      },
      {
        term: 'Regular Session',
        definition: 'The main trading window — 9:30 AM to 4:00 PM ET, Monday through Friday.',
      },
      {
        term: 'After-Hours',
        definition: 'Trading after 4:00 PM ET. Earnings often move stocks here, but liquidity is thin.',
      },
    ],
    didYouKnow:
      "NYSE and NASDAQ are closed on 9 federal holidays per year. But futures markets (S&P 500 futures, for example) trade nearly 24 hours a day, 6 days a week.",
    nextTitle: 'Why Pre-Market Matters for Momentum Traders',
  },
  {
    id: 17,
    title: 'Why Pre-Market Matters for Momentum Traders',
    subtitle: 'The hour before the open is where the day\'s best trades are born.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'The pre-market is your morning brief.',
    coreBody:
      'Before 9:30 AM, institutional traders, algorithms, and retail traders react to overnight news. Stocks that gap up significantly on heavy pre-market volume often continue higher at the open — this is the gap-and-go setup. Momentum traders scan the pre-market gappers list every morning, identify the top 2–3 stocks with a real catalyst, and have a plan before the bell rings.',
    facts: [
      { icon: '🔍', text: 'Top pre-market gappers are stocks up 5%+ before the open with real volume.' },
      { icon: '📰', text: 'Earnings, FDA results, and merger news are the most powerful pre-market catalysts.' },
      { icon: '⏰', text: 'Most momentum traders start their pre-market scan between 8:00 and 9:00 AM ET.' },
    ],
    vocab: [
      {
        term: 'Gapper',
        definition: 'A stock that opens significantly higher or lower than it closed the prior day due to overnight news.',
      },
      {
        term: 'Gap Up',
        definition: 'When a stock opens above its previous close. Strong gap ups with volume often continue higher.',
      },
      {
        term: 'Catalyst',
        definition: 'The specific event causing the gap — earnings beat, FDA approval, short squeeze, analyst upgrade.',
      },
    ],
    slotA: {
      type: 'checklist',
      heading: 'Pre-market routine — complete before 9:25 AM',
      items: [
        'Run gappers scan — filter for stocks up 5%+ with real catalyst',
        'Verify the catalyst is material (earnings, FDA, news — not just a rumor)',
        'Check pre-market volume — at least 100K shares traded',
        'Identify key price levels from yesterday\'s chart',
        'Define your entry, stop-loss, and max share size',
        'Have your order typed and ready — no improvising at the open',
      ],
    },
    slotB: {
      type: 'scenario',
      setup: 'It is 8:30 AM. BNTX is up 18% pre-market on a surprise FDA approval. Volume is already 5× average. You have $10,000 to risk. What is the MOST important thing to do before 9:30 AM?',
      options: [
        { label: 'Set a price alert so you remember to buy at the open', correct: false, explanation: 'A price alert is reactive — it tells you when price hits a level but gives you no plan. You need entry, stop, and size defined before the bell.' },
        { label: 'Define your entry price, stop-loss level, and max share size before the bell', correct: true, explanation: 'Correct. The open is too chaotic to make decisions in real time. Your plan must be complete before 9:30 AM — execution only at the bell.' },
        { label: 'Buy shares immediately in pre-market to get the best price', correct: false, explanation: 'Pre-market has wide spreads and extreme slippage on gappers. You could pay $1–$2 more per share than the 9:30 AM open price. Wait for the regular session.' },
      ],
    },
    dykStyle: 'pro-tip',
    didYouKnow:
      'Studies show that stocks gapping up more than 4% on above-average pre-market volume continue higher at the open more than 60% of the time — making gap-and-go one of the most reliable momentum strategies.',
    nextTitle: 'The Opening Bell: 9:30 AM ET',
    checkpointQuiz: [
      {
        q: 'Pre-market gappers are typically filtered for stocks that are up at least what percentage before the open?',
        options: ['1% — any meaningful move qualifies', '2% — the minimum gap level', '5% — signals real momentum behind a catalyst', '10% — only the most extreme movers'],
        correct: 2,
        explanation: '5%+ pre-market is the common filter. A 5% gap signals a material catalyst with real money behind it. Smaller moves often fill before or at the open — not worth the risk.',
      },
      {
        q: 'Which type of pre-market catalyst drives the most reliable gap-and-go setups?',
        options: ['CEO tweets about a new product launch', 'A minor analyst price target raise', 'Earnings beat or FDA drug approval — binary, institutional-forcing events', 'The stock hitting a technical chart resistance level'],
        correct: 2,
        explanation: 'Earnings beats and FDA approvals are binary events that force institutional investors to act — creating real volume and sustained momentum. Analyst tweaks and social media posts are noise that fills fast.',
      },
      {
        q: 'Before 9:30 AM on a gap-and-go setup, the MOST important thing to complete is...',
        options: ['Buy shares in pre-market to lock in the lowest entry price', 'Read every news article written about the company this week', 'Define your entry price, stop-loss level, and max share size', 'Set a price alert on your phone so you remember to buy'],
        correct: 2,
        explanation: 'Pre-market buying has wide spreads and slippage. The 9:30 AM open is too chaotic for real-time decisions. Your complete plan — entry, stop, size — must be set before the bell. You execute the plan; you don\'t create it live.',
      },
    ],
  },
  {
    id: 18,
    title: 'The Opening Bell: 9:30 AM ET',
    subtitle: 'The most volatile, most important minute of the entire trading day.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'The first candle sets the tone for the whole day.',
    coreBody:
      'At exactly 9:30 AM ET the market opens and all the overnight orders, emotions, and anticipation are unleashed at once. The first 5–15 minutes are the most chaotic — spreads are wide, volume is extreme, and prices move fast. Experienced momentum traders look for stocks making new highs in the first minutes of trading. That early strength often signals a trend that can run for hours.',
    facts: [
      { icon: '🔔', text: 'The NYSE opening bell has rung every trading day since 1903.' },
      { icon: '💥', text: 'More volume trades in the first 30 minutes than any other 30-minute window of the day.' },
      { icon: '📐', text: 'The "opening range" (first 5–15 min high/low) is a key reference point all day.' },
    ],
    vocab: [
      {
        term: 'Opening Range',
        definition: 'The high and low established in the first 5–15 minutes after the open. A breakout above this is a key signal.',
      },
      {
        term: 'First Candle',
        definition: 'The 1-minute or 5-minute candlestick from 9:30–9:31 (or 9:35). Sets the initial tone.',
      },
      {
        term: 'HOD',
        definition: 'High of Day — the highest price the stock has traded at since the open. Breaking HOD is a momentum signal.',
      },
    ],
    didYouKnow:
      'The phrase "sell in May and go away" exists because summer months historically have lower volume and less volatility at the open — momentum strategies work best in high-volume market conditions.',
    nextTitle: 'What is a Catalyst?',
  },
  {
    id: 19,
    title: 'What is a Catalyst?',
    subtitle: 'The spark that ignites a momentum move — without it, there is no trade.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'No catalyst, no trade.',
    coreBody:
      'A catalyst is the specific event that causes a sudden change in supply and demand. Without a catalyst, a stock moving 10% is suspicious and likely to reverse. With a strong catalyst — a surprise earnings beat, an FDA drug approval, a short squeeze — that same move has conviction and can run much further. Momentum traders always ask: "What is the catalyst?" before entering any trade.',
    facts: [
      { icon: '💊', text: 'FDA drug approvals can send biotech stocks up 50–200% in a single session.' },
      { icon: '📈', text: 'Earnings beats with strong guidance are the most common catalyst for large-cap gappers.' },
      { icon: '🧨', text: 'Shorts covering (buying to close positions) can turbocharge an already-moving stock.' },
    ],
    vocab: [
      {
        term: 'Catalyst',
        definition: 'A specific event that triggers a sharp change in a stock\'s supply/demand balance and price.',
      },
      {
        term: 'FDA Approval',
        definition: 'When the FDA approves a drug for sale. One of the most powerful single-day catalysts in the market.',
      },
      {
        term: 'Short Squeeze',
        definition: 'When a heavily shorted stock rises, forcing short sellers to buy back shares — accelerating the move.',
      },
    ],
    slotA: {
      type: 'alert-trio',
      items: [
        { accent: '#00ff88', icon: '💊', heading: 'FDA Drug Approval', body: 'Sends biotech stocks up 50–200% in a session. The most powerful single-day catalyst in the market — binary outcome, maximum volatility.' },
        { accent: '#3b82f6', icon: '📈', heading: 'Earnings Beat + Guidance Raise', body: 'When results AND the future outlook exceed expectations, institutions pile in. The most common catalyst for large-cap momentum gaps.' },
        { accent: '#f97316', icon: '🧨', heading: 'Short Squeeze Trigger', body: 'High short interest + positive catalyst = feedback loop. Shorts covering amplifies every uptick — the move becomes self-reinforcing.' },
      ],
    },
    slotB: {
      type: 'myth-buster',
      myths: [
        { myth: 'You need to predict the catalyst before it happens to profit from it.', reality: 'Momentum traders react to catalysts — they do not predict them. The second wave (after the algo reaction) is where retail edge lives. Speed of reaction, not prediction.' },
        { myth: 'Any news is a good catalyst for a momentum trade.', reality: 'The catalyst must be material — something that genuinely changes the outlook. Small news on low volume creates fake moves that reverse fast. Ask: does this change the fundamental story?' },
      ],
    },
    didYouKnow:
      "Moderna's stock rose 30% on a single day in May 2020 when it released early COVID vaccine data. That's a catalyst-driven momentum trade — news so significant that supply disappeared.",
    nextTitle: 'Earnings Reports & Their Impact',
  },
  {
    id: 20,
    title: 'Earnings Reports & Their Impact',
    subtitle: 'Four times a year, every public company reveals how it actually did.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'Earnings are the biggest scheduled catalyst on the calendar.',
    coreBody:
      'Every quarter, public companies report their revenue, profit, and guidance for the future. If results beat expectations, the stock usually gaps up. If they miss, it gaps down. The size of the move depends on how big the surprise is and how much the market expected it. Momentum traders watch the earnings calendar closely — the best gap-and-go setups often happen the morning after an earnings beat.',
    facts: [
      { icon: '📅', text: 'Earnings season runs for about 3 weeks after each quarter ends — January, April, July, October.' },
      { icon: '🎯', text: '"Beating estimates" means reporting higher revenue or EPS than Wall Street analysts predicted.' },
      { icon: '📉', text: 'Even strong earnings can cause a stock to drop if guidance (future outlook) disappoints.' },
    ],
    vocab: [
      {
        term: 'EPS',
        definition: 'Earnings Per Share — the company\'s profit divided by its number of shares. The most watched earnings number.',
      },
      {
        term: 'Guidance',
        definition: 'The company\'s own forecast for the next quarter. Often matters more than the actual results.',
      },
      {
        term: 'Whisper Number',
        definition: 'The unofficial earnings expectation among traders — often higher than analyst estimates.',
      },
    ],
    slotA: {
      type: 'comparison',
      leftLabel: 'Earnings Beat',
      rightLabel: 'Earnings Miss',
      rows: [
        { left: 'EPS above analyst estimates', right: 'EPS below analyst estimates' },
        { left: 'Gap up 5–30% typical', right: 'Gap down 5–30% typical' },
        { left: 'Momentum long setup', right: 'Short or fade setup' },
        { left: 'Institutions accumulating', right: 'Institutions distributing' },
        { left: 'Guidance raise amplifies the move', right: 'Guidance cut makes it worse' },
      ],
    },
    slotB: {
      type: 'true-false',
      heading: 'True or false?',
      statements: [
        { text: 'A company can beat earnings estimates and still have its stock drop.', answer: true, explanation: 'If forward guidance (the future outlook) disappoints, the stock can gap down even on a beat. The market prices the future, not the past.' },
        { text: 'Earnings are released four times per year — once per quarter.', answer: true, explanation: 'Every public company reports quarterly. Earnings seasons cluster in January, April, July, and October.' },
        { text: 'The "whisper number" is the official analyst consensus estimate.', answer: false, explanation: 'The whisper number is the unofficial street expectation — often higher than analyst consensus. Beat the whisper and you get a bigger move.' },
        { text: 'After-hours earnings moves always hold when the regular session opens.', answer: false, explanation: 'Many after-hours moves partially or fully reverse at the open, especially on weak volume. Always wait to see how the market opens.' },
      ],
    },
    dykStyle: 'data',
    didYouKnow:
      "Meta (Facebook) lost $232 billion in market cap in a single day — February 3, 2022 — after missing earnings estimates. The largest single-day market cap loss in US history.",
    nextTitle: 'News & Stock Reactions',
  },
  {
    id: 21,
    title: 'News & Stock Reactions',
    subtitle: 'Why the stock moves before you finish reading the headline.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'The market prices in news before you finish reading the headline.',
    coreBody: 'Algos react in under 1ms; momentum traders hunt the second (human) wave that follows. Your edge is reading whether the move has legs, not being first.',
    facts: [
      { icon: '⚡', text: 'Algorithms react in under 1ms — retail traders cannot compete on speed.' },
      { icon: '🌊', text: 'The second wave is where momentum traders operate — reading if the move has legs.' },
      { icon: '📊', text: 'Volume after the spike confirms whether the move is real or fading.' },
    ],
    vocab: [
      { term: 'Algo', definition: 'An algorithm — a computer program that automatically trades based on pre-set rules.' },
      { term: 'Secondary Wave', definition: 'The human reaction that follows the initial algorithmic response to news.' },
      { term: 'News Fade', definition: 'When a stock moves on news but then reverses as volume dries up.' },
    ],
    slotA: {
      type: 'stat-block',
      stats: [
        { value: '<1ms', label: 'Algo reaction time', sub: 'to news hitting the wire' },
        { value: '50%+', label: 'Avg FDA approval move', sub: 'first-day price change' },
        { value: '3 min', label: 'Second-wave window', sub: 'typical human reaction lag' },
      ],
    },
    slotB: {
      type: 'true-false',
      heading: 'True or false?',
      statements: [
        { text: 'Being first to see news gives retail traders an advantage over institutions.', answer: false, explanation: 'Algos read news in microseconds. Retail advantage is reading the secondary wave, not being first.' },
        { text: 'A stock can still be a good momentum trade after the initial news spike.', answer: true, explanation: 'The second wave (human reaction) is exactly where momentum traders operate.' },
        { text: 'All news events cause permanent price changes.', answer: false, explanation: 'Many moves revert within hours, especially on low volume.' },
        { text: 'Volume after the news spike confirms whether the move is real.', answer: true, explanation: 'High sustained volume means institutions are participating — the move has legs.' },
      ],
    },
    dykStyle: 'data',
    didYouKnow: 'A fake AP tweet about a White House bombing (2013) crashed the S&P 500 150 points in 90 seconds — then fully recovered. Algos read the tweet before humans could verify it.',
    nextTitle: 'Short Selling',
  },
  {
    id: 22,
    title: 'Short Selling',
    subtitle: 'How traders profit when a stock falls.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'Sell first, buy back later — hopefully cheaper.',
    coreBody: 'Borrow shares → sell → wait for drop → cover at lower price → return shares, keep difference. Risk: losses are theoretically unlimited because a stock can rise forever.',
    facts: [
      { icon: '📉', text: 'Short sellers profit when a stock falls — they sell what they do not own.' },
      { icon: '💸', text: 'Borrow fees on hard-to-short stocks can exceed 200% annually.' },
      { icon: '⚠️', text: 'Losses are unlimited — if the stock rises instead of falls, there is no ceiling.' },
    ],
    vocab: [
      { term: 'Short Sell', definition: 'Borrowing shares and selling them, expecting to buy them back cheaper later.' },
      { term: 'Cover', definition: 'Buying back shares to close a short position.' },
      { term: 'Borrow Fee', definition: 'The daily interest charged for borrowing shares to short sell.' },
    ],
    slotA: {
      type: 'alert-trio',
      items: [
        { accent: '#ef4444', icon: '🔴', heading: 'Unlimited Downside Risk', body: 'Unlike buying, short-selling losses have no ceiling. Short at $10, stock goes to $1,000 — you owe $990 per share.' },
        { accent: '#eab308', icon: '⚠️', heading: 'Borrow Fees Add Up', body: 'Hard-to-borrow stocks charge 50–300%+ annual borrow fees that accrue daily regardless of whether the stock moves.' },
        { accent: '#3b82f6', icon: '📋', heading: 'Locate First', body: 'Your broker must locate shares to lend before you can short. Naked shorting (without locating) is illegal.' },
      ],
    },
    slotB: {
      type: 'steps',
      heading: 'How a short sale works',
      steps: [
        { num: 1, title: 'Borrow shares', body: 'Your broker locates shares from another account to lend you.' },
        { num: 2, title: 'Sell immediately', body: 'You sell the borrowed shares at the current market price.' },
        { num: 3, title: 'Wait for price to fall', body: 'You now hold a short position — you profit if the stock drops.' },
        { num: 4, title: 'Buy back (cover)', body: 'You repurchase the shares at a lower price to close the position.' },
        { num: 5, title: 'Return shares, keep profit', body: 'Return the shares to the lender. Your profit = sell price minus buy price minus fees.' },
      ],
    },
    dykStyle: 'default',
    didYouKnow: 'Max gain on a short = 100% (stock goes to $0). Potential loss = infinite. That asymmetry is why experienced traders size short positions much smaller than longs.',
    nextTitle: 'Float & Short Interest',
  },
  {
    id: 23,
    title: 'Float & Short Interest',
    subtitle: 'The two numbers that determine squeeze potential.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'A small float plus high short interest equals a powder keg.',
    coreBody: 'Float = publicly available shares. Short interest = % sold short. Small float + high SI + positive catalyst = squeeze potential. Learn to spot these setups before the fuse is lit.',
    facts: [
      { icon: '🔢', text: 'Float is the number of shares available to the public to trade.' },
      { icon: '📊', text: 'Short interest above 20% of float is considered high — squeeze risk elevated.' },
      { icon: '💣', text: 'Days-to-cover measures how long it would take all shorts to buy back their positions.' },
    ],
    vocab: [
      { term: 'Float', definition: 'The number of shares of a company available for the public to trade (excludes insider-held shares).' },
      { term: 'Short Interest', definition: 'The percentage of float currently sold short. High SI = more fuel for a squeeze.' },
      { term: 'Days to Cover', definition: 'Short interest divided by average daily volume. Higher = more explosive squeeze potential.' },
    ],
    slotA: {
      type: 'stat-block',
      stats: [
        { value: '<10M', label: 'Low float threshold', sub: 'shares available to trade' },
        { value: '>20%', label: 'High short interest', sub: 'of float sold short' },
        { value: '5+', label: 'Days to cover', sub: 'for squeeze risk' },
      ],
    },
    slotB: {
      type: 'calculator',
      heading: 'Squeeze risk estimator',
      inputLabel: 'Short interest (%)',
      inputDefault: 25,
      inputMin: 1,
      inputMax: 150,
      inputStep: 1,
      factor: 0.4,
      resultLabel: 'Days to cover (approx)',
      note: 'Higher = more explosive squeeze potential if a catalyst hits',
    },
    dykStyle: 'default',
    didYouKnow: 'GameStop in January 2021 had short interest exceeding 140% of its float — more shares shorted than existed publicly. That was the fuel for one of history\'s most famous squeezes.',
    nextTitle: 'Short Squeezes',
  },
  {
    id: 24,
    title: 'Short Squeezes',
    subtitle: 'The feedback loop that sends stocks parabolic.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'A short squeeze is a fire that feeds itself.',
    coreBody: 'Rising price → shorts lose money → forced to buy → buying drives price higher → more shorts forced out → feedback loop → parabolic. Understanding this cascade is essential for momentum traders.',
    facts: [
      { icon: '🔥', text: 'Short squeezes create some of the fastest and most violent moves in the market.' },
      { icon: '📈', text: 'The feedback loop can accelerate for days before exhaustion sets in.' },
      { icon: '⚠️', text: 'Squeezes eventually reverse hard — knowing when to exit is everything.' },
    ],
    vocab: [
      { term: 'Short Squeeze', definition: 'A rapid price increase forcing short sellers to buy back shares, accelerating the move.' },
      { term: 'Forced Cover', definition: 'When a broker forces a short seller to close their position due to margin call or share recall.' },
      { term: 'Parabolic', definition: 'A nearly vertical price move — unsustainable but potentially very profitable short-term.' },
    ],
    slotA: {
      type: 'timeline',
      heading: 'The short squeeze cascade',
      events: [
        { label: 'High short interest builds', body: 'Many traders bet against the stock. Short interest climbs above 20% of float.' },
        { label: 'Catalyst appears', body: 'Surprise earnings beat, FDA approval, or viral news sparks buying interest.' },
        { label: 'Price starts rising', body: 'Early buyers push price up. Shorts start losing money.' },
        { label: 'Weak shorts cover', body: 'First shorts panic-buy to limit losses. This adds more buying pressure.' },
        { label: 'Price accelerates', body: 'Momentum traders pile in. Volume explodes. Price moves become parabolic.' },
        { label: 'Margin calls hit', body: 'Brokers force remaining shorts to close. Mass forced buying with no sellers.' },
        { label: 'Buying exhaustion', body: 'All shorts covered. Demand collapses. Price reverses sharply.' },
      ],
    },
    slotB: {
      type: 'scenario',
      setup: 'You find a stock with 90% short interest and a surprise earnings beat before the open. Pre-market is up 35% on 10× average volume. At 9:30 AM it opens up 45%. What is the highest priority question before you enter?',
      options: [
        { label: 'What is my price target?', correct: false, explanation: 'Price target is secondary. Risk/reward and position size must be determined first.' },
        { label: 'Is short interest still elevated — will shorts be forced to cover?', correct: true, explanation: 'Correct. Confirming squeeze fuel is still present is the specific driver of this setup.' },
        { label: 'Did the earnings beat by a large margin?', correct: false, explanation: 'The catalyst matters, but short interest is the specific squeeze driver. Earnings confirm the catalyst — SI confirms the fuel.' },
      ],
    },
    dykStyle: 'data',
    didYouKnow: 'In 2008, Porsche revealed it controlled 74% of VW shares. With almost no float left, short sellers had to cover at any price. VW briefly became the world\'s most valuable company — at €1,005 per share.',
    nextTitle: 'Level 2 Quotes',
  },
  {
    id: 25,
    title: 'Level 2 Quotes',
    subtitle: 'See the full order book — not just the tip of the iceberg.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'Level 1 shows you the tip. Level 2 shows you the whole iceberg.',
    coreBody: 'Bid/ask depth, share sizes, market maker axe, walls of supply and demand. Level 2 is the real-time order book — where the buying and selling pressure actually lives.',
    facts: [
      { icon: '📖', text: 'Level 2 shows all orders at every price, not just the best bid/ask.' },
      { icon: '🧱', text: 'A large block of shares at one price is called a "wall" — real-time support or resistance.' },
      { icon: '👁️', text: 'Watch for sellers stepping away (asks disappearing) — that signals a breakout is near.' },
    ],
    vocab: [
      { term: 'Level 2', definition: 'A real-time feed showing all outstanding bid and ask orders at every price level.' },
      { term: 'Axe', definition: 'A market maker that is consistently buying or selling a particular stock — they have an interest.' },
      { term: 'Wall', definition: 'A large order at a specific price level that acts as short-term support or resistance.' },
    ],
    slotA: { type: 'facts' },
    slotB: {
      type: 'diagram',
      heading: 'Level 2 order book',
      svgContent: `<svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="220" fill="#0f0f14" rx="8"/>
  <text x="16" y="22" fill="#9ca3af" font-size="10" font-family="monospace">BIDS</text>
  <text x="200" y="22" fill="#9ca3af" font-size="10" font-family="monospace">ASKS</text>
  <text x="90" y="22" fill="#9ca3af" font-size="10" font-family="monospace">SIZE</text>
  <text x="230" y="22" fill="#9ca3af" font-size="10" font-family="monospace">SIZE</text>
  <rect x="8" y="30" width="140" height="22" rx="3" fill="#00ff8830"/>
  <text x="16" y="45" fill="#00ff88" font-size="11" font-family="monospace" font-weight="600">$24.85</text>
  <text x="90" y="45" fill="#00ff88" font-size="11" font-family="monospace">2,400</text>
  <rect x="8" y="56" width="140" height="20" rx="3" fill="#00ff8820"/>
  <text x="16" y="70" fill="#00ff88" font-size="11" font-family="monospace">$24.84</text>
  <text x="90" y="70" fill="#00ff88" font-size="11" font-family="monospace">1,800</text>
  <rect x="8" y="80" width="140" height="20" rx="3" fill="#00ff8814"/>
  <text x="16" y="94" fill="#00ff8899" font-size="11" font-family="monospace">$24.83</text>
  <text x="90" y="94" fill="#00ff8899" font-size="11" font-family="monospace">900</text>
  <rect x="8" y="104" width="140" height="20" rx="3" fill="#00ff880a"/>
  <text x="16" y="118" fill="#00ff8866" font-size="11" font-family="monospace">$24.82</text>
  <text x="90" y="118" fill="#00ff8866" font-size="11" font-family="monospace">500</text>
  <rect x="172" y="30" width="140" height="22" rx="3" fill="#ef444430"/>
  <text x="180" y="45" fill="#ef4444" font-size="11" font-family="monospace" font-weight="600">$24.86</text>
  <text x="230" y="45" fill="#ef4444" font-size="11" font-family="monospace">1,200</text>
  <rect x="172" y="56" width="140" height="20" rx="3" fill="#ef444420"/>
  <text x="180" y="70" fill="#ef4444" font-size="11" font-family="monospace">$24.87</text>
  <text x="230" y="70" fill="#ef4444" font-size="11" font-family="monospace">800</text>
  <rect x="172" y="80" width="140" height="20" rx="3" fill="#ef444440"/>
  <text x="180" y="94" fill="#ef4444" font-size="11" font-family="monospace" font-weight="600">$24.88</text>
  <text x="230" y="94" fill="#ef4444" font-size="11" font-family="monospace" font-weight="600">15,000</text>
  <text x="258" y="94" fill="#eab308" font-size="9" font-family="monospace">⚠ WALL</text>
  <rect x="172" y="104" width="140" height="20" rx="3" fill="#ef444414"/>
  <text x="180" y="118" fill="#ef444499" font-size="11" font-family="monospace">$24.89</text>
  <text x="230" y="118" fill="#ef444499" font-size="11" font-family="monospace">400</text>
  <line x1="8" y1="132" x2="312" y2="132" stroke="#2d2d3d" stroke-width="1"/>
  <text x="120" y="148" fill="#9ca3af" font-size="10" font-family="monospace" text-anchor="middle">SPREAD: $0.01</text>
  <text x="16" y="170" fill="#9ca3af" font-size="10" font-family="monospace">Large ask wall at $24.88 = resistance level</text>
  <text x="16" y="188" fill="#9ca3af" font-size="10" font-family="monospace">Strong bids at $24.85 = support level</text>
  <text x="16" y="206" fill="#00ff88" font-size="10" font-family="monospace">Watch: if wall disappears → breakout likely</text>
</svg>`,
      caption: 'Green = bids (buyers), Red = asks (sellers). Large orders = walls.',
    },
    dykStyle: 'default',
    didYouKnow: 'Level 2 data was proprietary — only market makers could see the full order book — until the SEC mandated public access in the 1990s. Before that, retail traders were literally blind to where supply and demand was stacked.',
    nextTitle: 'Halts & Circuit Breakers',
    checkpointQuiz: [
      {
        q: 'What does Level 2 show that Level 1 does NOT?',
        options: ['Historical price charts from last year', 'All outstanding bid and ask orders at every price level', 'Company earnings reports', 'Analyst ratings and price targets'],
        correct: 1,
        explanation: 'Level 1 shows only the best bid and best ask. Level 2 shows the entire order book — every buyer and seller at every price level. This reveals the true supply/demand picture.',
      },
      {
        q: 'A "wall" on the Level 2 order book means...',
        options: ['The stock is about to reverse', 'A massive order at one price level creating short-term support or resistance', 'The market is about to close', 'An institutional buy program has been triggered'],
        correct: 1,
        explanation: 'A wall is a large block of shares sitting at one price. Sellers at a wall create resistance — price struggles to move through until that supply is absorbed or removed.',
      },
      {
        q: 'When you see the ask side of Level 2 thinning out (sellers stepping away), it typically signals...',
        options: ['A sell-off is imminent', 'A breakout may be near — supply is drying up', 'The market is about to close for the day', 'Time to immediately short the stock'],
        correct: 1,
        explanation: 'When sellers step away (fewer and smaller ask orders), supply is being absorbed. With less supply overhead, even modest buying pressure can push price higher. Breakout watch mode.',
      },
    ],
  },
  {
    id: 26,
    title: 'Halts & Circuit Breakers',
    subtitle: 'The market\'s emergency brakes — and what they mean for your trade.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'A trading halt is a forced pause — the market\'s emergency brake.',
    coreBody: 'Individual halts occur for news or volatility. Market-wide circuit breakers trigger at 7%, 13%, and 20% S&P 500 drops. Both create opportunity and risk for momentum traders.',
    facts: [
      { icon: '⏸️', text: 'Trading halts can last minutes or hours — you cannot exit your position during a halt.' },
      { icon: '🌐', text: 'Market-wide circuit breakers pause all US trading simultaneously.' },
      { icon: '📋', text: 'News pending halts often precede major price moves — up or down.' },
    ],
    vocab: [
      { term: 'Halt', definition: 'A temporary suspension of trading in a specific stock, triggered by news or unusual volatility.' },
      { term: 'Circuit Breaker', definition: 'A market-wide trading pause triggered when the S&P 500 drops 7%, 13%, or 20% in a day.' },
      { term: 'Resumption', definition: 'When a halted stock resumes trading — often with a significant price gap.' },
    ],
    slotA: {
      type: 'comparison',
      leftLabel: 'Stock Halt',
      rightLabel: 'Circuit Breaker',
      rows: [
        { left: 'One stock only', right: 'All US markets' },
        { left: 'News or 10% move in 5 min', right: '7% / 13% / 20% S&P drop' },
        { left: '5–10 min or indefinite', right: '15 min (7%, 13%) or full day (20%)' },
        { left: 'Multiple times per day possible', right: 'Rare — last used March 2020' },
        { left: 'Creates gap on resumption', right: 'Pauses all price discovery' },
      ],
    },
    slotB: {
      type: 'scenario',
      setup: 'You are long 500 shares of RNWK at $12.40. It gaps up 60% on FDA news, then suddenly halts — news pending. Level 2 showed thin asks above. The halt lasts 20 minutes. It resumes, gapping to $14.80. What is your move?',
      options: [
        { label: 'Sell immediately at market on resumption', correct: false, explanation: 'Market orders on halt resumption have extreme slippage — you may fill $1–$2 away from the displayed price.' },
        { label: 'Place a limit sell at $14.60 before the resumption auction closes', correct: true, explanation: 'Correct. A limit order controls your exit price on halt resume and protects against slippage.' },
        { label: 'Hold through — FDA news is bullish, wait for $20', correct: false, explanation: 'No exit plan = gambling. Always have a limit order ready before resumption.' },
      ],
    },
    dykStyle: 'mistake',
    didYouKnow: 'Many traders place market orders the moment a halted stock resumes. On resumption, the first few seconds have extreme slippage — your market order may fill $1–$2 away from the displayed price.',
    nextTitle: 'Time & Sales',
  },
  {
    id: 27,
    title: 'Time & Sales',
    subtitle: 'Every trade, printed in real time — the heartbeat of the stock.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'Time & Sales is the heartbeat of the stock.',
    coreBody: 'Every trade: time, price, size. Large prints at the ask = aggressive buyers. Large prints at the bid = aggressive sellers. T&S confirms what Level 2 predicts — it is the ground truth of who is actually trading.',
    facts: [
      { icon: '🟢', text: 'Green prints (at ask) = buyers crossing the spread aggressively — bullish pressure.' },
      { icon: '🔴', text: 'Red prints (at bid) = sellers crossing the spread to exit fast — bearish pressure.' },
      { icon: '📦', text: 'Large prints (10,000+ shares) signal institutional involvement — not retail.' },
    ],
    vocab: [
      { term: 'Time & Sales', definition: 'A real-time record of every trade: timestamp, price, and number of shares.' },
      { term: 'Print', definition: 'A single trade appearing on the Time & Sales feed.' },
      { term: 'Large Print', definition: 'An unusually large single trade — often 10,000+ shares — signaling institutional activity.' },
    ],
    slotA: {
      type: 'alert-trio',
      items: [
        { accent: '#00ff88', icon: '🟢', heading: 'Green prints (at ask)', body: 'Buyers are crossing the spread to get filled — aggressive. This is bullish buying pressure in real time.' },
        { accent: '#ef4444', icon: '🔴', heading: 'Red prints (at bid)', body: 'Sellers are crossing the spread to exit fast — aggressive. This is bearish selling pressure in real time.' },
        { accent: '#f97316', icon: '📦', heading: 'Large print size', body: 'Prints of 10,000+ shares signal institutional involvement — the big money is actively moving.' },
      ],
    },
    slotB: {
      type: 'diagram',
      heading: 'Time & Sales tape',
      svgContent: `<svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="200" fill="#0f0f14" rx="8"/>
  <text x="16" y="22" fill="#9ca3af" font-size="10" font-family="monospace">TIME</text>
  <text x="80" y="22" fill="#9ca3af" font-size="10" font-family="monospace">PRICE</text>
  <text x="150" y="22" fill="#9ca3af" font-size="10" font-family="monospace">SIZE</text>
  <text x="210" y="22" fill="#9ca3af" font-size="10" font-family="monospace">SIDE</text>
  <rect x="8" y="28" width="304" height="22" rx="3" fill="#00ff8830"/>
  <text x="16" y="43" fill="#00ff88" font-size="11" font-family="monospace">09:31:04</text>
  <text x="80" y="43" fill="#00ff88" font-size="11" font-family="monospace" font-weight="600">$24.86</text>
  <text x="150" y="43" fill="#00ff88" font-size="11" font-family="monospace" font-weight="600">25,000</text>
  <text x="210" y="43" fill="#00ff88" font-size="11" font-family="monospace">ASK</text>
  <text x="260" y="43" fill="#eab308" font-size="9" font-family="monospace">⚡ LARGE</text>
  <rect x="8" y="54" width="304" height="20" rx="3" fill="#00ff8818"/>
  <text x="16" y="68" fill="#00ff88" font-size="11" font-family="monospace">09:31:05</text>
  <text x="80" y="68" fill="#00ff88" font-size="11" font-family="monospace">$24.86</text>
  <text x="150" y="68" fill="#00ff88" font-size="11" font-family="monospace">3,200</text>
  <text x="210" y="68" fill="#00ff88" font-size="11" font-family="monospace">ASK</text>
  <rect x="8" y="78" width="304" height="20" rx="3" fill="#ef444420"/>
  <text x="16" y="92" fill="#ef4444" font-size="11" font-family="monospace">09:31:06</text>
  <text x="80" y="92" fill="#ef4444" font-size="11" font-family="monospace">$24.85</text>
  <text x="150" y="92" fill="#ef4444" font-size="11" font-family="monospace">1,500</text>
  <text x="210" y="92" fill="#ef4444" font-size="11" font-family="monospace">BID</text>
  <rect x="8" y="102" width="304" height="22" rx="3" fill="#00ff8830"/>
  <text x="16" y="117" fill="#00ff88" font-size="11" font-family="monospace">09:31:07</text>
  <text x="80" y="117" fill="#00ff88" font-size="11" font-family="monospace" font-weight="600">$24.87</text>
  <text x="150" y="117" fill="#00ff88" font-size="11" font-family="monospace" font-weight="600">18,000</text>
  <text x="210" y="117" fill="#00ff88" font-size="11" font-family="monospace">ASK</text>
  <text x="260" y="117" fill="#eab308" font-size="9" font-family="monospace">⚡ LARGE</text>
  <rect x="8" y="128" width="304" height="20" rx="3" fill="#00ff8818"/>
  <text x="16" y="142" fill="#00ff88" font-size="11" font-family="monospace">09:31:08</text>
  <text x="80" y="142" fill="#00ff88" font-size="11" font-family="monospace">$24.87</text>
  <text x="150" y="142" fill="#00ff88" font-size="11" font-family="monospace">2,100</text>
  <text x="210" y="142" fill="#00ff88" font-size="11" font-family="monospace">ASK</text>
  <line x1="8" y1="158" x2="312" y2="158" stroke="#2d2d3d" stroke-width="1"/>
  <text x="16" y="176" fill="#00ff88" font-size="10" font-family="monospace">Large prints at ASK = buyers in control</text>
  <text x="16" y="194" fill="#9ca3af" font-size="10" font-family="monospace">Price trending up: $24.85 → $24.87</text>
</svg>`,
      caption: 'Green = buying at ask. Large prints signal institutional participation.',
    },
    dykStyle: 'quote',
    didYouKnow: 'Jesse Livermore made his first fortune as a teenager in the 1890s reading the physical ticker tape in bucket shops. "Reading the tape" is 150 years old. The skill is the same — only the medium changed.',
    nextTitle: 'Dark Pools',
  },
  {
    id: 28,
    title: 'Dark Pools',
    subtitle: 'Legal, invisible, and responsible for 40% of all US stock trading.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'Dark pools are legal — but invisible to most traders.',
    coreBody: 'About 40% of all US stock trading happens off-exchange. Institutions use dark pools to avoid moving the visible market when executing large orders.',
    facts: [
      { icon: '🌑', text: 'Dark pools are private exchanges — orders are not visible to the public.' },
      { icon: '🏦', text: 'Major banks and institutions use dark pools to trade large blocks without alerting the market.' },
      { icon: '📊', text: 'Dark pool trades still appear on Time & Sales after the fact — they just print late.' },
    ],
    vocab: [
      { term: 'Dark Pool', definition: 'A private trading venue where large institutional orders execute off the public exchange.' },
      { term: 'Lit Market', definition: 'The public exchange (NYSE, NASDAQ) where all orders are visible in real time.' },
      { term: 'Off-Exchange', definition: 'Trading that occurs outside the public exchanges — includes dark pools and internalizers.' },
    ],
    slotA: {
      type: 'comparison',
      leftLabel: 'Dark Pool',
      rightLabel: 'Lit Market',
      rows: [
        { left: 'Orders hidden pre-trade', right: 'All orders visible in real time' },
        { left: 'Institutions, hedge funds', right: 'All traders including retail' },
        { left: 'Minimal — large blocks trade quietly', right: 'Can move price on large orders' },
        { left: 'Print to T&S after execution', right: 'Visible in Level 2 before execution' },
        { left: '~40% of US daily volume', right: '~60% of US daily volume' },
      ],
    },
    slotB: {
      type: 'myth-buster',
      myths: [
        { myth: 'Dark pools are illegal and manipulative.', reality: 'Dark pools are fully SEC-regulated. They were created so institutions can execute large orders without telegraphing them to HFT firms.' },
        { myth: 'Retail traders can use dark pools too.', reality: 'Access requires a prime broker or institutional relationship. Retail orders go to lit exchanges or are internalized by your broker.' },
      ],
    },
    dykStyle: 'default',
    didYouKnow: 'The term "dark" refers to price opacity, not anything sinister. The largest dark pool is run by JPMorgan Chase. Their private exchange handles more volume per day than some entire countries\' stock markets.',
    nextTitle: 'Slippage & Execution',
  },
  {
    id: 29,
    title: 'Slippage & Execution',
    subtitle: 'The silent tax on every trade — and how to minimize it.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'Slippage is the silent tax on every trade.',
    coreBody: 'Expected fill vs actual fill. $0.01 on AAPL, $0.50+ on volatile small-cap. Momentum traders in and out of dozens of trades per week — slippage compounds into real money.',
    facts: [
      { icon: '💧', text: 'Slippage = the difference between the price you expected and the price you got.' },
      { icon: '⚡', text: 'Fast-moving momentum stocks have the highest slippage — the price moves as you order.' },
      { icon: '🎯', text: 'Limit orders eliminate slippage at the cost of potentially not filling.' },
    ],
    vocab: [
      { term: 'Slippage', definition: 'The difference between the expected fill price and the actual fill price.' },
      { term: 'Fill', definition: 'The execution of an order — your trade has been completed at a specific price.' },
      { term: 'Limit Order', definition: 'An order that fills only at your specified price or better — eliminates slippage.' },
    ],
    slotA: {
      type: 'stat-block',
      stats: [
        { value: '$0.01', label: 'Slippage on liquid large-cap', sub: 'AAPL, SPY, MSFT' },
        { value: '$0.50+', label: 'Slippage on fast small-cap', sub: 'volatile momentum stocks' },
        { value: '$500', label: 'Cost on 1,000-share trade', sub: 'at $0.50 slippage per share' },
      ],
    },
    slotB: {
      type: 'calculator',
      heading: 'Slippage cost calculator',
      inputLabel: 'Shares to trade',
      inputDefault: 500,
      inputMin: 100,
      inputMax: 10000,
      inputStep: 100,
      factor: 0.5,
      resultLabel: 'Estimated slippage cost at $0.50/share',
      resultPrefix: '$',
      note: 'Reduce share size on thin stocks to control total slippage cost',
    },
    dykStyle: 'pro-tip',
    didYouKnow: 'Use limit orders on momentum trades whenever possible. A limit order at $0.05 above the current ask gives you price control and usually fills — with far less slippage than a market order on a fast mover.',
    nextTitle: 'After-Hours & the Gap',
  },
  {
    id: 30,
    title: 'After-Hours & the Gap',
    subtitle: 'What happens between 4 PM and 9:30 AM shapes every morning.',
    section: 'Section 2 · Market Mechanics',
    sectionColor: '#3b82f6',
    coreHeading: 'Every gap tells a story. Your job is to read it correctly.',
    coreBody: 'Gap = price difference between yesterday\'s close and today\'s open. Gap-and-go continues; gap-and-fail reverses. Catalyst strength and volume determine which scenario plays out.',
    facts: [
      { icon: '🌙', text: 'After-hours news — earnings, FDA results — sets the stage for the next day\'s open.' },
      { icon: '📈', text: 'Gap-and-go: strong catalyst + institutional buying = continuation higher.' },
      { icon: '📉', text: 'Gap-and-fail: weak catalyst or fading volume = reversal back toward prior close.' },
    ],
    vocab: [
      { term: 'Gap', definition: 'The price difference between a stock\'s prior close and its current open.' },
      { term: 'Gap-and-Go', definition: 'When a gapping stock continues in the direction of the gap after the open.' },
      { term: 'Gap Fill', definition: 'When price reverses back to fill the gap — returning to the prior close level.' },
    ],
    slotA: {
      type: 'before-after',
      leftLabel: '4:00 PM Close',
      rightLabel: '9:30 AM Open',
      leftItems: [
        'Stock closed at $20.00',
        'Earnings report at 4:15 PM',
        'EPS beat by 40%',
        'Guidance raised sharply',
        'Pre-market volume 3× average',
      ],
      rightItems: [
        'Opens at $26.00 (+30%)',
        'First candle closes near the high',
        'Level 2: clean asks above $26',
        'T&S: large green prints flowing',
        'Gap-and-go setup confirmed',
      ],
    },
    slotB: {
      type: 'pros-cons',
      heading: 'Trading the gap at the open',
      pros: [
        'Highest volume of the day — easy to get filled',
        'Gap stocks have a defined catalyst',
        'First 5 minutes establish the direction',
        'Highest momentum potential of the session',
      ],
      cons: [
        'Spreads are widest at the open',
        'Slippage is highest in first minutes',
        'Requires discipline not to chase',
        'Price can whip both directions before trending',
      ],
    },
    dykStyle: 'data',
    didYouKnow: 'Gap-ups of 2–4% on below-average pre-market volume fill the gap more than 70% of the time within 3 days. Gap-ups of 10%+ on 5× normal pre-market volume are far more likely to continue.',
    nextTitle: 'What is a Candlestick?',
  },
  {
    id: 31,
    title: 'What is a Candlestick?',
    subtitle: 'The Japanese invention that reveals four prices in one symbol.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'One candle contains four prices and tells one story.',
    coreBody: 'OHLC: Open, High, Low, Close. The body = distance from open to close. Wicks = high and low extremes. Green = closed above open. Red = closed below open.',
    facts: [
      { icon: '🏯', text: 'Invented in Japan in the 1700s by rice trader Munehisa Homma.' },
      { icon: '📦', text: 'Body = distance from open to close. Wicks = temporary price extremes.' },
      { icon: '⚖️', text: 'Small body + long wicks = indecision. Neither buyers nor sellers won.' },
    ],
    vocab: [
      { term: 'OHLC', definition: 'Open, High, Low, Close — the four prices captured by every candlestick.' },
      { term: 'Body', definition: 'The thick part of the candle — the range from open to close.' },
      { term: 'Wick', definition: 'The thin lines above and below the body — showing the high and low extremes.' },
    ],
    slotA: { type: 'facts' },
    slotB: {
      type: 'diagram',
      heading: 'Candlestick anatomy',
      svgContent: `<svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="220" fill="#0f0f14" rx="8"/>
  <line x1="160" y1="20" x2="160" y2="50" stroke="#00ff88" stroke-width="2"/>
  <rect x="130" y="50" width="60" height="100" rx="2" fill="#00ff8830" stroke="#00ff88" stroke-width="2"/>
  <line x1="160" y1="150" x2="160" y2="190" stroke="#00ff88" stroke-width="2"/>
  <line x1="160" y1="20" x2="200" y2="20" stroke="#9ca3af" stroke-width="1" stroke-dasharray="3"/>
  <text x="205" y="24" fill="#9ca3af" font-size="11" font-family="monospace">HIGH</text>
  <line x1="160" y1="50" x2="200" y2="50" stroke="#9ca3af" stroke-width="1" stroke-dasharray="3"/>
  <text x="205" y="54" fill="#9ca3af" font-size="11" font-family="monospace">OPEN</text>
  <line x1="160" y1="150" x2="200" y2="150" stroke="#9ca3af" stroke-width="1" stroke-dasharray="3"/>
  <text x="205" y="154" fill="#9ca3af" font-size="11" font-family="monospace">CLOSE</text>
  <line x1="160" y1="190" x2="200" y2="190" stroke="#9ca3af" stroke-width="1" stroke-dasharray="3"/>
  <text x="205" y="194" fill="#9ca3af" font-size="11" font-family="monospace">LOW</text>
  <line x1="105" y1="20" x2="105" y2="50" stroke="#4d4d5d" stroke-width="1"/>
  <line x1="98" y1="20" x2="112" y2="20" stroke="#4d4d5d" stroke-width="1"/>
  <line x1="98" y1="50" x2="112" y2="50" stroke="#4d4d5d" stroke-width="1"/>
  <text x="40" y="38" fill="#9ca3af" font-size="10" font-family="monospace">UPPER</text>
  <text x="43" y="50" fill="#9ca3af" font-size="10" font-family="monospace">WICK</text>
  <line x1="105" y1="50" x2="105" y2="150" stroke="#4d4d5d" stroke-width="1"/>
  <line x1="98" y1="50" x2="112" y2="50" stroke="#4d4d5d" stroke-width="1"/>
  <line x1="98" y1="150" x2="112" y2="150" stroke="#4d4d5d" stroke-width="1"/>
  <text x="52" y="95" fill="#00ff88" font-size="10" font-family="monospace">BODY</text>
  <line x1="105" y1="150" x2="105" y2="190" stroke="#4d4d5d" stroke-width="1"/>
  <line x1="98" y1="150" x2="112" y2="150" stroke="#4d4d5d" stroke-width="1"/>
  <line x1="98" y1="190" x2="112" y2="190" stroke="#4d4d5d" stroke-width="1"/>
  <text x="40" y="168" fill="#9ca3af" font-size="10" font-family="monospace">LOWER</text>
  <text x="43" y="180" fill="#9ca3af" font-size="10" font-family="monospace">WICK</text>
  <text x="100" y="212" fill="#9ca3af" font-size="10" font-family="monospace" text-anchor="middle">each candle = 1 time period</text>
</svg>`,
      caption: 'Green body = closed higher than opened. Wicks show rejected extremes.',
    },
    dykStyle: 'quote',
    didYouKnow: 'Munehisa Homma reportedly made the equivalent of $10 billion in today\'s money trading rice futures using candlestick patterns and crowd psychology. He recognized that price is driven by emotion, not just supply and demand.',
    nextTitle: 'Green vs Red Candles',
  },
  {
    id: 32,
    title: 'Green vs Red Candles',
    subtitle: 'Color tells you who won — size tells you by how much.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'Green means buyers won that period. Red means sellers won.',
    coreBody: 'Size and wick ratio reveal conviction, not just color. A small green candle with a long upper wick is actually bearish. Context is everything.',
    facts: [
      { icon: '🟢', text: 'Large green candle closing near the high = strong buyer conviction.' },
      { icon: '🔴', text: 'Large red candle closing near the low = strong seller conviction.' },
      { icon: '🕯️', text: 'Long upper wick on any candle = buyers tried to push higher but failed — bearish signal.' },
    ],
    vocab: [
      { term: 'Bullish Candle', definition: 'A green candle where the close is above the open — buyers were in control.' },
      { term: 'Bearish Candle', definition: 'A red candle where the close is below the open — sellers were in control.' },
      { term: 'Doji', definition: 'A candle with almost no body — open and close nearly equal. Signals indecision.' },
    ],
    slotA: {
      type: 'comparison',
      leftLabel: 'Buyer Control',
      rightLabel: 'Seller Control',
      rows: [
        { left: 'Large green body', right: 'Large red body' },
        { left: 'Closes near the high', right: 'Closes near the low' },
        { left: 'Short or no upper wick', right: 'Short or no lower wick' },
        { left: 'Volume increasing', right: 'Volume increasing on sell-off' },
        { left: 'Marubozu (no wicks)', right: 'Bearish Marubozu (no wicks)' },
      ],
    },
    slotB: {
      type: 'true-false',
      heading: 'True or false?',
      statements: [
        { text: 'A green candle always means a stock is going up.', answer: false, explanation: 'One green candle is meaningless in isolation. Context and a series of candles tell the real story.' },
        { text: 'A candle that closes near its high indicates strong buying pressure.', answer: true, explanation: 'Closing near the high means sellers could not push price back down — buyers maintained control.' },
        { text: 'A long upper wick means buyers were in control.', answer: false, explanation: 'A long upper wick means buyers tried to push higher but sellers rejected it. It is actually a bearish signal.' },
        { text: 'High volume on a green candle confirms strong buying conviction.', answer: true, explanation: 'Volume confirms the price action. A green candle on 5× average volume is far more meaningful than one on 0.5× volume.' },
      ],
    },
    dykStyle: 'default',
    didYouKnow: 'In Japan — where candlesticks were invented — white/hollow = bullish, black/filled = bearish. Some older platforms still use this convention. Do not get caught off guard when reading historical charts.',
    nextTitle: 'Support & Resistance',
  },
  {
    id: 33,
    title: 'Support & Resistance',
    subtitle: 'The invisible floors and ceilings that shape every chart.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'Support holds price up. Resistance pushes price down.',
    coreBody: 'Price has memory — traders act at levels where price reversed before. The key insight: broken resistance becomes support. These levels are self-fulfilling because enough traders believe in them.',
    facts: [
      { icon: '🏗️', text: 'Support = a price level where buying interest is strong enough to halt a decline.' },
      { icon: '🧱', text: 'Resistance = a price level where selling pressure is strong enough to halt a rise.' },
      { icon: '🔄', text: 'Role reversal: once resistance is broken, it often becomes the new support.' },
    ],
    vocab: [
      { term: 'Support', definition: 'A price level where buying demand is strong enough to prevent further decline.' },
      { term: 'Resistance', definition: 'A price level where selling supply is strong enough to prevent further rise.' },
      { term: 'Role Reversal', definition: 'When a broken resistance level becomes a new support level (and vice versa).' },
    ],
    slotA: {
      type: 'quote-hero',
      quote: 'The goal of a successful trader is to make the best trades. Money is secondary.',
      attribution: 'Alexander Elder — author of Trading for a Living',
    },
    slotB: {
      type: 'diagram',
      heading: 'Support & Resistance chart',
      svgContent: `<svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="200" fill="#0f0f14" rx="8"/>
  <line x1="20" y1="50" x2="300" y2="50" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="228" y="44" fill="#ef4444" font-size="10" font-family="monospace">RESISTANCE $28</text>
  <line x1="20" y1="150" x2="300" y2="150" stroke="#00ff88" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="232" y="165" fill="#00ff88" font-size="10" font-family="monospace">SUPPORT $22</text>
  <polyline points="20,150 50,130 80,50 110,80 140,50 170,70 200,150 230,110 260,50 290,80" stroke="#3b82f6" stroke-width="2" fill="none"/>
  <polygon points="80,50 74,62 86,62" fill="#ef4444"/>
  <polygon points="140,50 134,62 146,62" fill="#ef4444"/>
  <polygon points="260,50 254,62 266,62" fill="#ef4444"/>
  <polygon points="20,150 26,138 14,138" fill="#00ff88"/>
  <polygon points="200,150 206,138 194,138" fill="#00ff88"/>
  <text x="72" y="80" fill="#9ca3af" font-size="9" font-family="monospace">rejected</text>
  <text x="132" y="80" fill="#9ca3af" font-size="9" font-family="monospace">rejected</text>
  <text x="252" y="80" fill="#9ca3af" font-size="9" font-family="monospace">rejected</text>
  <text x="10" y="135" fill="#9ca3af" font-size="9" font-family="monospace">bounce</text>
  <text x="186" y="135" fill="#9ca3af" font-size="9" font-family="monospace">bounce</text>
</svg>`,
      caption: 'Price bounces between support (green) and resistance (red).',
    },
    dykStyle: 'default',
    didYouKnow: 'The $50, $100, $200 round numbers on any stock are almost always significant support/resistance. Institutional algorithms automatically place limit orders at round numbers — making these levels self-fulfilling.',
    nextTitle: 'Trend Lines',
  },
  {
    id: 34,
    title: 'Trend Lines',
    subtitle: 'Connect the dots — and see where price is really heading.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'A trend line is your best summary of where price is headed.',
    coreBody: 'Uptrend = higher highs + higher lows. Connect the lows with a line. Trade with the trend, not against it. The trend is your friend until it bends.',
    facts: [
      { icon: '📐', text: 'An uptrend requires at least 2 higher lows to draw a valid trend line.' },
      { icon: '3️⃣', text: 'A third touch of the trend line confirms it — three-point trends are reliable.' },
      { icon: '💥', text: 'High-volume breaks of trend lines are the most significant signals.' },
    ],
    vocab: [
      { term: 'Uptrend', definition: 'A series of higher highs and higher lows — price is in a sustained upward direction.' },
      { term: 'Downtrend', definition: 'A series of lower highs and lower lows — price is in a sustained downward direction.' },
      { term: 'Trend Break', definition: 'When price closes decisively below an uptrend line — signals the trend may be ending.' },
    ],
    slotA: {
      type: 'checklist',
      heading: 'Trend line rules',
      items: [
        'Touch at least 2 points before calling it a valid trend line',
        'A 3rd touch makes it a confirmed trend line',
        'Draw through lows for uptrends, through highs for downtrends',
        'The steeper the angle, the less sustainable the trend',
        'A clean break and retest of the trend line often signals continuation',
        'High-volume breaks of trend lines are the most significant',
      ],
    },
    slotB: {
      type: 'diagram',
      heading: 'Uptrend with higher lows',
      svgContent: `<svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="200" fill="#0f0f14" rx="8"/>
  <line x1="30" y1="170" x2="290" y2="50" stroke="#00ff88" stroke-width="1.5" stroke-dasharray="5,3"/>
  <polyline points="30,170 60,140 90,120 120,90 150,110 180,75 210,60 250,35 280,20" stroke="#3b82f6" stroke-width="2" fill="none"/>
  <circle cx="30" cy="170" r="5" fill="#00ff88"/>
  <text x="12" y="185" fill="#00ff88" font-size="9" font-family="monospace">HL1</text>
  <circle cx="90" cy="120" r="5" fill="#00ff88"/>
  <text x="80" y="136" fill="#00ff88" font-size="9" font-family="monospace">HL2</text>
  <circle cx="150" cy="110" r="5" fill="#00ff88"/>
  <text x="140" y="126" fill="#00ff88" font-size="9" font-family="monospace">HL3</text>
  <circle cx="210" cy="60" r="5" fill="#00ff88"/>
  <text x="200" y="76" fill="#00ff88" font-size="9" font-family="monospace">HL4</text>
  <polygon points="280,20 270,30 285,32" fill="#00ff88"/>
  <text x="240" y="15" fill="#9ca3af" font-size="10" font-family="monospace">HH</text>
  <text x="145" y="20" fill="#9ca3af" font-size="10" font-family="monospace">HH</text>
  <text x="82" y="105" fill="#9ca3af" font-size="10" font-family="monospace">HH</text>
  <text x="220" y="140" fill="#00ff88" font-size="10" font-family="monospace">trend line</text>
  <text x="218" y="153" fill="#00ff88" font-size="9" font-family="monospace">(connect lows)</text>
</svg>`,
      caption: 'HL = Higher Low. Connect them for the uptrend line.',
    },
    dykStyle: 'pro-tip',
    didYouKnow: 'Do NOT draw trend lines through candle bodies — draw through wick tips. A trend line that cuts through bodies is inaccurate. Always connect the lowest wick points on an uptrend.',
    nextTitle: 'Moving Averages',
  },
  {
    id: 35,
    title: 'Moving Averages',
    subtitle: 'A constantly updating average price — the trend in a single line.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'A moving average is a constantly updating average price.',
    coreBody: '9 EMA reacts in minutes, 20 EMA in days, 200 MA in weeks. Price above = bullish. Price below = bearish. Moving averages define the bias before you even look at a candle.',
    facts: [
      { icon: '📈', text: '9 EMA: the pulse of short-term momentum traders — reacts to every move.' },
      { icon: '📊', text: '200 MA: the dividing line between bull and bear — institutions watch this daily.' },
      { icon: '❌', text: 'Death Cross (50 below 200) and Golden Cross (50 above 200) are major signals.' },
    ],
    vocab: [
      { term: '9 EMA', definition: '9-period Exponential Moving Average — fast-reacting, used for intraday momentum.' },
      { term: '200 MA', definition: '200-day Simple Moving Average — slow-reacting, defines long-term institutional bias.' },
      { term: 'Death Cross', definition: 'When the 50-day MA crosses below the 200-day MA — a bearish long-term signal.' },
    ],
    slotA: {
      type: 'leaderboard',
      heading: 'Moving averages ranked by reaction speed',
      items: [
        { rank: 1, label: '9 EMA', sub: 'Intraday momentum — reacts in minutes', pct: 95, color: '#00ff88' },
        { rank: 2, label: '20 EMA', sub: 'Short-swing trend — reacts in days', pct: 65, color: '#3b82f6' },
        { rank: 3, label: '50 MA', sub: 'Medium-term trend — reacts in weeks', pct: 35, color: '#f97316' },
        { rank: 4, label: '200 MA', sub: 'Institutional bias — reacts in months', pct: 10, color: '#ef4444' },
      ],
    },
    slotB: { type: 'vocab' },
    dykStyle: 'default',
    didYouKnow: 'The "Death Cross" — 50-day MA crossing below the 200-day MA — preceded both the 2008 financial crisis crash and the 2020 COVID selloff. The "Golden Cross" (50 above 200) preceded some of the biggest bull runs in history.',
    nextTitle: 'VWAP',
  },
  {
    id: 36,
    title: 'VWAP',
    subtitle: 'The benchmark every institution uses — and every trader should know.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'VWAP is where the average dollar traded today.',
    coreBody: 'Resets every morning at 9:30 AM. Institutions are often legally required to benchmark vs VWAP. Above VWAP = bullish bias. VWAP reclaim after a dip = one of the cleanest re-entry signals.',
    facts: [
      { icon: '🔄', text: 'VWAP resets at 9:30 AM every session — it is a fresh indicator every day.' },
      { icon: '🏦', text: 'Institutions are often mandated to execute near VWAP — it is a legal benchmark.' },
      { icon: '🎯', text: 'A stock reclaiming VWAP after a dip is one of the cleanest momentum re-entry signals.' },
    ],
    vocab: [
      { term: 'VWAP', definition: 'Volume Weighted Average Price — the average price weighted by how much volume traded at each level.' },
      { term: 'VWAP Hold', definition: 'When a stock pulls back to VWAP and bounces — signals institutional buying at that level.' },
      { term: 'VWAP Reclaim', definition: 'When a stock that was below VWAP crosses back above it — a momentum re-entry signal.' },
    ],
    slotA: { type: 'facts' },
    slotB: {
      type: 'diagram',
      heading: 'VWAP intraday chart',
      svgContent: `<svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="200" fill="#0f0f14" rx="8"/>
  <text x="16" y="18" fill="#9ca3af" font-size="9" font-family="monospace">9:30</text>
  <text x="80" y="18" fill="#9ca3af" font-size="9" font-family="monospace">10:00</text>
  <text x="152" y="18" fill="#9ca3af" font-size="9" font-family="monospace">10:30</text>
  <text x="224" y="18" fill="#9ca3af" font-size="9" font-family="monospace">11:00</text>
  <text x="288" y="18" fill="#9ca3af" font-size="9" font-family="monospace">11:30</text>
  <polyline points="20,60 40,45 55,70 70,55 85,80 100,95 115,85 130,110 145,125 155,140 165,155 175,145 185,130 200,120 215,105 230,90 250,75 270,60 290,50" stroke="#3b82f6" stroke-width="2" fill="none"/>
  <polyline points="20,80 50,82 80,85 110,90 140,95 160,98 180,100 210,100 240,98 270,95 290,93" stroke="#00ff88" stroke-width="2" fill="none"/>
  <circle cx="175" cy="145" r="6" fill="none" stroke="#f97316" stroke-width="2"/>
  <text x="178" y="162" fill="#f97316" font-size="9" font-family="monospace">VWAP reclaim</text>
  <text x="256" y="88" fill="#3b82f6" font-size="9" font-family="monospace">price</text>
  <text x="256" y="104" fill="#00ff88" font-size="9" font-family="monospace">VWAP</text>
  <line x1="160" y1="25" x2="160" y2="175" stroke="#2d2d3d" stroke-width="1" stroke-dasharray="3"/>
  <text x="125" y="130" fill="#9ca3af" font-size="9" font-family="monospace">below VWAP</text>
  <text x="195" y="75" fill="#9ca3af" font-size="9" font-family="monospace">above VWAP</text>
</svg>`,
      caption: 'Orange circle = VWAP reclaim — a high-probability long entry.',
    },
    dykStyle: 'pro-tip',
    didYouKnow: 'When a momentum stock pulls back to VWAP and bounces — especially in the first 30 minutes — that is the "VWAP hold" setup. The institutional bid at VWAP creates a natural floor. Many of the cleanest momentum entries happen exactly here.',
    nextTitle: 'RSI',
  },
  {
    id: 37,
    title: 'RSI',
    subtitle: 'The oscillator that measures how fast price is moving — on a 0–100 scale.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'RSI measures the speed and size of recent price moves on a 0–100 scale.',
    coreBody: 'Above 70 = overbought (may pause). Below 30 = oversold (may bounce). Divergence = weakening trend warning. RSI is a tool, not a guarantee — always confirm with price action.',
    facts: [
      { icon: '📊', text: 'RSI above 70 = stock has moved up very fast recently — extended, may pause.' },
      { icon: '📉', text: 'RSI below 30 = stock has moved down very fast recently — oversold, may bounce.' },
      { icon: '⚠️', text: 'Divergence: price at new high but RSI lower high = momentum secretly weakening.' },
    ],
    vocab: [
      { term: 'RSI', definition: 'Relative Strength Index — measures price change speed on a scale of 0–100.' },
      { term: 'Overbought', definition: 'RSI above 70 — the stock has risen very fast recently and may be due for a pause.' },
      { term: 'Divergence', definition: 'When price and RSI move in opposite directions — often signals a trend reversal.' },
    ],
    slotA: {
      type: 'comparison',
      leftLabel: 'Overbought RSI >70',
      rightLabel: 'Oversold RSI <30',
      rows: [
        { left: 'Stock moved up very fast', right: 'Stock moved down very fast' },
        { left: 'Buyers may be exhausted', right: 'Sellers may be exhausted' },
        { left: 'Not a sell signal alone', right: 'Not a buy signal alone' },
        { left: 'Confirm with volume/price', right: 'Confirm with volume/price' },
        { left: 'Can stay >70 for days in strong trend', right: 'Can stay <30 in strong downtrend' },
      ],
    },
    slotB: {
      type: 'scenario',
      setup: 'A stock has a strong earnings catalyst and moved from $10 to $18 in two days. RSI is at 78. Level 2 shows thin sellers above and T&S shows large green prints still flowing. Do you buy, wait, or avoid?',
      options: [
        { label: 'Buy immediately — strong momentum always continues', correct: false, explanation: 'RSI >70 without confirmation is chasing a potentially extended move. The setup may be good but the risk/reward is not ideal here.' },
        { label: 'Wait for RSI to pull back below 60 and bounce — then buy', correct: true, explanation: 'Letting RSI reset and bounce gives a better risk/reward entry with less extension risk. This is the disciplined approach.' },
        { label: 'Short the stock — RSI >70 guarantees a reversal', correct: false, explanation: 'RSI can stay above 70 for days in a strong trend. Shorting into momentum is extremely high-risk.' },
      ],
    },
    dykStyle: 'default',
    didYouKnow: 'GME\'s RSI hit 99 in January 2021 — statistically the highest possible reading. RSI at 99 did not stop the stock from going even higher for two more days before the historic crash.',
    nextTitle: 'MACD',
  },
  {
    id: 38,
    title: 'MACD',
    subtitle: 'The indicator that tells you when momentum is building — or fading.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'MACD tells you when momentum is building — or fading.',
    coreBody: 'MACD line (12 EMA − 26 EMA), Signal line (9 EMA of MACD), Histogram (MACD − Signal). Crossover = buy/sell signal. Shrinking histogram = momentum weakening.',
    facts: [
      { icon: '🔧', text: 'Developed by Gerald Appel in the late 1970s — still one of the most-used indicators.' },
      { icon: '✂️', text: 'The crossover (MACD crossing Signal line) is the primary buy/sell signal.' },
      { icon: '⚠️', text: 'MACD divergence (price at new high, MACD not) warns momentum is secretly weakening.' },
    ],
    vocab: [
      { term: 'MACD Line', definition: '12-period EMA minus 26-period EMA. Measures the difference between two moving averages.' },
      { term: 'Signal Line', definition: '9-period EMA of the MACD line. The MACD crossing this line is the primary signal.' },
      { term: 'Histogram', definition: 'MACD minus Signal. Growing bars = accelerating momentum. Shrinking bars = fading.' },
    ],
    slotA: { type: 'facts' },
    slotB: {
      type: 'steps',
      heading: 'How to read MACD',
      steps: [
        { num: 1, title: 'Check MACD line direction', body: 'Above zero = bullish bias. Below zero = bearish bias. This sets your directional lean.' },
        { num: 2, title: 'Look for the crossover', body: 'MACD crossing above the Signal line = bullish signal. MACD crossing below = bearish signal.' },
        { num: 3, title: 'Read the histogram bars', body: 'Growing histogram = accelerating momentum. Shrinking histogram = fading — momentum is running out.' },
        { num: 4, title: 'Check for divergence', body: 'Price at new high but MACD at lower high = hidden weakness. This often precedes a reversal.' },
      ],
    },
    dykStyle: 'default',
    didYouKnow: 'Gerald Appel used MACD to trade his own money for decades after inventing it — one of the few indicator creators who was also a successful practitioner. Most indicators are created by academics. MACD was created by a trader.',
    nextTitle: 'Bull Flags',
    checkpointQuiz: [
      {
        q: 'The MACD line is calculated as...',
        options: ['200 EMA minus 50 EMA — the long-term trend filter', '12-period EMA minus 26-period EMA', '9-period EMA of the price alone', 'Current price minus VWAP'],
        correct: 1,
        explanation: '12 EMA minus 26 EMA. The 12 EMA is faster (more reactive), the 26 EMA is slower. Their difference measures the strength and direction of current momentum relative to recent history.',
      },
      {
        q: 'A bullish MACD crossover signal occurs when...',
        options: ['MACD drops below the Signal line', 'The histogram bars are visibly shrinking', 'MACD crosses ABOVE the Signal line', 'Price closes below the 200-day moving average'],
        correct: 2,
        explanation: 'MACD crossing ABOVE the Signal line = bullish crossover. The faster average overtakes the slower one, signaling accelerating upward momentum. Crossing below = bearish signal.',
      },
      {
        q: 'MACD divergence (price at new high, MACD at a lower high) is warning you that...',
        options: ['Strong momentum is likely to push the stock even higher', 'A new all-time breakout is imminent — add to position', 'Hidden weakness — buyers are losing power even as price grinds up', 'Time to double position size on the next pullback'],
        correct: 2,
        explanation: 'Divergence is a red flag. Price makes higher highs but MACD makes lower highs — buyers are getting weaker on each push. This often precedes a reversal. Reduce or exit, do not add.',
      },
    ],
  },
  {
    id: 39,
    title: 'Bull Flags',
    subtitle: 'The brief rest before the next leg up — and how to trade it.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'A bull flag is a brief rest before the next leg up.',
    coreBody: 'Flagpole (sharp move up on high volume) + flag (tight, slight pullback on declining volume) + breakout = continuation. This is one of the cleanest and most reliable momentum patterns.',
    facts: [
      { icon: '🚩', text: 'Flagpole = initial sharp move. Flag = tight consolidation. Breakout = continuation.' },
      { icon: '📉', text: 'Volume MUST decline during the flag — rising volume during consolidation is a red flag.' },
      { icon: '📏', text: 'Measured move target: flagpole height added to the breakout point.' },
    ],
    vocab: [
      { term: 'Flagpole', definition: 'The initial sharp price move that precedes the flag consolidation — must be on high volume.' },
      { term: 'Flag', definition: 'The tight consolidation after the flagpole — slight pullback on declining volume.' },
      { term: 'Breakout', definition: 'Price clearing the top of the flag on increasing volume — the entry signal.' },
    ],
    slotA: {
      type: 'checklist',
      heading: 'Bull flag criteria',
      items: [
        'Flagpole must be at least 10–20% move on above-average volume',
        'Flag should be tight — no more than 30–50% retracement of the pole',
        'Volume must decline meaningfully during the flag consolidation',
        'A clear catalyst (earnings, news, FDA) gives the setup conviction',
        'Entry: limit order at the top of the flag. Stop: below the bottom of the flag',
      ],
    },
    slotB: {
      type: 'diagram',
      heading: 'Bull flag pattern',
      svgContent: `<svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="220" fill="#0f0f14" rx="8"/>
  <rect x="28" y="160" width="12" height="28" rx="2" fill="#00ff88"/>
  <rect x="44" y="140" width="12" height="48" rx="2" fill="#00ff88"/>
  <rect x="60" y="100" width="12" height="88" rx="2" fill="#00ff88"/>
  <rect x="76" y="70" width="12" height="118" rx="2" fill="#00ff88"/>
  <rect x="92" y="50" width="12" height="138" rx="2" fill="#00ff88"/>
  <text x="28" y="202" fill="#00ff88" font-size="9" font-family="monospace">FLAGPOLE</text>
  <polyline points="104,50 120,58 136,54 152,62 168,58 184,66" stroke="#9ca3af" stroke-width="1.5" fill="none"/>
  <line x1="104" y1="50" x2="184" y2="66" stroke="#4d4d5d" stroke-width="1" stroke-dasharray="3"/>
  <line x1="104" y1="65" x2="184" y2="81" stroke="#4d4d5d" stroke-width="1" stroke-dasharray="3"/>
  <text x="128" y="90" fill="#9ca3af" font-size="9" font-family="monospace">FLAG</text>
  <rect x="196" y="130" width="12" height="58" rx="2" fill="#9ca3af" opacity="0.4"/>
  <rect x="212" y="100" width="12" height="88" rx="2" fill="#9ca3af" opacity="0.4"/>
  <text x="196" y="202" fill="#9ca3af" font-size="9" font-family="monospace">low vol</text>
  <rect x="232" y="40" width="14" height="148" rx="2" fill="#00ff88"/>
  <text x="228" y="202" fill="#00ff88" font-size="9" font-family="monospace">BREAK</text>
  <polygon points="246,20 240,38 252,38" fill="#00ff88"/>
  <text x="255" y="35" fill="#00ff88" font-size="10" font-family="monospace">target</text>
  <rect x="268" y="160" width="12" height="28" rx="2" fill="#00ff88" opacity="0.5"/>
  <rect x="284" y="130" width="12" height="58" rx="2" fill="#00ff88" opacity="0.7"/>
</svg>`,
      caption: 'Flagpole → low-volume flag → high-volume breakout.',
    },
    dykStyle: 'data',
    didYouKnow: 'The measured move target for a bull flag breakout — pole height added to the breakout point — hits more than 60% of the time on high-volume breakouts.',
    nextTitle: 'Breakouts',
  },
  {
    id: 40,
    title: 'Breakouts',
    subtitle: 'The moment supply becomes demand — and price accelerates.',
    section: 'Section 3 · Chart Reading',
    sectionColor: '#8b5cf6',
    coreHeading: 'A breakout is where supply becomes demand — instantly.',
    coreBody: 'Price above a key resistance level with volume. Supply at that level exhausted. Demand floods in. Not every breakout holds — volume and a confirmed candle close are what separate real breakouts from fakeouts.',
    facts: [
      { icon: '🚀', text: 'Breakouts above 52-week highs on high volume statistically continue higher more often than they fail.' },
      { icon: '📊', text: 'Volume confirms the breakout — it does not guarantee continuation.' },
      { icon: '❌', text: 'False breakouts happen on roughly 30–40% of apparent breakout attempts.' },
    ],
    vocab: [
      { term: 'Breakout', definition: 'When price closes above a key resistance level, ideally on high volume.' },
      { term: 'Fakeout', definition: 'A false breakout where price briefly clears resistance then reverses back below.' },
      { term: 'Confirmed Break', definition: 'A candle closing above the resistance level — not just a wick touching it.' },
    ],
    slotA: {
      type: 'myth-busters',
      myths: [
        { myth: 'Breakouts above 52-week highs are risky because the stock has already moved too much.', reality: 'Studies show stocks making 52-week highs on high volume are statistically MORE likely to continue higher. Momentum, not mean reversion, dominates short-term.' },
        { myth: 'You can buy any breakout as long as volume is high.', reality: 'Volume confirms the breakout but does not guarantee continuation. The catalyst, sector strength, and quality of the base all matter equally.' },
        { myth: 'False breakouts are rare and easy to avoid.', reality: 'False breakouts happen on roughly 30–40% of apparent breakouts. The filter: price must close above the level — not just touch it.' },
      ],
    },
    slotB: {
      type: 'scenario',
      setup: 'RXMD consolidates between $8.00–$8.40 for 20 minutes on low volume. A 50,000-share print hits at the ask. Price jumps to $8.45, breaking resistance. Level 2 shows asks clearing fast. What is your move?',
      options: [
        { label: 'Market order immediately — do not miss the move', correct: false, explanation: 'Market order = uncontrolled slippage and no confirmation. Wait for the candle close first.' },
        { label: 'Limit buy at $8.42, wait for the 5-minute candle to close above $8.40', correct: true, explanation: 'Correct. The limit controls slippage and the candle close confirms the breakout is real.' },
        { label: 'Wait for a pullback to $8.40 before buying', correct: false, explanation: 'Valid thought — but strong breakouts often do not return to the level. You risk missing the trade entirely.' },
      ],
    },
    dykStyle: 'mistake',
    didYouKnow: 'The most common breakout mistake is buying the first touch of a level rather than the confirmed break. A stock "testing" $50 resistance is not the same as "breaking" $50 on volume. The difference is a candle close above the level with expanding volume.',
    nextTitle: 'What is Momentum Trading?',
  },
{
  id: 41,
  title: 'Doji & Indecision Candles',
  subtitle: 'When buyers and sellers reach a standoff',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'The Doji: Open Equals Close',
  coreBody: 'A doji forms when a candle\'s opening price and closing price are virtually identical, creating a cross or plus-sign shape. This tells you that despite all the back-and-forth during the session, neither bulls nor bears won. Dojis are indecision candles — on their own they are neutral, but in context they can be powerful signals. The gravestone doji has a long upper wick and no lower wick: price rallied hard but sellers pushed it all the way back down, making it a bearish signal at the top of a trend. The dragonfly doji is the mirror image — a long lower wick and no upper wick: price sold off hard but buyers reclaimed everything, making it a bullish signal at the bottom of a trend. Neither pattern means much in isolation; the trend leading into the doji is everything.',
  facts: [
    { icon: '⚖️', text: 'Doji means open price = close price — neither side won the session' },
    { icon: '🪦', text: 'Gravestone doji: long upper wick, no lower wick — bearish warning at highs' },
    { icon: '🐉', text: 'Dragonfly doji: long lower wick, no upper wick — bullish reversal at lows' },
  ],
  vocab: [
    { term: 'Doji', definition: 'A candlestick where open and close are equal, signaling indecision between buyers and sellers.' },
    { term: 'Gravestone Doji', definition: 'Doji with a long upper wick and no lower wick, forming at highs; indicates sellers rejected a rally.' },
    { term: 'Dragonfly Doji', definition: 'Doji with a long lower wick and no upper wick, forming at lows; indicates buyers absorbed all selling pressure.' },
  ],
  slotA: {
    type: 'comparison',
    leftLabel: 'Gravestone Doji',
    rightLabel: 'Dragonfly Doji',
    rows: [
      { left: 'Long upper wick', right: 'Long lower wick' },
      { left: 'No lower wick', right: 'No upper wick' },
      { left: 'Appears at market tops', right: 'Appears at market bottoms' },
      { left: 'Bearish reversal signal', right: 'Bullish reversal signal' },
      { left: 'Sellers controlled the day', right: 'Buyers controlled the day' },
    ],
  },
  slotB: {
    type: 'diagram',
    heading: 'Doji Candle Types',
    svgContent: `<rect width="320" height="200" fill="#0f0f14" rx="8"/>
<text x="80" y="22" fill="#9ca3af" font-size="11" font-family="monospace" text-anchor="middle">Standard</text>
<text x="160" y="22" fill="#9ca3af" font-size="11" font-family="monospace" text-anchor="middle">Gravestone</text>
<text x="240" y="22" fill="#9ca3af" font-size="11" font-family="monospace" text-anchor="middle">Dragonfly</text>
<!-- Standard Doji -->
<line x1="80" y1="35" x2="80" y2="80" stroke="#9ca3af" stroke-width="1.5"/>
<rect x="70" y="80" width="20" height="3" fill="#fff" rx="1"/>
<line x1="80" y1="83" x2="80" y2="130" stroke="#9ca3af" stroke-width="1.5"/>
<!-- Gravestone Doji -->
<line x1="160" y1="35" x2="160" y2="100" stroke="#ef4444" stroke-width="1.5"/>
<rect x="150" y="100" width="20" height="3" fill="#ef4444" rx="1"/>
<!-- Dragonfly Doji -->
<rect x="230" y="70" width="20" height="3" fill="#00ff88" rx="1"/>
<line x1="240" y1="73" x2="240" y2="140" stroke="#00ff88" stroke-width="1.5"/>
<!-- Labels -->
<text x="80" y="150" fill="#fff" font-size="10" font-family="monospace" text-anchor="middle">Open=Close</text>
<text x="160" y="150" fill="#ef4444" font-size="10" font-family="monospace" text-anchor="middle">Bearish Top</text>
<text x="240" y="150" fill="#00ff88" font-size="10" font-family="monospace" text-anchor="middle">Bullish Bottom</text>
<text x="160" y="185" fill="#9ca3af" font-size="9" font-family="monospace" text-anchor="middle">Context determines meaning</text>`,
    caption: 'Doji shapes and their typical market implications',
  },
  dykStyle: 'default',
  didYouKnow: 'The word "doji" comes from Japanese and loosely translates to "the same thing" — reflecting that open and close prices ended at the same level after all the session\'s movement.',
  nextTitle: 'Engulfing Patterns',
},

{
  id: 42,
  title: 'Engulfing Patterns',
  subtitle: 'When one candle swallows the previous entirely',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'The Complete Takeover',
  coreBody: 'An engulfing pattern is a two-candle setup where the second candle\'s body completely contains the first candle\'s body. A bullish engulfing forms at the bottom of a downtrend: the first candle is a small red (bearish) candle, and the second is a large green (bullish) candle whose body fully engulfs the red one. This signals that buyers overwhelmed sellers in a single session. A bearish engulfing forms at the top of an uptrend: a small green candle is followed by a large red candle that swallows it whole. Engulfing patterns work because they represent a complete sentiment reversal in just two sessions. The larger the second candle relative to the first, and the higher the volume on the second candle, the more powerful the signal. Many traders consider engulfing patterns among the most reliable reversal signals in candlestick analysis.',
  facts: [
    { icon: '🟢', text: 'Bullish engulfing: large green candle fully contains the prior small red candle' },
    { icon: '🔴', text: 'Bearish engulfing: large red candle fully contains the prior small green candle' },
    { icon: '📊', text: 'Higher volume on the engulfing candle dramatically increases signal reliability' },
  ],
  vocab: [
    { term: 'Bullish Engulfing', definition: 'Two-candle pattern at a downtrend bottom where a large green candle completely engulfs the prior red candle, signaling reversal upward.' },
    { term: 'Bearish Engulfing', definition: 'Two-candle pattern at an uptrend top where a large red candle completely engulfs the prior green candle, signaling reversal downward.' },
    { term: 'Engulfing Body', definition: 'The requirement that the second candle\'s open-to-close range fully contains the first candle\'s open-to-close range for the pattern to be valid.' },
  ],
  slotA: {
    type: 'alert-trio',
    items: [
      {
        accent: '#00ff88',
        icon: '📈',
        heading: 'Bullish Engulfing Signal',
        body: 'Small red candle followed by a large green candle that swallows it — buyers took complete control. Best at the bottom of a downtrend near support.',
      },
      {
        accent: '#ef4444',
        icon: '📉',
        heading: 'Bearish Engulfing Signal',
        body: 'Small green candle followed by a large red candle that swallows it — sellers took complete control. Best at the top of an uptrend near resistance.',
      },
      {
        accent: '#f59e0b',
        icon: '🔍',
        heading: 'Confirmation Matters',
        body: 'Wait for the next candle to confirm. High volume on the engulfing candle and a follow-through candle in the same direction significantly improve reliability.',
      },
    ],
  },
  slotB: {
    type: 'true-false',
    heading: 'Engulfing Patterns: True or False?',
    statements: [
      {
        text: 'A bullish engulfing pattern appears at the top of an uptrend.',
        answer: false,
        explanation: 'Bullish engulfing forms at the BOTTOM of a downtrend, signaling that bears have lost control and bulls have taken over.',
      },
      {
        text: 'The second candle in an engulfing pattern must have a larger body than the first.',
        answer: true,
        explanation: 'By definition, the second candle\'s body must fully contain the first candle\'s body, making it necessarily larger.',
      },
      {
        text: 'High volume on the engulfing candle strengthens the signal.',
        answer: true,
        explanation: 'Volume confirms conviction. A high-volume engulfing candle shows that many participants drove the reversal, making it far more reliable.',
      },
      {
        text: 'Engulfing patterns require at least four candles to form.',
        answer: false,
        explanation: 'Engulfing patterns are two-candle formations — one small candle followed immediately by one larger candle that engulfs its body.',
      },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'Pro tip: the best engulfing patterns occur when the second candle not only engulfs the first but also closes above (bullish) or below (bearish) a key moving average — combining pattern and indicator confirmation in a single candle.',
  nextTitle: 'Hammer & Shooting Star',
},

{
  id: 43,
  title: 'Hammer & Shooting Star',
  subtitle: 'Long wicks that reveal who truly controls price',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'The Power of a Long Wick',
  coreBody: 'The hammer and shooting star are mirror-image single-candle reversal patterns defined by a long wick relative to a small body. A hammer appears at the bottom of a downtrend: the candle has a small body near the top and a long lower wick (at least twice the body\'s length). Sellers pushed price far down during the session, but buyers surged back and closed near the open — a powerful statement of rejection. The hammer\'s color matters less than its location: at support with a long lower wick, it\'s bullish regardless of whether it closed green or red. The shooting star is the mirror opposite, appearing at the top of an uptrend: small body near the bottom, long upper wick. Buyers pushed price high, but sellers slammed it back down. An inverted hammer is a shooting-star shape at the bottom of a downtrend — it also signals potential reversal but requires confirmation.',
  facts: [
    { icon: '🔨', text: 'Hammer: small body at top, long lower wick at least 2× the body — bullish reversal at lows' },
    { icon: '⭐', text: 'Shooting star: small body at bottom, long upper wick at least 2× the body — bearish reversal at highs' },
    { icon: '📍', text: 'Location is everything — both patterns only signal reversals at the extremes of a trend' },
  ],
  vocab: [
    { term: 'Hammer', definition: 'A single-candle reversal pattern at a trend bottom with a small body and long lower wick, showing buyers rejected lower prices.' },
    { term: 'Shooting Star', definition: 'A single-candle reversal pattern at a trend top with a small body and long upper wick, showing sellers rejected higher prices.' },
    { term: 'Wick Rejection', definition: 'When price moves significantly in one direction during a candle but reverses before the close, leaving a long wick that signals failed breakout.' },
  ],
  slotA: {
    type: 'before-after',
    leftLabel: 'Hammer (Bullish)',
    rightLabel: 'Shooting Star (Bearish)',
    leftItems: [
      'Appears at the bottom of a downtrend',
      'Small body near the top of the candle',
      'Long lower wick (2× body or more)',
      'Sellers tried and failed to hold lows',
      'Bullish follow-through confirms signal',
    ],
    rightItems: [
      'Appears at the top of an uptrend',
      'Small body near the bottom of the candle',
      'Long upper wick (2× body or more)',
      'Buyers tried and failed to hold highs',
      'Bearish follow-through confirms signal',
    ],
  },
  slotB: {
    type: 'vocab',
  },
  dykStyle: 'default',
  didYouKnow: 'A hammer that closes green (bullish) is considered slightly stronger than a red hammer because buyers not only rejected the lows but actually ended the session higher than where they started.',
  nextTitle: 'Morning Star & Evening Star',
},

{
  id: 44,
  title: 'Morning Star & Evening Star',
  subtitle: 'Three-candle patterns that mark major turning points',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'The Three-Act Reversal Story',
  coreBody: 'The morning star and evening star are three-candle patterns that tell a complete story of sentiment shifting from one side to the other. A morning star forms at the bottom of a downtrend. Act 1: a large bearish (red) candle confirms the downtrend is in full control. Act 2: a small-bodied candle or doji that gaps down — this is the "star" — showing that selling pressure is drying up and neither side is dominant. Act 3: a large bullish (green) candle that closes deep into the body of the first candle, confirming that bulls have taken control. The evening star is the mirror image at the top of an uptrend: large bullish candle, then a gap-up star showing buyer exhaustion, then a large bearish candle closing deep into the first candle\'s body. The deeper the third candle closes into the first candle (ideally more than 50%), the stronger the signal.',
  facts: [
    { icon: '🌅', text: 'Morning star: 3-candle bullish reversal — bearish candle + small star + strong bullish candle' },
    { icon: '🌆', text: 'Evening star: 3-candle bearish reversal — bullish candle + small star + strong bearish candle' },
    { icon: '📏', text: 'Third candle closing more than 50% into the first candle confirms a high-quality signal' },
  ],
  vocab: [
    { term: 'Morning Star', definition: 'Three-candle bullish reversal pattern at a downtrend bottom: large red candle, small indecision candle, large green candle.' },
    { term: 'Evening Star', definition: 'Three-candle bearish reversal pattern at an uptrend top: large green candle, small indecision candle, large red candle.' },
    { term: 'Star Candle', definition: 'The middle candle in a morning or evening star — a small-bodied candle (often a doji) that signals the exhaustion of the prior trend.' },
  ],
  slotA: {
    type: 'timeline',
    heading: 'Morning Star: Act by Act',
    events: [
      {
        label: 'Act 1 — The Bearish Candle',
        body: 'A large red candle closes near its low, confirming bears are in full control and the downtrend is strong.',
      },
      {
        label: 'Act 2 — The Star (Indecision)',
        body: 'A small-bodied candle forms, often with a gap down from the prior close. Selling pressure is exhausting — neither bulls nor bears control price.',
      },
      {
        label: 'Act 3 — The Bullish Reversal',
        body: 'A large green candle closes deep into the first candle\'s body (ideally 50%+). Bulls have decisively taken control, confirming the trend reversal.',
      },
    ],
  },
  slotB: {
    type: 'steps',
    heading: 'Trading the Morning Star',
    steps: [
      {
        num: 1,
        title: 'Identify the Downtrend',
        body: 'The pattern only has meaning after an established downtrend. Look for a series of lower highs and lower lows before the pattern forms.',
      },
      {
        num: 2,
        title: 'Spot the Three Candles',
        body: 'Confirm: large red candle, then a small-bodied star candle (preferably gapping lower), then a large green candle closing into the first candle.',
      },
      {
        num: 3,
        title: 'Measure Penetration Depth',
        body: 'The third candle should close at least 50% into the first candle\'s body. More penetration = stronger reversal signal and higher success rate.',
      },
      {
        num: 4,
        title: 'Set Entry and Stop',
        body: 'Enter on the close of the third candle or the open of the next session. Place your stop below the low of the star candle (the middle candle).',
      },
    ],
  },
  dykStyle: 'quote',
  didYouKnow: '"The morning star pattern is one of the few candlestick formations that has statistically validated bullish reversal rates above 70% when confirmed with volume." — Thomas Bulkowski, Encyclopedia of Candlestick Charts',
  nextTitle: 'The Cup and Handle',
},

{
  id: 45,
  title: 'The Cup and Handle',
  subtitle: 'William O\'Neil\'s classic continuation breakout pattern',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'A Rounded Recovery Leads to a Breakout',
  coreBody: 'The cup and handle is a bullish continuation pattern discovered and popularized by William O\'Neil, founder of Investor\'s Business Daily. The pattern forms in three stages. First, the cup: price declines from a prior high, forms a rounded bottom (the U-shape), and then rallies back toward the original high. A V-shaped bottom is less reliable — the rounded, gradual curve reflects healthy consolidation rather than panic. Second, the handle: after returning to the prior high, price pulls back modestly (typically 10-15% from the cup\'s rim) and consolidates in a tight range. This final shakeout removes weak holders. Third, the breakout: price surges above the rim of the cup on expanding volume, triggering the buy signal. The measured move (profit target) equals the depth of the cup added to the breakout point. Handles that form in the upper half of the cup are considered higher quality.',
  facts: [
    { icon: '☕', text: 'Cup: rounded U-shape decline and recovery back to prior highs over weeks or months' },
    { icon: '🤝', text: 'Handle: brief 10-15% pullback after the cup that shakes out weak holders before the breakout' },
    { icon: '📐', text: 'Profit target = cup depth added to the breakout level (measured move technique)' },
  ],
  vocab: [
    { term: 'Cup and Handle', definition: 'Bullish continuation pattern: rounded base (cup) followed by a brief pullback (handle), then a breakout above the cup\'s rim.' },
    { term: 'Cup Rim', definition: 'The resistance level at the top of the cup — the prior high that price must break through on volume to trigger the buy signal.' },
    { term: 'Measured Move', definition: 'A technique to project a price target by adding the height (depth) of the pattern to the breakout point.' },
  ],
  slotA: {
    type: 'stat-block',
    stats: [
      { value: '7–65', label: 'Weeks', sub: 'Typical cup formation length' },
      { value: '10–15%', label: 'Handle Depth', sub: 'Ideal pullback in the handle' },
      { value: '1988', label: 'Year Introduced', sub: 'By William O\'Neil in "How to Make Money in Stocks"' },
      { value: '>50%', label: 'Handle Position', sub: 'Handle should form in upper half of cup' },
    ],
  },
  slotB: {
    type: 'scenario',
    setup: 'A stock rallied from $40 to $100, then declined to $70 over 10 weeks, forming a rounded bottom. It recovered back to $100 over 8 weeks. Now it has pulled back to $88 and is consolidating tightly for 2 weeks. What is your buy signal and profit target?',
    options: [
      {
        label: 'Buy at $88 now; target is $100 since it already returned to the prior high.',
        correct: false,
        explanation: 'You should not buy during the handle consolidation — wait for the breakout above $100 (the cup rim) on volume. Buying early exposes you to more handle shakeout.',
      },
      {
        label: 'Buy on a volume-driven breakout above $100; target is $130 (cup depth of $30 added to $100).',
        correct: true,
        explanation: 'Correct. The cup depth is $100 - $70 = $30. Adding $30 to the breakout point ($100) gives a measured-move target of $130. The signal triggers on a breakout above the rim.',
      },
      {
        label: 'Do not trade this — the pattern is invalid because the stock declined more than 30% to form the cup.',
        correct: false,
        explanation: 'A 30% decline from $100 to $70 is within normal cup-and-handle parameters. O\'Neil considered declines of 20-33% from peak to trough to be typical for quality cups.',
      },
    ],
  },
  dykStyle: 'data',
  didYouKnow: 'In Thomas Bulkowski\'s exhaustive back-testing of chart patterns, the cup-and-handle showed an average upside breakout move of 34%, with the best results occurring when the handle forms in the upper 50% of the cup\'s range.',
  nextTitle: 'Double Top & Double Bottom',
},

{
  id: 46,
  title: 'Double Top & Double Bottom',
  subtitle: 'Two attempts at the same level — and a failed breakout',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'Resistance and Support Holding Twice',
  coreBody: 'The double top and double bottom are among the most common and reliable reversal patterns. A double top forms after an uptrend: price reaches a resistance level, pulls back, rallies a second time to approximately the same high, and fails again. The "neckline" is the support level at the bottom of the pullback between the two peaks. When price breaks below the neckline with conviction, the double top is confirmed and a bearish reversal is signaled. The distance from the peaks to the neckline equals the expected move downward from the neckline. A double bottom is the mirror image: two troughs at the same support level, with a neckline at the high between them. Breaking above the neckline confirms the bullish reversal. The key insight is that two failures at the same level demonstrate that buyers or sellers definitively lack the strength to break through.',
  facts: [
    { icon: '🏔️', text: 'Double top: two peaks at resistance; neckline break below confirms bearish reversal' },
    { icon: '🏔️', text: 'Double bottom: two troughs at support; neckline break above confirms bullish reversal' },
    { icon: '📏', text: 'Measured move: distance from peak to neckline (or trough to neckline) equals expected move after breakout' },
  ],
  vocab: [
    { term: 'Double Top', definition: 'Bearish reversal pattern showing two consecutive peaks at the same resistance level, confirmed by a break below the intervening neckline.' },
    { term: 'Double Bottom', definition: 'Bullish reversal pattern showing two consecutive troughs at the same support level, confirmed by a break above the intervening neckline.' },
    { term: 'Neckline', definition: 'The support level (in a double top) or resistance level (in a double bottom) connecting the lows or highs between the two peaks or troughs.' },
  ],
  slotA: {
    type: 'comparison',
    leftLabel: 'Double Top',
    rightLabel: 'Double Bottom',
    rows: [
      { left: 'Forms at uptrend peak', right: 'Forms at downtrend trough' },
      { left: 'Two peaks at resistance', right: 'Two troughs at support' },
      { left: 'Neckline is the valley low', right: 'Neckline is the peak high' },
      { left: 'Confirmed by break BELOW neckline', right: 'Confirmed by break ABOVE neckline' },
      { left: 'Bearish reversal signal', right: 'Bullish reversal signal' },
      { left: 'Target: neckline minus peak-to-neckline', right: 'Target: neckline plus trough-to-neckline' },
    ],
  },
  slotB: {
    type: 'true-false',
    heading: 'Double Top / Double Bottom: True or False?',
    statements: [
      {
        text: 'A double top is confirmed the moment the second peak forms at the same resistance level.',
        answer: false,
        explanation: 'The pattern is only confirmed when price breaks BELOW the neckline (the low between the two peaks). Until then, price could still break out higher.',
      },
      {
        text: 'The two peaks in a double top must be at exactly the same price level.',
        answer: false,
        explanation: 'The peaks need to be approximately equal — within a few percent — but do not need to be at an identical price. Minor variations are normal and acceptable.',
      },
      {
        text: 'Volume typically declines on the second peak of a double top compared to the first.',
        answer: true,
        explanation: 'Lower volume on the second peak signals weakening buying conviction — buyers can\'t generate as much enthusiasm the second time, supporting the reversal thesis.',
      },
      {
        text: 'The measured move target after a neckline break equals the height from peaks to the neckline.',
        answer: true,
        explanation: 'The measured move technique applies the pattern\'s height to the breakout point. For a double top: subtract that height from the neckline to get the downside target.',
      },
    ],
  },
  dykStyle: 'mistake',
  didYouKnow: 'Common mistake: many traders enter a short position on the second peak of a double top before the neckline breaks. This is premature — without neckline confirmation, you\'re fighting a trend that hasn\'t officially reversed yet, and you\'ll be stopped out repeatedly.',
  nextTitle: 'Head and Shoulders Pattern',
},

{
  id: 47,
  title: 'Head and Shoulders Pattern',
  subtitle: 'The most famous reversal pattern in technical analysis',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'Three Peaks Tell the Full Story',
  coreBody: 'The head and shoulders is widely considered the most reliable reversal pattern in technical analysis. It forms at the top of an uptrend and consists of three peaks: a left shoulder (first rally and pullback), a head (a higher rally and deeper pullback), and a right shoulder (a final rally that fails to reach the head, followed by a pullback). The neckline connects the two troughs between these peaks. When price breaks below the neckline — especially on high volume — it signals a major trend reversal. The measured move target equals the distance from the head to the neckline, subtracted from the neckline break point. The inverse head and shoulders forms at the bottom of a downtrend and signals a bullish reversal: two shallower troughs flanking a deeper central trough. The right shoulder being lower than the left (in a head and shoulders top) is a sign of increasing weakness.',
  facts: [
    { icon: '👤', text: 'Three peaks: left shoulder, head (highest), right shoulder — connected by a neckline' },
    { icon: '💥', text: 'Neckline break on high volume is the trigger — this confirms the reversal is real' },
    { icon: '🔄', text: 'Inverse head and shoulders (upside down) forms at bottoms and signals bullish reversals' },
  ],
  vocab: [
    { term: 'Head and Shoulders', definition: 'A three-peak bearish reversal pattern where the central peak (head) is higher than both side peaks (shoulders), confirmed by a neckline break.' },
    { term: 'Neckline (H&S)', definition: 'The trendline connecting the two pullback lows between the three peaks in a head and shoulders pattern; breaking this line confirms the reversal.' },
    { term: 'Inverse Head and Shoulders', definition: 'The upside-down version of the pattern forming at market bottoms, with a central trough deeper than two shallower flanking troughs — a bullish reversal signal.' },
  ],
  slotA: {
    type: 'checklist',
    heading: 'Head & Shoulders Validation Checklist',
    items: [
      'Pattern forms after a clear, sustained uptrend',
      'Left shoulder: rally followed by pullback to neckline',
      'Head: rally above left shoulder peak, then deeper pullback',
      'Right shoulder: rally that fails to reach the head\'s high',
      'Neckline connects the two troughs (can be sloped)',
      'Volume decreases from left shoulder to head to right shoulder',
      'Price breaks below neckline with above-average volume',
      'Optional: wait for a retest of the neckline as resistance',
    ],
  },
  slotB: {
    type: 'diagram',
    heading: 'Head and Shoulders Pattern',
    svgContent: `<rect width="320" height="200" fill="#0f0f14" rx="8"/>
<!-- Left Shoulder -->
<polyline points="20,150 50,100 80,135" fill="none" stroke="#9ca3af" stroke-width="2"/>
<!-- Head -->
<polyline points="80,135 120,55 160,130" fill="none" stroke="#9ca3af" stroke-width="2"/>
<!-- Right Shoulder -->
<polyline points="160,130 195,105 225,140" fill="none" stroke="#9ca3af" stroke-width="2"/>
<!-- Neckline -->
<line x1="50" y1="136" x2="270" y2="138" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,3"/>
<!-- Breakdown -->
<polyline points="225,140 260,160 295,185" fill="none" stroke="#ef4444" stroke-width="2"/>
<!-- Labels -->
<text x="50" y="90" fill="#9ca3af" font-size="9" font-family="monospace" text-anchor="middle">LS</text>
<text x="120" y="45" fill="#fff" font-size="9" font-family="monospace" text-anchor="middle">HEAD</text>
<text x="195" y="95" fill="#9ca3af" font-size="9" font-family="monospace" text-anchor="middle">RS</text>
<text x="210" y="130" fill="#f59e0b" font-size="9" font-family="monospace">Neckline</text>
<text x="268" y="155" fill="#ef4444" font-size="9" font-family="monospace">Break</text>
<text x="160" y="190" fill="#9ca3af" font-size="9" font-family="monospace" text-anchor="middle">Measured move = Head to Neckline distance</text>`,
    caption: 'Classic head and shoulders with neckline break',
  },
  dykStyle: 'data',
  didYouKnow: 'According to research by Bulkowski, the head and shoulders top pattern has a failure rate of only about 4% once the neckline is broken — making it one of the most statistically reliable bearish reversal signals across all chart pattern categories.',
  nextTitle: 'Trading Volume on Charts',
  checkpointQuiz: [
    {
      q: 'In a Head and Shoulders pattern, the reversal is CONFIRMED when...',
      options: ['Price breaks above the left shoulder peak on volume', 'Volume increases on the right shoulder formation', 'Price breaks BELOW the neckline — ideally on elevated volume', 'The right shoulder reaches the exact same height as the left'],
      correct: 2,
      explanation: 'The neckline break is THE signal. Price must close below the neckline — and ideally on above-average volume — to confirm the reversal. Until then it\'s just a possible pattern, not a confirmed one.',
    },
    {
      q: 'An Inverse Head and Shoulders (upside-down version) forms at...',
      options: ['Market tops — signals a bearish trend continuation', 'Market bottoms — signals a bullish reversal', 'The midpoint of a strong uptrend as a continuation', 'Parabolic tops on high-volume momentum stocks'],
      correct: 1,
      explanation: 'The inverse H&S forms at market bottoms: two shallower troughs (shoulders) flanking a deeper central trough (head). Neckline break to the upside confirms the bullish reversal. Mirror image, opposite signal.',
    },
    {
      q: 'During a properly formed Head and Shoulders top, volume should...',
      options: ['Increase steadily from left shoulder through head to right shoulder', 'Stay completely flat — volume doesn\'t matter for this pattern', 'Decrease from left shoulder through head to right shoulder', 'Only be relevant during the neckline break, not the formation'],
      correct: 2,
      explanation: 'Volume should diminish as the pattern develops: highest on the left shoulder, moderate on the head, lowest on the right shoulder. Declining volume confirms weakening buying pressure — a key validation signal.',
    },
  ],
},

{
  id: 48,
  title: 'Trading Volume on Charts',
  subtitle: 'Volume is the fuel — price is just the spark',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'Volume Tells the Real Story',
  coreBody: 'Price tells you what happened; volume tells you how much conviction was behind it. Volume bars displayed below the price chart are one of the most underutilized tools in technical analysis. When price breaks out of a pattern on high volume, it signals strong institutional participation — the move is likely real. When price breaks out on low volume, the move is suspect and likely to fail. At market tops, you often see "climax volume" — an explosive spike in volume as the last buyers rush in, followed by an exhaustion reversal. Similarly, a volume spike on a sharp sell-off near a bottom can signal capitulation — the final fearful sellers exiting all at once. During healthy consolidation phases, volume should decrease as the market rests. Rising price on declining volume is a warning sign (distribution). Falling price on declining volume is a healthy consolidation (accumulation building).',
  facts: [
    { icon: '📊', text: 'Breakouts on high volume are genuine; breakouts on low volume frequently reverse quickly' },
    { icon: '🌋', text: 'Climax volume at tops and capitulation volume at bottoms mark major reversal zones' },
    { icon: '💤', text: 'Declining volume during price consolidation is healthy and normal — the market is resting' },
  ],
  vocab: [
    { term: 'Climax Volume', definition: 'An extraordinary spike in volume at a market top as the last buyers rush in, often followed immediately by a sharp reversal downward.' },
    { term: 'Capitulation', definition: 'A high-volume sell-off near a market bottom where the final fearful holders exit at once, often marking the end of a downtrend.' },
    { term: 'Volume Confirmation', definition: 'The principle that a price move (breakout, reversal, or trend continuation) is considered valid only when accompanied by above-average volume.' },
  ],
  slotA: {
    type: 'leaderboard',
    heading: 'Volume Signals Ranked by Reliability',
    items: [
      { rank: 1, label: 'Breakout + 2× Average Volume', sub: 'Institutional confirmation — highest conviction', pct: 95, color: '#00ff88' },
      { rank: 2, label: 'Capitulation Volume at Lows', sub: 'Final sellers exhaust — strong bottom signal', pct: 85, color: '#00ff88' },
      { rank: 3, label: 'Climax Volume at Highs', sub: 'Last buyers rush in — top reversal warning', pct: 80, color: '#f59e0b' },
      { rank: 4, label: 'Declining Volume in Consolidation', sub: 'Healthy rest — bullish continuation likely', pct: 70, color: '#f59e0b' },
      { rank: 5, label: 'Breakout on Below-Average Volume', sub: 'Suspect move — high failure/reversal rate', pct: 30, color: '#ef4444' },
    ],
  },
  slotB: {
    type: 'scenario',
    setup: 'A stock has been consolidating between $45 and $50 for three weeks on declining volume. Today, it pushes above $50 and closes at $52 on volume 3× the 20-day average. Yesterday\'s volume was the lowest in a month. How do you interpret today\'s action?',
    options: [
      {
        label: 'The low volume yesterday and high volume today are contradictory — avoid the trade.',
        correct: false,
        explanation: 'Actually, this is the ideal volume signature: low volume during consolidation (healthy rest) followed by a high-volume breakout (institutional conviction). The two complement each other perfectly.',
      },
      {
        label: 'This is a textbook high-quality breakout: quiet consolidation followed by volume-confirmed breakout above resistance.',
        correct: true,
        explanation: 'Correct. Declining volume during the base, followed by a 3× volume surge on the breakout above $50, is exactly what you want to see. Institutions were quietly accumulating, then drove price through resistance.',
      },
      {
        label: 'The 3× volume is too high — it signals a climax top and the stock will likely reverse immediately.',
        correct: false,
        explanation: 'Climax volume typically occurs after a long, sustained uptrend — not at the first breakout from a multi-week base. A strong-volume breakout from a base is bullish, not bearish.',
      },
    ],
  },
  dykStyle: 'default',
  didYouKnow: 'Institutional investors (mutual funds, hedge funds) control 70–80% of daily stock market volume. When you see unusual high volume on a breakout, you\'re essentially watching the "smart money" move — and it pays to follow it.',
  nextTitle: 'Multi-Timeframe Analysis',
},

{
  id: 49,
  title: 'Multi-Timeframe Analysis',
  subtitle: 'The daily chart gives you bias — the 5-minute gives you entry',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'Always Know the Bigger Picture',
  coreBody: 'Multi-timeframe analysis (MTFA) is the practice of analyzing price action across multiple time horizons before placing a trade. The principle is simple: higher timeframes determine the direction of the dominant trend, and lower timeframes provide precise entry and exit timing. A momentum trader typically uses three timeframes: the daily chart for overall market bias and pattern identification, the 15-minute or hourly chart for intermediate-level structure and confirmation, and the 5-minute or 1-minute chart for precise entry timing. The golden rule: never trade against the daily chart. If the daily trend is down but you see a bullish setup on the 5-minute, you\'re fighting the primary trend — a low-probability trade. Conversely, when all three timeframes align (daily uptrend + 15-min consolidation + 5-min breakout), the probability skyrockets. This alignment is called "timeframe confluence."',
  facts: [
    { icon: '📅', text: 'Daily chart: determines the primary trend bias — never trade against it' },
    { icon: '⏱️', text: '5-minute chart: used for precise entry timing within the daily trend direction' },
    { icon: '🎯', text: 'Timeframe confluence — when all timeframes agree — produces the highest-probability trades' },
  ],
  vocab: [
    { term: 'Multi-Timeframe Analysis', definition: 'The practice of reviewing price action across multiple time horizons (daily, hourly, 5-min) to align trend direction and entry timing.' },
    { term: 'Timeframe Confluence', definition: 'When the trend direction and signal on multiple timeframes all agree, dramatically increasing the probability of a successful trade.' },
    { term: 'Top-Down Analysis', definition: 'Starting with the highest timeframe chart to establish bias, then drilling down to lower timeframes for entry — the proper sequence for MTFA.' },
  ],
  slotA: {
    type: 'alert-trio',
    items: [
      {
        accent: '#8b5cf6',
        icon: '📅',
        heading: 'Daily Chart — The Boss',
        body: 'Sets the primary trend direction and identifies major patterns. Never take a trade that goes against what the daily chart is telling you. This is your foundation.',
      },
      {
        accent: '#3b82f6',
        icon: '📊',
        heading: '15-Min Chart — The Context',
        body: 'Shows intermediate structure — consolidation zones, support/resistance levels, and whether today\'s price action is consistent with the daily trend.',
      },
      {
        accent: '#00ff88',
        icon: '⚡',
        heading: '5-Min Chart — The Trigger',
        body: 'Used for precise entry timing. Look for a pattern or breakout on the 5-minute that aligns with the direction of both the daily and 15-minute charts.',
      },
    ],
  },
  slotB: {
    type: 'steps',
    heading: 'Top-Down Analysis Process',
    steps: [
      {
        num: 1,
        title: 'Start with the Daily Chart',
        body: 'Determine the primary trend. Is the stock in an uptrend, downtrend, or sideways? Identify key support, resistance, and any major chart patterns forming.',
      },
      {
        num: 2,
        title: 'Check the 15-Minute Chart',
        body: 'Verify that today\'s price action is consistent with the daily trend. Look for intermediate consolidation or a setup forming within the larger trend context.',
      },
      {
        num: 3,
        title: 'Find Entry on the 5-Minute',
        body: 'Only now look for a specific entry trigger — a breakout, a pullback to a moving average, or a pattern completion that aligns with the two higher timeframes.',
      },
      {
        num: 4,
        title: 'Confirm Alignment Before Entry',
        body: 'Ask: does this 5-minute setup go WITH the 15-minute trend, which goes WITH the daily trend? If yes — execute. If any timeframe disagrees — pass.',
      },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'Pro tip: the phrase "trade the timeframe you manage" means your profit-and-loss psychology should match the chart you\'re trading. If you\'re watching every tick, you\'re on the 1-minute. If you check once a day, you\'re on the daily. Mismatches between your management style and your chart timeframe cause emotional decision-making.',
  nextTitle: 'Chart Reading Recap',
},

{
  id: 50,
  title: 'Chart Reading Recap',
  subtitle: 'Bringing price action, patterns, volume, and indicators together',
  section: 'Section 3 · Chart Reading',
  sectionColor: '#8b5cf6',
  coreHeading: 'The Complete Chart Reading System',
  coreBody: 'After ten lessons of chart reading, the goal is to synthesize all the tools into a coherent system. Chart reading is not about any single indicator or pattern — it\'s about convergence. The strongest trades have multiple factors confirming the same direction at the same time. Your pre-trade chart checklist should answer these questions: What is the primary trend on the daily chart? Is there a recognizable pattern forming (cup and handle, head and shoulders, double bottom)? What is volume doing — is it confirming the move? Where are the key support and resistance levels? Are the major moving averages (20-day, 50-day) aligned with the trade direction? Does the candlestick action near the entry point show conviction? What is the risk-reward ratio — where is the stop, and where is the target? Answering all these questions before every trade transforms chart reading from an art into a systematic process. Discipline beats talent in the long run.',
  facts: [
    { icon: '🔗', text: 'Convergence of patterns + volume + indicators = the highest-probability trade setups' },
    { icon: '✅', text: 'A pre-trade checklist converts chart reading from intuition into a repeatable system' },
    { icon: '📐', text: 'Always define stop-loss and target before entry — know your risk-reward before committing' },
  ],
  vocab: [
    { term: 'Convergence', definition: 'When multiple independent technical signals (pattern, volume, moving average, candlestick) all point in the same direction simultaneously.' },
    { term: 'Pre-Trade Checklist', definition: 'A systematic list of criteria that must be satisfied before entering a trade, ensuring objectivity and consistency in decision-making.' },
    { term: 'Risk-Reward Ratio', definition: 'The relationship between the potential profit of a trade (distance to target) and the potential loss (distance to stop-loss), typically expressed as 2:1 or 3:1.' },
  ],
  slotA: {
    type: 'checklist',
    heading: 'Pre-Trade Chart Reading Checklist',
    items: [
      'Daily chart trend identified (up / down / sideways)',
      'Recognizable pattern visible and nearly complete',
      'Volume behavior matches expected pattern (e.g., declining in base)',
      'Key support and resistance levels marked',
      '20-day and 50-day moving averages aligned with trade direction',
      'Candlestick action near entry shows conviction (no doji hesitation)',
      'Entry price identified at a logical breakout or pullback level',
      'Stop-loss placed at a technically meaningful level',
      'Profit target set with at least 2:1 risk-reward ratio',
      'Multi-timeframe check: 15-min and 5-min agree with daily',
    ],
  },
  slotB: {
    type: 'myth-buster',
    myths: [
      {
        myth: 'A strong chart pattern guarantees the trade will work.',
        reality: 'No pattern has a 100% success rate. Even the best patterns fail 20-30% of the time. Your job is not to be right every trade — it\'s to have a positive expectancy by winning more on winners than you lose on losers.',
      },
      {
        myth: 'You need to use every indicator on your chart to get the best signals.',
        reality: 'More indicators cause "analysis paralysis" and create conflicting signals. Professional traders typically use 2-3 core tools with deep mastery. Simplicity and consistency outperform complexity every time.',
      },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'Pro tip: keep a trading journal where you photograph your charts before and after every trade. Reviewing these over time will reveal your personal pattern of recurring mistakes — and fixing just one repeated mistake can transform your overall performance.',
  nextTitle: 'What is Momentum Trading?',
},

{
  id: 51,
  title: 'What is Momentum Trading?',
  subtitle: 'Riding stocks already in motion with a reason to keep moving',
  section: 'Section 4 · Momentum Basics',
  sectionColor: '#f97316',
  coreHeading: 'Buy What\'s Already Moving',
  coreBody: 'Momentum trading is the strategy of buying stocks that are already moving fast — and have a concrete reason (a catalyst) to keep moving. Unlike value investing, which seeks cheap stocks, momentum trading seeks strong stocks getting stronger. The fundamental insight is Newton\'s First Law applied to markets: a stock in motion tends to stay in motion. The edge in momentum trading is concentrated in short windows of explosive movement — often the first 30-60 minutes of the trading day when news-driven stocks gap up and attract follow-through buying from traders and algorithms. Momentum traders do not hold positions for weeks or months; they hold for minutes to days, capturing the initial explosive surge of a catalyst-driven move. Risk is strictly defined: you always know your maximum loss before you enter, and you cut losses the moment a trade moves against your plan.',
  facts: [
    { icon: '🚀', text: 'Momentum trading: buying stocks already moving fast with a catalyst driving the move' },
    { icon: '⏰', text: 'The edge concentrates in the first 30-60 minutes of the trading day for intraday momentum' },
    { icon: '🛡️', text: 'Risk is always pre-defined — know your maximum loss before entering any position' },
  ],
  vocab: [
    { term: 'Momentum Trading', definition: 'A strategy of buying stocks that are already rising quickly on high volume, with a catalyst, expecting the move to continue for minutes to days.' },
    { term: 'Catalyst', definition: 'A specific news event or announcement (earnings beat, FDA approval, acquisition) that triggers explosive buying or selling in a stock.' },
    { term: 'Gap Up', definition: 'When a stock opens significantly higher than its prior day\'s close due to overnight news, creating a price gap on the chart.' },
  ],
  slotA: {
    type: 'quote-hero',
    quote: 'The trend is your friend until the end when it bends. In momentum trading, your only job is to find the trend early, ride it with defined risk, and exit before everyone else does.',
    attribution: 'Mark Minervini, four-time U.S. Investing Champion',
  },
  slotB: {
    type: 'vocab',
  },
  dykStyle: 'quote',
  didYouKnow: '"I always define my risk before I get into a trade. If I can\'t find a place to put my stop that makes sense, I don\'t take the trade." — Paul Tudor Jones, hedge fund legend and momentum trader',
  nextTitle: 'The Momentum Strategy Framework',
},

{
  id: 52,
  title: 'The Momentum Strategy Framework',
  subtitle: 'Four pillars every trade must have before you pull the trigger',
  section: 'Section 4 · Momentum Basics',
  sectionColor: '#f97316',
  coreHeading: 'No Pillar Missing — No Trade Taken',
  coreBody: 'Successful momentum trading is built on a framework of four non-negotiable pillars that must all be present before entering any trade. The first pillar is the catalyst: there must be a specific, real news event driving the move. A stock moving without a catalyst is unpredictable and dangerous. The second pillar is the technical setup: the chart must show a recognizable pattern — a breakout from consolidation, a gap-and-go formation, a clean level to trade off. No chart setup, no trade. The third pillar is risk management: before entering, you must know exactly where your stop-loss is, how many shares you\'re buying, and what your maximum dollar loss on the trade will be. This is calculated before entry, never after. The fourth pillar is execution timing: even a perfect catalyst with a perfect setup and proper risk management can fail if entered at the wrong moment. Timing matters — often the difference between a winning and losing trade is entry 10 cents higher or lower.',
  facts: [
    { icon: '📰', text: 'Pillar 1: Catalyst — a real news event driving the move (earnings, FDA, contract win)' },
    { icon: '📊', text: 'Pillar 2: Technical setup — a clean chart pattern providing a logical entry point' },
    { icon: '🛡️', text: 'Pillar 3: Risk management — pre-defined stop and position size before entering' },
  ],
  vocab: [
    { term: 'Four Pillars', definition: 'The momentum trading framework requiring all four elements — catalyst, technical setup, risk management, and execution timing — before taking any trade.' },
    { term: 'Execution Timing', definition: 'The specific moment chosen to enter a trade — waiting for confirmation (like a breakout candle closing above a level) rather than anticipating it.' },
    { term: 'Pre-Trade Plan', definition: 'A complete specification of entry price, stop-loss, position size, and target written out before placing the order.' },
  ],
  slotA: {
    type: 'stat-block',
    stats: [
      { value: '4', label: 'Pillars Required', sub: 'All 4 must be present — no exceptions' },
      { value: '100%', label: 'Pre-Defined Risk', sub: 'Stop and size calculated before entry' },
      { value: '#1', label: 'Killer of Accounts', sub: 'Taking trades without all 4 pillars' },
      { value: '2:1', label: 'Minimum R:R', sub: 'Target must be at least 2× the risk' },
    ],
  },
  slotB: {
    type: 'steps',
    heading: 'The Four Pillars in Order',
    steps: [
      {
        num: 1,
        title: 'Find the Catalyst',
        body: 'Scan pre-market news for earnings beats, FDA decisions, major contract announcements, or short squeeze candidates. The catalyst is the "why" behind the move.',
      },
      {
        num: 2,
        title: 'Analyze the Technical Setup',
        body: 'Pull up the chart. Is there a clean pattern — gap and go, breakout from consolidation, VWAP reclaim? Identify the entry level and why it\'s a logical point.',
      },
      {
        num: 3,
        title: 'Define Risk Before Entering',
        body: 'Set your stop-loss at a technically meaningful level. Calculate position size so that if stopped out, you lose no more than your pre-set maximum (e.g., 1% of account).',
      },
      {
        num: 4,
        title: 'Time the Execution',
        body: 'Wait for the right moment — a candle closing above the breakout level, a pullback to VWAP, or the open of a strong momentum candle. Patience in execution is a skill.',
      },
    ],
  },
  dykStyle: 'default',
  didYouKnow: 'Research on day trader performance consistently shows that the majority of losses come from trades that lacked at least one of the four pillars — most commonly, either no real catalyst (chasing random movers) or no pre-defined stop-loss.',
  nextTitle: 'Finding Your Setup',
},

{
  id: 53,
  title: 'Finding Your Setup',
  subtitle: 'Only A-setups deserve your capital — everything else is a distraction',
  section: 'Section 4 · Momentum Basics',
  sectionColor: '#f97316',
  coreHeading: 'Grade Your Trades Before You Take Them',
  coreBody: 'Not all trade setups are equal, and treating them as if they are is one of the most expensive mistakes a momentum trader can make. Experienced traders grade every potential setup as an A, B, or C before entering. An A-setup is the highest-quality trade: strong catalyst from a tier-1 news event (earnings beat, FDA approval), a clean and clear technical pattern with an obvious entry and stop, high pre-market volume confirming institutional interest, and the stock trading in the right overall market environment. A B-setup has most of the qualities but is missing one element — perhaps the catalyst is weaker, or the chart is slightly messy. A C-setup is a trade you\'re forcing: maybe the catalyst is thin, the chart is ambiguous, or you\'re bored and looking for action. The rule is simple: only take A-setups. Sit on your hands during B and C setups. The best traders are defined not just by the trades they take but by all the bad trades they don\'t take.',
  facts: [
    { icon: '🅰️', text: 'A-setup: strong catalyst + clean chart + high volume — all four pillars firing on all cylinders' },
    { icon: '🅱️', text: 'B-setup: missing one element — acceptable only in specific conditions for experienced traders' },
    { icon: '🚫', text: 'C-setup: thin catalyst or ambiguous chart — not worth your risk capital, ever' },
  ],
  vocab: [
    { term: 'A-Setup', definition: 'The highest-quality trade opportunity with all four pillars present, a clear entry and stop, and a compelling risk-reward ratio of at least 2:1.' },
    { term: 'Setup Grading', definition: 'The practice of evaluating every potential trade against objective criteria to assign it a quality grade before committing capital.' },
    { term: 'Trading Selectivity', definition: 'The discipline of passing on lower-quality trades even when it means sitting out entire trading sessions, preserving capital for only the best opportunities.' },
  ],
  slotA: {
    type: 'comparison',
    leftLabel: 'A-Setup',
    rightLabel: 'C-Setup',
    rows: [
      { left: 'Tier-1 catalyst (earnings beat, FDA)', right: 'Thin or no catalyst' },
      { left: 'Clean, obvious chart pattern', right: 'Ambiguous or messy chart' },
      { left: 'High pre-market volume (2×+ avg)', right: 'Average or low volume' },
      { left: 'Clear entry and stop levels', right: 'Hard to define stop or entry' },
      { left: 'Risk-reward ≥ 2:1', right: 'Poor or undefined risk-reward' },
      { left: 'You feel calm and confident', right: 'You\'re bored or chasing FOMO' },
    ],
  },
  slotB: {
    type: 'scenario',
    setup: 'It\'s 9:45 AM. Stock A has a strong earnings beat catalyst, is up 12% pre-market, has a clean breakout pattern above $50 with a stop at $47.50, and volume is 5× average. Stock B is moving but you can\'t find any news, the chart is choppy, and volume is average. What is the right action?',
    options: [
      {
        label: 'Trade both — diversifying across two stocks reduces overall risk.',
        correct: false,
        explanation: 'Stock B has no identifiable catalyst and a messy chart — it\'s a C-setup at best. Trading it doesn\'t reduce risk, it adds unnecessary risk to your account from a low-probability trade.',
      },
      {
        label: 'Trade only Stock A — it\'s a clear A-setup. Pass on Stock B entirely.',
        correct: true,
        explanation: 'Correct. Stock A has all four pillars: catalyst (earnings beat), technical setup (clean breakout above $50), risk management (stop at $47.50), and volume confirmation. Stock B fails on catalyst and chart clarity. Pass.',
      },
      {
        label: 'Trade only Stock B — the mystery move could be a big insider buy and produce a larger gain.',
        correct: false,
        explanation: 'Trading on "mystery moves" without an identifiable catalyst is speculation, not strategy. You have no edge when you don\'t know why a stock is moving, and you cannot size your risk appropriately.',
      },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'Pro tip: top momentum traders report that their best annual results often come from taking 30-40% fewer trades than beginners think necessary. More selectivity = higher win rate = better psychology = larger position sizes on A-setups = more profit.',
  nextTitle: 'Risk Management Fundamentals',
},

{
  id: 54,
  title: 'Risk Management Fundamentals',
  subtitle: 'Protect your capital first — profits will follow',
  section: 'Section 4 · Momentum Basics',
  sectionColor: '#f97316',
  coreHeading: 'The Only Rule That Keeps You in the Game',
  coreBody: 'Risk management is the foundation of every professional trader\'s career. Without it, even the best pattern recognition and catalyst analysis will eventually lead to a blown account. The core rule is simple: never risk more than 1-2% of your total trading account on any single trade. If your account is $10,000, your maximum loss per trade is $100-$200. This rule feels restrictive at first, but it is what allows you to survive the inevitable losing streaks without catastrophic drawdown. The second rule is a daily maximum loss limit — typically 3-6% of account. When you hit your daily max loss, you stop trading for the day. Full stop. No exceptions. This rule prevents the most common account killer: revenge trading — taking increasingly reckless trades after a loss in an attempt to "make it back." The third concept is knowing when to reduce size: if you\'ve had 2-3 consecutive losing trades, cut your position size in half until you\'re back in a rhythm.',
  facts: [
    { icon: '💰', text: 'Never risk more than 1-2% of total account on any single trade — this is non-negotiable' },
    { icon: '🛑', text: 'Daily max loss limit of 3-6% of account: when hit, stop trading for the day immediately' },
    { icon: '📉', text: 'After 2-3 consecutive losses, cut position size in half until you recover your rhythm' },
  ],
  vocab: [
    { term: 'Max Risk Per Trade', definition: 'The maximum dollar amount you allow yourself to lose on a single trade, typically 1-2% of total account value.' },
    { term: 'Daily Max Loss', definition: 'A predetermined threshold (usually 3-6% of account) at which you stop trading for the day to prevent spiral losses from emotional decision-making.' },
    { term: 'Revenge Trading', definition: 'The dangerous behavior of taking increasingly impulsive, oversized trades after a loss in an attempt to quickly recover the lost money — a leading cause of blown accounts.' },
  ],
  slotA: {
    type: 'alert-trio',
    items: [
      {
        accent: '#00ff88',
        icon: '✅',
        heading: '1-2% Rule per Trade',
        body: 'On a $10,000 account, max risk is $100-$200 per trade. This lets you take 50-100 consecutive losing trades before losing half your account — giving you time to improve.',
      },
      {
        accent: '#f59e0b',
        icon: '⚠️',
        heading: 'Daily Max Loss Limit',
        body: 'Set a hard daily stop of 3-6% account loss. When you hit it, close the platform and walk away. This is not weakness — it\'s the discipline that separates professionals from gamblers.',
      },
      {
        accent: '#ef4444',
        icon: '🚨',
        heading: 'Never Revenge Trade',
        body: 'After a loss, your emotional brain wants to "get it back." This leads to bigger positions, worse setups, and bigger losses. The only recovery from a bad day is to stop, reset, and return tomorrow.',
      },
    ],
  },
  slotB: {
    type: 'true-false',
    heading: 'Risk Management: True or False?',
    statements: [
      {
        text: 'Risking 10% of your account on a single trade is acceptable if you are very confident in the setup.',
        answer: false,
        explanation: 'Confidence is not a substitute for risk management. Even A-setups fail regularly. A 10% loss on a single trade requires an 11% gain just to break even, and psychologically devastates your trading.',
      },
      {
        text: 'A daily max loss rule should be enforced even on days when you feel the market is about to turn in your favor.',
        answer: true,
        explanation: 'Especially then. The feeling that "the market is about to turn" is often rationalization for revenge trading. Your rules must apply on all days, not just easy ones.',
      },
      {
        text: 'After three losing trades in a row, a smart response is to increase position size to recover faster.',
        answer: false,
        explanation: 'This is the revenge trading trap. Three consecutive losses often signal you\'re out of sync with current market conditions. The correct response is to reduce size or stop for the day.',
      },
      {
        text: 'The 1-2% rule refers to the percentage of account you are willing to LOSE, not the percentage you invest.',
        answer: true,
        explanation: 'Correct and important distinction. You might invest 20% of your account in a trade but only risk 1-2% of total account if your stop is tight. Risk = (entry - stop) × shares, not the full position value.',
      },
    ],
  },
  dykStyle: 'mistake',
  didYouKnow: 'The most common mistake of new traders is not having a daily max loss rule — and the #1 cause of blown accounts is a single catastrophic revenge-trading session. Studies of retail brokerage data show that the majority of large single-day losses occur after the trader\'s first 2-3 losses of that day.',
  nextTitle: 'Position Sizing',
},

{
  id: 55,
  title: 'Position Sizing',
  subtitle: 'The one formula that determines how many shares to buy',
  section: 'Section 4 · Momentum Basics',
  sectionColor: '#f97316',
  coreHeading: 'Shares = Dollar Risk ÷ (Entry − Stop)',
  coreBody: 'Position sizing is the mathematical link between your risk management rules and your actual trade execution. The formula is: Shares = Dollar Risk ÷ (Entry Price − Stop Price). Dollar Risk is your maximum allowable loss on this trade (e.g., 1% of your account). Entry Price is where you plan to buy. Stop Price is where you will sell if wrong. The result tells you exactly how many shares to buy so that if you\'re stopped out, you lose precisely your pre-defined risk amount — no more. Example: $10,000 account, 1% risk = $100 max loss. Entry at $50, stop at $48. Dollar risk per share = $50 - $48 = $2. Shares = $100 ÷ $2 = 50 shares. If you buy 50 shares and are stopped out at $48, you lose exactly $100 — 1% of account. This formula keeps your risk consistent regardless of stock price, volatility, or position size. Every professional trader uses a variation of this formula.',
  facts: [
    { icon: '🧮', text: 'Formula: Shares = Dollar Risk ÷ (Entry Price − Stop Price)' },
    { icon: '📏', text: 'Dollar Risk = your max loss per trade (e.g., 1% of account balance)' },
    { icon: '⚖️', text: 'Wider stop = fewer shares; tighter stop = more shares — risk stays constant either way' },
  ],
  vocab: [
    { term: 'Position Sizing', definition: 'The calculation of how many shares to buy so that a stop-out results in exactly your pre-defined maximum loss, regardless of the stock\'s price or volatility.' },
    { term: 'Dollar Risk', definition: 'The maximum dollar amount you are willing to lose on a single trade, derived from your account size and per-trade risk percentage (e.g., 1-2%).' },
    { term: 'Risk Per Share', definition: 'The difference between entry price and stop price — the per-share dollar loss if the trade is stopped out; the denominator in the position sizing formula.' },
  ],
  slotA: {
    type: 'stat-block',
    stats: [
      { value: '$100', label: 'Dollar Risk', sub: '1% of $10,000 account' },
      { value: '$2.00', label: 'Risk Per Share', sub: 'Entry $50 − Stop $48' },
      { value: '50', label: 'Shares to Buy', sub: '$100 ÷ $2.00 = 50 shares' },
      { value: '$100', label: 'Max Loss', sub: '50 shares × $2.00 = exactly $100' },
    ],
  },
  slotB: {
    type: 'calculator',
    heading: 'Position Size Calculator',
    inputLabel: 'Account Size ($)',
    inputDefault: 10000,
    inputMin: 1000,
    inputMax: 100000,
    inputStep: 1000,
    factor: 0.01,
    resultLabel: 'Max Dollar Risk (1% of Account)',
    resultPrefix: '$',
    note: 'Divide your max dollar risk by (Entry Price − Stop Price) to get your share count.',
  },
  dykStyle: 'data',
  didYouKnow: 'Back-testing studies show that consistent 1% risk-per-trade position sizing, combined with a 2:1 average reward-to-risk ratio and a 50% win rate, produces a positive expected value of +0.5R per trade — meaning the system is profitable in the long run even if you only win half your trades.',
  nextTitle: 'Stop-Loss Mastery',
  checkpointQuiz: [
    {
      q: 'Your max risk is $100. Entry price is $50.00, stop at $48.00. How many shares do you buy?',
      options: ['100 shares — always buy round numbers', '50 shares — $100 ÷ $2 risk per share', '25 shares — being conservative', '200 shares — to maximize the opportunity'],
      correct: 1,
      explanation: 'Shares = Dollar Risk ÷ Risk Per Share = $100 ÷ ($50 − $48) = $100 ÷ $2 = 50 shares. If stopped out at $48: 50 × $2 = exactly $100 lost. No surprises. This is the formula.',
    },
    {
      q: 'If you widen the distance between entry and stop (a larger stop), you should buy...',
      options: ['More shares — a wider stop means higher conviction', 'The same number of shares — stop size is irrelevant to sizing', 'Fewer shares — dollar risk stays constant, wider stop means fewer shares', 'Stop using the formula entirely and just buy what feels right'],
      correct: 2,
      explanation: 'Dollar risk is the constant. Wider stop = more risk per share = fewer shares to keep total dollar risk the same. Tighter stop = less risk per share = more shares. The formula balances it automatically every time.',
    },
    {
      q: 'What percentage of their account do professional momentum traders typically risk on a single trade?',
      options: ['10–20% — big conviction requires big size', '5–10% — reasonable for experienced traders', '1–2% — preserves capital through any losing streak', '50%+ on their highest-conviction setups'],
      correct: 2,
      explanation: '1–2% per trade is the professional standard. At 1% risk, you can survive 50 consecutive losers and still have half your capital. That mental durability is what allows consistent, unemotional execution.',
    },
  ],
},
{ id: 56, title: 'Stop-Loss Mastery', subtitle: 'Hard stops beat mental stops every single time', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'Why Your Stop-Loss Is Your Best Friend', coreBody: 'A stop-loss is the single most important tool in a momentum trader\'s arsenal. There are two kinds: mental stops (a price you tell yourself you\'ll exit at) and hard stops (an actual order sitting in the market). Mental stops fail almost every time. Your brain rationalizes, makes excuses, and freezes when the moment of truth arrives. Hard stops execute automatically — they remove emotion from the equation entirely. Where you place the stop matters just as much as having one. Place it just below a key technical level: the base of a consolidation, a prior support area, or the low of the setup candle. Never place a stop at an arbitrary percentage — "I\'ll stop out if it falls 5%" ignores where the chart actually says the trade is wrong. And one ironclad rule: never, ever move your stop away from your entry to give a trade "more room." That is not risk management — it is hoping. Once a stop is set, it only moves in one direction: toward your entry or beyond it as the trade works in your favor.', facts: [{ icon: '🛑', text: 'Mental stops are broken by emotion 90% of the time — hard stops execute no matter what you feel.' }, { icon: '📍', text: 'Place stops below a key technical level (support, setup low), not at an arbitrary % distance.' }, { icon: '🔒', text: 'A stop-loss only ever moves toward profit — moving it away from entry is called \'hoping,\' not trading.' }], vocab: [{ term: 'Hard Stop', definition: 'A live stop-loss order resting in the market that executes automatically if price reaches the trigger level.' }, { term: 'Mental Stop', definition: 'An imaginary exit level held only in the trader\'s mind — frequently abandoned under emotional pressure.' }, { term: 'Key Level', definition: 'A significant price area on the chart (support, base of consolidation, setup candle low) used to anchor a stop.' }], slotA: { type: 'alert-trio', items: [{ accent: '#ef4444', icon: '🧠', heading: 'Mental Stops Fail', body: 'When price hits your mental stop, your brain says \'it\'ll bounce\' and you hold. This is the most expensive mistake in trading.' }, { accent: '#f97316', icon: '📐', heading: 'Placement Is Everything', body: 'Place your stop just below the technical invalidation point — where the chart proves you wrong — not at a round-number percentage.' }, { accent: '#22c55e', icon: '✅', heading: 'Hard Stops Win', body: 'A hard stop executes while you sleep, while you\'re distracted, while you panic. It is the professional\'s non-negotiable.' }] }, slotB: { type: 'steps', heading: 'Setting a Perfect Stop-Loss', steps: [{ num: 1, title: 'Identify the Setup', body: 'Before entering, mark the exact technical level that makes the trade invalid — the low of the base, the prior support zone, or the setup candle low.' }, { num: 2, title: 'Place the Stop Below That Level', body: 'Set your hard stop 2–5 cents below the technical invalidation level. This gives a tiny buffer for noise without sacrificing meaningful risk.' }, { num: 3, title: 'Calculate Your Dollar Risk', body: 'Multiply the distance from entry to stop by share size. Confirm this equals 1R — no more than 1% of your account on this trade.' }, { num: 4, title: 'Never Touch It (Down)', body: 'Once the stop is set, the only allowed adjustment is upward as the trade moves in your favor. Moving it down is forbidden.' }] }, dykStyle: 'mistake', didYouKnow: 'Studies of retail trading accounts show that traders who skip hard stops lose an average of 3x more per losing trade than traders who set them. The \'it\'ll come back\' mindset is the #1 cause of catastrophic single-trade losses.', nextTitle: 'Profit Targets' },

{ id: 57, title: 'Profit Targets', subtitle: 'Measured moves, R-multiples, and the art of the partial exit', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'Knowing When — and How — to Take Profits', coreBody: 'Entering a trade is exciting; exiting it profitably is the actual skill. Most beginners either take profits too early (scalping pennies when a dollar is available) or hold too long (turning a winner into a loser). Professional momentum traders use three frameworks to plan exits before they enter. First: measured moves. If a stock breaks out of a consolidation pattern that is $1 wide, the initial target is $1 above the breakout level. The height of the base projects the move. Second: R-multiples. If your stop is $0.50 away from entry, your first target should be at least $1.00 away (2R) and your stretch target at $1.50 (3R). Anything less than 2R on a momentum trade is not worth the risk. Third: partial exits. Rather than selling everything at one price, sell half at 2R to lock in profit, move your stop to breakeven, and let the remaining half ride toward 3R or beyond with a trailing stop. This strategy removes pressure and allows winners to run without risking the gain you\'ve already earned.', facts: [{ icon: '📏', text: 'Measured move targets project the height of a base or consolidation pattern above the breakout point.' }, { icon: '✂️', text: 'Partial exits — selling half at 2R — lock in profit and reduce stress while letting winners run.' }, { icon: '🎯', text: 'Never take a trade with a target less than 2x the distance to your stop. Minimum R:R is 1:2.' }], vocab: [{ term: 'R-Multiple', definition: 'A unit of risk. 1R = the dollar distance from entry to stop. A 2R target means profit equals 2x the risk taken.' }, { term: 'Measured Move', definition: 'A price target calculated by projecting the height of a chart pattern (e.g., a base) above the breakout level.' }, { term: 'Trailing Stop', definition: 'A stop-loss that moves up automatically as price rises, locking in progressively more profit on a runner position.' }], slotA: { type: 'comparison', leftLabel: 'Full Exit', rightLabel: 'Partial Exit Strategy', rows: [{ left: 'All-or-nothing at one price', right: 'Sell half at 2R, half at 3R+' }, { left: 'High emotional pressure at target', right: 'Pressure removed after 1st exit' }, { left: 'Miss big moves if early', right: 'Always participates in large moves' }, { left: 'One chance to be right', right: 'Two chances to capture value' }, { left: 'Simple but suboptimal', right: 'More complex but better outcomes' }] }, slotB: { type: 'calculator', heading: 'Profit Target Calculator', inputLabel: 'Stop Distance (cents)', inputDefault: 50, inputMin: 5, inputMax: 200, inputStep: 5, factor: 2, resultLabel: 'Minimum 2R Target', resultPrefix: '', resultSuffix: ' cents from entry', note: 'Your first profit target must be at least 2x your stop distance. Move stop to breakeven after hitting it.' }, dykStyle: 'pro-tip', didYouKnow: 'Professional traders often use a rule called \'scale out, not out.\' They never sell 100% of a position at the first target — they sell enough to cover risk and let the rest run free. This is how large gains are captured without greed driving the hold.', nextTitle: 'Risk/Reward Ratio' },

{ id: 58, title: 'Risk/Reward Ratio', subtitle: 'Asymmetry is your edge — make every trade pay you more than it risks', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'Why 1:2 Risk/Reward Is the Minimum Acceptable Trade', coreBody: 'Risk/reward ratio (R/R) is the single most important concept in trading math. It answers the question: for every dollar I risk on this trade, how many dollars could I make? A 1:2 ratio means risking $1 to potentially make $2. A 1:3 ratio means risking $1 for $3. Here is the profound implication: if your R/R is 1:2 and you are right only 40% of the time, you are still profitable. If you win 4 of every 10 trades at 2:1, you gain $8 and lose $6 — a net positive. This is the mathematical foundation of momentum trading. Most beginners focus obsessively on win rate and ignore R/R completely — this is backwards. You calculate R/R before you enter: divide the distance from entry to target by the distance from entry to stop. If the ratio is less than 2, skip the trade. Period. Asymmetric risk is what separates trading from gambling. When your winners are consistently larger than your losers, mediocre win rates still produce account growth.', facts: [{ icon: '⚖️', text: 'A 1:2 R/R trade is profitable even at a 40% win rate — asymmetry makes the math work for you.' }, { icon: '🧮', text: 'Calculate R/R before entry: (entry to target) ÷ (entry to stop). Must be ≥ 2.0 to qualify.' }, { icon: '🚫', text: 'Never enter a trade with less than 1:2 R/R — the odds are mathematically stacked against you.' }], vocab: [{ term: 'Risk/Reward Ratio (R/R)', definition: 'The ratio of potential profit to potential loss on a trade. A 1:2 R/R means $2 profit potential for every $1 risked.' }, { term: 'Asymmetric Risk', definition: 'A situation where potential gains substantially outweigh potential losses, creating a mathematical edge over time.' }, { term: 'Expected Value', definition: 'The average outcome of a trade strategy over many repetitions, calculated by multiplying win rate by average win minus loss rate by average loss.' }], slotA: { type: 'stat-block', stats: [{ value: '40%', label: 'Win Rate Needed at 1:2 R/R', sub: 'To break even — anything above is profit' }, { value: '33%', label: 'Win Rate Needed at 1:3 R/R', sub: 'One winner covers two losers' }, { value: '3x', label: 'Account Growth Multiplier', sub: 'Traders with 1:3 R/R vs 1:1 over 100 trades' }] }, slotB: { type: 'scenario', setup: 'You spot a momentum setup. Entry: $10.00. The technical stop is at $9.75 (25 cents risk). The measured move target is $10.40 (40 cents potential gain). Should you take this trade based on R/R alone?', options: [{ label: 'Yes — the target is higher than the stop, so R/R is positive', correct: false, explanation: 'A positive R/R is not enough. You need at least 1:2, meaning the target must be at least 2x the stop distance (50 cents above entry = $10.50 minimum).' }, { label: 'No — the R/R is only 1:1.6, which is below the 1:2 minimum', correct: true, explanation: 'Correct. 40 cents potential gain divided by 25 cents risk = 1.6R. This falls short of the 2R minimum. Pass on this trade or wait for a better entry to improve the ratio.' }, { label: 'Yes — win rate matters more than R/R', correct: false, explanation: 'Wrong. R/R is more important than win rate for long-term profitability. A string of 1:1.6 trades requires a 63%+ win rate just to break even after commissions.' }] }, dykStyle: 'data', didYouKnow: 'A study of 43,000 retail trading accounts found that traders with average R/R above 1:2 were profitable at nearly 3x the rate of traders with R/R below 1:1 — even when both groups had identical win rates. The math of asymmetry is that powerful.', nextTitle: 'The Psychology of Momentum' },

{ id: 59, title: 'The Psychology of Momentum', subtitle: 'Fear, greed, and FOMO are the enemies inside the wire', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'Your Biggest Trading Enemy Lives Between Your Ears', coreBody: 'Technical analysis tells you what to do. Psychology determines whether you actually do it. The emotional landscape of momentum trading is treacherous: fear causes you to bail on a winner too early or freeze when you should cut a loser. Greed causes you to hold too long, move stops, and add to losing positions. FOMO — fear of missing out — causes you to chase breakouts that have already happened, entering at the top and guaranteeing a loss. These three forces create an emotional feedback loop: you miss a move, FOMO triggers, you chase and lose, fear makes you hesitant on the next setup, you miss that one too, and the frustration builds toward a revenge trade. Recognizing this loop is the first step to breaking it. Professional traders develop self-awareness as a core skill. They know their emotional tells: the quickening heartbeat before a chase entry, the rationalization voice that moves a stop, the "just one more" feeling after a loss. The antidote is a rule-based system that removes decisions. When everything is pre-decided — entry criteria, stop level, target, size — there is far less room for emotion to intervene.', facts: [{ icon: '😨', text: 'Fear causes premature exits on winners and frozen inaction on losers — both destroy profitability.' }, { icon: '🤑', text: 'Greed manifests as moving stops, adding to losers, and holding winners past logical targets.' }, { icon: '🔄', text: 'The emotional loop: miss → FOMO → chase → lose → fear → miss again → revenge trade.' }], vocab: [{ term: 'FOMO', definition: 'Fear Of Missing Out. The emotional impulse to enter a trade that has already moved, driven by fear of being left behind.' }, { term: 'Emotional Loop', definition: 'A self-reinforcing cycle of emotional reactions (miss → chase → lose → fear → revenge) that compounds losses.' }, { term: 'Rule-Based Trading', definition: 'A trading approach where every decision (entry, stop, target, size) is pre-defined by rules, minimizing emotional discretion.' }], slotA: { type: 'quote-hero', quote: 'The market is a device for transferring money from the impatient to the patient.', attribution: 'Warren Buffett' }, slotB: { type: 'true-false', heading: 'Psychology Myths vs Reality', statements: [{ text: 'Experienced traders eventually stop feeling fear and greed during trading.', answer: false, explanation: 'False. Even elite traders feel these emotions — they simply have systems and habits that prevent emotions from driving decisions. The goal is not to eliminate emotion but to contain it.' }, { text: 'A rule-based trading plan reduces the number of emotional decisions you must make in real time.', answer: true, explanation: 'True. When entries, stops, and targets are pre-defined, you are executing a plan rather than making live decisions under pressure. This is the primary psychological benefit of planning.' }, { text: 'Feeling excited about a trade is a reliable signal that it is a high-quality setup.', answer: false, explanation: 'False. Excitement and the quality of a setup are unrelated. In fact, the most dangerous trades often feel the most exciting — large gaps, parabolic moves, and hot tickers create maximum FOMO.' }, { text: 'Keeping a trading journal can help you identify your personal emotional patterns.', answer: true, explanation: 'True. Journaling creates a data record of your emotional state alongside your trades. Over time, you can spot exactly which conditions trigger your worst decisions and guard against them.' }] }, dykStyle: 'quote', didYouKnow: 'Dr. Brett Steenbarger, a psychologist who works with professional traders, found that the best predictor of a bad trading day is not market conditions — it is the trader\'s emotional state before the open. Top traders have pre-market routines specifically designed to achieve emotional neutrality before the bell rings.', nextTitle: 'FOMO and Discipline' },

{ id: 60, title: 'FOMO and Discipline', subtitle: 'FOMO is the #1 account killer — discipline is the cure', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'The Three FOMO Traps That Wipe Out Beginners', coreBody: 'Fear Of Missing Out is not just an emotion — it is a systematic account destroyer. It shows up in three distinct traps that beginners fall into repeatedly. Trap #1: Chasing the breakout. The stock breaks out and starts running. You didn\'t get in at the right time, but it keeps going up. You buy anyway, at a price far above the proper entry, with a stop that is now too wide to give you a good R/R. The trade almost always reverses and stops you out at the worst possible moment. Trap #2: Late entries on hot stocks. A biotech announces news, opens up 200%, and spikes further. You see tweets and alerts saying it\'s going higher. You buy near the top of the spike. These stocks routinely give back 50–80% of their intraday gains. Trap #3: Abandoning your own plan for someone else\'s trade. You see an influencer call a stock, it\'s already moved, but you buy because they said to. You have no plan, no stop, no target — just someone else\'s hype. Discipline is the antidote. Discipline is not a personality trait — it is a skill trained through repetition. You train it by following rules consistently in paper trading before you ever risk real money.', facts: [{ icon: '🏃', text: 'Chasing breakouts after they\'ve happened is the most common FOMO trap — you always buy at the worst entry.' }, { icon: '📲', text: 'Following influencer calls without your own analysis is FOMO trap #3 — and has no exit plan attached.' }, { icon: '🎓', text: 'Discipline is a trainable skill: the more you enforce rules in paper trading, the easier it is live.' }], vocab: [{ term: 'Chasing', definition: 'Buying a stock that has already moved significantly past a proper entry point due to FOMO, resulting in poor R/R.' }, { term: 'Late Entry', definition: 'Entering a trade well after the ideal setup trigger, usually near a local high, when risk is maximized and reward is minimized.' }, { term: 'Discipline', definition: 'The consistent, rule-governed execution of a trading plan regardless of emotional impulses in the moment.' }], slotA: { type: 'myth-busters', myths: [{ myth: 'If a stock keeps going up, it\'s safe to buy at any price — momentum means it will keep running.', reality: 'Momentum stocks can reverse violently and without warning. Buying after a large move means your stop must be wide (poor R/R) or you will get stopped out on normal volatility.' }, { myth: 'You can make up for missed trades by being more aggressive on the next setup.', reality: 'Increasing aggression after missing a trade is FOMO-driven sizing — one of the fastest ways to blow up an account. Each trade must be sized by your rule, not your frustration.' }] }, slotB: { type: 'steps', heading: 'Breaking the FOMO Cycle', steps: [{ num: 1, title: 'Recognize the Trigger', body: 'When you feel the urge to chase, label it: "This is FOMO." Naming the emotion creates a split-second of rational distance between feeling and action.' }, { num: 2, title: 'Check the Setup Against Your Rules', body: 'Ask: Does this entry meet my exact criteria? Is the R/R at least 1:2? If the answer to either is no, the trade is disqualified — regardless of how you feel.' }, { num: 3, title: 'Write It Down, Don\'t Trade It', body: 'Instead of entering the trade, write in your journal: "I felt FOMO on [ticker] at [time]. I did not take it because [rule violated]." This builds the habit.' }, { num: 4, title: 'Find the Next Valid Setup', body: 'Redirect the energy. Open your scanner. There will always be another setup. The market does not close forever — but a blown account does.' }] }, dykStyle: 'mistake', didYouKnow: 'In a 2019 analysis of 10,000 retail trading accounts, trades made within 10 minutes of a major news spike had an average loss rate of 74%. Those same accounts\' trades taken on pullbacks from the spike had a win rate of 61%. FOMO-driven entries statistically fail at nearly twice the rate of disciplined entries.', nextTitle: 'Overtrading' },

{ id: 61, title: 'Overtrading', subtitle: 'More trades means more losses — quality always beats quantity', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'Why Taking Fewer Trades Often Makes More Money', coreBody: 'Overtrading is one of the most insidious account destroyers because it feels like hard work. You are in front of the screens, you are active, you are making decisions — it seems productive. But trading is not like most jobs where more effort equals more output. In trading, excess activity directly correlates with excess losses. Each trade has three cost components: potential loss (if the setup fails), commission/spread (a guaranteed small loss on every entry), and opportunity cost (capital tied up in low-quality setups cannot be deployed in high-quality ones). When you overtrade, you are funding these costs constantly while diluting your attention and emotional reserves. The best momentum traders take 2–5 trades per day, sometimes fewer. They are intensely selective. They may watch 20 potential setups and only pull the trigger on 1 or 2. Your journal is the diagnostic tool for overtrading. If you are logging 10–15 trades in a single session and most are small losses, the pattern is clear. The fix is a daily trade limit: no more than 3 trades before noon, or no more than 5 trades per day total. Hard limits force selectivity.', facts: [{ icon: '📉', text: 'Overtrading dilutes focus and depletes emotional reserves, causing quality to fall with every additional trade.' }, { icon: '💸', text: 'Every trade has a spread/commission cost. 15 losing trades is 15 guaranteed costs plus 15 potential losses.' }, { icon: '📓', text: 'Your journal reveals overtrading: if most trades are small, random losses, you are trading noise, not setups.' }], vocab: [{ term: 'Overtrading', definition: 'Taking more trades than one\'s strategy or emotional state can support — usually driven by boredom, FOMO, or loss recovery urges.' }, { term: 'Trade Limit', definition: 'A self-imposed maximum number of trades per day or session, used to enforce selectivity and prevent overtrading.' }, { term: 'Selectivity', definition: 'The discipline of entering only the highest-quality setups that fully meet all criteria, and passing on everything else.' }], slotA: { type: 'before-after', leftLabel: 'Overtrading Day (15 trades)', rightLabel: 'Selective Day (3 trades)', leftItems: ['10 small losses ($20–$50 each)', '3 breakeven trades', '2 small winners ($30 each)', 'Total P&L: -$340', 'Emotional state: exhausted, frustrated'], rightItems: ['1 loss at full 1R ($50)', '2 solid winners at 2.5R avg ($125 each)', 'Total P&L: +$200', 'Emotional state: calm, focused', 'Setup quality: A-grade only'] }, slotB: { type: 'checklist', heading: 'Am I Overtrading? Checklist', items: ['I have taken more than 5 trades before noon', 'More than half my trades today have no clear catalyst', 'I entered a trade because I was bored, not because of a setup', 'I increased my share size to recover a morning loss', 'My last 3 trades were all small, random losses', 'I cannot clearly articulate why I entered my last trade', 'I am watching Level 2 tick-by-tick and entering on instinct', 'I feel compelled to be in a trade at all times'] }, dykStyle: 'data', didYouKnow: 'A Stanford behavioral finance study found that traders who set a maximum daily trade count of 3 showed 34% better annual returns than matched traders with no limit — not because their individual setups were better, but because the limit forced them to wait for only the highest-conviction ideas.', nextTitle: 'Revenge Trading' },

{ id: 62, title: 'Revenge Trading', subtitle: 'The most destructive pattern in all of trading', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'What Revenge Trading Is and How to Stop It Cold', coreBody: 'Revenge trading is the act of re-entering the market immediately after a loss with the primary goal of recovering that money in the same session. It is not analysis-driven — it is emotion-driven. The sequence is always the same: you take a loss, your nervous system registers it as a threat, adrenaline and cortisol flood your system, rational thinking is suppressed, and you feel a powerful urge to "get it back." You increase position size to recover faster. You enter without a proper setup. You are now in fight-or-flight mode managing a trade — the worst possible combination. Revenge trades almost always lose, and they often lose bigger than the original loss because position size is inflated by the need to recover quickly. A single bad revenge trading session can erase an entire week of disciplined gains. The cycle is: loss → revenge trade → bigger loss → bigger revenge → account damage. Breaking this cycle requires a hard rule: after any loss that hits your daily loss limit (typically 2–3% of account), you close the platform and walk away. No exceptions. This is called a daily circuit breaker, and it is one of the most valuable rules a trader can adopt.', facts: [{ icon: '💥', text: 'Revenge trades are made in fight-or-flight mode — adrenaline suppresses rational decision-making entirely.' }, { icon: '📈', text: 'Revenge traders increase size to recover faster — turning a $100 loss into a $400 loss is common.' }, { icon: '🔌', text: 'The daily circuit breaker: if you hit your daily loss limit, close the platform and do not return until tomorrow.' }], vocab: [{ term: 'Revenge Trading', definition: 'Re-entering the market immediately after a loss with the goal of recovering that specific money — driven by emotion, not analysis.' }, { term: 'Daily Circuit Breaker', definition: 'A hard rule that ends all trading for the day when a pre-set maximum daily loss (e.g., 2% of account) is reached.' }, { term: 'Loss Recovery Bias', definition: 'The psychological tendency to take disproportionate risks to recover a loss quickly, often compounding the original damage.' }], slotA: { type: 'timeline', heading: 'The Anatomy of a Revenge Trading Spiral', events: [{ label: '9:35 AM — First Trade', body: 'Clean setup, proper size. Stock stops out cleanly at 1R loss. Account down $50. Acceptable.' }, { label: '9:42 AM — Revenge Entry #1', body: 'Feeling frustrated, re-enters the same stock without a new setup. Doubles size to "get it back faster." Stops out. Down $150 total.' }, { label: '9:51 AM — Revenge Entry #2', body: 'Anger rising. Triples original size. Enters a different hot ticker with no real setup. Holds through stop. Down $400 total.' }, { label: '10:05 AM — The Melt-Down', body: 'Rational thinking gone. Takes an enormous, poorly-planned trade trying to recover everything at once. Account down $800 — 16x the original loss.' }, { label: 'End of Day', body: 'Closes with catastrophic losses. The original $50 loss was perfectly acceptable. The other $750 was pure self-inflicted damage.' }] }, slotB: { type: 'scenario', setup: 'It\'s 10:15 AM. You\'ve already taken two losses today totaling $120 — exactly at your pre-set daily loss limit of 1.5% of your account. You spot what looks like a strong setup forming. What do you do?', options: [{ label: 'Take the trade — it looks like a great setup and could recover the losses', correct: false, explanation: 'Wrong. Your daily circuit breaker has triggered. No matter how good the setup looks, taking it now means you are operating in a compromised emotional state. The loss recovery motive is present even if you don\'t feel it.' }, { label: 'Close the platform, log the day in your journal, and do not trade again until tomorrow', correct: true, explanation: 'Correct. The daily circuit breaker is an unconditional rule. Closing down protects you from the most dangerous version of yourself. The setup will still exist tomorrow, when you are fresh and emotionally neutral.' }, { label: 'Take the trade but reduce size by 50% since you\'re at your limit', correct: false, explanation: 'Incorrect. Modifying the rule in-the-moment is still breaking the rule. Half a revenge trade is still a revenge trade. The circuit breaker exists precisely because your judgment is compromised when you want to "just try one more."' }] }, dykStyle: 'mistake', didYouKnow: 'Research published in the Journal of Finance found that on days when traders experienced a loss in their first trade, the average loss for the remainder of that day was 3.6x larger than on days when the first trade was a winner. The first loss sets off a cascade of emotionally-driven decisions that compounds damage throughout the session.', nextTitle: 'The Parabolic Move' },

{ id: 63, title: 'The Parabolic Move', subtitle: 'Vertical price action is beautiful — and deadly if you chase it', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'How to Trade Parabolic Stocks Without Getting Burned', coreBody: 'A parabolic move is when a stock goes nearly vertical — price accelerating upward at an increasing rate, often 50–200% or more in a single session. These moves are caused by short squeezes, surprise catalysts, or viral social media attention. They are visually spectacular and emotionally magnetic. They are also the most dangerous situations in all of momentum trading for one reason: they end fast and they end violently. When a parabolic move exhausts itself, it does not gently flatten — it reverses sharply, often retracing 50–80% of the move in minutes. Buyers at the top are immediately underwater with no support beneath them. The correct approach to parabolic stocks is: never chase the spike. Wait for the first significant pullback and consolidation. After a parabolic move, the stock will usually pull back, find a new base, and potentially make a second, smaller move. That second move — off the base that forms after the spike — is tradeable with a proper stop and R/R. The first leg up is for the early players. The second leg is for disciplined traders. The spike itself is for gamblers.', facts: [{ icon: '🚀', text: 'Parabolic moves end violently — stocks that spike 100%+ intraday routinely give back 50–80% of gains within hours.' }, { icon: '⏳', text: 'The playbook: never chase the spike. Wait for a pullback, a base, and then trade the second move.' }, { icon: '📊', text: 'Parabolic stocks often consolidate after the spike and form a tradeable pattern for the second leg up.' }], vocab: [{ term: 'Parabolic Move', definition: 'A price advance that accelerates dramatically upward in a short period, forming a near-vertical curve on the chart.' }, { term: 'Parabolic Reversal', definition: 'The violent, sharp reversal that follows a parabolic move, often erasing 50–80% of the advance in a fraction of the time it took to build.' }, { term: 'Second Leg', definition: 'A follow-up move higher that occurs after a stock pulls back and consolidates following an initial parabolic spike — generally more tradeable than the first.' }], slotA: { type: 'alert-trio', items: [{ accent: '#ef4444', icon: '🔥', heading: 'Never Chase the Spike', body: 'Buying into a parabolic spike means zero stop placement options, maximum spread, and maximum risk of being the last buyer before the reversal.' }, { accent: '#f59e0b', icon: '⏸️', heading: 'Wait for the Base', body: 'After the spike, price will pull back. Watch for it to consolidate into a tight range for 5–15 candles. That consolidation is your setup.' }, { accent: '#22c55e', icon: '🎯', heading: 'Trade the Second Leg', body: 'Buy the breakout from the post-spike consolidation. Now you have a defined stop (base low), a real target (measured move), and a proper R/R.' }] }, slotB: { type: 'true-false', heading: 'Parabolic Move Facts', statements: [{ text: 'Buying a stock as it is spiking parabolically is a high-probability momentum trade.', answer: false, explanation: 'False. Buying into a parabolic spike is one of the lowest-probability trades in momentum trading. You have no technical stop level, maximum competition from sellers above, and zero R/R edge.' }, { text: 'A parabolic move often creates a tradeable second leg after consolidation.', answer: true, explanation: 'True. After the initial spike and pullback, a period of consolidation can form a proper base. A breakout from that base is a legitimate momentum setup with definable risk and reward.' }, { text: 'Stocks that spike 150% in one day always continue higher the next day.', answer: false, explanation: 'False. Most parabolic movers experience significant selling on day 2 as early buyers take profits and shorts from day 1 cover. Continuation above day 1\'s high is possible but far from guaranteed.' }, { text: 'Short squeezes can cause parabolic moves that go much higher than fundamental analysis would predict.', answer: true, explanation: 'True. A short squeeze forces short sellers to buy shares to cover their positions, creating demand entirely independent of fundamentals. This mechanical buying can drive prices far beyond any rational valuation.' }] }, dykStyle: 'default', didYouKnow: 'On January 27, 2021, GameStop (GME) rose from $148 to $483 in a single day during the Reddit short squeeze — a 226% move. Within two days, it had fallen back to $112. Traders who chased the spike at $400+ suffered catastrophic losses. Traders who waited for the second leg setups that formed in the following weeks found multiple profitable opportunities.', nextTitle: 'Hot Sectors & Momentum' },

{ id: 64, title: 'Hot Sectors & Momentum', subtitle: 'When biotech is on fire, all biotech moves — learn to find the flame', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'Sector Momentum: Trading the Wave, Not Just the Stock', coreBody: 'Momentum does not exist only in individual stocks — it flows through entire sectors. When a biotech company announces a breakthrough drug trial result, every small biotech stock rises with it. When oil prices spike, energy stocks across the board see buying. This is called sector momentum or sector sympathy, and understanding it dramatically improves your stock selection. Every morning, the hot sector is the one that had a major catalyst overnight: a significant FDA approval, a large sector ETF movement, a major earnings beat from the sector leader, or a macro event that benefits an entire industry. When you identify the hot sector, you concentrate your scan within it. Instead of scanning all 8,000 stocks, you look for the top 3–5 names in the hot sector with the best technical setups. These stocks have wind at their backs — the sector itself is being bought, which makes individual breakouts more likely to follow through. Sector rotation is the companion concept: money rotates from cold sectors to hot ones. Watching which ETFs are gaining relative strength each week tells you where institutional money is flowing — and where the next momentum opportunities will appear.', facts: [{ icon: '🌡️', text: 'When a sector has a major catalyst, all stocks in that sector benefit from sympathetic buying — even unrelated names.' }, { icon: '🔄', text: 'Sector rotation: institutional money moves from cold sectors to hot ones continuously — follow the flow.' }, { icon: '🎯', text: 'Identifying the hot sector before the open narrows your scan from thousands of stocks to the best 3–5 setups.' }], vocab: [{ term: 'Sector Sympathy', definition: 'The tendency for stocks within the same sector to move together when a major catalyst affects one or more sector members.' }, { term: 'Sector Rotation', definition: 'The cyclical movement of institutional money from one sector to another in search of better relative performance.' }, { term: 'Sector ETF', definition: 'An exchange-traded fund that holds a basket of stocks within a single sector, used to measure overall sector momentum (e.g., XBI for biotech, XLE for energy).' }], slotA: { type: 'leaderboard', heading: 'Most Active Momentum Sectors', items: [{ rank: 1, label: 'Biotechnology / Pharma', sub: 'FDA decisions, trial results, M&A', pct: 92, color: '#f97316' }, { rank: 2, label: 'Technology / AI', sub: 'Earnings, product launches, macro', pct: 85, color: '#3b82f6' }, { rank: 3, label: 'Energy (Oil & Gas)', sub: 'Crude price moves, geopolitical events', pct: 74, color: '#22c55e' }, { rank: 4, label: 'Cannabis / Speculative', sub: 'Legislative news, social media', pct: 68, color: '#a855f7' }, { rank: 5, label: 'EV / Clean Energy', sub: 'Policy, earnings, sector sentiment', pct: 61, color: '#06b6d4' }] }, slotB: { type: 'pros-cons', heading: 'Sector Focus Strategy', pros: ['Concentrates attention on highest-probability setups for the day', 'Wind-at-the-back effect: sector buying supports individual breakouts', 'Reduces cognitive load — fewer stocks to track deeply', 'Aligned with institutional money flow for better follow-through', 'Easier to understand catalyst (one sector news affects all)'], cons: ['If you misidentify the hot sector, your setups underperform', 'Sector-wide moves can reverse violently if catalyst fades', 'Correlation risk: multiple positions in same sector = concentrated exposure', 'Hot sectors attract heavy retail competition and thin edges', 'Requires daily pre-market sector analysis discipline'] }, dykStyle: 'data', didYouKnow: 'Studies of intraday momentum found that on days when a sector ETF moved more than 2% at the open, individual stocks within that sector had a 67% higher breakout follow-through rate than on neutral sector days. Trading with sector momentum behind you is not optional — it\'s a significant statistical edge.', nextTitle: 'Scanning for Momentum Stocks' },

{ id: 65, title: 'Scanning for Momentum Stocks', subtitle: 'The right filters turn 8,000 stocks into your best 3 setups', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'Building a Pre-Market Scanner That Finds Real Momentum', coreBody: 'A momentum scanner is a tool that filters the entire universe of stocks down to a handful that meet your specific criteria right now. Without a scanner, finding momentum stocks is like searching for a needle in a haystack of 8,000 needles and hay. The goal of pre-market scanning is to arrive at the open with a watchlist of 3–5 stocks that have a specific catalyst, the right technical setup, and the liquidity to trade safely. The five most important filters for momentum scanning are: (1) Float under 20 million shares — small floats move more aggressively on volume. (2) Relative Volume over 3x normal — something is happening today that isn\'t normally happening. (3) Price between $2 and $20 — affordable for small accounts, still has volatility. (4) Gap up 5% or more — the market is already agreeing with your bullish thesis before the open. (5) A specific catalyst — news, FDA decision, earnings beat, partnership announcement. The top tools are Trade-Ideas (best real-time scanner), Finviz (free, great for pre-market research), and ThinkorSwim\'s built-in scanner (free with a TD Ameritrade account). Combine scanner results with chart analysis to build your daily watchlist.', facts: [{ icon: '🔍', text: 'A momentum scanner filters 8,000+ stocks to your best 3–5 daily setups using quantifiable criteria.' }, { icon: '📊', text: 'Key filters: float <20M shares, RVOL >3x, price $2–$20, gap up >5%, plus a clear catalyst.' }, { icon: '⚡', text: 'Trade-Ideas, Finviz, and ThinkorSwim are the top scanning platforms — two are free to use.' }], vocab: [{ term: 'Relative Volume (RVOL)', definition: 'Today\'s trading volume divided by the average volume for the same time period. RVOL >3 means 3x normal activity — a signal that something significant is happening.' }, { term: 'Float', definition: 'The number of shares of a company available for public trading. Small floats (<20M) move more dramatically on increased volume.' }, { term: 'Pre-Market Watchlist', definition: 'A curated list of 3–5 stocks identified before the market opens that meet all scanner criteria and have defined setups ready to trade.' }], slotA: { type: 'checklist', heading: 'Momentum Stock Scanner Checklist', items: ['Float under 20 million shares', 'Relative volume (RVOL) above 3x normal', 'Price between $2 and $20', 'Pre-market gap of 5% or more', 'Identifiable fundamental catalyst (news, FDA, earnings)', 'Clean technical setup visible on 5-minute chart', 'Average daily volume at least 500,000 shares normally', 'No earnings report in the next 24 hours (unless that IS the catalyst)', 'Sector has tailwind today (hot sector context)', 'Level 2 shows buying interest, not just thin air'] }, slotB: { type: 'steps', heading: 'Building Your Daily Watchlist', steps: [{ num: 1, title: 'Run Pre-Market Scanner at 8:00–9:00 AM', body: 'Before the market opens, run your scanner with all five core filters. Output should be 5–15 candidates. Note the catalyst for each.' }, { num: 2, title: 'Research Each Candidate', body: 'For each scanner result, find the news headline. Is it a genuine catalyst (FDA, earnings, partnership) or just price action noise? Genuine catalysts trade better.' }, { num: 3, title: 'Chart Analysis', body: 'Pull up the daily and 5-minute chart for each candidate. Is there a clean technical setup — a consolidation, a breakout level, a clear stop? If not, remove it from the list.' }, { num: 4, title: 'Build Your Final Watchlist', body: 'Narrow to your 3–5 best stocks. Write the entry level, stop level, and target for each before the open. You are now prepared, not reactive.' }] }, dykStyle: 'pro-tip', didYouKnow: 'Trade-Ideas\' AI-powered scanner (called "Holly") runs over 70 simultaneous trading algorithms and historically back-tests each alert before sending it. Traders who use AI-assisted scanning report spending 40% less time on stock selection and 40% more time on execution quality — which is where actual money is made.', nextTitle: 'Paper Trading' },

{ id: 66, title: 'Paper Trading', subtitle: 'Practice like it\'s real — because the habits you build here carry over', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'How to Use Paper Trading to Actually Build Real Skills', coreBody: 'Paper trading (simulated trading with fake money) is the single most underutilized tool in a beginner\'s development. Most beginners do it wrong: they treat it casually, enter random sizes, ignore their stops because "it\'s not real money," and then wonder why their live trading is terrible. The reason paper trading fails most people is not the tool — it is the attitude. To benefit from paper trading, you must treat every simulated trade as if the money is real. Same position sizing rules. Same stop-loss discipline. Same daily loss limits. Same emotional seriousness. When the simulated account drops, write in your journal as if it stung. When it gains, celebrate the discipline, not the luck. Paper trading has one enormous advantage over live trading: you can practice in conditions of zero financial consequence while still building all the mechanical habits and chart-reading skills that eventually drive live trading success. The transition from paper to live should be data-driven: trade paper for at least 30 days, achieve a positive expectancy (average winning trade > average losing trade), maintain your rules 90%+ of the time, and only then open a live account with a small initial amount ($500–$1,000).', facts: [{ icon: '🎮', text: 'Paper trading only builds real skills when treated identically to live trading — same rules, same sizing, same discipline.' }, { icon: '📈', text: 'Track your paper trading statistics: win rate, average R gained, rule compliance rate — same as live.' }, { icon: '🔑', text: 'Transition trigger: 30+ days of paper trading with positive expectancy and 90%+ rule compliance rate.' }], vocab: [{ term: 'Paper Trading', definition: 'Simulated trading with virtual money using real market prices — used to practice strategy execution without financial risk.' }, { term: 'Positive Expectancy', definition: 'A strategy where the average winning trade is larger than the average losing trade, producing profit over a large sample of trades.' }, { term: 'Rule Compliance Rate', definition: 'The percentage of trades where you followed every pre-defined rule (entry criteria, stop placement, sizing). Target: 90%+ before going live.' }], slotA: { type: 'comparison', leftLabel: 'Wrong Way to Paper Trade', rightLabel: 'Right Way to Paper Trade', rows: [{ left: 'Random position sizes (\'it\'s not real\')', right: 'Exact sizing rules applied every time' }, { left: 'Ignore stops — \'I\'ll stop out mentally\'', right: 'Hard stops placed on every trade' }, { left: 'Trade 20 names with no focus', right: 'Watchlist of 3–5 stocks with a plan' }, { left: 'Skip journaling because it feels pointless', right: 'Full journal entry for every trade' }, { left: 'Transition to live after 2 weeks \'because I feel ready\'', right: 'Transition only after 30 days + positive expectancy' }] }, slotB: { type: 'scenario', setup: 'You have been paper trading for 3 weeks. Your statistics show a 55% win rate but your average win is $45 and your average loss is $60. A friend says you should go live because your win rate is above 50%. Should you?', options: [{ label: 'Yes — a 55% win rate is good enough to go live', correct: false, explanation: 'No. Win rate alone does not determine profitability. With a $45 average win and $60 average loss, your expectancy is negative: (0.55 × $45) − (0.45 × $60) = $24.75 − $27 = −$2.25 per trade. You are losing money on average.' }, { label: 'No — the negative expectancy means the strategy loses money even at 55% wins', correct: true, explanation: 'Correct. Positive expectancy requires (win rate × avg win) > (loss rate × avg loss). You need to either increase your average win (better targets) or decrease your average loss (tighter stops) before going live.' }, { label: 'Yes — you just need to increase position size live to make up for the negative expectancy', correct: false, explanation: 'Absolutely not. Increasing size on a negative expectancy strategy accelerates losses. Fix the strategy first — larger size only amplifies whatever edge (or lack thereof) already exists.' }] }, dykStyle: 'default', didYouKnow: 'Most professional trading firms require new traders to spend 3–6 months in simulated trading before touching firm capital. Even traders with 5+ years of experience who switch strategies or markets return to simulation first. The professionals who use paper trading the most are typically the ones who need it the least — and that is exactly why they are professionals.', nextTitle: 'Building Your Playbook' },

{ id: 67, title: 'Building Your Playbook', subtitle: 'Your personal catalog of setups is the most valuable document you will ever create', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'What a Trading Playbook Is and How to Build One', coreBody: 'A trading playbook is your personal catalog of the specific setups you trade — documented in enough detail that you could hand it to someone else and they could execute your strategy. Every professional trader has one. It is built from experience: every time you identify a setup that worked well (or failed in an instructive way), you document it. A setup entry in your playbook contains: (1) Setup name — give it a memorable label like "Opening Range Breakout" or "ABCD Pattern Reversal." (2) Market conditions required — what sector context, time of day, and overall market environment favor this setup. (3) Exact entry trigger — the specific price action signal that causes you to enter. (4) Stop placement rule — where the stop goes and why. (5) Target rule — how you determine the profit target. (6) Historical performance — your personal win rate, average R, and number of occurrences. Over time, your playbook becomes a living document of your edge. You will discover that 2–3 setups in your playbook produce 80% of your profits. You will ruthlessly focus on those and stop trading the weak ones.', facts: [{ icon: '📖', text: 'A playbook documents your setups in enough detail to execute them mechanically — removing guesswork from live trading.' }, { icon: '🔬', text: 'Most traders find 2–3 setups produce 80% of their profits — the playbook reveals which ones.' }, { icon: '📝', text: 'Each setup entry needs: name, conditions, entry trigger, stop rule, target rule, and your personal statistics.' }], vocab: [{ term: 'Trading Playbook', definition: 'A documented catalog of a trader\'s specific setups, including all entry, stop, and target rules, plus personal performance statistics for each setup.' }, { term: 'Setup', definition: 'A specific, repeatable pattern of price action conditions that defines a trading opportunity with known entry, stop, and target parameters.' }, { term: 'Edge', definition: 'A quantifiable statistical advantage in a specific setup — the proof that over many occurrences, you make more money than you lose on that pattern.' }], slotA: { type: 'checklist', heading: 'Playbook Setup Entry Template', items: ['Setup Name (memorable, specific label)', 'Setup Type (momentum breakout, pullback, reversal, etc.)', 'Time of Day (opening range, midday, power hour)', 'Market Conditions Required (hot sector, strong overall market, etc.)', 'Exact Entry Trigger (what price action causes you to enter)', 'Stop Placement Rule (where and why)', 'Profit Target Rule (measured move, R-multiple, etc.)', 'Ideal Chart Example (screenshot with annotations)', 'Personal Win Rate (track over minimum 20 occurrences)', 'Average R Won per Trade (your real edge metric)'] }, slotB: { type: 'steps', heading: 'How to Build Your Playbook From Scratch', steps: [{ num: 1, title: 'Start With One Setup', body: 'Pick the single setup you have studied the most — likely the Opening Range Breakout or ABCD pattern. Document it fully using the template. One complete entry beats ten incomplete ones.' }, { num: 2, title: 'Paper Trade It 20 Times', body: 'Trade only that setup in paper trading for the next 20 occurrences. Log every result. After 20 trades you have statistically meaningful data on your edge in that setup.' }, { num: 3, title: 'Add Screenshots and Notes', body: 'For each trade, save a screenshot of the chart at entry and at exit. Annotate what the setup looked like. These examples become your visual reference library.' }, { num: 4, title: 'Review and Refine Monthly', body: 'Every month, re-examine each playbook entry. Is win rate improving? Which time-of-day performs best? Delete setups with negative expectancy. Double down on winners.' }] }, dykStyle: 'pro-tip', didYouKnow: 'Top-ranked trading educator Mike Bellafiore of SMB Capital wrote an entire book called "The PlayBook" based on the principle that each trader must develop their own unique playbook of setups. At his firm, new traders are not considered ready for full capital allocation until they can articulate at least three well-documented setups from their own experience.', nextTitle: 'Common Beginner Mistakes' },

{ id: 68, title: 'Common Beginner Mistakes', subtitle: 'The 10 errors that drain accounts — recognize them before they cost you', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'Every Beginner Makes These Mistakes — Most More Than Once', coreBody: 'There is a remarkably consistent set of errors that beginners make, regardless of their background, intelligence, or how much they have studied. Knowing these mistakes intellectually does not prevent you from making them — but awareness at least gives you a fighting chance. The top ten are: (1) No stop-loss — the fastest path to a catastrophic loss. (2) Over-sizing positions — risking 10–20% of account on one trade. (3) Chasing entries — buying after the move has already happened. (4) No catalyst — trading a stock purely on technical patterns without any fundamental reason for movement. (5) Fighting the trend — buying in a downtrend, shorting in an uptrend. (6) Revenge trading — covered in detail in lesson 62. (7) No written plan — entering without defined stop, target, and size. (8) Wrong time of day — trading during the dead noon period with low volume and choppy price action. (9) Copying others\' trades — taking setups from alerts or social media with no personal understanding. (10) No journal — trading without feedback makes improvement impossible. The common thread: all ten mistakes are violations of process. Every single one is preventable with a rule-based approach.', facts: [{ icon: '🚫', text: 'The #1 beginner mistake is trading without a stop-loss — enabling small losses to become catastrophic ones.' }, { icon: '⏰', text: 'The noon dead zone (11:30 AM – 2:00 PM) is the wrong time to trade — volume drops, setups fail, choppy action dominates.' }, { icon: '📋', text: 'All 10 top beginner mistakes share one root cause: violation of process. Rules prevent all of them.' }], vocab: [{ term: 'Oversize', definition: 'Allocating too large a portion of account capital to a single trade, turning a normal loss into a severe account drawdown.' }, { term: 'Noon Dead Zone', definition: 'The period from approximately 11:30 AM to 2:00 PM ET when trading volume drops, spreads widen, and momentum setups fail at higher rates.' }, { term: 'Alert Trading', definition: 'Blindly entering trades based on someone else\'s alerts or social media posts without independent analysis — high-risk, low-understanding.' }], slotA: { type: 'myth-busters', myths: [{ myth: 'Copying trades from successful traders or influencers is a good way to learn and profit.', reality: 'Alert followers are always late — by the time you see the alert and enter, the original trader may be exiting. You have no plan, no stop, and no understanding of the setup. It is one of the fastest ways to lose money.' }, { myth: 'If a trade has no stop, you can always just sell manually when it goes against you.', reality: 'Manual exits in real-time require split-second decisions under emotional pressure. Studies show manual exits happen an average of 40% later than planned, dramatically increasing loss size on each trade.' }] }, slotB: { type: 'true-false', heading: 'Beginner Mistake Identification', statements: [{ text: 'Trading during the noon period (11:30 AM–2:00 PM) is just as productive as trading the first hour.', answer: false, explanation: 'False. The noon period has dramatically lower volume, wider spreads, and more false breakouts than the opening hour. Most experienced momentum traders do not take new positions during this window.' }, { text: 'Risking 1% of your account per trade is considered appropriately conservative for a beginner.', answer: true, explanation: 'True. 1% risk per trade means you can have 20 consecutive losses before losing 20% of your account — giving you time to learn, adjust, and survive. Over-sizing (5–10% per trade) ends accounts quickly.' }, { text: 'A strong technical setup is sufficient reason to enter a trade even without a fundamental catalyst.', answer: false, explanation: 'False. Technical setups without catalysts have lower follow-through rates in momentum trading. Price patterns alone can stall or reverse without the buying volume that catalysts generate.' }, { text: 'Keeping a detailed trading journal is one of the highest-return activities a beginner can do.', answer: true, explanation: 'True. Without a journal, you repeat the same mistakes indefinitely. With a journal, patterns in your behavior become visible and correctable. Improvement requires feedback — the journal is the feedback mechanism.' }] }, dykStyle: 'mistake', didYouKnow: 'A study analyzing 1,600 beginner trading accounts found that accounts keeping a detailed written journal improved their win rate by an average of 14 percentage points within 90 days compared to accounts with no journaling habit — without any other change to their strategy. Feedback loops are that powerful.', nextTitle: 'Your Edge as a Retail Trader' },

{ id: 69, title: 'Your Edge as a Retail Trader', subtitle: 'Institutions have billions — you have advantages they can only dream of', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'Why Being Small Is Your Greatest Competitive Advantage', coreBody: 'Most beginner traders assume they are at a permanent disadvantage compared to hedge funds and institutional traders with their Bloomberg terminals, armies of analysts, and algorithmic execution. In momentum trading of small-cap stocks, the opposite is often true. Retail traders have several structural advantages that institutions cannot replicate. First: speed and flexibility. A hedge fund managing $5 billion cannot buy 10,000 shares of a $5 stock — their order would move the market against themselves and they\'d be stuck in the position. A retail trader can enter and exit 1,000 shares in seconds with zero market impact. Second: universe of opportunity. Institutions are prohibited or practically unable to trade stocks below certain market caps. The entire small-cap and micro-cap universe — where the most explosive momentum moves happen — is effectively a retail-only playground. Third: no AUM constraints. Institutions must deploy capital to justify their fee structures. You can sit in cash 100% of the time when there are no good setups. That patience is an enormous edge. Fourth: anonymity. Your orders do not move markets or signal your strategy to competitors. The playing field in small-cap momentum trading is genuinely tilted in your favor — if you exploit it correctly.', facts: [{ icon: '⚡', text: 'Retail traders can enter and exit small-cap positions in seconds with zero market impact — institutions cannot.' }, { icon: '🏝️', text: 'The small-cap and micro-cap universe is practically off-limits to institutions — it\'s a retail trader\'s playground.' }, { icon: '💤', text: 'You can be 100% cash when there are no setups. Institutions must deploy capital — you never do.' }], vocab: [{ term: 'Market Impact', definition: 'The effect a large order has on the price of a stock — large institutions moving into small stocks push the price against themselves.' }, { term: 'AUM (Assets Under Management)', definition: 'The total value of assets a fund manages. High AUM forces institutions into large-cap stocks where their orders don\'t cause market impact.' }, { term: 'Small-Cap Universe', definition: 'Stocks with market capitalizations typically under $2 billion — where momentum moves are most explosive and institutional participation is lowest.' }], slotA: { type: 'stat-block', stats: [{ value: '$2B+', label: 'Minimum Market Cap for Most Institutions', sub: 'Stocks below this are too small for funds to trade without massive market impact' }, { value: '<$5M', label: 'Dollar Size of a Typical Retail Trade', sub: 'Invisible to the market — zero price impact on entry or exit' }, { value: '100%', label: 'Maximum Cash Allocation You Can Hold', sub: 'Institutions must be invested — you never have to be' }] }, slotB: { type: 'pros-cons', heading: 'Retail vs Institutional Trader', pros: ['Zero market impact on entries and exits in small caps', 'Access to the entire small-cap and micro-cap universe', 'No AUM deployment pressure — sit in cash when conditions are wrong', 'Total anonymity — no one front-runs your orders', 'Can execute a complete strategy change in one day'], cons: ['No Bloomberg terminal or institutional data feeds', 'No analyst team — all research is self-directed', 'Emotional management entirely self-driven (no trading desk culture)', 'Limited capital means fewer diversification options', 'No risk management oversight or firm coaching'] }, dykStyle: 'data', didYouKnow: 'Renaissance Technologies\' Medallion Fund — arguably the most successful trading fund in history — returned 66% annually before fees for decades. But because of its size ($10B+), it is closed to outside investors and must trade only highly liquid large-cap instruments. A retail trader in micro-caps can access opportunity sets that are literally unavailable to the world\'s best-funded trading teams.', nextTitle: 'From Learning to Live Trading' },

{ id: 70, title: 'From Learning to Live Trading', subtitle: 'The disciplined transition plan that separates survivors from casualties', section: 'Section 4 · Momentum Basics', sectionColor: '#f97316', coreHeading: 'A Step-by-Step Plan for Going Live Without Blowing Up', coreBody: 'The transition from learning to live trading is the most dangerous phase of a trader\'s development — and the most commonly botched. The typical mistake: someone studies for two weeks, paper trades for five days, feels excited, opens a live account with their savings, and loses everything in a month. The professional approach is methodical, milestone-driven, and patient. Phase 1: Education and paper trading simultaneously. Study momentum trading concepts while paper trading every day. Minimum 30 days. Track every metric. Do not skip this phase. Phase 2: Live trading with $500–$1,000. Open a small live account and trade the minimum possible share size (10–50 shares per trade). The goal here is not to make money — it is to experience the emotional reality of real money on the line while the stakes are low enough that losses cannot hurt you. Phase 3: Scale slowly. Only after demonstrating 60 days of live trading with positive expectancy and rule compliance above 90%, begin adding capital. Scale in increments: $1K → $2K → $5K → $10K. Each increment requires a new proof of performance. The traders who skip steps are the ones who blow up. The traders who are patient with the process are the ones who are still trading five years later.', facts: [{ icon: '📅', text: 'Paper trade for a minimum of 30 days with full discipline before opening any live account — no exceptions.' }, { icon: '💵', text: 'Start live with $500–$1,000 and minimum share size. The goal is emotional calibration, not profit.' }, { icon: '📊', text: 'Scale capital only after achieving 60 live trading days with positive expectancy and 90%+ rule compliance.' }], vocab: [{ term: 'Phase Trading', definition: 'A structured approach to developing as a trader through distinct stages: education, paper trading, small live account, and gradual capital scaling.' }, { term: 'Emotional Calibration', definition: 'The process of experiencing live trading with real (but small) money to understand and manage the emotional differences between simulated and live trading.' }, { term: 'Capital Scaling', definition: 'The practice of incrementally increasing account size only after meeting performance benchmarks — preventing premature risk exposure.' }], slotA: { type: 'timeline', heading: 'The Live Trading Transition Plan', events: [{ label: 'Days 1–30: Education + Paper Trading', body: 'Study momentum concepts daily. Paper trade with full discipline — same rules, same sizing, same journal. Target: positive expectancy and 90%+ rule compliance by day 30.' }, { label: 'Days 31–60: Minimum Live Account', body: 'Open a $500–$1,000 live account. Trade 10–50 shares per position. Lose only the minimum possible while learning the emotional reality of live trading. Journal every trade.' }, { label: 'Days 61–120: Small Live Account — Prove It', body: 'Continue live trading. Track all metrics for 60 consecutive days. Must achieve: positive expectancy, rule compliance >90%, no revenge trading, daily loss limit respected every day.' }, { label: 'Month 5+: Begin Scaling', body: 'If all benchmarks are met, add capital in increments: $1K → $2K → $5K → $10K. Each step requires a new 30-day proof of performance before the next increment.' }, { label: 'Year 1 Milestone', body: 'A trader who followed this process for 12 months has a documented track record, a proven edge, emotional resilience, and a playbook. They are now a real trader, not a hopeful one.' }] }, slotB: { type: 'steps', heading: 'Your First 30 Days Action Plan', steps: [{ num: 1, title: 'Open a Paper Trading Account Today', body: 'ThinkorSwim (TD Ameritrade/Schwab) offers free paper trading with real market data. Set it up now. Configure it with your target starting capital amount — treat it as real.' }, { num: 2, title: 'Trade Every Market Day', body: 'Consistency matters more than perfection. Trade every session, even if no valid setup appears. Write in your journal: "No qualifying setup today — chose not to trade." That discipline counts.' }, { num: 3, title: 'Track Your Metrics Weekly', body: 'Every Friday, calculate: win rate, average win size, average loss size, rule compliance rate. If any metric is moving in the wrong direction, diagnose why before the next week.' }, { num: 4, title: 'Set Your Live Transition Criteria', body: 'Write down your specific transition criteria before you start: e.g., 30 days paper + positive expectancy + 90% compliance. When you meet them objectively, transition. Not before.' }] }, dykStyle: 'quote', didYouKnow: '"The goal of a beginning trader is not to make money — it is to not lose money while learning." This principle, shared by nearly every trading mentor across generations, captures the entire philosophy of the transition plan. Survival in the early phase is not a consolation prize. It is the prerequisite for everything that comes after.', nextTitle: 'The Night Before' },
{
  id: 71,
  title: 'The Night Before',
  subtitle: 'Your edge is built when the market is closed.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'The Night-Before Ritual',
  coreBody: 'Every elite momentum trader has a night-before ritual that separates consistent performers from reactive gamblers. The market opens at 9:30 AM, but your edge — or lack of it — is determined the evening before. Professional traders treat the night before like an athlete treats the night before a game: review performance, study the opponent, and prepare mentally and tactically.\n\nSkipping night-before prep means arriving at the open reactive, emotional, and underprepared. You\'ll chase stocks you haven\'t studied, miss the setups you would have found, and trade with undefined risk. Contrast that with a trader who enters the session with 2-3 stocks fully researched, entry triggers defined, stops placed, and position sizes calculated.\n\nThe night-before routine takes 60-90 minutes. It is the highest-return-per-hour activity a trader can do. Most professional traders spend more time preparing the night before than they spend actively trading the next day — and that\'s exactly why they win.',
  facts: [
    { icon: '🌙', text: 'Elite traders spend 60-90 minutes on night-before prep — often more time than they trade.' },
    { icon: '📋', text: 'Having a written watchlist with levels reduces emotional decision-making at the open.' },
    { icon: '⚡', text: 'Traders with defined plans before the open execute faster and hold winners longer.' },
  ],
  vocab: [
    { term: 'Earnings Calendar', definition: 'A schedule of companies reporting quarterly earnings — a key source of overnight gap catalysts.' },
    { term: 'Alert Setup', definition: 'Pre-configured price notifications in your broker or charting platform that trigger when key levels are hit.' },
    { term: 'Risk Budget', definition: 'The maximum dollar amount you are willing to lose in a single trading session, set before the market opens.' },
  ],
  slotA: {
    type: 'timeline',
    heading: 'The Night-Before Ritual (5 Stages)',
    events: [
      { label: '5:00 PM — Review Trades', body: 'Go through every trade from the day. Note what worked, what didn\'t, and what emotions affected decisions. No blame — just data.' },
      { label: '6:00 PM — Earnings Calendar', body: 'Check tomorrow\'s pre-market and after-hours earnings reports. Identify any tickers that might gap significantly and appear on your scanner.' },
      { label: '7:00 PM — FDA & News Dates', body: 'Scan the FDA calendar for PDUFA dates, clinical trial readouts, and drug approval decisions. These create the most explosive overnight gaps.' },
      { label: '8:00 PM — Macro Events', body: 'Note any FOMC decisions, CPI reports, or Fed speeches scheduled for tomorrow. Macro events can override any individual stock setup.' },
      { label: '9:00 PM — Set Alerts & Rest', body: 'Pre-set any known levels in your charting platform, confirm your broker platform is functioning, and go to sleep. A rested mind makes better split-second decisions.' },
    ],
  },
  slotB: {
    type: 'steps',
    heading: '4 Steps to Close Out the Trading Day',
    steps: [
      { num: 1, title: 'Clear P&L Emotions', body: 'Whether today was green or red, close the emotional ledger. Tomorrow is a new session with fresh opportunities. Carrying yesterday\'s emotions into tomorrow is a losing strategy.' },
      { num: 2, title: 'Write 2-3 Watchlist Ideas', body: 'Based on earnings, FDA events, or sector trends, jot down 2-3 tickers you\'d like to watch tomorrow. These are candidates — not commitments.' },
      { num: 3, title: 'Confirm Risk Budget', body: 'Decide your maximum loss for tomorrow before the session starts. Write it down. If you hit that number, you stop trading — no exceptions.' },
      { num: 4, title: 'Check Broker & Platform', body: 'Ensure your broker platform, data feeds, and charting software are fully functional. A technical issue discovered at 9:29 AM is a disaster. Discovering it at 9 PM is a minor inconvenience.' },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'Most professional traders spend more time preparing the night before than actively trading the next day. A 90-minute preparation session for a 30-minute active trading window is a completely normal ratio among consistently profitable momentum traders.',
  nextTitle: 'Checking Futures and Global Markets',
},

{
  id: 72,
  title: 'Checking Futures and Global Markets',
  subtitle: 'Futures are the market\'s alarm clock.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Reading the Global Market Overnight',
  coreBody: 'Before US markets open at 9:30 AM Eastern, equity futures have been trading around the clock. /ES (S&P 500 E-mini), /NQ (Nasdaq 100 E-mini), and /YM (Dow Jones E-mini) are the three most-watched futures contracts. They act as a live vote on where the US market will open — and often, where it will trade for the first 30-60 minutes.\n\nBut futures don\'t operate in a vacuum. Global markets have already been open for hours. Tokyo opens at 8 PM Eastern, London opens at 3 AM Eastern, and Frankfurt runs in parallel with London. If the Nikkei dropped 2% overnight and the DAX is sliding, US equity futures will reflect that — and your momentum setups may face a macro headwind regardless of their individual catalysts.\n\nThe key rule: never ignore a -0.5% or greater futures move when entering a long momentum trade. You\'re swimming against a tide. Conversely, a strong +0.5% or better futures environment acts as rocket fuel for breakout trades in the first 30 minutes.',
  facts: [
    { icon: '🌏', text: 'Global markets trade in a continuous relay: Tokyo → Frankfurt/London → US pre-market → NYSE open.' },
    { icon: '📊', text: '/ES futures moving more than 0.5% in either direction before the open sets the tone for the first 30-60 minutes of US trading.' },
    { icon: '🔔', text: 'A gap between overnight futures and the cash market open (called a \'gap and go\' or \'gap and crap\') is one of the most tradeable pre-market signals.' },
  ],
  vocab: [
    { term: 'E-Mini Futures', definition: 'Electronically traded futures contracts representing a fraction of the full S&P 500, Nasdaq 100, or Dow Jones index — used to gauge overnight market sentiment.' },
    { term: 'Fair Value', definition: 'The theoretical equilibrium price between futures and the cash index based on interest rates and dividends — used to interpret whether futures are truly bullish or just catching up.' },
    { term: 'Overnight Session', definition: 'Trading activity in US futures and global equity markets between the 4 PM US close and the 9:30 AM US open.' },
  ],
  slotA: {
    type: 'stat-block',
    stats: [
      { value: '/ES', label: 'S&P 500 E-Mini Futures', sub: 'Each 1% move = ~$2,250 per contract. Most liquid futures market in the world.' },
      { value: '/NQ', label: 'Nasdaq 100 E-Mini Futures', sub: 'Each 1% move = ~$4,000 per contract. Dominated by mega-cap tech stocks.' },
      { value: '/YM', label: 'Dow Jones E-Mini Futures', sub: 'Each 1% move = ~$1,500 per contract. 30-stock index, less tech-heavy.' },
    ],
  },
  slotB: {
    type: 'diagram',
    heading: 'Global Market Session Clock',
    svgContent: `<rect width="320" height="200" rx="8" fill="#0f0f14"/>
<text x="160" y="22" text-anchor="middle" fill="#eab308" font-family="monospace" font-size="11" font-weight="bold">GLOBAL MARKET SESSIONS (Eastern Time)</text>
<rect x="12" y="34" width="60" height="28" rx="4" fill="#1a1a2e" stroke="#3b82f6" stroke-width="1.5"/>
<text x="42" y="47" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="8">TOKYO</text>
<text x="42" y="58" text-anchor="middle" fill="#3b82f6" font-family="monospace" font-size="7">8PM-2AM</text>
<rect x="82" y="34" width="60" height="28" rx="4" fill="#1a1a2e" stroke="#9ca3af" stroke-width="1.5"/>
<text x="112" y="47" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="8">LONDON</text>
<text x="112" y="58" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="7">3AM-12PM</text>
<rect x="152" y="34" width="70" height="28" rx="4" fill="#1a1a2e" stroke="#eab308" stroke-width="1.5"/>
<text x="187" y="47" text-anchor="middle" fill="#eab308" font-family="monospace" font-size="8">US PRE-MKT</text>
<text x="187" y="58" text-anchor="middle" fill="#eab308" font-family="monospace" font-size="7">4AM-9:30AM</text>
<rect x="232" y="34" width="76" height="28" rx="4" fill="#1a1a2e" stroke="#00ff88" stroke-width="2"/>
<text x="270" y="47" text-anchor="middle" fill="#00ff88" font-family="monospace" font-size="8">US OPEN</text>
<text x="270" y="58" text-anchor="middle" fill="#00ff88" font-family="monospace" font-size="7">9:30AM-4PM</text>
<line x1="72" y1="48" x2="82" y2="48" stroke="#9ca3af" stroke-width="1" marker-end="url(#arr)"/>
<line x1="142" y1="48" x2="152" y2="48" stroke="#9ca3af" stroke-width="1"/>
<line x1="222" y1="48" x2="232" y2="48" stroke="#9ca3af" stroke-width="1"/>
<text x="160" y="88" text-anchor="middle" fill="#fff" font-family="monospace" font-size="9" font-weight="bold">KEY FUTURES SIGNALS</text>
<rect x="12" y="96" width="90" height="36" rx="4" fill="#052e16"/>
<text x="57" y="109" text-anchor="middle" fill="#00ff88" font-family="monospace" font-size="8" font-weight="bold">BULLISH</text>
<text x="57" y="121" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="7">/ES +0.5% or more</text>
<text x="57" y="131" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="7">before open</text>
<rect x="115" y="96" width="90" height="36" rx="4" fill="#1c1917"/>
<text x="160" y="109" text-anchor="middle" fill="#eab308" font-family="monospace" font-size="8" font-weight="bold">NEUTRAL</text>
<text x="160" y="121" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="7">-0.5% to +0.5%</text>
<text x="160" y="131" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="7">stock-specific</text>
<rect x="218" y="96" width="90" height="36" rx="4" fill="#2d0a0a"/>
<text x="263" y="109" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="8" font-weight="bold">BEARISH</text>
<text x="263" y="121" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="7">/ES -0.5% or more</text>
<text x="263" y="131" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="7">reduce longs</text>
<text x="160" y="158" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="8">Futures + Global Markets = Pre-Market Tone</text>
<text x="160" y="172" text-anchor="middle" fill="#3b82f6" font-family="monospace" font-size="8">Check /ES, Nikkei, DAX before scanning stocks</text>
<text x="160" y="186" text-anchor="middle" fill="#eab308" font-family="monospace" font-size="8">Never ignore macro direction on momentum trades</text>`,
    caption: 'Global sessions feed into US pre-market futures — check /ES before scanning individual stocks.',
  },
  dykStyle: 'data',
  didYouKnow: 'On days when S&P 500 futures (/ES) are up more than 0.5% before the US open, the first 30 minutes of trading are bullish roughly 68% of the time. This tailwind dramatically increases the probability of gap-and-go setups following through on high-quality catalysts.',
  nextTitle: 'Reading Pre-Market News',
},

{
  id: 73,
  title: 'Reading Pre-Market News',
  subtitle: 'Scan fast. Read slow. Act only on signal.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Triage: Signal vs. Noise',
  coreBody: 'Pre-market news floods in from 4:00 AM Eastern onward. By 9:30 AM, hundreds of press releases, analyst notes, regulatory filings, earnings reports, and social media posts have hit the wire. The skill that separates professional traders from amateurs is not reading speed — it\'s triage.\n\nTriage means asking one question about every headline: "Does this materially change the company\'s business or near-term earnings?" FDA drug approval? Yes — that\'s transformational. Analyst raising price target from $42 to $45? No — that\'s noise. Earnings beat of 23% above estimates with raised guidance? Yes — that drives institutional buying. A routine quarterly PR about a new hire? No.\n\nHigh-impact pre-market catalysts share common traits: they are binary (something definitively changed), they affect the company\'s core revenue or survival, and they force action from institutional players who must now revalue their positions. When institutions are forced to act, volume and momentum follow. Your job is to identify those moments before the open and position accordingly.',
  facts: [
    { icon: '📰', text: 'The most actionable pre-market news hits between 6:30 AM and 8:00 AM Eastern — peak earnings and regulatory announcement window.' },
    { icon: '🔍', text: 'A genuine catalyst forces institutional investors to re-price the stock. Noise items can be safely ignored without any trading edge lost.' },
    { icon: '⚠️', text: 'Unverified social media rumors can drive pre-market price action but frequently reverse hard after the open.' },
  ],
  vocab: [
    { term: 'Earnings Release', definition: 'A company\'s official quarterly financial results report, showing revenue, EPS, and forward guidance — the most common source of pre-market gap catalysts.' },
    { term: 'Analyst Upgrade', definition: 'A change in a Wall Street analyst\'s official rating on a stock (e.g., from Hold to Buy), sometimes accompanied by a price target increase.' },
    { term: 'Pre-Market Catalyst', definition: 'Any news event released before the regular market open that materially changes the perceived value of a stock and drives significant price movement.' },
  ],
  slotA: {
    type: 'comparison',
    leftLabel: 'HIGH-IMPACT NEWS (Act)',
    rightLabel: 'LOW-IMPACT NOISE (Ignore)',
    rows: [
      { left: 'FDA drug approval granted', right: 'Analyst price target tweak (+5%)' },
      { left: 'Earnings beat >20% with raised guidance', right: 'Routine corporate press release' },
      { left: 'Merger or acquisition announced', right: 'Social media rumor (unconfirmed)' },
      { left: 'Short squeeze trigger confirmed', right: 'Insider stock grant (non-material)' },
      { left: 'Clinical trial Phase 3 positive data', right: 'CEO speaking at a conference' },
    ],
  },
  slotB: { type: 'vocab' },
  dykStyle: 'default',
  didYouKnow: 'The average earnings-surprise move for small-cap stocks with more than 20% short interest is 15-40% — compared to just 4.6% for S&P 500 large-cap stocks with the same earnings beat. Float size and short interest amplify the catalyst effect dramatically.',
  nextTitle: 'The Pre-Market Gappers List',
  checkpointQuiz: [
    {
      q: 'Which of these is a HIGH-IMPACT pre-market catalyst worth acting on?',
      options: ['CEO scheduled to speak at an industry conference', 'Analyst raises price target from $42 to $45', 'FDA grants drug approval for a Phase 3 trial', 'Routine press release about a new executive hire'],
      correct: 2,
      explanation: 'FDA drug approvals are binary and transformational — they force institutional investors to completely revalue the stock. The others are noise that price typically ignores or quickly fades.',
    },
    {
      q: 'The most actionable pre-market earnings and regulatory news typically hits between...',
      options: ['4:00–6:00 AM Eastern', '6:30–8:00 AM Eastern — peak earnings and regulatory window', '9:00–9:30 AM Eastern', 'Only during regular trading hours'],
      correct: 1,
      explanation: '6:30–8:00 AM is prime time. Companies release earnings and regulatory decisions here to capture analyst attention. Most institutional overnight orders are placed during this window.',
    },
    {
      q: 'Unverified social media rumors driving a pre-market gap should be treated as...',
      options: ['High-conviction setups — the market prices in truth quickly', 'Strong signals — retail traders know early', 'High-risk noise that frequently reverses at or after the open', 'Opportunities to double your normal position size'],
      correct: 2,
      explanation: 'Unverified rumors drive price, then get fact-checked at the open. If the rumor doesn\'t confirm, the gap reverses hard and fast. Always verify the catalyst before sizing into a pre-market gap.',
    },
  ],
},

{
  id: 74,
  title: 'The Pre-Market Gappers List',
  subtitle: 'The gappers list is your morning menu.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Finding the Best Movers Before the Bell',
  coreBody: 'A gapper is any stock trading significantly higher or lower than its prior closing price in pre-market trading. The pre-market gappers list is the first tool a momentum trader opens every morning — it\'s the menu of potential opportunities for the day.\n\nBut not all gappers are created equal. A stock gapping 8% on 12,000 shares of pre-market volume is very different from one gapping 8% on 1.2 million shares. Volume confirms that real money — not just a handful of retail traders — is moving the stock. Without volume, gaps have no momentum behind them.\n\nThe filtering process is critical. Start by sorting all pre-market movers by percentage gain. Then apply volume filters (minimum 100K pre-market shares is a common threshold) and float filters (under 20M shares outstanding creates explosive moves). Finally, confirm the catalyst. A name that passes all three filters — big % move, real volume, small float, verified catalyst — earns a spot on your shortlist. You want 2-3 names on your final watchlist, not 20.',
  facts: [
    { icon: '📈', text: 'Pre-market gappers with >100K shares of volume before 8 AM are 3x more likely to follow through at the open than low-volume gappers.' },
    { icon: '🎯', text: 'Filtering to float <20M and pre-market volume >100K typically reduces a list of 200 gappers down to 3-5 actionable setups.' },
    { icon: '🔎', text: 'The gap percentage matters less than the catalyst quality — a 10% gap on an FDA approval beats a 30% gap on a vague press release.' },
  ],
  vocab: [
    { term: 'Gapper', definition: 'A stock that opens significantly higher or lower than its prior closing price, typically driven by a news event or earnings release.' },
    { term: 'Pre-Market Volume', definition: 'The number of shares traded in the pre-market session (4:00 AM – 9:30 AM ET), used to gauge conviction behind a pre-market price move.' },
    { term: 'Float Filter', definition: 'A screening criterion that limits the watchlist to stocks with a small number of publicly available shares, which tend to produce larger percentage moves.' },
  ],
  slotA: {
    type: 'leaderboard',
    heading: 'Morning Gappers List — Sample Scan',
    items: [
      { rank: 1, label: 'RXMD', sub: 'FDA approval granted — drug cleared for market', pct: 95, color: '#00ff88' },
      { rank: 2, label: 'SBEV', sub: 'Earnings beat 31% above estimates, guidance raised', pct: 70, color: '#00ff88' },
      { rank: 3, label: 'GREE', sub: 'Short squeeze — 62% SI, days-to-cover rising fast', pct: 55, color: '#eab308' },
      { rank: 4, label: 'HYMC', sub: 'Sector momentum — gold miner peers ripping', pct: 30, color: '#eab308' },
      { rank: 5, label: 'CLOV', sub: 'Vague PR news release — limited detail', pct: 15, color: '#9ca3af' },
    ],
  },
  slotB: {
    type: 'steps',
    heading: '4-Step Gappers Filter',
    steps: [
      { num: 1, title: 'Sort by % Gain', body: 'Pull all pre-market movers sorted by percentage gain. Your scanner should show tickers, % move, pre-market volume, and last price at minimum.' },
      { num: 2, title: 'Filter Float & Volume', body: 'Apply float <20M shares and pre-market volume >100K shares. This immediately eliminates 90% of the list, leaving only high-conviction setups.' },
      { num: 3, title: 'Find the Catalyst', body: 'For each remaining ticker, identify the exact catalyst. FDA news, earnings beat, acquisition, short squeeze — the catalyst must be concrete and verifiable.' },
      { num: 4, title: 'Shortlist Top 2', body: 'Select your top 2 names for the watchlist — the ones with the best combination of catalyst quality, float, and volume. These get full research before 9:30 AM.' },
    ],
  },
  dykStyle: 'data',
  didYouKnow: 'The top pre-market gapper by percentage gain with real volume (>100K shares) makes a new intraday high after the open more than 55% of trading days. That follow-through rate rises above 70% when the catalyst is an FDA approval or earnings beat greater than 20%.',
  nextTitle: 'Evaluating a Catalyst',
},

{
  id: 75,
  title: 'Evaluating a Catalyst',
  subtitle: 'Strong catalyst = conviction. Weak catalyst = trap.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Not All Catalysts Are Created Equal',
  coreBody: 'A 40% pre-market gap on a vague press release and a 40% pre-market gap on an FDA drug approval look identical on a price chart. They are completely different trades. The catalyst is the foundation of every momentum trade — without a strong catalyst, there is no institutional conviction, no sustained buying pressure, and no follow-through.\n\nCatalyst evaluation is the single most important skill in pre-market preparation. You need to ask: Does this catalyst change the company\'s future cash flows? Does it create urgency for institutional investors to revalue their positions? Is it binary (yes/no) or vague (maybe/eventually)? Binary catalysts — FDA decisions, quarterly earnings, acquisition announcements — force immediate repricing. Vague catalysts — partnerships without revenue terms, speculative social media posts, analyst reiterations — create noise moves that reverse quickly.\n\nThe practical test: if you had to explain the catalyst to a 10-year-old, would it be clearly good or bad news? "The FDA approved their cancer drug — they can now sell it" is a clear catalyst. "The company entered into a strategic collaboration to explore synergistic opportunities" is noise. When in doubt, pass on the trade.',
  facts: [
    { icon: '💊', text: 'FDA drug approvals are considered the highest-quality catalyst in biotech — binary, definitive, and often transformational for small-cap companies.' },
    { icon: '📉', text: 'Secondary offerings (companies issuing new shares) are almost always negative catalysts — they dilute existing shareholders.' },
    { icon: '🤝', text: 'Acquisition announcements typically create sustained buying across the entire sector, not just the target company.' },
  ],
  vocab: [
    { term: 'Binary Catalyst', definition: 'A news event with a definitive yes/no outcome that immediately and materially changes the stock\'s value — such as an FDA approval or earnings report.' },
    { term: 'Sympathy Gap', definition: 'A price gap in one stock driven by news from a related company in the same sector — weaker than a direct catalyst and more prone to fading.' },
    { term: 'Dilution', definition: 'The reduction in existing shareholders\' ownership percentage caused by a company issuing additional shares — typically a negative catalyst for price.' },
  ],
  slotA: {
    type: 'myth-busters',
    myths: [
      { myth: 'A big gap always means a strong catalyst.', reality: 'Gap size reflects pre-market buying pressure, not catalyst quality. Retail FOMO can create a 40% gap on a vague PR that reverses 80% within the first hour of trading.' },
      { myth: 'Social media hype is a valid catalyst for momentum trades.', reality: 'Unverified social media activity is one of the most dangerous false catalysts. Without a regulatory filing, earnings report, or press release, the move has no institutional support and is highly prone to reversal.' },
      { myth: 'Any news is better than no news for a long trade.', reality: 'Certain news is actively negative. Secondary offerings, clinical trial failures, and regulatory setbacks create gaps that collapse. Always identify the direction of the catalyst, not just its existence.' },
    ],
  },
  slotB: {
    type: 'pros-cons',
    heading: 'Strong vs. Weak Catalysts',
    pros: [
      'FDA drug approval (PDUFA decision)',
      'Earnings beat >15% above consensus',
      'Acquisition or merger announcement',
      'Short squeeze on high short interest float',
      'Positive Phase 3 clinical trial data',
    ],
    cons: [
      'Vague press release with no revenue figures',
      'Secondary offering (new share issuance)',
      'Analyst price target reiteration',
      'Sympathy gap from sector peer news',
      'Unconfirmed social media rumor',
    ],
  },
  dykStyle: 'mistake',
  didYouKnow: 'Stocks gapping on vague press releases — those without specific financial figures, regulatory approvals, or binding agreements — reverse at the open more than 65% of the time. Many experienced traders have a rule: if you can\'t explain the catalyst in one clear sentence, you don\'t trade it.',
  nextTitle: 'The Float Check',
},

{
  id: 76,
  title: 'The Float Check',
  subtitle: 'Small float = big moves. Large float = slow grind.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Why Float Determines Volatility',
  coreBody: 'Float is the number of shares available for public trading — it excludes shares held by insiders, institutions with long-term lock-ups, and restricted stock. Float is one of the single most important variables in momentum trading because it directly determines how much buying pressure is needed to move the price.\n\nThink of float like a sponge: a small sponge (micro float) soaks up buying quickly and deforms rapidly — a small amount of volume creates a huge price move. A giant sponge (large float) absorbs enormous volume with barely a ripple. When a catalyst hits a stock with 3 million shares of float, even moderate buying drives explosive percentage moves. When the same catalyst hits a stock with 500 million shares of float, the move is muted and slow.\n\nFor momentum traders, the sweet spot is float under 20 million shares. Under 5 million is considered micro-float — these stocks can move 50-100% intraday on strong catalysts. The tradeoff is that micro-float stocks are also prone to violent reversals. Position sizing must be smaller, and entries must be precise. The smaller the float, the tighter your risk management must be.',
  facts: [
    { icon: '🔥', text: 'Stocks with float under 5M shares (micro-float) can move 50-200% intraday on a strong catalyst — but reversals are equally violent.' },
    { icon: '📊', text: 'Float under 20M combined with pre-market volume >500K suggests that a significant portion of the entire float has already traded — a powerful momentum signal.' },
    { icon: '🐢', text: 'Large-cap stocks with floats >500M rarely move more than 3-5% intraday even on significant news — too many shares to move the price.' },
  ],
  vocab: [
    { term: 'Float', definition: 'The number of shares of a company available for public trading, excluding insider-held, restricted, and locked-up shares.' },
    { term: 'Micro-Float', definition: 'A stock with fewer than 5 million shares of float — associated with extreme volatility and rapid price movement on modest volume.' },
    { term: 'Float Rotation', definition: 'When a stock\'s daily trading volume exceeds its total float, indicating that the entire float has turned over — a sign of extreme momentum.' },
  ],
  slotA: {
    type: 'stat-block',
    stats: [
      { value: '<5M', label: 'Micro-Float — Explosive', sub: 'Average intraday move on catalyst: 40-200%. Enter small, set tight stops. Violent in both directions.' },
      { value: '5-20M', label: 'Low Float — Tradeable', sub: 'Average intraday move on catalyst: 15-40%. Sweet spot for momentum — volatile enough to profit, liquid enough to exit.' },
      { value: '>50M', label: 'High Float — Avoid Momentum', sub: 'Average intraday move on catalyst: 3-8%. Too many shares to create explosive moves. Better suited for swing traders.' },
    ],
  },
  slotB: {
    type: 'calculator',
    heading: 'Float Size Position Limiter',
    inputLabel: 'Stock Float (millions of shares)',
    inputDefault: 10,
    inputMin: 1,
    inputMax: 100,
    inputStep: 1,
    factor: 2,
    resultLabel: 'Approximate max position size (thousands of shares)',
    resultPrefix: '~',
    resultSuffix: 'K shares max',
    note: 'Lower float = smaller position to avoid moving the stock against yourself. Micro-float stocks require the tightest position sizing.',
  },
  dykStyle: 'data',
  didYouKnow: 'Stocks with float under 10 million shares produce average intraday moves of 18.4% on catalyst days — approximately 3x the move of comparable stocks with float over 50 million shares receiving the same type of news event. Float is the volatility multiplier.',
  nextTitle: 'Short Interest Check',
},

{
  id: 77,
  title: 'Short Interest Check',
  subtitle: 'Shorts are forced buyers — and that creates explosive upside.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'How Short Interest Fuels the Squeeze',
  coreBody: 'Short sellers borrow shares and sell them, hoping to buy them back later at a lower price and pocket the difference. When a catalyst hits that sends the stock higher instead, short sellers are in trouble. To close their positions and stop the bleeding, they must buy shares — which pushes the price even higher — which forces more short sellers to buy — which pushes it higher still. This self-reinforcing loop is called a short squeeze.\n\nShort interest (SI) is measured as a percentage of the float. A stock with 45% short interest means 45% of the available float has been sold short by bears. On a low-float stock, this creates extreme buying pressure when a catalyst triggers. Days-to-cover (DTC) measures how many days it would take for all short sellers to exit at average daily volume — higher DTC means exits take longer, and the squeeze lasts longer.\n\nThe ideal short squeeze setup: float under 10M shares, short interest above 30%, days-to-cover above 3, and a binary catalyst that validates the bulls. When all three line up, the forced buying from shorts combines with fresh buying from momentum traders to create some of the most explosive single-day moves in the market.',
  facts: [
    { icon: '⚡', text: 'A stock with 40% short interest and a positive catalyst can move 100-300% as both shorts covering and new buyers pile in simultaneously.' },
    { icon: '📅', text: 'Days-to-cover above 5 means shorts cannot exit quickly — the squeeze can last multiple days rather than just hours.' },
    { icon: '🎯', text: 'Short interest data is published twice monthly (as of the 15th and end of month) — check the most recent report for current SI %.' },
  ],
  vocab: [
    { term: 'Short Interest', definition: 'The percentage of a stock\'s float that has been sold short by bearish traders — high SI combined with a catalyst creates short squeeze conditions.' },
    { term: 'Days to Cover', definition: 'The number of days it would theoretically take for all short sellers to buy back their shares at the stock\'s average daily trading volume.' },
    { term: 'Short Squeeze', definition: 'A rapid price increase caused by short sellers being forced to buy shares to cover their positions, creating a self-reinforcing buying loop.' },
  ],
  slotA: {
    type: 'before-after',
    leftLabel: 'BEFORE SQUEEZE',
    rightLabel: 'DURING SQUEEZE',
    leftItems: [
      'Stock price: $8.00',
      'Short interest: 45% of float',
      'Days-to-cover: 5',
      'Volume: average daily level',
      'Short sellers comfortable — stock flat',
    ],
    rightItems: [
      'Stock price: $24.00 (+200%)',
      'Short sellers losing $16/share',
      'Forced buying at ANY price to exit',
      'Volume: 10x average daily level',
      'New buyers pile in — shorts scrambling',
    ],
  },
  slotB: { type: 'vocab' },
  dykStyle: 'quote',
  didYouKnow: '"The most violent moves in the stock market are short squeezes on low-float stocks." — Andrew Aziz, author of How to Day Trade for a Living. When 40-50% of a 5-million-share float is short and a binary catalyst hits, the buying demand can vastly exceed the available supply of shares.',
  nextTitle: 'Building Your Morning Watchlist',
},

{
  id: 78,
  title: 'Building Your Morning Watchlist',
  subtitle: 'Focus is a competitive advantage.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Two Stocks, Full Plans, Total Focus',
  coreBody: 'The morning watchlist is not a list of stocks you\'re vaguely interested in. It\'s a small set of 2-3 stocks for which you have a complete trading plan: identified catalyst, confirmed float and volume, specific entry trigger, defined stop-loss, and calculated position size. Everything you need to execute immediately when the market opens.\n\nMost amateur traders make the mistake of tracking 15-20 stocks and spreading their attention so thin that they execute none of them well. Professional traders do the opposite: they go deep on 2-3 names. They know the exact pre-market high, the level that would constitute a confirmed breakout, where they would stop out, and how many shares fit within their daily risk budget. This depth of preparation enables split-second decisions without hesitation.\n\nThe watchlist also includes a bench — 2-3 backup stocks that you\'ve researched but not fully committed to. If your primary setups fail at the open (gap reversal, low volume, no follow-through), the bench gives you alternatives without requiring emergency research under live market conditions. Never add unresearched names to the watchlist after 9:15 AM.',
  facts: [
    { icon: '🎯', text: 'Traders who limit their watchlist to 3 or fewer stocks at the open execute with 40% fewer mistakes than those tracking 10+ names.' },
    { icon: '📋', text: 'A complete plan includes: entry trigger, stop-loss level, first price target, and position size — all written before the market opens.' },
    { icon: '⏰', text: 'The watchlist should be finalized by 9:15 AM. Adding names after 9:15 AM dramatically increases the risk of making emotional, unresearched trades.' },
  ],
  vocab: [
    { term: 'Primary Watchlist', definition: 'The 2-3 stocks with the strongest setups that you are fully prepared to trade at the open — with catalyst, entry, stop, target, and size all defined.' },
    { term: 'Bench Watchlist', definition: 'A secondary list of 2-3 stocks that have been researched but are not your top setups — used as backup if primary setups fail at the open.' },
    { term: 'Entry Trigger', definition: 'The specific price level or technical condition that must be met before you enter a trade — prevents chasing and defines precise execution.' },
  ],
  slotA: {
    type: 'checklist',
    heading: 'Watchlist Qualification Checklist',
    items: [
      'Stock has a specific, verifiable catalyst (FDA, earnings, acquisition)',
      'Float is under 20M shares',
      'Pre-market volume exceeds 100K shares',
      'You can name the exact entry trigger level',
      'You have defined your stop-loss level',
      'You have identified a first price target',
      'Position size has been calculated to fit within daily risk budget',
    ],
  },
  slotB: {
    type: 'scenario',
    setup: 'RXMD is up 35% pre-market on an FDA approval. Float is 4 million shares. Pre-market volume is 2.3 million shares (57% of float has traded). You haven\'t traded RXMD before. The pre-market high is $4.82. Do you add it to your primary watchlist?',
    options: [
      { label: 'Yes — this is a strong setup. FDA approval, micro-float, 57% float rotation. Add to primary watchlist with plan: entry above $4.82, stop at $4.50, target $6.00.', correct: true, explanation: 'Correct. RXMD ticks every box: verified binary catalyst (FDA approval), micro-float (4M shares), massive volume (2.3M pre-market), and clear entry trigger (pre-market high breakout). This is exactly the type of setup the checklist is designed to identify.' },
      { label: 'No — it has already moved too much. A 35% pre-market move means I\'ve missed it.', correct: false, explanation: 'Incorrect. Pre-market moves often extend significantly after the open, especially on FDA approvals with micro-float stocks. A stock that moves 35% pre-market on FDA news can easily move another 50-100% intraday as retail traders discover it after the open. The move size alone is not a reason to pass.' },
      { label: 'Wait for more data — 35% seems too volatile to decide now.', correct: false, explanation: 'Incorrect. The data you need is already available: FDA approval (verified catalyst), 4M float (micro-float confirmed), 2.3M pre-market volume (confirmed interest). Waiting for "more data" is usually a euphemism for hesitation. If the checklist criteria are met, make the decision and build the plan.' },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'Professional traders typically run two separate watchlists: a primary list of 2 stocks with complete plans, and a bench of 3 stocks as backup setups. The bench prevents the dangerous behavior of adding unresearched stocks mid-session when primary setups don\'t materialize.',
  nextTitle: 'Setting Price Alerts',
},

{
  id: 79,
  title: 'Setting Price Alerts',
  subtitle: 'Alerts trade for you while you wait.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Never Miss a Trigger Again',
  coreBody: 'Price alerts are one of the most underutilized tools in a momentum trader\'s arsenal. Instead of staring at the screen for hours waiting for a stock to hit a key level, you set alerts at every critical price and let the software notify you. This frees your attention, reduces fatigue, and prevents the most common error: entering a position out of boredom or impatience rather than because a trigger was actually hit.\n\nEvery watchlist stock should have at least three alerts set before the market opens. First, an entry alert set just above the pre-market high — this signals a potential breakout. Second, a stop alert set at your defined risk level — this is your exit if the trade goes against you. Third, a target alert at the first resistance level — this signals it\'s time to consider taking partial profits.\n\nSet alerts in both your broker platform AND your charting software. Two independent notification systems ensure that a software glitch in one doesn\'t cause you to miss a critical trigger. Many professional traders also set phone alerts as a third layer. The cost of a missed entry or exit in a fast-moving momentum stock can be hundreds or thousands of dollars — the 2 minutes it takes to set up alerts is the best ROI activity in your pre-market routine.',
  facts: [
    { icon: '🔔', text: 'Setting alerts at your entry, stop, and target before the open eliminates the need to stare at screens — reducing fatigue and emotional trading.' },
    { icon: '⚡', text: 'In fast-moving momentum stocks, the difference between acting on alert vs. manual watching can be a 3-5% price difference in your fill.' },
    { icon: '🔒', text: 'Audio alerts are more reliable than visual alerts in a multi-monitor setup — a sound is harder to miss than a subtle color change on one of several screens.' },
  ],
  vocab: [
    { term: 'Entry Alert', definition: 'A price notification set just above a key breakout level (such as the pre-market high) that signals the stock may be beginning its momentum move.' },
    { term: 'Stop Alert', definition: 'A price notification set at your defined risk level — when triggered, it reminds you to exit the position to protect capital.' },
    { term: 'Target Alert', definition: 'A price notification set at the first resistance level or price target, signaling it\'s time to consider taking partial profits on a winning trade.' },
  ],
  slotA: {
    type: 'alert-trio',
    items: [
      { accent: '#eab308', icon: '🔔', heading: 'Entry Alert — Yellow', body: 'Set 5 cents ABOVE the pre-market high. When triggered, the stock is attempting a breakout. Confirm volume is surging before entering — alert does not mean auto-buy.' },
      { accent: '#ef4444', icon: '🚨', heading: 'Stop Alert — Red', body: 'Set 2% below your planned entry price. When triggered, exit the position immediately — no second-guessing, no hoping. The alert IS the exit signal.' },
      { accent: '#00ff88', icon: '✅', heading: 'Target Alert — Green', body: 'Set at the first major resistance level above entry. When triggered, consider selling 50% of the position to lock in profit and let the rest ride with a raised stop.' },
    ],
  },
  slotB: {
    type: 'steps',
    heading: '4 Steps to Set Pre-Market Alerts',
    steps: [
      { num: 1, title: 'Mark the Pre-Market High', body: 'On your chart, identify the highest pre-market price. This is your primary breakout level — the point at which pre-market buyers are validated and new momentum buyers should enter.' },
      { num: 2, title: 'Set Entry Alert 5 Cents Above', body: 'Configure an audio alert 5 cents above the pre-market high in both your broker and charting platform. Use maximum volume so you hear it even if distracted.' },
      { num: 3, title: 'Set Stop Alert Below Breakout', body: 'Set a stop alert at your risk level — typically 2-3% below the pre-market high. This is the level at which the setup has failed and you must exit.' },
      { num: 4, title: 'Set Partial Profit Alert at First Target', body: 'Identify the first resistance level above the pre-market high (previous day high, round number, VWAP extension). Set a green alert there to signal partial profit-taking.' },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'Set your price alerts in your broker AND your charting platform — two independent notification systems ensure you never miss a trigger. Many professional traders add a third layer: a mobile phone alert via their broker\'s app, so they\'re covered even during a bathroom break.',
  nextTitle: 'Pre-Market Level 2',
},

{
  id: 80,
  title: 'Pre-Market Level 2',
  subtitle: 'Pre-market Level 2 is a window into institutional intent.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Reading the Order Book Before the Bell',
  coreBody: 'Level 2 (L2) data shows the full order book — all buy bids and sell asks at every price level, with the size of each order. During regular trading hours, the Level 2 is packed with activity and large orders blend into the noise. But in pre-market trading, the book is thin — and that thinness makes large orders immediately visible and meaningful.\n\nA wall of 50,000 shares for sale at $5.00 in pre-market L2 is a significant resistance signal. Market makers and institutional sellers sometimes place large ask orders to suppress a breakout, collect shares at a low price, or test demand. When these walls are absorbed (bought through), the price often accelerates rapidly. When they hold, the price stalls or reverses.\n\nThe most powerful pre-market L2 signal is when a large ask wall disappears in the final 10-15 minutes before the open. This can indicate that the seller has withdrawn — no longer interested in suppressing the price — creating a vacuum for the stock to rip at the bell. Conversely, watch for bids that suddenly disappear (bid pulling), which signals buyers losing confidence and often precedes a sharp pre-market reversal.',
  facts: [
    { icon: '📖', text: 'Pre-market L2 typically shows only ECN (Electronic Communication Network) orders — market makers are not required to post pre-market quotes.' },
    { icon: '🧱', text: 'Large ask walls in pre-market L2 at round numbers ($5, $10, $15) are often placed by institutions or traders managing short positions.' },
    { icon: '👁️', text: 'Bid pulling — when large bids suddenly vanish from L2 — is one of the most reliable warning signs of an impending pre-market reversal.' },
  ],
  vocab: [
    { term: 'Ask Wall', definition: 'A large block of shares offered for sale at a single price level in the order book, creating visible resistance that must be absorbed before price can move higher.' },
    { term: 'Bid Pulling', definition: 'The sudden removal of large buy orders from the Level 2 order book — a warning sign that buyers are losing conviction and a reversal may be imminent.' },
    { term: 'Spread', definition: 'The difference between the highest bid price and the lowest ask price — a widening spread in pre-market indicates declining liquidity and increasing risk.' },
  ],
  slotA: {
    type: 'comparison',
    leftLabel: 'BULLISH L2 SIGNALS',
    rightLabel: 'DANGER SIGNS',
    rows: [
      { left: 'Large bids stacked below ask', right: 'Large ask wall near breakout level' },
      { left: 'Thin ask side — easy to absorb', right: 'Bids disappearing (bid pulling)' },
      { left: 'Spread narrowing over time', right: 'Spread widening — liquidity drying up' },
      { left: 'Ask wall absorbed = acceleration', right: 'Ask wall holding = stall or reversal' },
      { left: 'Volume building steadily at ask', right: 'Volume spiking then collapsing' },
    ],
  },
  slotB: {
    type: 'diagram',
    heading: 'Pre-Market Level 2 Order Book',
    svgContent: `<rect width="320" height="200" rx="8" fill="#0f0f14"/>
<text x="160" y="18" text-anchor="middle" fill="#eab308" font-family="monospace" font-size="10" font-weight="bold">PRE-MARKET LEVEL 2</text>
<text x="80" y="34" text-anchor="middle" fill="#00ff88" font-family="monospace" font-size="9" font-weight="bold">BID (BUY)</text>
<text x="240" y="34" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="9" font-weight="bold">ASK (SELL)</text>
<line x1="160" y1="26" x2="160" y2="192" stroke="#374151" stroke-width="1"/>
<rect x="10" y="40" width="70" height="14" rx="2" fill="#052e16"/>
<text x="45" y="51" text-anchor="middle" fill="#00ff88" font-family="monospace" font-size="8">4.91 × 12K</text>
<rect x="10" y="57" width="80" height="14" rx="2" fill="#052e16"/>
<text x="50" y="68" text-anchor="middle" fill="#00ff88" font-family="monospace" font-size="8">4.89 × 25K</text>
<rect x="10" y="74" width="90" height="14" rx="2" fill="#052e16"/>
<text x="55" y="85" text-anchor="middle" fill="#00ff88" font-family="monospace" font-size="8">4.87 × 38K</text>
<rect x="10" y="91" width="60" height="14" rx="2" fill="#052e16"/>
<text x="40" y="102" text-anchor="middle" fill="#00ff88" font-family="monospace" font-size="8">4.85 × 8K</text>
<rect x="170" y="40" width="60" height="14" rx="2" fill="#2d0a0a"/>
<text x="200" y="51" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="8">4.95 × 9K</text>
<rect x="170" y="57" width="130" height="14" rx="2" fill="#4a0a0a" stroke="#ef4444" stroke-width="1.5"/>
<text x="235" y="68" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="8" font-weight="bold">5.00 × 52K ← WALL</text>
<rect x="170" y="74" width="50" height="14" rx="2" fill="#2d0a0a"/>
<text x="195" y="85" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="8">5.05 × 6K</text>
<rect x="170" y="91" width="45" height="14" rx="2" fill="#2d0a0a"/>
<text x="192" y="102" text-anchor="middle" fill="#ef4444" font-family="monospace" font-size="8">5.10 × 4K</text>
<text x="160" y="125" text-anchor="middle" fill="#eab308" font-family="monospace" font-size="9" font-weight="bold">↑ 52K ask wall at $5.00 = key resistance</text>
<text x="160" y="140" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="8">If wall is absorbed → price accelerates</text>
<text x="160" y="155" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="8">If wall disappears → vacuum breakout</text>
<text x="160" y="170" text-anchor="middle" fill="#9ca3af" font-family="monospace" font-size="8">If wall holds → stall and reversal risk</text>
<text x="160" y="188" text-anchor="middle" fill="#3b82f6" font-family="monospace" font-size="7">Watch final 10 min before open for wall removal</text>`,
    caption: 'Pre-market L2 with a large 52K ask wall at $5.00. If this wall vanishes before the open, a hard breakout often follows.',
  },
  dykStyle: 'data',
  didYouKnow: 'Pre-market Level 2 ask walls that disappear in the final 10 minutes before the open often precede hard breakouts in the first 5 minutes of trading. The wall\'s disappearance signals the seller has withdrawn, creating a supply vacuum that can send price surging on opening volume.',
  nextTitle: 'Sector Momentum',
},

{
  id: 81,
  title: 'Sector Momentum',
  subtitle: 'Trade the hottest sector, not just the hottest stock.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Riding the Sector Tailwind',
  coreBody: 'Individual stocks don\'t trade in isolation — they trade within sectors, and sectors develop momentum that affects every member. When biotech is the leading pre-market sector, all biotech stocks receive an institutional tailwind. Funds rotating into biotech, algorithmic scanners flagging biotech names, and retail traders following biotech news create a rising tide that lifts all boats in the sector.\n\nFor momentum traders, the implication is clear: all else being equal, trade the hottest sector. A biotech stock with a 15% pre-market gain in a strong biotech sector is a far better setup than the same stock in a flat or declining biotech sector. The sector tailwind provides additional buying pressure, increases the probability of follow-through, and makes the trade easier to hold through inevitable pullbacks.\n\nConversely, trading against sector momentum is fighting an institutional flow. If energy stocks are being sold across the board pre-market and you\'re trying to go long an energy gapper, you\'re swimming against a tide of systematic selling. Even if your individual catalyst is strong, the sector headwind can overwhelm it and produce a frustrating fade. Always note the sector before committing to a trade.',
  facts: [
    { icon: '🏥', text: 'Biotech is historically the most explosive sector for pre-market momentum — FDA catalysts create binary moves that drive entire sector rotation.' },
    { icon: '🌊', text: 'Sector momentum is driven by ETF flows — when XBI (Biotech ETF) rips pre-market, institutions buying the ETF push every biotech stock higher.' },
    { icon: '📡', text: 'Check sector performance on your broker\'s market scanner or a free tool like finviz.com\'s sector heat map before finalizing your watchlist.' },
  ],
  vocab: [
    { term: 'Sector Rotation', definition: 'The movement of investment capital from one market sector to another as economic conditions and investor sentiment shift — creates momentum tailwinds and headwinds.' },
    { term: 'ETF Flow', definition: 'When institutional investors buy or sell a sector ETF (like XBI for biotech), the underlying stocks are bought or sold proportionally — amplifying sector momentum.' },
    { term: 'Sector Sympathy', definition: 'The tendency of stocks in the same sector to move together when a catalyst affects one member — a positive catalyst in one biotech can lift all biotechs.' },
  ],
  slotA: {
    type: 'leaderboard',
    heading: 'Pre-Market Sector Performance',
    items: [
      { rank: 1, label: 'Biotech (XBI)', sub: 'FDA approval + strong earnings across sector', pct: 95, color: '#00ff88' },
      { rank: 2, label: 'Energy (XLE)', sub: 'Oil futures up 2.1% — supply concern news', pct: 72, color: '#00ff88' },
      { rank: 3, label: 'Technology (QQQ)', sub: 'Mega-cap earnings beat, positive futures', pct: 55, color: '#eab308' },
      { rank: 4, label: 'Financials (XLF)', sub: 'Flat — no material pre-market catalyst', pct: 28, color: '#9ca3af' },
      { rank: 5, label: 'Consumer Disc (XLY)', sub: 'Weak retail sales data released pre-market', pct: 10, color: '#ef4444' },
      { rank: 6, label: 'Utilities (XLU)', sub: 'Rate fears — defensives being sold', pct: 5, color: '#ef4444' },
    ],
  },
  slotB: {
    type: 'pros-cons',
    heading: 'Trading WITH vs. AGAINST Sector',
    pros: [
      'Institutional tailwind from ETF flows',
      'Multiple catalysts amplifying the move',
      'Easier to hold — sector bids support dips',
      'Higher follow-through probability above pre-market high',
      'Sympathetic stocks provide backup setups',
    ],
    cons: [
      'Fighting institutional selling flow',
      'Lower follow-through even on strong individual catalyst',
      'Dips tend to accelerate rather than recover',
      'Isolated catalyst fades faster without sector support',
      'Risk of being the only buyer in a sector being sold',
    ],
  },
  dykStyle: 'data',
  didYouKnow: 'Stocks in the leading pre-market sector produce follow-through above the pre-market high 63% of the time versus only 41% for stocks in neutral or declining sectors — a 22-percentage-point edge. Sector alignment is one of the strongest probability-enhancers in momentum trading.',
  nextTitle: 'VIX and Market Conditions',
},

{
  id: 82,
  title: 'VIX and Market Conditions',
  subtitle: 'Read the weather before you go fishing.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'The Volatility Index as a Trading Weather Report',
  coreBody: 'The VIX (CBOE Volatility Index) measures the market\'s expectation of 30-day volatility in the S&P 500, derived from options prices. Traders call it the "fear gauge." Understanding the VIX before you trade is like checking the weather before going fishing — it tells you what conditions you\'re about to enter and how you should adjust your approach.\n\nVIX below 15 indicates a calm, low-volatility environment. Momentum stocks move less, breakouts are tepid, and position sizes can be maintained — but don\'t expect explosive gap-and-go action. VIX between 20 and 30 is the momentum sweet spot. Volatility is elevated enough to create meaningful intraday moves, but the market isn\'t in full panic mode. This is where the best risk/reward setups appear for momentum traders.\n\nVIX above 35 is the fear zone. Correlations spike to 1 (everything moves together), bid-ask spreads widen dramatically, stops get run violently, and even quality setups can reverse 30-50% before you can exit. Many professional traders reduce position sizes by 50% or more in VIX >35 environments, or step aside entirely until conditions normalize. Never fight the VIX.',
  facts: [
    { icon: '📊', text: 'VIX is calculated in real-time using S&P 500 index options expiring in 23-37 days — it represents implied volatility, not actual past volatility.' },
    { icon: '🎯', text: 'The historical average VIX is approximately 19.5. Readings above 30 occur during market crises and are statistically rare.' },
    { icon: '⚠️', text: 'In VIX >35 environments, even technically perfect momentum setups can reverse violently — the macro fear overwhelms individual stock catalysts.' },
  ],
  vocab: [
    { term: 'VIX', definition: 'The CBOE Volatility Index — measures the market\'s expectation of 30-day S&P 500 volatility based on options prices. Higher VIX = higher fear and uncertainty.' },
    { term: 'Implied Volatility', definition: 'The market\'s forward-looking estimate of how much a stock or index will move, derived from options prices — distinct from historical/realized volatility.' },
    { term: 'Fear Zone', definition: 'A VIX reading above 35, indicating extreme market fear, wide bid-ask spreads, correlated selling, and high risk for momentum strategies.' },
  ],
  slotA: {
    type: 'stat-block',
    stats: [
      { value: '<15', label: 'Low Volatility — Reduce Expectations', sub: 'Calm market, tepid breakouts. Maintain size but expect smaller intraday ranges. Best for swing setups.' },
      { value: '20-30', label: 'Momentum Sweet Spot — Trade Full Size', sub: 'Elevated volatility creates explosive intraday moves. Best environment for gap-and-go momentum strategies.' },
      { value: '>35', label: 'Fear Zone — Reduce Size or Sit Out', sub: 'Extreme fear. Bid-ask spreads wide, stops run violently, correlations spike. Cut size 50%+ or step aside.' },
    ],
  },
  slotB: {
    type: 'true-false',
    heading: 'VIX Knowledge Check',
    statements: [
      { text: 'A high VIX always means great trading opportunities for momentum strategies.', answer: false, explanation: 'False. While elevated VIX can increase intraday ranges, VIX above 35 creates dangerous conditions: wide spreads, violent stop runs, and correlated selling that overwhelms individual stock setups. Many pros reduce size significantly or sit out entirely in VIX >35 environments.' },
      { text: 'VIX below 15 is the ideal environment for momentum day trading.', answer: false, explanation: 'False. VIX below 15 signals low volatility — momentum stocks make smaller intraday moves, breakouts are less decisive, and it\'s harder to achieve large percentage gains. The momentum sweet spot is VIX 20-30, not sub-15.' },
      { text: 'VIX between 20 and 30 produces the best risk/reward for momentum trading.', answer: true, explanation: 'True. The VIX 20-30 range represents elevated but manageable volatility — enough to produce meaningful intraday moves and explosive gaps, without the full-panic conditions that make momentum strategies unpredictable.' },
      { text: 'The VIX measures the actual past 30 days of S&P 500 volatility.', answer: false, explanation: 'False. The VIX measures IMPLIED (future expected) volatility derived from S&P 500 options prices — it is a forward-looking measure, not a historical one. Historical volatility (HV) measures actual past price movements.' },
    ],
  },
  dykStyle: 'default',
  didYouKnow: 'The VIX hit an all-time intraday high of 82.69 on March 16, 2020, during the COVID-19 market crash. On that single session, the S&P 500 dropped 12% — the worst single-day decline since the 1987 Black Monday crash. Traders who ignored the VIX that week suffered catastrophic losses on both long and short positions.',
  nextTitle: 'Options Activity as a Signal',
  checkpointQuiz: [
    {
      q: 'Which VIX range represents the ideal momentum trading environment?',
      options: ['VIX below 10 — extreme calm and stability', 'VIX between 20 and 30 — elevated but manageable volatility', 'VIX above 40 — maximum fear means maximum opportunity', 'VIX doesn\'t affect momentum strategies at all'],
      correct: 1,
      explanation: 'VIX 20–30 is the momentum sweet spot. Enough volatility for explosive intraday moves without the full-panic conditions above 35 that cause wide spreads, violent stop runs, and correlated selling.',
    },
    {
      q: 'When VIX is above 35, the professional move for momentum traders is typically to...',
      options: ['Increase position sizes — volatility means bigger gains', 'Trade exactly as normal — ignore the VIX number', 'Reduce position sizes by 50%+ or step aside entirely', 'Switch to options only — spreads are tighter'],
      correct: 2,
      explanation: 'VIX >35 = danger zone. Bid-ask spreads widen, stops get run on noise, correlations spike to 1. Even technically perfect setups reverse violently. Many professionals reduce size dramatically or sit out entirely.',
    },
    {
      q: 'The VIX measures...',
      options: ['Actual past 30-day S&P 500 price movements', 'The number of stocks hitting 52-week highs today', 'The market\'s forward-looking expectation of volatility based on S&P 500 options prices', 'The Fed\'s interest rate policy direction'],
      correct: 2,
      explanation: 'VIX is implied (future-expected) volatility derived from S&P 500 options prices. It\'s forward-looking, not historical. Historical volatility (HV) measures the past. VIX measures what the market EXPECTS.',
    },
  ],
},

{
  id: 83,
  title: 'Options Activity as a Signal',
  subtitle: 'Options traders often know something — or think they do.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'Using Unusual Options Flow as a Pre-Market Edge',
  coreBody: 'The options market is where informed money — institutional investors, hedge funds, and occasionally insiders — often positions before major moves. When someone buys 5,000 out-of-the-money call options on a stock that normally trades 200 contracts per day, they are making a very expensive bet that the stock will move significantly higher very soon. These "unusual options activity" events are visible in real-time through options flow services.\n\nThree specific signals warrant attention in pre-market preparation. First, large call sweeps: a single institutional buyer purchasing thousands of call contracts at the ask across multiple exchanges — this is aggressive, directional buying. Second, OTM (out-of-the-money) call blocks: large purchases of calls with strike prices well above the current stock price, suggesting expectation of a big near-term move. Third, put-to-call ratio spikes: when call volume dramatically overwhelms put volume, it signals bullish institutional positioning.\n\nOptions flow is not a standalone signal — it must be confirmed with a catalyst, technical setup, and volume. But as an additional pre-market filter, unusual options activity that aligns with your existing thesis dramatically increases conviction. Options are expensive; large buyers don\'t throw money away casually.',
  facts: [
    { icon: '📞', text: 'A "call sweep" occurs when a large buyer hits multiple options exchanges simultaneously — a signature of institutional urgency rather than retail dabbling.' },
    { icon: '🎯', text: 'OTM calls expiring within 1-2 weeks are the most bullish unusual activity signal — they require a large and fast move to profit.' },
    { icon: '📊', text: 'The put/call ratio is a contrarian indicator when extreme: very low (heavy calls) can signal irrational exuberance, while very high (heavy puts) can signal capitulation.' },
  ],
  vocab: [
    { term: 'Call Option', definition: 'A contract giving the buyer the right to purchase 100 shares of stock at a specific strike price before expiration — profitable when the stock rises above the strike.' },
    { term: 'Unusual Options Activity', definition: 'Options trades that are significantly larger than normal relative to average daily volume — often interpreted as informed institutional positioning ahead of a move.' },
    { term: 'OTM (Out of the Money)', definition: 'An option whose strike price is above (for calls) or below (for puts) the current stock price — requires a larger move to become profitable, making large OTM purchases a high-conviction signal.' },
  ],
  slotA: {
    type: 'alert-trio',
    items: [
      { accent: '#f97316', icon: '🔥', heading: 'Large Call Sweep', body: 'Institutional buyer purchases thousands of call contracts at the ask across multiple exchanges simultaneously. Signals urgent, directional bullish positioning — someone expects a near-term move higher and doesn\'t want to miss it.' },
      { accent: '#00ff88', icon: '🎯', heading: 'OTM Call Block', body: 'A large block purchase of calls with a strike price well above the current stock price. These are expensive and only profit with a big, fast move. Large OTM block buyers typically have high conviction or information edge.' },
      { accent: '#eab308', icon: '📊', heading: 'Put/Call Ratio Spike', body: 'When call volume dramatically overwhelms put volume (ratio drops sharply), it signals widespread bullish positioning. Especially meaningful when it appears in a specific stock before a known catalyst date.' },
    ],
  },
  slotB: { type: 'vocab' },
  dykStyle: 'data',
  didYouKnow: 'Tickers showing unusual call sweep activity before the market open outperformed the S&P 500 by an average of 3.1% the following trading session in a study of 2019-2022 data. However, unusual activity coinciding with a known catalyst (earnings, FDA) showed 2x stronger follow-through than activity on no-news days.',
  nextTitle: 'The 9:20 AM Setup Scan',
},

{
  id: 84,
  title: 'The 9:20 AM Setup Scan',
  subtitle: '9:20 AM is the last time to think clearly before chaos begins.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'The Final Quality Check Before the Bell',
  coreBody: 'At 9:20 AM — exactly 10 minutes before the market opens — professional traders run a final quality check on every name on their watchlist. This is not a time to discover new setups. It is a time to confirm that the setups you researched earlier still hold and that no new information has changed the thesis.\n\nIn those final 10 minutes, several things can invalidate a setup: the pre-market high may have broken down, volume may have dried up entirely, new negative news may have hit (dilution, adverse ruling, insider sale), or the catalyst may have been clarified as weaker than initially appeared. If any of these conditions appear, remove the name from the watchlist — don\'t "hope" it recovers by 9:30.\n\nThe 9:20 scan is also when you make the final mental commitment: entry trigger price, stop-loss level, position size in shares. Write it down or say it aloud. Elite traders treat these final 10 minutes like a surgeon\'s pre-op checklist — systematic, unemotional, and thorough. A 10-minute confirmation process can prevent 10 hours of regret.',
  facts: [
    { icon: '⏰', text: '9:20 AM is the final window to confirm setups — after 9:25 AM, the pre-market order imbalances begin building and conditions change rapidly.' },
    { icon: '✅', text: 'The 9:20 scan is confirmation-only — if a name passes, it stays. If it fails any criterion, it\'s removed. No exceptions.' },
    { icon: '🧠', text: 'Writing entry/stop/target aloud or on paper at 9:20 dramatically reduces emotional decision-making when the stock actually moves at 9:31.' },
  ],
  vocab: [
    { term: '9:20 AM Scan', definition: 'A final pre-market check of every watchlist stock at 9:20 AM to confirm the setup is still valid before the market opens — the last moment for clear, unhurried analysis.' },
    { term: 'Setup Invalidation', definition: 'A change in conditions (volume drying up, negative news, pre-market breakdown) that removes a stock from the watchlist before the open.' },
    { term: 'Pre-Open Order Imbalance', definition: 'The difference between buy and sell orders queued for the market open — large imbalances visible at 9:25 AM can predict opening direction and volatility.' },
  ],
  slotA: {
    type: 'checklist',
    heading: '9:20 AM Final Setup Confirmation',
    items: [
      'Pre-market high is still intact (no breakdown)',
      'Volume is still building (not drying up)',
      'No new negative news in the last 30 minutes',
      'Catalyst is still valid and confirmed',
      'Futures and sector momentum still aligned',
      'Level 2 showing buyer interest (no large ask walls dominating)',
      'Entry trigger, stop-loss, and target are written down',
      'Position size in shares has been calculated',
    ],
  },
  slotB: {
    type: 'scenario',
    setup: 'HYMC was up 28% pre-market at 9:10 AM on a gold price surge. At 9:22 AM, it has dropped to +12% with volume drying up significantly (only 45K shares in the last 10 minutes vs. 380K in the prior hour). Futures are flat. What do you do?',
    options: [
      { label: 'Buy the dip — it\'s still up 12% and gold is still elevated. This is a discount entry.', correct: false, explanation: 'Incorrect. Volume drying up dramatically is a classic warning sign that the pre-market move has exhausted buying interest. Buying a stock that lost 16 percentage points of its gain in the final hour of pre-market while volume collapses is exactly the 9:20 scan\'s job to catch and avoid.' },
      { label: 'Remove HYMC from the watchlist. The setup has deteriorated significantly.', correct: true, explanation: 'Correct. The 9:20 scan identified critical setup degradation: a 57% give-back of pre-market gains combined with severe volume contraction. This stock is showing exhaustion, not consolidation. Removing it from the watchlist is the disciplined response — the catalyst (gold prices) hasn\'t created enough sustained buying interest.' },
      { label: 'Reduce size to half — the catalyst is still valid even if the move faded.', correct: false, explanation: 'Incorrect. A halved position in a deteriorating setup is still a bad trade. The 9:20 scan is binary: the setup either holds its key criteria or it doesn\'t. HYMC has failed two critical criteria (volume and price retention). Reducing size doesn\'t fix a broken setup — it just loses less money on a likely fade.' },
    ],
  },
  dykStyle: 'mistake',
  didYouKnow: 'The most expensive 9:20 AM mistake is adding new, unresearched stocks to your watchlist because they are gapping hard. Traders who see a new 40% gapper at 9:22 AM and add it without research are trading blind — they don\'t know the float, the catalyst quality, or key levels. The result is almost always a reactive, emotional trade that loses money.',
  nextTitle: 'The Complete Pre-Market Checklist',
},

{
  id: 85,
  title: 'The Complete Pre-Market Checklist',
  subtitle: 'Routines outperform inspiration every time.',
  section: 'Section 5 · Pre-Market Prep',
  sectionColor: '#eab308',
  coreHeading: 'The System That Produces Consistent Preparation',
  coreBody: 'Everything covered in Section 5 — futures, global markets, news triage, gapper scanning, catalyst evaluation, float checks, short interest, watchlist building, alerts, Level 2, sector momentum, VIX, options flow, and the 9:20 scan — comes together in a single systematic routine that elite traders execute every single morning.\n\nThe power of a routine is not that it guarantees winning trades. It\'s that it guarantees consistent preparation regardless of your mood, the prior day\'s results, or external distractions. A trader who lost $2,000 yesterday and a trader who made $3,000 yesterday both sit down at 7 AM and execute the same routine. The routine neutralizes emotional variance.\n\nThis complete pre-market checklist takes approximately 60-90 minutes for a trader who has developed fluency with each step. For beginners, allow 2+ hours. The goal is to arrive at 9:29 AM with everything done: watchlist built, plans written, alerts set, risk confirmed, and mind clear. When the opening bell rings, your only job is execution — not thinking, not researching, not deciding. The morning routine IS the trade. Everything after the bell is just the outcome.',
  facts: [
    { icon: '⏱️', text: 'The complete pre-market routine takes 60-90 minutes for experienced traders — beginning at 7-7:30 AM and finishing by 9:20 AM.' },
    { icon: '📋', text: 'Written routines outperform mental routines by a measurable margin — the act of checking items off prevents the "I already know this" shortcut that causes skipped steps.' },
    { icon: '🏆', text: 'Consistency in pre-market preparation is the single most cited differentiator between profitable and unprofitable traders in every trader survey ever published.' },
  ],
  vocab: [
    { term: 'Pre-Market Routine', definition: 'A systematic, time-blocked sequence of preparation activities performed before the market opens — designed to produce consistent readiness regardless of emotional state.' },
    { term: 'Execution Clarity', definition: 'The state of knowing exactly what you will do in every scenario before it occurs — achieved through thorough pre-market preparation and planning.' },
    { term: 'Process Over Outcome', definition: 'The professional trader\'s mindset that focuses on executing the preparation process correctly, accepting that outcomes (wins/losses) are partially random within a good process.' },
  ],
  slotA: {
    type: 'timeline',
    heading: 'The Complete Pre-Market Timeline',
    events: [
      { label: 'Night Before — Review & Calendar', body: 'Review trades from the day. Check earnings calendar, FDA events, and macro scheduled releases for tomorrow. Write 2-3 preliminary watchlist ideas. Set risk budget.' },
      { label: '7:00–8:00 AM — Futures & Global Markets', body: 'Check /ES, /NQ, /YM futures. Review Nikkei, DAX, and FTSE closes. Note overall risk-on vs. risk-off tone. Check VIX level and opening implied move for S&P 500.' },
      { label: '8:00–8:30 AM — News Scan', body: 'Triage all pre-market news. Identify high-impact catalysts (FDA, earnings, acquisitions). Discard noise items. Note any macro data releases (CPI, jobs report) scheduled for today.' },
      { label: '8:30–9:00 AM — Gappers Scan', body: 'Pull all pre-market movers sorted by % gain. Filter by volume >100K and float <20M. Confirm catalyst for each remaining name. Identify your top 3 candidates.' },
      { label: '9:00–9:15 AM — Build Watchlist', body: 'Select final 2 primary stocks and 3 bench stocks. For primaries: write entry trigger, stop-loss level, price target, and position size in shares. Check short interest and options flow.' },
      { label: '9:15–9:20 AM — Set Alerts', body: 'Configure entry, stop, and target alerts in broker and charting platform. Set audio alerts for maximum notice. Check Level 2 for any large order walls near breakout levels.' },
      { label: '9:20–9:29 AM — Final Scan', body: 'Run the 9:20 checklist on each watchlist name. Remove any that have deteriorated. Confirm futures and sector alignment. Close all non-trading applications. Mental preparation: breathe, focus, execute.' },
    ],
  },
  slotB: {
    type: 'before-after',
    leftLabel: 'WITHOUT CHECKLIST',
    rightLabel: 'WITH CHECKLIST',
    leftItems: [
      'Arrive at desk at 9:28 AM',
      'Pick the stock that\'s gapping the most by feel',
      'No defined stop-loss or price target',
      'Position size chosen emotionally',
      'No alerts — watching multiple screens frantically',
      'Enter trade at 9:31 AM purely on FOMO',
    ],
    rightItems: [
      '45-minute routine completed — desk ready by 9:20 AM',
      '2-stock watchlist with full catalyst research',
      'Entry trigger, stop-loss, and target written for each',
      'Position size calculated to 1% daily risk max',
      'Audio alerts set in broker and charting platform',
      'Execute with clarity and zero hesitation at trigger',
    ],
  },
  dykStyle: 'quote',
  didYouKnow: '"The morning routine is not preparation for the trade. The morning routine IS the trade. Execution is just the outcome." — Ross Cameron, Warrior Trading founder and one of the most documented profitable momentum day traders of the last decade. His publicly audited track record spans more than 10 years of consistent profitability.',
  nextTitle: 'The Bell Rings',
},
{
  id: 86,
  title: 'The Bell Rings',
  subtitle: 'Why the first 60 seconds demand silence, not action',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: '9:30:00 AM — the most important second of every trading day.',
  coreBody: 'When the bell rings, all pre-market orders flood the book simultaneously, algos fire, and institutions execute accumulated orders. The first 60 seconds are chaotic — spreads are wildly wide, price discovery is violent, and fills are poor. The professional move is to watch, not touch. Let the machine sort itself out before you put capital at risk.',
  facts: [
    { icon: '🔔', text: 'Pre-market limit orders, stop orders, and algo triggers all activate at the exact same moment at 9:30:00 AM.' },
    { icon: '📉', text: 'Bid-ask spreads in the first 30 seconds can be 3–5x wider than they will be just two minutes later.' },
    { icon: '👁️', text: 'The first 60 seconds contain critical information — direction of first print, volume urgency, and whether the gap is holding.' },
  ],
  vocab: [
    { term: 'Market Open', definition: 'The precise moment at 9:30:00 AM ET when NYSE and NASDAQ begin accepting and matching orders for regular trading.' },
    { term: 'Price Discovery', definition: 'The process by which buyers and sellers establish fair value — most violent and rapid in the first seconds after the open.' },
    { term: 'Spread', definition: 'The difference between the best bid and best ask price; widest at the open and narrows as liquidity builds.' },
  ],
  slotA: {
    type: 'timeline',
    heading: 'The First 60 Seconds',
    events: [
      { label: 'T+0s', body: 'Bell rings — all queued pre-market orders flood the book simultaneously. Algos fire, institutions execute. Chaos.' },
      { label: 'T+3s', body: 'First prints appear on the tape. Price discovery begins — stock finds initial open price, often gaps from prior close.' },
      { label: 'T+10s', body: 'First 1-minute candle is forming. Direction of early prints visible but candle not complete — no conclusions yet.' },
      { label: 'T+20s', body: 'Spread begins narrowing as market makers and liquidity providers step in. Volume pace becoming readable.' },
      { label: 'T+30s', body: 'Volume pace emerging — is this surge or thin? Thin volume on a gap = danger. Surge = conviction on both sides.' },
      { label: 'T+60s', body: 'First 1-minute candle closes. Now you have real data: direction, body size, wick, volume. Now form an opinion.' },
    ],
  },
  slotB: {
    type: 'steps',
    heading: 'Open Protocol: First 60 Seconds',
    steps: [
      { num: 1, title: 'Hands Off Keyboard', body: 'Do not click, do not type an order. Physically move your hands away from the keyboard for the first 30 seconds minimum.' },
      { num: 2, title: 'Note Direction of First Print', body: 'Is the first print above or below the pre-market close? Above = buyers aggressive, below = sellers dumping at open.' },
      { num: 3, title: 'Watch Volume Surge or Thin', body: 'High volume = institutional conviction. Thin volume on a big gap = trap. Volume tells you whether the move is real.' },
      { num: 4, title: 'Watch Spread Narrowing or Wide', body: 'If spread is still wide at 30 seconds, that stock has poor liquidity today. Slippage will eat your edge.' },
      { num: 5, title: 'Wait for First 1-Min Candle to Close', body: 'No entry signal is valid before the first candle closes at 9:31. Form no opinion until you have a complete candle.' },
    ],
  },
  dykStyle: 'data',
  didYouKnow: 'Professional traders who wait at least 30 seconds before entering report significantly fewer bad fills — first 30 seconds have spreads 3–5x wider than normal.',
  nextTitle: 'Reading the First Candle',
},

{
  id: 87,
  title: 'Reading the First Candle',
  subtitle: 'One minute that tells you everything about the day\'s opening battle',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'One minute. Everything is in it.',
  coreBody: 'The first candle — 9:30 to 9:31 — captures the opening battle between buyers and sellers in its purest form. A large green body closing near the high means buyers won from second one: aggressive, in control, and willing to pay up. A red body or long upper wick means sellers showed up immediately. The first candle sets the tone. Read it before you do anything else.',
  facts: [
    { icon: '🕯️', text: 'The 9:30–9:31 candle is the most information-dense single minute of the entire trading day.' },
    { icon: '📊', text: 'A first candle closing in the top 25% of its range is a bullish signal; closing in the bottom 25% is bearish.' },
    { icon: '⚡', text: 'Volume on the first candle compared to the average 1-minute volume tells you whether institutions are present.' },
  ],
  vocab: [
    { term: 'First Candle', definition: 'The 1-minute OHLC bar from 9:30:00 to 9:30:59 AM — the opening battle candle that sets intraday tone.' },
    { term: 'Upper Wick', definition: 'The line above a candle\'s body showing the high reached but rejected — long upper wicks indicate selling pressure at highs.' },
    { term: 'Candle Body', definition: 'The filled portion of a candlestick between open and close — a large body indicates conviction; a small body indicates indecision.' },
  ],
  slotA: {
    type: 'comparison',
    leftLabel: 'Bullish First Candle',
    rightLabel: 'Bearish First Candle',
    rows: [
      { left: 'Large green body', right: 'Red body or long upper wick' },
      { left: 'Close near the high', right: 'Close near the low' },
      { left: 'High volume (2x+ average)', right: 'Volume less than pre-market pace' },
      { left: 'Minimal or no upper wick', right: 'Failed breakout — spike then drop' },
      { left: 'Pre-market gap holding', right: 'Gap filling immediately on open' },
    ],
  },
  slotB: {
    type: 'diagram',
    heading: 'Four First-Candle Types',
    svgContent: `<rect width="320" height="200" fill="#0f0f14" rx="8"/>
<text x="40" y="18" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Strong Bull</text>
<rect x="34" y="30" width="12" height="90" fill="#22c55e" rx="2"/>
<line x1="40" y1="25" x2="40" y2="30" stroke="#22c55e" stroke-width="2"/>
<line x1="40" y1="120" x2="40" y2="128" stroke="#22c55e" stroke-width="2"/>
<text x="100" y="18" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Bull Reject</text>
<rect x="94" y="70" width="12" height="50" fill="#22c55e" rx="2"/>
<line x1="100" y1="25" x2="100" y2="70" stroke="#22c55e" stroke-width="2"/>
<line x1="100" y1="120" x2="100" y2="130" stroke="#22c55e" stroke-width="2"/>
<text x="180" y="18" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Bear Reversal</text>
<rect x="174" y="55" width="12" height="65" fill="#ef4444" rx="2"/>
<line x1="180" y1="30" x2="180" y2="55" stroke="#ef4444" stroke-width="2"/>
<line x1="180" y1="120" x2="180" y2="135" stroke="#ef4444" stroke-width="2"/>
<text x="260" y="18" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Doji</text>
<rect x="254" y="72" width="12" height="6" fill="#94a3b8" rx="1"/>
<line x1="260" y1="35" x2="260" y2="72" stroke="#94a3b8" stroke-width="2"/>
<line x1="260" y1="78" x2="260" y2="130" stroke="#94a3b8" stroke-width="2"/>
<text x="40" y="155" fill="#64748b" font-size="9" font-family="monospace" text-anchor="middle">Buyers won</text>
<text x="100" y="155" fill="#64748b" font-size="9" font-family="monospace" text-anchor="middle">Sellers at top</text>
<text x="180" y="155" fill="#64748b" font-size="9" font-family="monospace" text-anchor="middle">Sellers won</text>
<text x="260" y="155" fill="#64748b" font-size="9" font-family="monospace" text-anchor="middle">No winner</text>`,
    caption: 'Body size and wick length reveal who controlled the first minute',
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'If the second candle breaks the first candle\'s high, this "first candle high breakout" is one of the cleanest momentum signals of the entire day.',
  nextTitle: 'The Opening Range (9:30–9:45)',
},

{
  id: 88,
  title: 'The Opening Range (9:30–9:45)',
  subtitle: 'Let the arena form before you fight in it',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'The opening range is the arena. Breakout is the signal.',
  coreBody: 'The Opening Range is the high and low established in the first 5–15 minutes of trading. It represents the zone of initial price discovery — buyers and sellers finding equilibrium. A breakout above the range high on volume is a long signal. A break below the range low is a short signal. The key rule: do not enter during formation. You are watching, marking levels, and waiting for the break.',
  facts: [
    { icon: '📐', text: 'The opening range high and low become the most important support and resistance levels for the entire morning session.' },
    { icon: '⏱️', text: 'The 15-minute ORB captures the majority of initial price discovery while filtering out the noisiest early seconds.' },
    { icon: '🔊', text: 'Volume on the breakout candle must exceed the average candle volume — a quiet breakout is a false breakout.' },
  ],
  vocab: [
    { term: 'Opening Range (ORB)', definition: 'The high and low price established during the first 5–15 minutes of the trading session, used as breakout reference levels.' },
    { term: 'Range Formation', definition: 'The period during which price oscillates between opening highs and lows before establishing a directional bias.' },
    { term: 'Breakout Candle', definition: 'The specific candle whose close exceeds the opening range boundary with confirming volume — the entry trigger.' },
  ],
  slotA: {
    type: 'before-after',
    leftLabel: 'During Range 9:30–9:45',
    rightLabel: 'After Breakout 9:46+',
    leftItems: [
      'Price oscillating between range low and range high',
      'Volume building but no directional conviction',
      'No clear entry trigger present',
      'Hands off — you are only marking levels',
      'Alerts set at range high and range low',
    ],
    rightItems: [
      'Price breaks range high with volume surge on close',
      'Entry fires at breakout candle close',
      'Stop defined below range low (opposite boundary)',
      'Target: measured move equal to range width above breakout',
      'Risk-reward clearly defined before entry',
    ],
  },
  slotB: {
    type: 'steps',
    heading: 'ORB Execution Protocol',
    steps: [
      { num: 1, title: 'Mark the First 5-Min High and Low', body: 'At 9:35, mark the high and low of the first 5-minute candle. This is your initial range boundary.' },
      { num: 2, title: 'Update Range Through 9:45', body: 'As each candle completes, extend range only if a new high or low is made. Contracting range = coiling energy.' },
      { num: 3, title: 'Set Alerts at Both Boundaries', body: 'Set price alerts at range high and range low. Do not watch the screen — let the alert bring you in.' },
      { num: 4, title: 'Enter on Volume-Confirmed Breakout', body: 'When a candle closes above the range high with volume at least 1.5x the prior candle, enter long. Stop goes below range low.' },
    ],
  },
  dykStyle: 'data',
  didYouKnow: 'Stocks breaking their 15-minute ORB high with volume at least 1.5x the prior candle produced profitable follow-through over 60% of the time across 5,000+ trades.',
  nextTitle: 'Gap-and-Go Entry Rules',
},

{
  id: 89,
  title: 'Gap-and-Go Entry Rules',
  subtitle: 'No checklist, no trigger. No trigger, no trade.',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'No checklist, no trigger. No trigger, no trade.',
  coreBody: 'Gap-and-go requires a specific, pre-defined trigger — the break of the pre-market high, the break of the first candle high, or the ORB breakout — combined with volume confirmation. Without a defined trigger you are not trading a setup; you are guessing. Every gap-and-go trade needs: catalyst, float, volume, trigger, stop, and R/R. If any element is missing, the trade does not exist.',
  facts: [
    { icon: '📋', text: 'A gap-and-go without a defined trigger is indistinguishable from a FOMO chase — same entry, worse average outcome.' },
    { icon: '📦', text: 'Float under 20M combined with a 10%+ gap and strong catalyst is the highest-probability gap-and-go combination.' },
    { icon: '📏', text: 'The trigger defines both the entry and the stop — without a trigger you cannot set a logical stop-loss.' },
  ],
  vocab: [
    { term: 'Gap-and-Go', definition: 'A momentum strategy where a gapping stock continues in the gap direction after a specific technical trigger fires with volume confirmation.' },
    { term: 'Entry Trigger', definition: 'A specific, pre-defined price level whose breach initiates a trade — e.g., pre-market high break, first candle high, ORB breakout.' },
    { term: 'R/R (Risk-to-Reward)', definition: 'The ratio of potential loss to potential gain; gap-and-go trades require at minimum 1:2 risk-to-reward to be worth taking.' },
  ],
  slotA: {
    type: 'checklist',
    heading: 'Gap-and-Go Pre-Entry Checklist',
    items: [
      'Stock gapped 5%+ on a strong, specific catalyst',
      'Float under 20M shares',
      'Pre-market volume above 500K shares',
      'Futures green or neutral (not red)',
      'Entry trigger clearly defined before the open',
      'Volume on entry candle above average',
      'Stop-loss level set before entry is placed',
      'Risk-to-reward at least 1:2',
    ],
  },
  slotB: {
    type: 'scenario',
    setup: 'MORN is up 22% pre-market on an earnings beat. Float is 8M shares, pre-market volume 900K. At 9:31 it breaks the pre-market high with 3x average volume. Entry fires. Where do you place your stop-loss?',
    options: [
      { label: 'Below the pre-market high (entry trigger level)', correct: false, explanation: 'Too tight — the pre-market high is your entry trigger, not a valid stop. A 1-cent dip would stop you out on normal noise.' },
      { label: 'Below the low of the first 1-minute candle', correct: true, explanation: 'Correct. The first candle low is the nearest logical structure. If price trades below it, the gap-and-go thesis is invalidated.' },
      { label: '10% below the entry price', correct: false, explanation: 'Arbitrary percentage stops have no structural basis. 10% on a volatile small-cap could be a massive dollar loss with no logic behind it.' },
      { label: 'Below the prior day\'s close', correct: false, explanation: 'The prior close could be 22% below current price — that is not a stop-loss, that is a catastrophe limit.' },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'The difference between a gap-and-go and a gap-and-fade is almost entirely about volume on the opening candle — high volume sustains the gap, thin volume invites sellers.',
  nextTitle: 'Gap-and-Fail',
},

{
  id: 90,
  title: 'Gap-and-Fail',
  subtitle: 'Every failed gap is a short opportunity in disguise',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'Every failed gap is a short opportunity in disguise.',
  coreBody: 'Gap-and-fail is when a stock gaps up but sellers overwhelm buyers at the open. The stock makes a brief run — sometimes 3–5% above the gap price — then reverses sharply, breaking below the pre-market high and often filling the entire gap. The pattern requires a weak catalyst (thin news), thinning volume on the opening spike, and visible overhead supply from prior resistance. Patient shorts wait for the first candle low to break before entering.',
  facts: [
    { icon: '🔄', text: 'Gap-and-fail is the mirror image of gap-and-go — same initial setup, opposite volume story at the open.' },
    { icon: '⚠️', text: 'The biggest tell of a pending gap-and-fail: volume peaks in the first 30 seconds then declines sharply as price is still rising.' },
    { icon: '🎯', text: 'Primary targets on a gap-and-fail short: VWAP, then the pre-market low, then prior day\'s close.' },
  ],
  vocab: [
    { term: 'Gap-and-Fail', definition: 'A pattern where a gapping stock opens, spikes briefly, then reverses hard as sellers overwhelm limited buying interest.' },
    { term: 'Opening Spike', definition: 'The initial surge in price at the open before sellers step in — in a gap-and-fail, this spike is the short entry setup, not a long signal.' },
    { term: 'Overhead Supply', definition: 'Clusters of sell orders from prior resistance levels or trapped longs — the fuel that accelerates a gap-and-fail reversal.' },
  ],
  slotA: {
    type: 'myth-busters',
    myths: [
      {
        myth: 'A 30% gap can\'t go negative on the day.',
        reality: 'It absolutely can. Stocks with weak catalysts and thin floats regularly open up 30–50% and close red. The gap size is irrelevant — volume and catalyst quality determine fate.',
      },
      {
        myth: 'Shorting is too risky at the open.',
        reality: 'Shorting a confirmed gap-and-fail with a defined stop above the opening high is a structured trade with clear risk. Undefined shorts are dangerous; structured ones are not.',
      },
      {
        myth: 'You need the uptick rule to short a gapper.',
        reality: 'The SEC\'s alternative uptick rule (Rule 201) only activates after a 10% intraday decline, and only restricts short sales to upticks. Most gap-and-fail entries occur before that threshold.',
      },
    ],
  },
  slotB: {
    type: 'steps',
    heading: 'Gap-and-Fail Short Protocol',
    steps: [
      { num: 1, title: 'Identify Gap with Weak Catalyst', body: 'Weak catalyst = vague PR, no revenue, paid promotion, or news more than 2 days old. Strong float (over 20M) also reduces gap-and-fail probability.' },
      { num: 2, title: 'Watch Opening Spike Then Reversal', body: 'Stock gaps up, makes a run at the open, then you see volume decline as price stalls. This is the distribution top forming — watch, do not enter yet.' },
      { num: 3, title: 'Wait for Break of First 1-Min Candle Low', body: 'Entry trigger: price breaks below the low of the first 1-minute candle. This confirms buyers could not hold even the opening minute\'s low.' },
      { num: 4, title: 'Enter Short with Stop Above Opening High', body: 'Enter short on the break with stop above the opening spike high. If it reclaims that high, the gap-and-fail thesis is wrong — exit.' },
      { num: 5, title: 'Target VWAP Then Pre-Market Low', body: 'First target is VWAP. Second target is the pre-market low. Take partial at VWAP, trail stop to breakeven, let remaining run to pre-market low.' },
    ],
  },
  dykStyle: 'mistake',
  didYouKnow: 'The biggest gap-and-fail mistake is shorting into the initial opening spike before seeing reversal confirmed — the stock can spike 5% further before reversing, stopping you out at maximum loss.',
  nextTitle: 'The Opening Range Breakout (ORB)',
},

{
  id: 91,
  title: 'The Opening Range Breakout (ORB)',
  subtitle: 'Wait, let it build, then attack with precision',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'The ORB: wait, let it build, then attack.',
  coreBody: 'The Opening Range Breakout is a patience trade by design. You let the first 5–30 minutes carve out a high and low — the opening range. You set alerts. You wait. When price breaks above the high (or below the low) on above-average volume, you enter with your stop at the opposite boundary. The longer the range formation, the cleaner the breakout signal and the better the win rate.',
  facts: [
    { icon: '⏰', text: 'Longer ORB windows (15-min, 30-min) produce higher win rates than 5-minute ORBs because they filter more noise.' },
    { icon: '📊', text: 'The measured move target for an ORB trade is the range width added above the breakout point — range = $1.20 means target is $1.20 above breakout.' },
    { icon: '🛑', text: 'Stop on an ORB breakout always goes at the opposite range boundary — range low for a long, range high for a short.' },
  ],
  vocab: [
    { term: 'ORB (Opening Range Breakout)', definition: 'A strategy that waits for price to establish a clear high/low range in the first N minutes, then enters on a volume-confirmed break of that range.' },
    { term: 'Range Width', definition: 'The distance in dollars between the ORB high and low — used to project the measured move target above (or below) the breakout point.' },
    { term: 'Measured Move', definition: 'A price target calculated by adding the range width to the breakout price — the theoretical minimum continuation distance.' },
  ],
  slotA: {
    type: 'stat-block',
    stats: [
      { value: '5-min ORB', label: 'Fastest signal', sub: '52% win rate — more false breakouts' },
      { value: '15-min ORB', label: 'Standard approach', sub: '61% win rate — best balance of speed and quality' },
      { value: '30-min ORB', label: 'Cleanest signal', sub: '64% win rate — fewer trades, higher quality' },
    ],
  },
  slotB: {
    type: 'scenario',
    setup: 'HIMS has a 15-minute ORB high of $18.40 and an ORB low of $17.20. At 9:47, it breaks $18.40 with a large green candle and 2x average volume. You enter long. Where does your stop go?',
    options: [
      { label: '$17.20 — the ORB range low', correct: true, explanation: 'Correct. The ORB low is the opposite boundary of the range. If price falls back below $17.20, the breakout has completely failed and the setup is invalidated.' },
      { label: '$18.00 — below the breakout candle\'s body', correct: false, explanation: 'Too tight. $18.00 is inside the range and represents normal intraday noise. You\'d be stopped out on the first pullback to test the breakout level.' },
      { label: '$16.00 — 10% below entry', correct: false, explanation: 'Arbitrary. There is no structural reason for $16.00 as a stop. This does not define risk — it just names a larger loss number.' },
      { label: 'No stop needed on a strong breakout', correct: false, explanation: 'Every trade needs a stop. Strength of the breakout does not eliminate downside risk — it only improves probability.' },
    ],
  },
  dykStyle: 'data',
  didYouKnow: 'Laurence Connors\' research on ORB strategies found positive expectancy of $0.23 per share across 20,000 simulated trades on top pre-market volume stocks.',
  nextTitle: 'VWAP at the Open',
  checkpointQuiz: [
    {
      q: 'An Opening Range Breakout (ORB) strategy requires you to...',
      options: ['Buy immediately at 9:30 AM before the range has a chance to form', 'Let price establish a clear high/low range, then enter on a volume-confirmed break', 'Short any stock that gaps up at the open regardless of direction', 'Only trade stocks priced below $10 per share'],
      correct: 1,
      explanation: 'The ORB is a patience strategy. You observe and define the opening range first, set price alerts, then enter ONLY when price breaks through on volume. No anticipating — wait for the confirmed break.',
    },
    {
      q: 'On an ORB long trade (buying the upside breakout), your stop-loss goes at...',
      options: ['Exactly 10% below your entry price', 'At the previous day\'s closing price', 'The ORB range LOW — the opposite range boundary', 'No stop is needed on a strong confirmed breakout'],
      correct: 2,
      explanation: 'Stop at the range low. If price falls back below the range low, the breakout has failed completely and the trade is invalidated. Every trade needs a stop — always place it at the structural level that proves you wrong.',
    },
    {
      q: 'Research shows the 15-minute ORB produces a higher win rate than the 5-minute ORB because...',
      options: ['Regulators require 15-minute windows for retail traders', 'A longer formation window filters out more early noise and false breakouts', 'All chart strategies automatically improve on longer timeframes', '5-minute candles aren\'t available on most trading platforms'],
      correct: 1,
      explanation: 'Longer formation windows filter noise. A 5-min range barely has time to establish true supply/demand — too many false breakouts trigger. 15–30 min ranges represent more committed buying and selling zones.',
    },
  ],
},

{
  id: 92,
  title: 'VWAP at the Open',
  subtitle: 'Where fair value lives — everything else is premium or discount',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'VWAP is where fair value lives — everything else is premium or discount.',
  coreBody: 'VWAP — the Volume-Weighted Average Price — resets every morning at 9:30 and builds throughout the day. It represents the true average price paid weighted by volume. Opening above VWAP and holding it is bullish: institutions are buying above fair value showing conviction. A break below VWAP on a long position is an early warning exit signal. Reclaiming VWAP after a dip is a re-entry signal.',
  facts: [
    { icon: '⚖️', text: 'VWAP is the institutional benchmark — portfolio managers measure execution quality against VWAP, so their orders cluster around it.' },
    { icon: '🔄', text: 'VWAP resets to zero at 9:30:00 every morning — it is an intraday tool only, not useful across days.' },
    { icon: '📍', text: 'Price above VWAP = trading at a premium to fair value; below VWAP = trading at a discount. Both have directional implications.' },
  ],
  vocab: [
    { term: 'VWAP', definition: 'Volume-Weighted Average Price — the cumulative average price of all trades weighted by their volume, recalculated each trading day.' },
    { term: 'VWAP Support', definition: 'When price pulls back to VWAP from above and bounces — institutions buying at fair value create natural support at this level.' },
    { term: 'VWAP Resistance', definition: 'When price rallies up to VWAP from below and stalls — sellers defending fair value from above prevent breakout until conviction returns.' },
  ],
  slotA: {
    type: 'comparison',
    leftLabel: 'Above VWAP (Bullish)',
    rightLabel: 'Below VWAP (Bearish)',
    rows: [
      { left: 'Buyers in control', right: 'Sellers in control' },
      { left: 'Long bias on all setups', right: 'Short bias — avoid longs' },
      { left: 'VWAP acts as support', right: 'VWAP acts as resistance' },
      { left: 'Add on dips to VWAP', right: 'Cover shorts near VWAP' },
      { left: 'Institutions accumulating', right: 'Institutions distributing' },
    ],
  },
  slotB: {
    type: 'diagram',
    heading: 'VWAP as Intraday Guide',
    svgContent: `<rect width="320" height="200" fill="#0f0f14" rx="8"/>
<text x="16" y="20" fill="#64748b" font-size="9" font-family="monospace">9:30</text>
<text x="130" y="20" fill="#64748b" font-size="9" font-family="monospace">10:00</text>
<text x="240" y="20" fill="#64748b" font-size="9" font-family="monospace">10:30</text>
<path d="M20,60 Q80,55 120,80 Q150,95 160,110 Q190,90 220,85 Q260,80 295,75" stroke="#3b82f6" stroke-width="2" fill="none" stroke-dasharray="5,3"/>
<path d="M20,55 Q60,45 100,65 Q130,80 145,100 Q160,115 175,105 Q210,88 240,78 Q270,70 295,68" stroke="#22c55e" stroke-width="2" fill="none"/>
<text x="100" y="44" fill="#3b82f6" font-size="9" font-family="monospace">VWAP</text>
<text x="50" y="40" fill="#22c55e" font-size="9" font-family="monospace">Price</text>
<line x1="155" y1="25" x2="155" y2="175" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3"/>
<text x="100" y="135" fill="#ef4444" font-size="8" font-family="monospace">Break below</text>
<text x="100" y="147" fill="#ef4444" font-size="8" font-family="monospace">= caution</text>
<line x1="175" y1="25" x2="175" y2="175" stroke="#22c55e" stroke-width="1" stroke-dasharray="3,3"/>
<text x="178" y="135" fill="#22c55e" font-size="8" font-family="monospace">Reclaim</text>
<text x="178" y="147" fill="#22c55e" font-size="8" font-family="monospace">= re-entry</text>
<text x="220" y="60" fill="#3b82f6" font-size="8" font-family="monospace">VWAP as</text>
<text x="220" y="72" fill="#3b82f6" font-size="8" font-family="monospace">support</text>`,
    caption: 'Price breaks below VWAP at 10 AM — reclaims at 10:30 as re-entry signal',
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'Institutions use VWAP as an execution benchmark — their buy orders create natural support at VWAP during institutional accumulation phases.',
  nextTitle: 'Level 2 and T&S at the Open',
},

{
  id: 93,
  title: 'Level 2 and T&S at the Open',
  subtitle: 'The tape never lies — but it speaks fast',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'The tape never lies — but it speaks fast.',
  coreBody: 'At the open, Level 2 and the Time & Sales tape move faster than at any other time of day. Green prints on T&S at the ask = aggressive buyers lifting offers, paying up for stock. Red prints at the bid = sellers hitting bids, distributing. Large block prints (500+ shares per print) separate institutional flow from retail noise. Your job is to read the tape\'s dominant color and size within the first 60 seconds.',
  facts: [
    { icon: '🟢', text: 'T&S prints at the ask (green) mean buyers are aggressive — they are not waiting for sellers to come to them.' },
    { icon: '🔴', text: 'Large red prints at the bid indicate distribution — someone is selling aggressively, not in small retail-sized lots.' },
    { icon: '⚡', text: 'Tape speed itself is information — rapid-fire prints indicate urgency and momentum; slow prints indicate indecision.' },
  ],
  vocab: [
    { term: 'Time & Sales (T&S)', definition: 'The real-time record of every trade executed — time, price, and size — the rawest form of market data available.' },
    { term: 'Hitting the Bid', definition: 'Selling at the current best bid price — indicates a seller in a hurry, willing to accept the lower price immediately.' },
    { term: 'Lifting the Ask', definition: 'Buying at the current best ask price — indicates a buyer with urgency, willing to pay the higher posted price immediately.' },
  ],
  slotA: {
    type: 'alert-trio',
    items: [
      {
        accent: '#22c55e',
        icon: '🟢',
        heading: 'Aggressive Buying',
        body: 'Large green prints repeatedly hitting the ask. Buyers are paying up — urgency is on the buy side. Momentum long bias.',
      },
      {
        accent: '#ef4444',
        icon: '🔴',
        heading: 'Distribution',
        body: 'Large red block prints hitting the bid. Institutions are selling into strength. Volume is bearish regardless of price appearance.',
      },
      {
        accent: '#eab308',
        icon: '🟡',
        heading: 'Chop',
        body: 'Alternating small prints, no dominant color, no block prints. No institutional conviction on either side. Stay out.',
      },
    ],
  },
  slotB: {
    type: 'true-false',
    heading: 'Level 2 & T&S Fundamentals',
    statements: [
      {
        text: 'A green print on T&S means the stock price went up.',
        answer: false,
        explanation: 'Green means the trade occurred at the ask price — indicating buying aggression. Price may or may not have moved up; the color reflects execution side, not price direction.',
      },
      {
        text: 'Large block prints (500+ shares) are more likely to be institutional activity than retail.',
        answer: true,
        explanation: 'Retail traders rarely execute 500+ share blocks in momentum stocks. Large prints indicate funds, market makers, or algorithmic institutional orders.',
      },
      {
        text: 'More bids than asks on Level 2 means price must go up.',
        answer: false,
        explanation: 'Level 2 shows posted intentions, not commitments. Bids can be cancelled instantly. The tape (actual prints) is more reliable than the posted order book.',
      },
      {
        text: 'T&S tape speed indicates the urgency and strength of current momentum.',
        answer: true,
        explanation: 'When prints are firing rapidly, market participants are executing with urgency. Slow tape = no conviction. Fast tape = strong directional interest.',
      },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'Filter T&S to show only prints above 500 shares — this removes retail noise and shows the institutional flow that actually moves price.',
  nextTitle: 'Your First Trade of the Day',
},

{
  id: 94,
  title: 'Your First Trade of the Day',
  subtitle: 'Take the A-setup or take nothing',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'Take the A-setup or take nothing.',
  coreBody: 'Your first trade of the day sets the mental state for your entire session. A winning first trade creates confidence and patience. A losing first trade — especially if it was a B or C setup — creates a hole to dig out of and often triggers revenge trading. The rule is simple: if an A-grade setup does not appear by 10 AM — catalyst, float, technical trigger, volume all aligned — take no trade. Zero trades is a legitimate and often profitable decision.',
  facts: [
    { icon: '🧠', text: 'The quality of your first trade has an outsized psychological effect on all subsequent trading decisions for the rest of the day.' },
    { icon: '⏰', text: 'If no A-setup appears by 10 AM, the best setups have likely already occurred. Close the platform and protect your capital.' },
    { icon: '🏆', text: 'Professional traders take zero trades on 20–30% of trading days. Selectivity is a core skill, not a weakness.' },
  ],
  vocab: [
    { term: 'A-Setup', definition: 'A trade that meets every criterion on your pre-defined checklist — catalyst, float, trigger, volume, spread, R/R, and VWAP alignment.' },
    { term: 'FOMO Trade', definition: 'A trade entered out of fear of missing a move, without a defined trigger or checklist confirmation — statistically the lowest-probability category.' },
    { term: 'Mental Capital', definition: 'The psychological resources — focus, discipline, and emotional stability — that are depleted by losing trades and bad decisions.' },
  ],
  slotA: {
    type: 'checklist',
    heading: 'First Trade of the Day Checklist',
    items: [
      'Stock was on pre-market watchlist — no surprises',
      'Identified specific entry trigger before the open',
      'Volume at or above average on entry candle',
      'Spread 5 cents or less at time of entry',
      'Know exact stop-loss price before placing order',
      'Risk within daily max-loss budget',
      'Not chasing — entering within 2% of defined trigger',
      'VWAP and sector direction both aligned with trade',
      'Entering for setup quality, not FOMO',
    ],
  },
  slotB: {
    type: 'scenario',
    setup: 'It is 9:55 AM. You have not taken a trade yet. MORN had an A-setup at 9:32 but ran without you. HYMC is moving fast but you did no pre-market research on it. What is the right move?',
    options: [
      { label: 'Enter HYMC — FOMO is acceptable when a stock is moving this fast', correct: false, explanation: 'FOMO is never acceptable. Entering a stock you have not researched with no defined trigger is gambling, not trading. This is a C-setup at best.' },
      { label: 'Wait — if no A-setup appears by 10:15, take the day off', correct: true, explanation: 'Correct. Missing MORN was the right call if it ran before your trigger. With no A-setup available, zero trades protects your capital and your psychology.' },
      { label: 'Enter HYMC with smaller size — reduces the risk', correct: false, explanation: 'Smaller size does not make a bad setup acceptable. You still have no defined trigger, no stop logic, and no research. Loss rate is the same; just smaller dollar loss.' },
      { label: 'Short MORN since you missed the long', correct: false, explanation: 'Revenge trading a missed setup in the opposite direction is irrational. MORN\'s trend is upward — shorting it because you are frustrated is a psychological decision, not a technical one.' },
    ],
  },
  dykStyle: 'mistake',
  didYouKnow: 'FOMO trades placed outside defined setup criteria lose at a 3:1 ratio versus planned trades and account for a disproportionate share of daily max-loss days.',
  nextTitle: 'The 10 AM Reversal',
},

{
  id: 95,
  title: 'The 10 AM Reversal',
  subtitle: 'One of the most reliable intraday patterns in day trading',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'The 10 AM clock is one of the most reliable patterns in day trading.',
  coreBody: 'Between 9:45 and 10:15 AM, a reversal of the opening direction occurs with remarkable frequency — not every day, but 60–65% of trading days. Stocks that surged from 9:30–9:50 often pull back to VWAP by 10 AM. This is caused by institutional profit-taking, the exhaustion of opening momentum, and algos designed to fade opening moves. Knowing this pattern lets you take partial profits early and avoid being caught holding through a reversal.',
  facts: [
    { icon: '🕙', text: '60–65% of days see a reversal of the opening direction between 9:45–10:15 AM — enough to trade around it consistently.' },
    { icon: '💰', text: 'Taking partial profits at 9:44–9:48 before the reversal window is a proven risk-reduction technique for opening momentum trades.' },
    { icon: '🏦', text: 'Institutional profit-taking is the primary driver of the 10 AM reversal — funds that accumulated pre-market sell into the opening surge.' },
  ],
  vocab: [
    { term: '10 AM Reversal', definition: 'The pattern where the opening directional move reverses between 9:45–10:15 AM as institutional profit-taking and momentum exhaustion combine.' },
    { term: 'Momentum Exhaustion', definition: 'The point where buyers (or sellers) who drove the opening move run out of new participants willing to continue pushing price further.' },
    { term: 'Partial Profit', definition: 'Selling a portion of a winning position before the full target — locks in realized gains and removes pressure from holding the remainder.' },
  ],
  slotA: {
    type: 'timeline',
    heading: 'Riding the Open into the 10 AM Window',
    events: [
      { label: '9:30', body: 'Bell rings — gap confirmed above pre-market high. Volume surges, direction is clear.' },
      { label: '9:33', body: 'Break of pre-market high confirmed. Entry fires with stop below first candle low.' },
      { label: '9:44', body: 'Hit first target — take partial profit (sell 25–50%). Stock up 8% from entry. Trailing stop moved up.' },
      { label: '9:50', body: 'Warning: entering the 10 AM reversal window (9:45–10:15). Tighten trailing stop. Reduce size if not done already.' },
      { label: '10:00–10:10', body: 'Price pulls back toward VWAP as expected. Trailing stop may hit. This is the plan — not a surprise.' },
      { label: '10:15', body: 'Decision point: price holding above VWAP = possible continuation. Price breaking VWAP = full exit, look for afternoon re-entry.' },
    ],
  },
  slotB: {
    type: 'true-false',
    heading: 'The 10 AM Reversal: True or False?',
    statements: [
      {
        text: 'The 10 AM reversal happens every single trading day.',
        answer: false,
        explanation: 'It occurs roughly 60–65% of days. Strong trend days with institutional accumulation can push straight through 10 AM with no reversal. It is a tendency, not a law.',
      },
      {
        text: 'When a 10 AM reversal occurs, price always goes back to the opening price.',
        answer: false,
        explanation: 'The reversal is typically a partial retracement — often 30–50% of the opening move. A full gap fill on reversal is a separate, more extreme pattern.',
      },
      {
        text: 'A stock still trading above VWAP after the 10 AM pullback may be a buyable re-entry.',
        answer: true,
        explanation: 'If the 10 AM pullback holds above VWAP, that is a bullish signal — the trend is intact. A VWAP-hold bounce is a valid re-entry with stop below VWAP.',
      },
      {
        text: 'The 10 AM reversal is largely caused by institutional profit-taking on opening positions.',
        answer: true,
        explanation: 'Institutions that accumulated pre-market or at the open often take profits into the first momentum surge, creating the characteristic 10 AM pullback.',
      },
    ],
  },
  dykStyle: 'data',
  didYouKnow: '61% of stocks making a new intraday high between 9:30–9:50 AM experienced at least a 30% retracement of that move between 9:50–10:15 AM.',
  nextTitle: 'Managing an Open Trade',
},

{
  id: 96,
  title: 'Managing an Open Trade',
  subtitle: 'Your job doesn\'t start until after you enter',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'Your job does not start until after you enter.',
  coreBody: 'Entry is 20% of trading. Trade management is the other 80%. Once you are in a position, you are in a continuous real-time decision process: monitor volume, watch VWAP, evaluate whether thesis is intact, decide on adds or reduces. The difference between good traders and great traders is almost never the entry — it is what they do after entry. The tools: hard stop, volume monitoring, partial profits, and trailing stops.',
  facts: [
    { icon: '🛡️', text: 'Setting a hard stop immediately after entry removes emotional decision-making from your worst-case scenario.' },
    { icon: '📉', text: 'Declining volume on a winner is an early warning — the momentum driving your trade is weakening before price confirms it.' },
    { icon: '🎯', text: 'The trailing stop is the professional\'s tool for letting winners run while preventing a winner from becoming a loser.' },
  ],
  vocab: [
    { term: 'Hard Stop', definition: 'A firm, pre-set exit price below (for longs) or above (for shorts) entry — executed automatically or manually with no override allowed.' },
    { term: 'Trailing Stop', definition: 'A stop-loss that moves upward as price rises (for longs), locking in profit while allowing continued upside participation.' },
    { term: 'Thesis Check', definition: 'The real-time assessment of whether the original reason for the trade — catalyst, momentum, volume — is still valid.' },
  ],
  slotA: {
    type: 'comparison',
    leftLabel: 'Add to the Trade When',
    rightLabel: 'Do NOT Add When',
    rows: [
      { left: 'Price broke a new key level', right: 'Trade is currently at a loss' },
      { left: 'Volume surged on breakout', right: 'Hoping the trade turns around' },
      { left: 'Stock is above VWAP', right: 'Volume is declining on the move' },
      { left: 'First target already hit (partial taken)', right: 'Approaching 10 AM reversal window' },
      { left: 'Momentum is visibly accelerating', right: 'No new catalyst for continuation' },
    ],
  },
  slotB: {
    type: 'steps',
    heading: 'Active Trade Management Protocol',
    steps: [
      { num: 1, title: 'Set Hard Stop Immediately After Entry', body: 'Before anything else — set the stop. This is not optional. If the platform crashes, the news goes bad, or you freeze, the stop protects you.' },
      { num: 2, title: 'Monitor Volume — Decline Means Reduce', body: 'Volume declining while price still rises is bearish divergence. Reduce position size by 25–50% before the price confirms weakness.' },
      { num: 3, title: 'At First Target, Sell 1/3 to 1/2', body: 'At your first price target, sell one-third to one-half of the position. This guarantees real realized profit regardless of what happens next.' },
      { num: 4, title: 'Trail Stop Up, Never Down', body: 'After taking partial profit, move the stop up to your entry price (breakeven) or just below the most recent swing low. Never move a stop lower.' },
      { num: 5, title: 'Exit if Price Breaks VWAP or Trend Candle Closes Red', body: 'If price breaks below VWAP, or a candle closes red on high volume, the trend is likely broken. Exit remaining size — do not hope.' },
    ],
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'The simplest trade management rule: take partial profit when you are up 1x your risk. If you risked $100, sell half when up $100. This guarantees the trade cannot turn into a loss.',
  nextTitle: 'Taking Partial Profits',
},

{
  id: 97,
  title: 'Taking Partial Profits',
  subtitle: 'Partial profits buy you patience — and eliminate greed-driven holds',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'Partial profits buy you patience — and eliminate greed-driven holds.',
  coreBody: 'Selling 25–50% of a winning position at the first target does three things: it banks real money, it removes the psychological pressure of watching a winner fluctuate, and it allows the remaining shares to run further without fear. Traders who never take partials often give back entire winners waiting for the "maximum" exit. Partials are the professional\'s way of balancing greed and discipline in real time.',
  facts: [
    { icon: '🏦', text: 'Taking partial profit at +5% converts an unrealized gain into realized P&L — it is in your account, safe from reversal.' },
    { icon: '🧘', text: 'After taking a partial, move the stop to breakeven. You now have a free trade — maximum downside is zero, upside is unlimited.' },
    { icon: '📊', text: 'Professional traders who use partial exits report higher overall P&L and significantly lower max-drawdown days than those who hold full size.' },
  ],
  vocab: [
    { term: 'Partial Exit', definition: 'Selling a portion of a position — typically 25%, 33%, or 50% — at a target price while keeping the remainder for continued upside.' },
    { term: 'Breakeven Stop', definition: 'Moving the stop-loss to the entry price after taking partial profit — eliminates all downside risk on the remaining position.' },
    { term: 'Free Trade', definition: 'A position where the stop has been moved to breakeven after a partial exit — the remaining shares have zero maximum loss.' },
  ],
  slotA: {
    type: 'stat-block',
    stats: [
      { value: '1/3 · 1/3 · 1/3', label: 'Conservative exit structure', sub: '+5% / +10% / trail remainder' },
      { value: '50% · 50%', label: 'Standard approach', sub: 'Sell half at 1R, trail half to stop' },
      { value: '25% × 4', label: 'Aggressive runner', sub: 'Sell 25% at 1R / 2R / 3R / trail last 25%' },
    ],
  },
  slotB: {
    type: 'calculator',
    heading: 'First Partial Target Calculator',
    inputLabel: 'Entry price ($)',
    inputDefault: 15,
    inputMin: 1,
    inputMax: 500,
    inputStep: 0.5,
    factor: 1.05,
    resultLabel: 'First partial target (+5%)',
    resultPrefix: '$',
    note: 'After first partial, move stop to breakeven — you now have a free trade',
  },
  dykStyle: 'pro-tip',
  didYouKnow: 'After taking your first partial profit, move your stop to breakeven. The remaining shares cannot result in a loss even if the trade fully reverses back to your entry.',
  nextTitle: 'The 11 AM Fade',
},

{
  id: 98,
  title: 'The 11 AM Fade',
  subtitle: 'Morning momentum has an expiration time: approximately 11 AM',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'Morning momentum has an expiration time: approximately 11 AM.',
  coreBody: 'Between 11 AM and 2 PM, trading volume drops 40–60%, bid-ask spreads widen, momentum setups degrade into noise, and false breakouts multiply. The high-probability window — the reason you woke up early and did the pre-market work — is over by 11 AM. Most professional day traders are dramatically less active or completely flat by 11. Trading midday for action is how discipline erodes and accounts bleed.',
  facts: [
    { icon: '📉', text: 'NYSE-listed stock volume drops an average of 47% between 11 AM–2 PM compared to the 9:30–10:30 window.' },
    { icon: '🕐', text: 'The 11 AM–2 PM period produces the highest ratio of false breakouts to real breakouts of any time window in the trading day.' },
    { icon: '✅', text: 'Most professional day traders\' best trades occurred before 10:30. By 11 AM, the expected value of new trades is near zero.' },
  ],
  vocab: [
    { term: 'Midday Chop', definition: 'The low-volume, wide-spread, directionless price action that characterizes the 11 AM–2 PM period — hostile to momentum strategies.' },
    { term: 'False Breakout', definition: 'A price move above a key level that quickly reverses — more common in low-volume midday conditions when fewer participants are needed to push price.' },
    { term: 'Liquidity Window', definition: 'The high-volume, tight-spread opening period (9:30–11 AM) when institutional participation is highest and momentum setups are most reliable.' },
  ],
  slotA: {
    type: 'before-after',
    leftLabel: '9:30–10:30 AM (Prime Time)',
    rightLabel: '11 AM–2 PM (Dead Zone)',
    leftItems: [
      'High volume — institutional participation active',
      'Tight spreads — fills at expected prices',
      'Clear trends and momentum — readable tape',
      'Large size appropriate — slippage minimal',
      'Best setups of the day — high R/R opportunities',
    ],
    rightItems: [
      'Volume drops 40–60% — thin participation',
      'Spreads widen — slippage eats edge',
      'Choppy, false breakouts multiply',
      'Small size only — or no trades at all',
      'Expected value near zero — protect P&L',
    ],
  },
  slotB: {
    type: 'pros-cons',
    heading: '11 AM Decision: Stop or Continue?',
    pros: [
      'Volume dries up — setups have lower win rates',
      'Spreads widen — cost of each trade increases',
      'False breakouts increase — stops hit more often',
      'Morning P&L is protected by stopping',
      'Best setups of the day are already behind you',
    ],
    cons: [
      'FOMO on midday movers that break out',
      'Desire to recover morning losses',
      'Boredom — sitting flat feels unproductive',
      'Overconfidence after a good morning',
      'No defined rule for when to stop trading',
    ],
  },
  dykStyle: 'data',
  didYouKnow: 'Average volume in the 11 AM–2 PM window is 47% lower than the 9:30–10:30 AM window across 5,000 NYSE-listed stocks.',
  nextTitle: 'End-of-Day Review',
},

{
  id: 99,
  title: 'End-of-Day Review',
  subtitle: 'Your journal is your coach',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'Your journal is your coach.',
  coreBody: 'After the close, review every trade taken and every trade not taken that should have been. Over weeks, patterns emerge: your highest-probability setup, the time of day you perform best, the behaviors that consistently precede your losses. Without deliberate review, experience does not compound into skill — it just repeats. The journal is where trading lessons actually get learned. The trade itself is just the data point.',
  facts: [
    { icon: '📓', text: 'Traders who maintain detailed journals improve their win rate measurably faster than those who rely on memory alone.' },
    { icon: '🔍', text: 'Reviewing missed trades (setups you saw but did not take) is as important as reviewing trades you took — both reveal behavioral patterns.' },
    { icon: '📈', text: 'R-multiple tracking over 100+ trades is the most objective measure of whether your edge is real — positive average R means you have an edge.' },
  ],
  vocab: [
    { term: 'Trade Journal', definition: 'A detailed record of every trade: entry, exit, P&L, setup type, grade, and written notes on execution quality and decision-making.' },
    { term: 'R-Multiple', definition: 'Trade profit or loss expressed as a multiple of the initial risk — a +2R trade made twice the amount risked. Average R over time measures edge.' },
    { term: 'Setup Grade', definition: 'A subjective A/B/C rating of each trade\'s quality before entry — used to track whether higher-grade setups produce better outcomes over time.' },
  ],
  slotA: {
    type: 'checklist',
    heading: 'End-of-Day Review Checklist',
    items: [
      'Record entry price, exit price, and P&L for each trade',
      'Note the setup type for each trade (gap-and-go, ORB, etc.)',
      'Grade each entry A, B, or C based on criteria met',
      'Note whether you honored the stop-loss on every trade',
      'Note whether you chased or entered at the correct trigger',
      'Record specifically what went well — not vaguely',
      'Record one concrete thing to improve tomorrow',
      'Update running win rate and average R-multiple',
      'Screenshot 1-min chart with entry and exit annotated',
    ],
  },
  slotB: {
    type: 'steps',
    heading: 'Post-Close Review Protocol',
    steps: [
      { num: 1, title: 'Export Trade Log from Broker', body: 'Pull the day\'s trade log from your broker platform. Every fill, every partial, every stop. This is your raw data.' },
      { num: 2, title: 'Pull Charts for Each Trade', body: 'For each trade, open the 1-minute chart. Mark your entry and exit prices with horizontal lines. See the trade visually.' },
      { num: 3, title: 'Rules Check: Did I Follow My Plan?', body: 'For each trade, answer yes or no: Did I follow my entry rules? Did I honor my stop? Grade the decision, not the outcome.' },
      { num: 4, title: 'Write Two Sentences Per Trade', body: 'One sentence on what went well. One sentence on what to do differently. Specificity matters — "I was patient" is not as useful as "I waited for the first candle to close."' },
      { num: 5, title: 'Update Journal Spreadsheet Metrics', body: 'Log: date, ticker, setup type, R-multiple, grade, rule compliance. After 30 trades, patterns in your data will become visible.' },
    ],
  },
  dykStyle: 'quote',
  didYouKnow: '"I kept a trading journal for 5 years before I became consistently profitable. The journal is where the learning actually happens — not in the trade itself." — Mark Minervini, US Investing Champion.',
  nextTitle: 'The Complete 9:30 AM Open Playbook',
  checkpointQuiz: [
    {
      q: 'The primary purpose of keeping a trading journal is to...',
      options: ['Document wins to share on social media', 'Satisfy broker regulatory requirements', 'Identify behavioral and setup patterns that compound into skill over time', 'Calculate capital gains taxes automatically'],
      correct: 2,
      explanation: 'The journal is where raw experience becomes skill. Without deliberate review, you just repeat the same patterns. Over time, your best setup, worst time of day, and most common mistake all emerge from the data.',
    },
    {
      q: 'R-multiple tracking over 100+ trades tells you...',
      options: ['Which specific stocks to trade tomorrow', 'Whether your edge is statistically real — positive average R means a genuine edge exists', 'Your broker\'s commission rate impact on your account', 'How many individual trades you\'ve taken this month'],
      correct: 1,
      explanation: 'Average R over many trades is the most objective edge measurement. If your average R is +0.4 over 200 trades, you have a provably profitable system. If it\'s −0.2, the system loses regardless of how it feels.',
    },
    {
      q: 'When grading a trade A, B, or C in your journal, you should grade based on...',
      options: ['Whether the trade was profitable — outcomes are what matter', 'How exciting and high-energy the setup looked pre-entry', 'Decision quality — did you follow your entry rules and honor your stop?', 'The size of the position relative to your normal sizing'],
      correct: 2,
      explanation: 'Grade the decision, not the outcome. A perfectly executed A-grade setup that lost money is still an A. A rule-breaking entry that happened to profit is still a C. Only grading process builds process.',
    },
  ],
},

{
  id: 100,
  title: 'The Complete 9:30 AM Open Playbook',
  subtitle: 'You are no longer a beginner. This is your playbook.',
  section: 'Section 6 · 9:30 AM Open',
  sectionColor: '#ef4444',
  coreHeading: 'You are no longer a beginner. This is your playbook.',
  coreBody: '100 lessons. Six sections. From the psychology of a beginner\'s mind to the mechanics of the 9:30 open — fundamentals to execution. This final lesson is synthesis. Confirmation that you now hold the complete connected system. The edge is not in any single concept. It is not in the ORB alone, or the gap-and-go alone, or VWAP alone. The edge is in the system working together every single morning — preparation, patience, execution, and review, compounding over time.',
  facts: [
    { icon: '🏁', text: 'You have completed all 100 lessons. The foundation is built. What compounds it now is daily practice, journaling, and repetition.' },
    { icon: '🔗', text: 'No single lesson in this course is the edge — the edge is the complete system: preparation + setup + execution + management + review.' },
    { icon: '⏰', text: 'The entire playbook distills to 90 minutes: 9:30–11 AM is where the game is won or lost, every single trading day.' },
  ],
  vocab: [
    { term: 'The Playbook', definition: 'Your complete, personalized system of pre-market routines, setup criteria, entry rules, trade management protocols, and review habits.' },
    { term: 'Repeatable Process', definition: 'A trading approach executed the same way every day — the foundation of consistent results because it isolates skill from luck over time.' },
    { term: 'Edge', definition: 'A statistically positive expectancy over a large number of trades — not guaranteed on any individual trade, but reliable across a series.' },
  ],
  slotA: {
    type: 'timeline',
    heading: 'The Complete Daily Playbook',
    events: [
      { label: 'Night Before', body: 'Review next day\'s economic calendar. Check overnight futures direction. Set watchlist candidates from screener. Mental preparation.' },
      { label: '7–8 AM', body: 'Futures and global markets check. Pre-market tape reading begins. Note any gaps forming on watchlist stocks.' },
      { label: '8–9 AM', body: 'News and catalyst review for top gappers. Confirm float, catalyst quality, and pre-market volume on each candidate.' },
      { label: '9–9:15 AM', body: 'Finalize watchlist to 3–5 stocks maximum. Mark key levels: pre-market high, prior day close, VWAP reference.' },
      { label: '9:15–9:20 AM', body: 'Set price alerts at entry triggers. Confirm position sizes and max risk per trade. Final mental walkthrough of setups.' },
      { label: '9:20–9:29 AM', body: 'Final scan — remove any stock no longer meeting criteria. Hands ready, but not touching orders. Patience mode.' },
      { label: '9:30 AM', body: 'Bell rings. Hands off keyboard. Watch only. Note direction of first prints and volume. Zero entries for at least 60 seconds.' },
      { label: '9:31–9:45 AM', body: 'First candle read. Opening range forming. Alerts watching for trigger. Still no entry until first candle closed and ORB developing.' },
      { label: '9:45–10:30 AM', body: 'Prime execution window. A-setups only. Enter, manage, take partials, trail stops. Aware of 10 AM reversal window.' },
      { label: '11 AM', body: 'Reduce size dramatically or go flat. Post-close review begins after market close. Journal updated. Repeat tomorrow.' },
    ],
  },
  slotB: {
    type: 'myth-buster',
    myths: [
      {
        myth: 'Profitable trading requires predicting the market.',
        reality: 'It requires high-probability setups, precise risk management, and a repeatable process. No prediction needed — only reaction to defined conditions.',
      },
      {
        myth: 'You need to trade all day to make money.',
        reality: 'The best setups occur in the first 60–90 minutes. Most consistent professionals are flat by 11 AM. More time in the market equals more exposure to noise, not more profit.',
      },
    ],
  },
  dykStyle: 'quote',
  didYouKnow: '"The market rewards preparation, discipline, and consistency. It punishes impatience, emotion, and size." — adapted from the principles of Jesse Livermore.',
  nextTitle: 'Back to Course Map',
},
]

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

export const TOTAL_LESSONS = 100
