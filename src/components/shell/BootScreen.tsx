import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const DOT_COUNT = 5

export function BootScreen() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const id = setTimeout(
      () => {
        setVisible(false)
        document.body.style.overflow = ''
      },
      reduceMotion ? 400 : 2000,
    )
    return () => {
      clearTimeout(id)
      document.body.style.overflow = ''
    }
  }, [reduceMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-black"
        >
          <div className="animate-boot-logo flex h-20 w-20 items-center justify-center rounded-2xl bg-ubuntu-orange sm:h-24 sm:w-24">
            <svg viewBox="0 0 64 64" className="h-11 w-11 sm:h-14 sm:w-14" aria-hidden="true">
              <path
                d="M18 22 L30 32 L18 42"
                stroke="#2C001E"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <line x1="34" y1="42" x2="48" y2="42" stroke="#2C001E" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>

          <div className="flex items-center gap-3" aria-hidden="true">
            {Array.from({ length: DOT_COUNT }).map((_, i) => (
              <span
                key={i}
                className="animate-boot-dot h-2.5 w-2.5 rounded-full bg-ubuntu-orange"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
