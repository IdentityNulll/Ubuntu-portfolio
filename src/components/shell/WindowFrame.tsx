import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

function WindowControls() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-shell-600/70 transition-colors hover:bg-shell-500">
        <span className="h-[2px] w-2.5 rounded-full bg-shell-950/70" />
      </span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-shell-600/70 transition-colors hover:bg-shell-500">
        <span className="h-2 w-2 rounded-[2px] border-[1.5px] border-shell-950/70" />
      </span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-shell-600/70 transition-colors hover:bg-red-500/80">
        <span className="relative block h-2 w-2">
          <span className="absolute inset-0 rotate-45 rounded-full bg-shell-950/70" style={{ width: 2, left: '50%', marginLeft: -1 }} />
          <span className="absolute inset-0 -rotate-45 rounded-full bg-shell-950/70" style={{ width: 2, left: '50%', marginLeft: -1 }} />
        </span>
      </span>
    </div>
  )
}

interface WindowFrameProps {
  id: string
  title: string
  icon?: ReactNode
  eyebrow?: string
  children: ReactNode
  className?: string
  bodyClassName?: string
  dark?: boolean
}

export function WindowFrame({
  id,
  title,
  icon,
  eyebrow,
  children,
  className = '',
  bodyClassName = '',
  dark = false,
}: WindowFrameProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`scroll-mt-14 overflow-hidden rounded-2xl border border-shell-700/80 shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 bg-gradient-to-b from-shell-800 to-shell-900 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2 text-porcelain-100/90">
          {icon && (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center text-porcelain-100/80">
              {icon}
            </span>
          )}
          <span className="truncate text-[13px] font-medium tracking-tight">{title}</span>
          {eyebrow && (
            <span className="hidden shrink-0 rounded-full bg-shell-700/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-porcelain-100/60 sm:inline">
              {eyebrow}
            </span>
          )}
        </div>
        <WindowControls />
      </div>
      <div
        className={`${dark ? 'bg-shell-900 text-porcelain-100' : 'bg-porcelain-50 text-shell-900'} ${bodyClassName}`}
      >
        {children}
      </div>
    </motion.div>
  )
}
