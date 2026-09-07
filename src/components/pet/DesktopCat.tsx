import { useEffect, useRef, useState } from 'react'
import { usePlayer } from '../../context/PlayerContext'

type CatState = 'idle' | 'walk' | 'dance' | 'sleep' | 'click' | 'drag' | 'fall'

const CAT_SIZE = 96
const WALK_SPEED = 55 // px/sec
const GRAVITY = 1400 // px/sec^2
const SLEEP_AFTER_MS = 90_000
const DESKTOP_BREAKPOINT = 768

const SPRITES: Record<Exclude<CatState, 'fall'> | 'fall', string[]> = {
  idle: ['/pet/idle/01.svg'],
  walk: ['/pet/walk/01.svg', '/pet/walk/02.svg'],
  dance: ['/pet/dance/01.svg', '/pet/dance/02.svg'],
  click: ['/pet/click/01.svg'],
  sleep: ['/pet/sleep/01.svg'],
  drag: ['/pet/drag/01.svg'],
  fall: ['/pet/drag/01.svg'], // falling reuses the startled drag pose
}
const FPS: Record<CatState, number> = { idle: 1, walk: 6, dance: 4, click: 1, sleep: 1, drag: 1, fall: 1 }
const BLINK_SRC = '/pet/blink/01.svg'
const BLINK_EVERY: [number, number] = [2200, 6500]
const BLINK_DURATION = 140

const ANIMATION_CLASS: Record<CatState, string> = {
  idle: 'animate-cat-breathe',
  walk: 'animate-cat-hop',
  dance: 'animate-cat-dance',
  sleep: 'animate-cat-snooze',
  click: 'animate-cat-pop',
  drag: 'animate-cat-dangle',
  fall: '',
}
const ANIMATION_CLASS_FLIP: Partial<Record<CatState, string>> = {
  idle: 'animate-cat-breathe-flip',
  walk: 'animate-cat-hop-flip',
  dance: 'animate-cat-dance-flip',
}

const GREETINGS = ['hi!', 'nya~', 'hello!', '(=^･ω･^=)', 'boop!', '♪♪']
const POKED = ['eep!', 'hehe', 'nya!', '>_<', 'that tickles!']
const SLEEPY = ['zzz…', 'sleepy…', '…zzz']

function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}
function pick(list: string[]) {
  return list[Math.floor(Math.random() * list.length)]
}
function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max)
}

function bounds() {
  const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT
  const minX = isDesktop ? 100 : 8
  const maxX = Math.max(window.innerWidth - CAT_SIZE - 8, minX)
  const bottomSafe = isDesktop ? 24 : 84
  const topSafe = 48
  const floorY = Math.max(window.innerHeight - CAT_SIZE - bottomSafe, topSafe)
  return { minX, maxX, topSafe, floorY }
}

export function DesktopCat() {
  const { isPlaying, currentTrack } = usePlayer()

  const elRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const vyRef = useRef(0)
  const targetXRef = useRef(0)
  const stateRef = useRef<CatState>('idle')
  const facingRef = useRef<1 | -1>(1)
  const draggingRef = useRef(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const lastInteractionRef = useRef(Date.now())
  const stateUntilRef = useRef(0)
  const isPlayingRef = useRef(isPlaying)
  const currentTrackRef = useRef(currentTrack)
  const lastFrameRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const pointerDownRef = useRef<{ at: number; x: number; y: number } | null>(null)

  const [state, setState] = useState<CatState>('idle')
  const [facing, setFacing] = useState<1 | -1>(1)
  const [frameIndex, setFrameIndex] = useState(0)
  const [blinking, setBlinking] = useState(false)
  const [bubble, setBubble] = useState<{ text: string; key: number } | null>(null)

  const applyTransform = () => {
    const el = elRef.current
    if (el) el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
  }

  const say = (text: string, ms = 2600) => {
    setBubble({ text, key: Date.now() })
    clearTimeout(bubbleTimerRef.current)
    bubbleTimerRef.current = setTimeout(() => setBubble(null), ms)
  }

  const enterState = (next: CatState, durationMs = 0) => {
    if (stateRef.current !== next) {
      const previous = stateRef.current
      stateRef.current = next
      setState(next)
      if (next === 'sleep' && previous !== 'sleep') say(pick(SLEEPY), 3000)
      if (next === 'dance' && previous !== 'dance' && currentTrackRef.current.audioSrc) {
        say(`♪ ${currentTrackRef.current.title}`, 3400)
      }
    }
    stateUntilRef.current = durationMs ? Date.now() + durationMs : 0
  }

  const decideNext = () => {
    const idleFor = Date.now() - lastInteractionRef.current
    if (isPlayingRef.current) {
      enterState('dance')
      return
    }
    if (idleFor > SLEEP_AFTER_MS) {
      enterState('sleep')
      return
    }
    if (Math.random() < 0.65) {
      const { minX, maxX } = bounds()
      const span = rand(120, 400) * (Math.random() < 0.5 ? -1 : 1)
      targetXRef.current = clamp(posRef.current.x + span, minX, maxX)
      enterState('walk')
      return
    }
    enterState('idle', rand(2500, 7000))
  }

  useEffect(() => {
    currentTrackRef.current = currentTrack
  }, [currentTrack])

  // Keep the physics loop reading live music state without restarting it.
  useEffect(() => {
    isPlayingRef.current = isPlaying
    if (isPlaying) {
      if (!draggingRef.current) enterState('dance')
    } else if (stateRef.current === 'dance') {
      enterState('idle', rand(1000, 2500))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying])

  // Spawn position + main physics loop.
  useEffect(() => {
    const { minX, maxX, floorY } = bounds()
    posRef.current = { x: clamp(maxX - 40, minX, maxX), y: floorY }
    applyTransform()
    stateUntilRef.current = Date.now() + rand(2000, 5000)
    setTimeout(() => say(pick(GREETINGS)), 900)

    const tick = (now: number) => {
      const last = lastFrameRef.current ?? now
      const dt = Math.min((now - last) / 1000, 0.05)
      lastFrameRef.current = now

      if (!draggingRef.current) {
        if (stateRef.current === 'fall') {
          vyRef.current += GRAVITY * dt
          posRef.current.y += vyRef.current * dt
          const { floorY: floor } = bounds()
          if (posRef.current.y >= floor) {
            posRef.current.y = floor
            vyRef.current = 0
            enterState('idle', rand(1200, 2500))
          }
          applyTransform()
        } else if (stateRef.current === 'walk') {
          const dir = Math.sign(targetXRef.current - posRef.current.x) || 1
          if (dir !== facingRef.current) {
            facingRef.current = dir as 1 | -1
            setFacing(dir as 1 | -1)
          }
          posRef.current.x += dir * WALK_SPEED * dt
          if (Math.abs(posRef.current.x - targetXRef.current) < 3) {
            posRef.current.x = targetXRef.current
            enterState('idle', rand(2000, 6000))
          }
          const { minX, maxX: mx } = bounds()
          posRef.current.x = clamp(posRef.current.x, minX, mx)
          applyTransform()
        } else if (stateRef.current === 'sleep') {
          if (Date.now() - lastInteractionRef.current < SLEEP_AFTER_MS || isPlayingRef.current) {
            enterState('idle', rand(1000, 2000))
          }
        } else if (stateRef.current !== 'dance') {
          if (stateUntilRef.current && Date.now() > stateUntilRef.current) decideNext()
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const onResize = () => {
      const { minX, maxX: mx, floorY: floor } = bounds()
      posRef.current.x = clamp(posRef.current.x, minX, mx)
      if (stateRef.current !== 'drag' && stateRef.current !== 'fall') posRef.current.y = floor
      applyTransform()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      clearTimeout(bubbleTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Frame stepping for multi-frame states.
  useEffect(() => {
    setFrameIndex(0)
    const frames = SPRITES[state]
    if (frames.length <= 1) return
    const fps = FPS[state]
    const id = setInterval(() => setFrameIndex((i) => i + 1), 1000 / fps)
    return () => clearInterval(id)
  }, [state])

  // Idle blinking.
  useEffect(() => {
    if (state !== 'idle') {
      setBlinking(false)
      return
    }
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      const delay = rand(...BLINK_EVERY)
      timer = setTimeout(() => {
        if (cancelled) return
        setBlinking(true)
        setTimeout(() => !cancelled && setBlinking(false), BLINK_DURATION)
        schedule()
      }, delay)
    }
    schedule()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [state])

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    ;(e.target as Element).setPointerCapture(e.pointerId)
    pointerDownRef.current = { at: Date.now(), x: e.clientX, y: e.clientY }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const down = pointerDownRef.current
    if (!down) return

    if (!draggingRef.current) {
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y)
      if (moved <= 5) return
      draggingRef.current = true
      lastInteractionRef.current = Date.now()
      dragOffsetRef.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y }
      enterState('drag')
    }

    posRef.current.x = e.clientX - dragOffsetRef.current.x
    posRef.current.y = e.clientY - dragOffsetRef.current.y
    const { minX, maxX, topSafe, floorY } = bounds()
    posRef.current.x = clamp(posRef.current.x, minX, maxX)
    posRef.current.y = clamp(posRef.current.y, topSafe, floorY)
    applyTransform()
  }

  const onPointerUp = (e: React.PointerEvent) => {
    const down = pointerDownRef.current
    pointerDownRef.current = null
    if (!down) return

    if (draggingRef.current) {
      draggingRef.current = false
      lastInteractionRef.current = Date.now()
      const { floorY: floor } = bounds()
      if (posRef.current.y < floor - 2) {
        vyRef.current = 0
        enterState('fall')
      } else {
        enterState('idle', rand(1500, 3000))
      }
    } else if (Date.now() - down.at < 500) {
      lastInteractionRef.current = Date.now()
      enterState('click', 1200)
      say(pick(POKED))
    }
    ;(e.target as Element).releasePointerCapture(e.pointerId)
  }

  const frames = SPRITES[state]
  const src = blinking && state === 'idle' ? BLINK_SRC : frames[frameIndex % frames.length]
  const animationClass =
    facing === -1 && ANIMATION_CLASS_FLIP[state] ? ANIMATION_CLASS_FLIP[state] : ANIMATION_CLASS[state]

  return (
    <div
      ref={elRef}
      className="fixed left-0 top-0 z-40 select-none touch-none"
      style={{ width: CAT_SIZE, height: CAT_SIZE, cursor: state === 'drag' ? 'grabbing' : 'grab' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={() => say(pick(GREETINGS))}
      onContextMenu={(e) => e.preventDefault()}
    >
      {bubble && (
        <div
          key={bubble.key}
          className="absolute -top-1 left-1/2 z-10 max-w-[9.5rem] -translate-x-1/2 -translate-y-full whitespace-pre-wrap rounded-xl border-2 border-shell-900 bg-white px-2.5 py-1.5 text-center text-[11px] font-semibold text-shell-900 shadow-lg after:absolute after:-bottom-[6px] after:left-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:rotate-45 after:border-b-2 after:border-r-2 after:border-shell-900 after:bg-white"
        >
          {bubble.text}
        </div>
      )}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={`h-full w-full pointer-events-none object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] ${animationClass}`}
        style={
          state === 'fall'
            ? { transform: 'scale(0.94, 1.08)', transformOrigin: '50% 92%' }
            : { transformOrigin: '50% 92%' }
        }
      />
    </div>
  )
}
