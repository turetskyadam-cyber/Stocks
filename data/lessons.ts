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
    didYouKnow:
      'Studies show that stocks gapping up more than 4% on above-average pre-market volume continue higher at the open more than 60% of the time — making gap-and-go one of the most reliable momentum strategies.',
    nextTitle: 'The Opening Bell: 9:30 AM ET',
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
]

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

export const TOTAL_LESSONS = 100
