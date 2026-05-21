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
]

export function getLessonById(id: number): Lesson | undefined {
  return lessons.find((l) => l.id === id)
}

export const TOTAL_LESSONS = 100
