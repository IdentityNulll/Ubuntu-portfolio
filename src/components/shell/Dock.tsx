import { motion } from 'framer-motion'
import { navItems, type NavId } from '../../data/nav'
import { useActiveSection } from '../../hooks/useActiveSection'

const ids = navItems.map((item) => item.id)

function scrollToSection(id: NavId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Dock() {
  const active = useActiveSection(ids)

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] md:inset-x-auto md:inset-y-0 md:left-0 md:items-center md:pb-0 md:pl-3"
    >
      <ul className="flex items-center gap-2 rounded-2xl border border-shell-700/70 bg-shell-900/85 px-2.5 py-2 shadow-2xl shadow-black/40 backdrop-blur-md md:flex-col md:gap-3 md:rounded-2xl md:px-2 md:py-3">
        {navItems.map(({ id, label, icon: Icon, iconBg }) => {
          const isActive = active === id
          return (
            <li key={id} className="relative flex items-center">
              <span
                className={`absolute -left-2 hidden h-5 w-1 rounded-r-full bg-porcelain-50 transition-opacity md:block ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />
              <span
                className={`absolute -top-2 left-1/2 h-1 w-5 -translate-x-1/2 rounded-b-full bg-porcelain-50 transition-opacity md:hidden ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />
              <motion.button
                type="button"
                onClick={() => scrollToSection(id)}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`group relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-inner sm:h-12 sm:w-12 ${iconBg}`}
                aria-current={isActive ? 'true' : undefined}
                aria-label={label}
              >
                <Icon className="h-5 w-5 text-white drop-shadow sm:h-6 sm:w-6" strokeWidth={2} />
                <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md bg-shell-800 px-2.5 py-1 text-xs font-medium text-porcelain-50 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 md:block">
                  {label}
                </span>
              </motion.button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
