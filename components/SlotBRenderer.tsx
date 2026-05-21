'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SlotBWidget } from '@/data/lessons'

export default function SlotBRenderer({ widget }: { widget: SlotBWidget }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
    >
      <h2 className="text-sm font-semibold text-muted uppercase tracking-widest mb-4">Practice</h2>
      {(() => {
        switch (widget.type) {
          case 'vocab':
            return null
          case 'steps':
            return <Steps heading={widget.heading} steps={widget.steps} />
          case 'diagram':
            return <Diagram heading={widget.heading} svgContent={widget.svgContent} caption={widget.caption} />
          case 'scenario':
            return <Scenario setup={widget.setup} options={widget.options} />
          case 'true-false':
            return <TrueFalse heading={widget.heading} statements={widget.statements} />
          case 'myth-buster':
            return <MythBuster myths={widget.myths} />
          case 'calculator':
            return (
              <Calculator
                heading={widget.heading}
                inputLabel={widget.inputLabel}
                inputDefault={widget.inputDefault}
                inputMin={widget.inputMin}
                inputMax={widget.inputMax}
                inputStep={widget.inputStep}
                factor={widget.factor}
                resultLabel={widget.resultLabel}
                resultPrefix={widget.resultPrefix}
                resultSuffix={widget.resultSuffix}
                note={widget.note}
              />
            )
          case 'pros-cons':
            return <ProsCons heading={widget.heading} pros={widget.pros} cons={widget.cons} />
          default:
            return null
        }
      })()}
    </motion.section>
  )
}

/* ── Steps ── */
function Steps({ heading, steps }: { heading: string; steps: { num: number; title: string; body: string }[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-4">{heading}</p>
      {steps.map((s, i) => (
        <motion.div
          key={i}
          className="flex gap-4 items-start mb-5"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: i * 0.08 }}
        >
          <div className="w-8 h-8 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center font-mono text-sm font-bold text-[#00ff88] shrink-0 mt-0.5">
            {s.num}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{s.title}</p>
            <p className="text-sm text-[#6b7280] leading-relaxed mt-1">{s.body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Diagram ── */
function Diagram({ heading, svgContent, caption }: { heading: string; svgContent: string; caption?: string }) {
  const isFullSvg = svgContent.trimStart().startsWith('<svg')
  return (
    <div>
      <p className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-4">{heading}</p>
      <div className="rounded-xl overflow-hidden border border-[#2d2d3d]">
        {isFullSvg ? (
          <div
            className="w-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <svg
            viewBox="0 0 320 220"
            className="w-full max-w-sm mx-auto block"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>
      {caption && <p className="text-xs text-[#6b7280] text-center mt-2">{caption}</p>}
    </div>
  )
}

/* ── Scenario ── */
function Scenario({
  setup,
  options,
}: {
  setup: string
  options: { label: string; correct: boolean; explanation: string }[]
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [shake, setShake] = useState<number | null>(null)

  const handleSelect = (i: number) => {
    if (selected !== null && options[selected].correct) return
    setSelected(i)
    setShowExplanation(true)
    if (!options[i].correct) {
      setShake(i)
      setTimeout(() => setShake(null), 600)
    }
  }

  const reset = () => {
    setSelected(null)
    setShowExplanation(false)
    setShake(null)
  }

  const isCorrect = selected !== null && options[selected].correct

  return (
    <div>
      <div className="rounded-xl border border-[#2d2d3d] bg-[#1a1a24] p-4 mb-4">
        <p className="font-mono text-xs text-[#6b7280] uppercase tracking-widest mb-2">Scenario</p>
        <p className="text-sm text-white leading-relaxed">{setup}</p>
      </div>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i
          const correct = opt.correct

          let buttonClass = 'border-[#2d2d3d] bg-[#1a1a24] text-white hover:border-[#00ff88]/40'
          if (isSelected && correct) buttonClass = 'border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88]'
          else if (isSelected && !correct) buttonClass = 'border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444]'
          else if (selected !== null && correct && isCorrect) buttonClass = 'border-[#00ff88]/30 bg-[#00ff88]/5 text-white'

          return (
            <div key={i}>
              <motion.button
                className={`w-full text-left rounded-xl border p-3 flex items-start gap-3 transition-colors ${buttonClass}`}
                onClick={() => handleSelect(i)}
                disabled={isCorrect}
                animate={shake === i ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm leading-relaxed">{opt.label}</span>
              </motion.button>
              <AnimatePresence>
                {isSelected && showExplanation && (
                  <motion.div
                    className={`rounded-xl border p-3 mt-2 text-sm leading-relaxed ${
                      correct
                        ? 'bg-[#00ff88]/5 border-[#00ff88]/30 text-[#00ff88]'
                        : 'bg-[#ef4444]/5 border-[#ef4444]/30 text-[#ef4444]'
                    }`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <span className="font-semibold">{correct ? '✓ Correct! ' : '✗ Not quite. '}</span>
                    {opt.explanation}
                    {!correct && (
                      <button
                        className="block mt-2 text-xs font-mono text-[#6b7280] hover:text-white underline"
                        onClick={reset}
                      >
                        Try again →
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── TrueFalse ── */
function TrueFalse({
  heading,
  statements,
}: {
  heading: string
  statements: { text: string; answer: boolean; explanation: string }[]
}) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [picked, setPicked] = useState<boolean | null>(null)
  const [allDone, setAllDone] = useState(false)
  const [results, setResults] = useState<boolean[]>([])

  const current = statements[currentIdx]

  const handlePick = (choice: boolean) => {
    if (picked !== null) return
    setPicked(choice)
    setResults((r) => [...r, choice === current.answer])
  }

  const next = () => {
    if (currentIdx + 1 >= statements.length) {
      setAllDone(true)
    } else {
      setCurrentIdx((i) => i + 1)
      setPicked(null)
    }
  }

  const isCorrect = picked !== null && picked === current.answer

  if (allDone) {
    const score = results.filter(Boolean).length
    return (
      <motion.div
        className="rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/5 p-6 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <p className="text-2xl mb-2">🎉</p>
        <p className="font-semibold text-white">All done!</p>
        <p className="text-sm text-[#6b7280] mt-1">
          {score} / {statements.length} correct
        </p>
      </motion.div>
    )
  }

  return (
    <div>
      <p className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-4">{heading}</p>
      <p className="text-xs text-[#6b7280] font-mono mb-3">
        Statement {currentIdx + 1} of {statements.length}
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
        >
          <div className="rounded-xl border border-[#2d2d3d] bg-[#1a1a24] p-4 mb-4">
            <p className="text-sm text-white leading-relaxed">{current.text}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[true, false].map((choice) => {
              let cls = 'border-[#2d2d3d] bg-[#1a1a24] text-white hover:border-[#6b7280]'
              if (picked !== null) {
                if (choice === current.answer) cls = 'border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88]'
                else if (choice === picked) cls = 'border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444]'
              }
              return (
                <button
                  key={String(choice)}
                  className={`rounded-xl border p-3 font-mono font-bold text-sm transition-colors ${cls}`}
                  onClick={() => handlePick(choice)}
                  disabled={picked !== null}
                >
                  {choice ? 'TRUE' : 'FALSE'}
                </button>
              )
            })}
          </div>
          <AnimatePresence>
            {picked !== null && (
              <motion.div
                className={`rounded-xl border p-3 mt-3 text-sm leading-relaxed ${
                  isCorrect
                    ? 'bg-[#00ff88]/5 border-[#00ff88]/30 text-[#00ff88]'
                    : 'bg-[#ef4444]/5 border-[#ef4444]/30 text-[#ef4444]'
                }`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <span className="font-semibold">{isCorrect ? '✓ ' : '✗ '}</span>
                {current.explanation}
                <button
                  className="block mt-2 text-xs font-mono text-white/60 hover:text-white"
                  onClick={next}
                >
                  {currentIdx + 1 < statements.length ? 'Next →' : 'Finish →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ── MythBuster ── */
function MythBuster({ myths }: { myths: { myth: string; reality: string }[] }) {
  const [revealed, setRevealed] = useState<boolean[]>(myths.map(() => false))

  return (
    <div className="flex flex-col gap-3">
      {myths.map((m, i) => (
        <motion.div
          key={i}
          className="rounded-xl overflow-hidden border border-[#2d2d3d]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0, delay: i * 0.09 }}
        >
          <div className="bg-[#ef4444]/10 p-4">
            <p className="font-mono text-xs text-[#ef4444] uppercase mb-1">Myth</p>
            <p className="text-sm text-white leading-relaxed">{m.myth}</p>
          </div>
          <AnimatePresence>
            {revealed[i] ? (
              <motion.div
                className="bg-[#00ff88]/5 p-4 border-t border-[#2d2d3d]/50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="font-mono text-xs text-[#00ff88] uppercase mb-1">Reality</p>
                <p className="text-sm text-white leading-relaxed">{m.reality}</p>
                <button
                  className="mt-2 text-xs font-mono text-[#6b7280] hover:text-white"
                  onClick={() => setRevealed((r) => r.map((v, j) => (j === i ? false : v)))}
                >
                  ← Back to Myth
                </button>
              </motion.div>
            ) : (
              <div className="p-3 bg-[#1a1a24] border-t border-[#2d2d3d]/50">
                <button
                  className="text-xs font-mono text-[#00ff88] hover:text-[#00cc6a] transition-colors"
                  onClick={() => setRevealed((r) => r.map((v, j) => (j === i ? true : v)))}
                >
                  Reveal Reality →
                </button>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Calculator ── */
function Calculator({
  heading,
  inputLabel,
  inputDefault,
  inputMin,
  inputMax,
  inputStep,
  factor,
  resultLabel,
  resultPrefix = '',
  resultSuffix = '',
  note,
}: {
  heading: string
  inputLabel: string
  inputDefault: number
  inputMin: number
  inputMax: number
  inputStep: number
  factor: number
  resultLabel: string
  resultPrefix?: string
  resultSuffix?: string
  note?: string
}) {
  const [value, setValue] = useState(inputDefault)
  const result = Math.round(value * factor * 100) / 100

  const formatted =
    result >= 1000
      ? result.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : result.toString()

  return (
    <div>
      <p className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-4">{heading}</p>
      <div className="rounded-xl border border-[#2d2d3d] bg-[#1a1a24] p-5">
        <label className="text-xs text-[#6b7280] font-mono uppercase tracking-widest block mb-2">
          {inputLabel}
        </label>
        <div className="flex items-center gap-3 mb-1">
          <input
            type="range"
            min={inputMin}
            max={inputMax}
            step={inputStep}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="flex-1 accent-[#00ff88] cursor-pointer"
          />
          <span className="font-mono text-sm font-bold text-white w-20 text-right">
            {value.toLocaleString('en-US')}
          </span>
        </div>
        <div className="rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/5 p-4 mt-4">
          <p className="font-mono text-xs text-[#6b7280] uppercase tracking-widest mb-1">{resultLabel}</p>
          <motion.p
            key={result}
            className="text-2xl font-bold font-mono text-[#00ff88]"
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.2, bounce: 0.3 }}
          >
            {resultPrefix}{formatted}{resultSuffix}
          </motion.p>
        </div>
        {note && <p className="text-xs text-[#6b7280] mt-3 leading-relaxed">{note}</p>}
      </div>
    </div>
  )
}

/* ── ProsCons ── */
function ProsCons({ heading, pros, cons }: { heading: string; pros: string[]; cons: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#6b7280] uppercase tracking-widest mb-4">{heading}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/5 p-4">
          <p className="font-mono text-xs text-[#00ff88] uppercase tracking-wider mb-3">✅ Pros</p>
          <ul className="flex flex-col gap-2">
            {pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00ff88] shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-[#ef4444]/20 bg-[#ef4444]/5 p-4">
          <p className="font-mono text-xs text-[#ef4444] uppercase tracking-wider mb-3">❌ Cons</p>
          <ul className="flex flex-col gap-2">
            {cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ef4444] shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
