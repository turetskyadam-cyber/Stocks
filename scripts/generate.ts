import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { lessons, TOTAL_LESSONS } from '../data/lessons'

const dist = join(__dirname, '../dist')

function buildBoard(): number[] {
  const flat: number[] = []
  for (let row = 0; row < 10; row++) {
    const base = row * 10
    const nums = Array.from({ length: 10 }, (_, i) => base + i + 1)
    if (row % 2 === 1) nums.reverse()
    flat.push(...nums)
  }
  return flat
}

const SECTIONS = [
  { label: 'Stock Fundamentals', range: [1, 15],   color: '#10b981' },
  { label: 'Market Mechanics',   range: [16, 30],  color: '#3b82f6' },
  { label: 'Chart Reading',      range: [31, 50],  color: '#8b5cf6' },
  { label: 'Momentum Basics',    range: [51, 70],  color: '#f97316' },
  { label: 'Pre-Market Prep',    range: [71, 85],  color: '#eab308' },
  { label: '9:30 AM Open',       range: [86, 100], color: '#ef4444' },
]

function sectionColor(id: number): string {
  return SECTIONS.find((s) => id >= s.range[0] && id <= s.range[1])!.color
}

const availableIds = new Set(lessons.map((l) => l.id))

const BASE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-io:  cubic-bezier(0.77, 0, 0.175, 1);
}

html { scroll-behavior: smooth; }

body {
  background-color: #0f0f14;
  color: #fff;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a { text-decoration: none; color: inherit; }

.mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }
.muted { color: #9ca3af; }
.accent { color: #00ff88; }
.text-white { color: #fff; }

/* ── Ticker tape ── */
.ticker-wrap {
  overflow: hidden;
  background: #1a1a24;
  border-bottom: 1px solid #2d2d3d;
  border-top: 1px solid #2d2d3d;
  padding: 6px 0;
}
.ticker-track {
  display: flex;
  gap: 32px;
  white-space: nowrap;
  animation: ticker-scroll 28s linear infinite;
}
.ticker-item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 6px;
}
.ticker-item .up   { color: #00ff88; }
.ticker-item .down { color: #ef4444; }

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ── Progress bar ── */
.progress-bar-wrap {
  background: #1a1a24;
  border-bottom: 1px solid #2d2d3d;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.progress-bar-track {
  flex: 1;
  height: 4px;
  background: #2d2d3d;
  border-radius: 2px;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: #00ff88;
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.progress-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #9ca3af;
  white-space: nowrap;
}

/* ── Board ── */
.board-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
}

@media (min-width: 480px) { .board-grid { gap: 6px; } }

.cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid #2d2d3d;
  border-top-width: 2px;
}

@media (min-width: 480px) { .cell { border-radius: 8px; } }

.cell-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
}

@media (min-width: 480px) { .cell-num { font-size: 12px; } }

.cell-start-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 6px;
  color: #00ff88;
  margin-top: 2px;
  letter-spacing: 0.1em;
}

@media (min-width: 480px) { .cell-start-label { font-size: 8px; } }

.cell-link {
  display: block;
  transition: transform 150ms var(--ease-out);
}

@media (hover: hover) {
  .cell-link:hover { transform: scale(1.10); z-index: 10; position: relative; }
}
.cell-link:active { transform: scale(0.97); }

/* lesson-start pulse */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
  50%       { box-shadow: 0 0 14px 3px rgba(0, 255, 136, 0.35); }
}
.lesson-start { animation: pulse-glow 2.2s ease-in-out infinite; }

/* ── Board entrance ── */
@keyframes board-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.board-enter { animation: board-in 400ms var(--ease-out) 100ms both; }

/* ── Card stagger ── */
@keyframes card-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.c1 { animation: card-in 320ms var(--ease-out) 80ms both; }
.c2 { animation: card-in 320ms var(--ease-out) 140ms both; }
.c3 { animation: card-in 320ms var(--ease-out) 200ms both; }
.f1 { animation: card-in 320ms var(--ease-out) 280ms both; }
.f2 { animation: card-in 320ms var(--ease-out) 340ms both; }
.f3 { animation: card-in 320ms var(--ease-out) 400ms both; }
.v1 { animation: card-in 320ms var(--ease-out) 420ms both; }
.v2 { animation: card-in 320ms var(--ease-out) 480ms both; }
.v3 { animation: card-in 320ms var(--ease-out) 540ms both; }
.dyk-enter { animation: card-in 320ms var(--ease-out) 560ms both; }
.nav-enter  { animation: card-in 320ms var(--ease-out) 620ms both; }

/* ── Lesson page layout ── */
.lesson-main {
  flex: 1;
  width: 100%;
  max-width: 672px;
  margin: 0 auto;
  padding: 40px 16px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ── Section dot ── */
.section-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.section-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}
@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 0 0 transparent; }
  50%       { box-shadow: 0 0 6px 2px var(--sc); }
}
.section-dot-anim { animation: dot-pulse 2.5s ease-in-out infinite; }
.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

/* ── Hero ── */
.hero-title {
  font-size: clamp(28px, 6vw, 48px);
  font-weight: 700;
  line-height: 1.15;
  color: #fff;
  margin-top: 10px;
}
.hero-subtitle {
  font-size: 18px;
  color: #9ca3af;
  line-height: 1.6;
  margin-top: 8px;
}

/* ── Gradient border card ── */
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes border-spin {
  to { --gradient-angle: 360deg; }
}
.gradient-border-card {
  background: conic-gradient(
    from var(--gradient-angle),
    #2d2d3d 0%, rgba(0,255,136,0.22) 35%, #2d2d3d 65%
  );
  animation: border-spin 12s linear infinite;
  border-radius: 16px;
  padding: 1px;
}

.core-inner {
  background: #1a1a24;
  border-radius: 15px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 540px) {
  .core-inner { flex-direction: row; align-items: flex-start; }
}

.core-text h2 {
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 8px;
}
.core-text p {
  font-size: 14px;
  color: #9ca3af;
  line-height: 1.7;
}

/* ── Fact cards ── */
.facts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 540px) { .facts-grid { grid-template-columns: repeat(3, 1fr); } }

.fact-card {
  background: #1a1a24;
  border: 1px solid #2d2d3d;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.fact-icon { font-size: 22px; }
.fact-text { font-size: 14px; color: #fff; line-height: 1.55; }

/* ── Vocab cards ── */
.vocab-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 540px) { .vocab-grid { grid-template-columns: repeat(3, 1fr); } }

.vocab-card-wrap {
  perspective: 800px;
  height: 120px;
  cursor: pointer;
}
.vocab-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1);
}
.vocab-card-wrap.flipped .vocab-card-inner {
  transform: rotateY(180deg);
}
.vocab-face {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 16px;
}
.vocab-front {
  background: #1a1a24;
  border: 1px solid #2d2d3d;
}
.vocab-back {
  background: #1a1a24;
  border: 1px solid rgba(0, 255, 136, 0.3);
  transform: rotateY(180deg);
  overflow: hidden;
}
.vocab-term {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 6px;
}
.vocab-hint {
  font-size: 11px;
  color: #9ca3af;
  font-family: 'JetBrains Mono', monospace;
}
.vocab-def {
  font-size: 13px;
  color: #fff;
  line-height: 1.55;
}

/* shimmer on back face */
@keyframes shimmer-slide {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(0,255,136,0.07) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer-slide 3s linear infinite;
  border-radius: 12px;
  pointer-events: none;
}

/* ── Did You Know ── */
.dyk-card {
  background: #1a1a24;
  border: 1px solid #2d2d3d;
  border-radius: 16px;
  padding: 20px 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
}
.dyk-icon { font-size: 22px; flex-shrink: 0; }
.dyk-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #00ff88;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 4px;
}
.dyk-text { font-size: 14px; color: #fff; line-height: 1.65; }

/* ── Nav buttons ── */
.nav-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-next {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #00ff88;
  color: #000;
  font-weight: 700;
  font-size: 14px;
  padding: 14px 20px;
  border-radius: 12px;
  transition: transform 150ms var(--ease-out), box-shadow 150ms;
  position: relative;
  overflow: hidden;
}
.btn-next-label { display: flex; flex-direction: column; gap: 2px; }
.btn-next-pre { font-size: 11px; font-weight: 500; opacity: 0.7; }
.btn-next-title { font-size: 14px; }
.btn-arrow { font-size: 18px; line-height: 1; transition: transform 200ms var(--ease-out); }

@media (hover: hover) {
  .btn-next:hover { transform: scale(1.02); box-shadow: 0 4px 20px rgba(0,255,136,0.25); }
  .btn-next:hover .btn-arrow { transform: translateX(5px); }
  .btn-back:hover .btn-arrow { transform: translateX(-5px); }
}
.btn-next:active { transform: scale(0.97); }

.btn-back {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1a1a24;
  color: #9ca3af;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 18px;
  border-radius: 12px;
  border: 1px solid #2d2d3d;
  transition: transform 150ms var(--ease-out), color 150ms, border-color 150ms;
}
@media (hover: hover) {
  .btn-back:hover { color: #fff; border-color: #4d4d5d; transform: scale(1.01); }
}
.btn-back:active { transform: scale(0.97); }

/* ── Footer ── */
footer {
  border-top: 1px solid #2d2d3d;
  padding: 16px;
  text-align: center;
}
.footer-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #9ca3af;
}

/* ── Section legend pills ── */
.legend-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  padding: 12px 16px;
  border-bottom: 1px solid #2d2d3d;
}
.legend-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #1a1a24;
  border: 1px solid #2d2d3d;
  border-radius: 100px;
  padding: 4px 12px;
}
.legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.legend-label { font-size: 12px; color: #fff; }
.legend-range { font-size: 12px; color: #9ca3af; }

/* ── CTA ── */
.cta-wrap { padding: 8px 16px 56px; text-align: center; }
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #00ff88;
  color: #000;
  font-weight: 700;
  font-size: 14px;
  padding: 14px 32px;
  border-radius: 12px;
  transition: transform 150ms var(--ease-out);
}
@media (hover: hover) { .btn-cta:hover { transform: scale(1.05); } }
.btn-cta:active { transform: scale(0.97); }

/* ── Board count label ── */
.board-count {
  text-align: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #9ca3af;
  margin-top: 20px;
}

/* ── Header ── */
.site-header {
  text-align: center;
  padding: 48px 16px 32px;
  border-bottom: 1px solid #2d2d3d;
}
.site-header-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #00ff88;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
}
.site-header h1 {
  font-size: clamp(28px, 7vw, 48px);
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}
.site-header-sub {
  color: #9ca3af;
  margin-top: 12px;
  font-size: 15px;
  max-width: 280px;
  margin-inline: auto;
  line-height: 1.5;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .ticker-track, .gradient-border-card, .shimmer,
  .section-dot-anim, .lesson-start, .board-enter,
  .c1,.c2,.c3,.f1,.f2,.f3,.v1,.v2,.v3,.dyk-enter,.nav-enter,
  .vocab-card-inner { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }
}

/* ── Section heading ── */
.section-h2 {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 14px;
}

/* ── Pizza SVG wrapper ── */
.pizza-wrap { flex-shrink: 0; }
`

const TICKER_ITEMS = [
  { sym: 'AAPL', price: '189.84', ch: '+1.2%', up: true },
  { sym: 'TSLA', price: '248.42', ch: '+3.8%', up: true },
  { sym: 'SPY',  price: '521.67', ch: '+0.4%', up: true },
  { sym: 'NVDA', price: '875.39', ch: '+2.1%', up: true },
  { sym: 'META', price: '502.12', ch: '-0.6%', up: false },
  { sym: 'AMD',  price: '168.75', ch: '+1.9%', up: true },
  { sym: 'GME',  price: '14.22',  ch: '-2.3%', up: false },
  { sym: 'MSFT', price: '415.06', ch: '+0.8%', up: true },
  { sym: 'QQQ',  price: '444.33', ch: '+0.5%', up: true },
  { sym: 'AMZN', price: '185.90', ch: '+1.3%', up: true },
]

function buildTickerHTML(): string {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS] // doubled for seamless loop
  return items
    .map(
      (t) =>
        `<span class="ticker-item"><span>${t.sym}</span><span class="${t.up ? 'up' : 'down'}">${t.ch}</span><span>${t.price}</span></span>`
    )
    .join('')
}

function tickerSection(): string {
  return `
<div class="ticker-wrap" aria-hidden="true">
  <div class="ticker-track">${buildTickerHTML()}</div>
</div>`
}

function head(title: string, depth: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(title)}</title>
  <style>${BASE_CSS}</style>
</head>
<body>`
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function pizzaSVG(): string {
  const slices: string[] = []
  for (let i = 0; i < 6; i++) {
    const a1 = (i * 60 * Math.PI) / 180
    const a2 = ((i + 1) * 60 * Math.PI) / 180
    const r = 38, cx = 48, cy = 48
    const x1 = cx + r * Math.cos(a1 - Math.PI / 2)
    const y1 = cy + r * Math.sin(a1 - Math.PI / 2)
    const x2 = cx + r * Math.cos(a2 - Math.PI / 2)
    const y2 = cy + r * Math.sin(a2 - Math.PI / 2)
    const fill = i === 0 ? '#00ff8820' : 'transparent'
    const stroke = i === 0 ? '#00ff88' : '#2d2d3d'
    const sw = i === 0 ? '1.5' : '1'
    slices.push(`<path d="M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`)
  }
  return `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="48" cy="48" r="40" fill="#1a1a24" stroke="#2d2d3d" stroke-width="1.5"/>
  ${slices.join('\n  ')}
  <text x="56" y="30" fill="#00ff88" font-size="7" font-family="monospace" font-weight="600" text-anchor="middle">YOU</text>
</svg>`
}

function generateBoardPage(): string {
  const board = buildBoard()
  const availableCount = availableIds.size

  const cells = board
    .map((id) => {
      const color = sectionColor(id)
      const available = availableIds.has(id)
      const isStart = id === 1
      const num = String(id).padStart(2, '0')

      const cellDiv = `<div class="cell" style="border-top-color:${color};border-color:${available ? color + '44' : '#2d2d3d'};background:${available ? color + '12' : '#1a1a2430'};">
        <span class="cell-num" style="color:${available ? '#fff' : '#374151'};">${num}</span>
        ${isStart ? '<span class="cell-start-label">START</span>' : ''}
      </div>`

      if (!available) return `<div>${cellDiv}</div>`

      return `<a href="${id === 1 ? '/' : '../'}course/${id}/index.html" class="cell-link${isStart ? ' lesson-start' : ''}" aria-label="Go to lesson ${id}">${cellDiv}</a>`
    })
    .join('\n')

  const legend = SECTIONS.map(
    (s) =>
      `<div class="legend-pill"><span class="legend-dot" style="background:${s.color};"></span><span class="legend-label">${s.label}</span><span class="legend-range">${s.range[0]}–${s.range[1]}</span></div>`
  ).join('\n')

  return `${head('Momentum Trading Course')}
<header class="site-header">
  <p class="site-header-eyebrow">Course Map</p>
  <h1>Momentum Trading<br>Course</h1>
  <p class="site-header-sub">100 lessons. One goal: trade the open like a pro.</p>
</header>

<nav class="legend-wrap" aria-label="Course sections">
  ${legend}
</nav>

<main style="flex:1;padding:32px 12px;max-width:768px;width:100%;margin:0 auto;">
  <div class="board-enter board-grid">
    ${cells}
  </div>
  <p class="board-count">${availableCount} / ${TOTAL_LESSONS} lessons available · more coming soon</p>
</main>

<div class="cta-wrap">
  <a href="course/1/index.html" class="btn-cta">Begin Lesson 1 <span>→</span></a>
</div>

<footer>
  <p class="footer-text">Momentum Trading Course</p>
</footer>
</body>
</html>`
}

function generateLessonPage(lessonId: number): string {
  const lesson = lessons.find((l) => l.id === lessonId)!
  const pct = ((lesson.id / TOTAL_LESSONS) * 100).toFixed(1)
  const prevId = lesson.id - 1
  const nextId = lesson.id + 1
  const hasNext = availableIds.has(nextId)
  const hasPrev = lesson.id > 1

  const factsHTML = lesson.facts
    .map(
      (f, i) =>
        `<div class="fact-card f${i + 1}">
          <span class="fact-icon">${f.icon}</span>
          <p class="fact-text">${escHtml(f.text)}</p>
        </div>`
    )
    .join('\n')

  const vocabHTML = lesson.vocab
    .map(
      (v, i) =>
        `<div class="vocab-card-wrap v${i + 1}" onclick="this.classList.toggle('flipped')" role="button" aria-label="Flip card for ${escHtml(v.term)}">
          <div class="vocab-card-inner">
            <div class="vocab-face vocab-front">
              <p class="vocab-term">${escHtml(v.term)}</p>
              <p class="vocab-hint">tap to reveal</p>
            </div>
            <div class="vocab-face vocab-back">
              <div class="shimmer"></div>
              <p class="vocab-def">${escHtml(v.definition)}</p>
            </div>
          </div>
        </div>`
    )
    .join('\n')

  const backBtn = hasPrev
    ? `<a href="../${prevId}/index.html" class="btn-back"><span class="btn-arrow">←</span><span>Lesson ${prevId}</span></a>`
    : ''

  const nextBtn = hasNext
    ? `<a href="../${nextId}/index.html" class="btn-next">
        <span class="btn-next-label">
          <span class="btn-next-pre">Next lesson</span>
          <span class="btn-next-title">${escHtml(lesson.nextTitle)}</span>
        </span>
        <span class="btn-arrow">→</span>
      </a>`
    : `<a href="../../index.html" class="btn-next">
        <span class="btn-next-label">
          <span class="btn-next-pre">You finished!</span>
          <span class="btn-next-title">Back to Course Map</span>
        </span>
        <span class="btn-arrow">→</span>
      </a>`

  const pizzaHTML = lesson.id === 1
    ? `<div class="pizza-wrap">${pizzaSVG()}</div>`
    : ''

  return `${head(`Lesson ${lesson.id}: ${lesson.title}`)}

<div class="progress-bar-wrap">
  <a href="../../index.html" style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#9ca3af;text-decoration:none;white-space:nowrap;">← Map</a>
  <div class="progress-bar-track">
    <div class="progress-bar-fill" style="width:${pct}%;"></div>
  </div>
  <span class="progress-label">${lesson.id}&nbsp;/&nbsp;${TOTAL_LESSONS}</span>
</div>

${tickerSection()}

<main class="lesson-main">
  <!-- Hero -->
  <section class="c1">
    <div class="section-row">
      <span class="section-dot section-dot-anim" style="background-color:${lesson.sectionColor};--sc:${lesson.sectionColor};"></span>
      <p class="section-label">${escHtml(lesson.section)}</p>
    </div>
    <h1 class="hero-title">${escHtml(lesson.title)}</h1>
    <p class="hero-subtitle">${escHtml(lesson.subtitle)}</p>
  </section>

  <!-- Core Concept -->
  <section class="c2">
    <div class="gradient-border-card">
      <div class="core-inner">
        ${pizzaHTML}
        <div class="core-text">
          <h2>${escHtml(lesson.coreHeading)}</h2>
          <p>${escHtml(lesson.coreBody)}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Key Facts -->
  <section class="c3">
    <p class="section-h2">3 things to know</p>
    <div class="facts-grid">
      ${factsHTML}
    </div>
  </section>

  <!-- Vocab -->
  <section>
    <p class="section-h2">Key vocabulary — tap each card</p>
    <div class="vocab-grid">
      ${vocabHTML}
    </div>
  </section>

  <!-- Did You Know -->
  <div class="dyk-card dyk-enter">
    <span class="dyk-icon">💡</span>
    <div>
      <p class="dyk-label">Did you know?</p>
      <p class="dyk-text">${escHtml(lesson.didYouKnow)}</p>
    </div>
  </div>

  <!-- Navigation -->
  <div class="nav-wrap nav-enter">
    ${backBtn}
    ${nextBtn}
  </div>
</main>

<footer>
  <p class="footer-text">Lesson ${lesson.id} of ${TOTAL_LESSONS} · Momentum Trading Course</p>
</footer>
</body>
</html>`
}

// ── Generate files ──────────────────────────────────────────────────────────

mkdirSync(dist, { recursive: true })

// Board
writeFileSync(join(dist, 'index.html'), generateBoardPage())
console.log('✓ dist/index.html')

// Lessons
for (const lesson of lessons) {
  const dir = join(dist, 'course', String(lesson.id))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), generateLessonPage(lesson.id))
  console.log(`✓ dist/course/${lesson.id}/index.html`)
}

console.log(`\n✅ Generated ${1 + lessons.length} files in dist/`)
