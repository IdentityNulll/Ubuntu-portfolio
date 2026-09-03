import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface ScriptLine {
  prompt?: string
  text: string
  className?: string
}

const script: ScriptLine[] = [
  { prompt: '~$', text: 'whoami' },
  { text: 'support-teacher · builder · uwc-applicant', className: 'text-ubuntu-orange-light' },
  { prompt: '~$', text: 'cat role.txt' },
  { text: 'IT Education Center — support teacher', className: 'text-porcelain-200/80' },
  { text: 'Applying to United World Colleges (UWC)', className: 'text-porcelain-200/80' },
  { prompt: '~$', text: 'ls ./projects' },
  {
    text: 'ielts-grader/  ascension/  credit-tracker/  milliy-sertifikat/',
    className: 'text-aubergine-500',
  },
  { prompt: '~$', text: '' },
]

export function TerminalCard() {
  const reduceMotion = useReducedMotion()
  const [lineIndex, setLineIndex] = useState(reduceMotion ? script.length : 0)
  const [charIndex, setCharIndex] = useState(reduceMotion ? 0 : 0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    if (reduceMotion) return

    if (lineIndex >= script.length) return

    const current = script[lineIndex]

    if (charIndex < current.text.length) {
      timeoutRef.current = setTimeout(() => setCharIndex((c) => c + 1), 22 + Math.random() * 26)
    } else {
      timeoutRef.current = setTimeout(
        () => {
          setLineIndex((i) => i + 1)
          setCharIndex(0)
        },
        current.prompt ? 260 : 420,
      )
    }

    return () => clearTimeout(timeoutRef.current)
  }, [lineIndex, charIndex, reduceMotion])

  const doneLines = script.slice(0, lineIndex)
  const activeLine = script[lineIndex]

  return (
    <div className="overflow-hidden rounded-2xl border border-shell-700/80 shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 bg-gradient-to-b from-shell-800 to-shell-900 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-shell-600/70" />
          <span className="h-3 w-3 rounded-full bg-shell-600/70" />
          <span className="h-3 w-3 rounded-full bg-shell-600/70" />
        </div>
        <span className="mx-auto -ml-6 text-[13px] font-medium text-porcelain-100/80">
          teacher@uwc-applicant: ~
        </span>
      </div>
      <div
        className="min-h-[220px] bg-[#2b0a20] p-4 font-mono text-[13px] leading-relaxed text-porcelain-100 sm:min-h-[240px] sm:p-5 sm:text-sm"
        aria-hidden="true"
      >
        {reduceMotion
          ? script.map((line, i) => (
              <TerminalLine key={i} line={line} cursor={i === script.length - 1} />
            ))
          : doneLines.map((line, i) => (
              <TerminalLine
                key={i}
                line={line}
                cursor={lineIndex >= script.length && i === doneLines.length - 1}
              />
            ))}

        {!reduceMotion && activeLine && (
          <TerminalLine line={{ ...activeLine, text: activeLine.text.slice(0, charIndex) }} cursor />
        )}
      </div>
    </div>
  )
}

function TerminalLine({ line, cursor }: { line: ScriptLine; cursor?: boolean }) {
  return (
    <div className="flex gap-2">
      {line.prompt && <span className="shrink-0 text-ubuntu-orange">{line.prompt}</span>}
      <span className={line.className}>
        {line.text}
        {cursor && (
          <span className="animate-blink ml-0.5 inline-block h-[1em] w-[7px] -translate-y-[1px] bg-porcelain-100 align-middle" />
        )}
      </span>
    </div>
  )
}
