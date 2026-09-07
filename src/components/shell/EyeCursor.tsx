import { useEffect, useRef } from 'react'

const MAX_X = 3.5
const MAX_Y = 1.3
const FALLOFF_PX = 50

function look(eyeEl: HTMLElement | null, irisEl: HTMLElement | null, clientX: number, clientY: number) {
  if (!eyeEl || !irisEl) return
  const rect = eyeEl.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = clientX - cx
  const dy = clientY - cy
  const dist = Math.hypot(dx, dy)
  const angle = Math.atan2(dy, dx)
  const closeness = Math.min(dist / FALLOFF_PX, 1)
  const x = Math.cos(angle) * MAX_X * closeness
  const y = Math.sin(angle) * MAX_Y * closeness
  irisEl.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`
}

function Eye({
  eyeRef,
  irisRef,
}: {
  eyeRef: React.RefObject<HTMLDivElement | null>
  irisRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={eyeRef}
      className="relative flex h-3 w-5 items-center justify-center overflow-hidden rounded-full border border-shell-950/60 bg-porcelain-50 shadow-inner sm:h-3.5 sm:w-6"
    >
      <div
        ref={irisRef}
        className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-aubergine-500 to-aubergine-800 transition-transform duration-75 ease-out sm:h-3 sm:w-3"
      >
        <span className="absolute inset-0 m-auto h-1 w-1 rounded-full bg-aubergine-950" />
        <span className="absolute left-[3px] top-[2px] h-[3px] w-[3px] rounded-full bg-white/80" />
      </div>
    </div>
  )
}

export function EyeCursor() {
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)
  const leftIrisRef = useRef<HTMLDivElement>(null)
  const rightIrisRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      look(leftEyeRef.current, leftIrisRef.current, e.clientX, e.clientY)
      look(rightEyeRef.current, rightIrisRef.current, e.clientX, e.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="flex items-center gap-1" aria-hidden="true" title="eye cursor">
      <Eye eyeRef={leftEyeRef} irisRef={leftIrisRef} />
      <Eye eyeRef={rightEyeRef} irisRef={rightIrisRef} />
    </div>
  )
}
