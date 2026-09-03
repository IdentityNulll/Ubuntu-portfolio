import { motion } from 'framer-motion'
import { ArrowDown, Mail, Sparkles } from 'lucide-react'
import { TerminalCard } from '../shell/TerminalCard'
import { site } from '../../data/site'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[100svh] scroll-mt-9 flex-col justify-center px-4 pb-28 pt-16 sm:px-6 md:pb-16 md:pl-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ubuntu-orange/30 bg-ubuntu-orange/10 px-3 py-1 text-xs font-medium text-ubuntu-orange-light">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            UWC Application · 2026
          </span>

          <h1 className="mt-5 text-4xl font-medium tracking-tight text-porcelain-50 sm:text-5xl lg:text-6xl">
            Hi, I'm <span className="text-ubuntu-orange-light">{site.name}</span>.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-porcelain-200/80 sm:text-lg">
            I teach at an IT education center by day, and spend my evenings building small,
            useful software — an AI essay grader, a life-tracking app I use daily, tools for
            local shopkeepers. I'm applying to UWC to keep learning how to build things, and
            communities, that matter.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo('projects')}
              className="rounded-lg bg-ubuntu-orange px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-ubuntu-orange/20 transition-colors hover:bg-ubuntu-orange-dark active:bg-ubuntu-orange-dark"
            >
              View my work
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 rounded-lg border border-shell-600/80 bg-shell-800/60 px-5 py-2.5 text-sm font-medium text-porcelain-100 transition-colors hover:bg-shell-700/70"
            >
              <Mail className="h-4 w-4" strokeWidth={2} />
              Get in touch
            </button>
          </div>

          <button
            onClick={() => scrollTo('about')}
            className="mt-10 hidden items-center gap-2 text-xs font-medium text-porcelain-200/50 transition-colors hover:text-porcelain-200/80 md:inline-flex"
          >
            Scroll to explore
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" strokeWidth={2} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <TerminalCard />
        </motion.div>
      </div>
    </section>
  )
}
