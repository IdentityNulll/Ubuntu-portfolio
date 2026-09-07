import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Music } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { navItems, type NavId } from '../../data/nav'
import { useActiveSection } from '../../hooks/useActiveSection'
import { usePlayer } from '../../context/PlayerContext'

const HINT_DURATION_MS = 10_000

const ids = navItems.map((item) => item.id)

function scrollToSection(id: NavId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function DockButton({
  label,
  icon: Icon,
  iconBg,
  active,
  onClick,
  showHint,
}: {
  label: string
  icon: LucideIcon
  iconBg: string
  active: boolean
  onClick: () => void
  showHint: boolean
}) {
  return (
    <li className="relative flex items-center">
      <span
        className={`absolute -top-2 left-1/2 h-1 w-5 -translate-x-1/2 rounded-b-full bg-porcelain-50 transition-opacity ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={`group relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-inner sm:h-12 sm:w-12 ${iconBg}`}
        aria-current={active ? 'true' : undefined}
        aria-label={label}
      >
        <Icon className="h-5 w-5 text-white drop-shadow sm:h-6 sm:w-6" strokeWidth={2} />
        <span
          className={`pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-shell-800 px-2.5 py-1 text-xs font-medium text-porcelain-50 shadow-lg transition-opacity duration-300 sm:block ${
            showHint ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          {label}
        </span>
      </motion.button>
    </li>
  )
}

export function Dock() {
  const active = useActiveSection(ids)
  const { isOpen, openPlayer } = usePlayer()
  const [showHints, setShowHints] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setShowHints(false), HINT_DURATION_MS)
    return () => clearTimeout(id)
  }, [])

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <ul className="flex items-center gap-2 rounded-2xl border border-shell-700/70 bg-shell-900/85 px-2.5 py-2 shadow-2xl shadow-black/40 backdrop-blur-md sm:gap-3 sm:px-3">
        {navItems.map(({ id, label, icon, iconBg }) => (
          <DockButton
            key={id}
            label={label}
            icon={icon}
            iconBg={iconBg}
            active={active === id}
            onClick={() => scrollToSection(id)}
            showHint={showHints}
          />
        ))}

        <li aria-hidden="true" className="h-6 w-px bg-shell-700/70" />

        <DockButton
          label="Music"
          icon={Music}
          iconBg="from-[#1ed760] to-[#14833b]"
          active={isOpen}
          onClick={openPlayer}
          showHint={showHints}
        />
      </ul>
    </nav>
  )
}
