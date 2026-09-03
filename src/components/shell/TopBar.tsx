import { Volume2, Wifi, BatteryFull } from 'lucide-react'
import { useClock } from '../../hooks/useClock'

export function TopBar() {
  const clock = useClock()

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-9 border-b border-shell-800/70 bg-shell-900/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-3 text-[13px] text-porcelain-100/90 sm:px-6">
        <div className="flex items-center gap-2 font-medium">
          <span className="h-2.5 w-2.5 rounded-full bg-ubuntu-orange" aria-hidden="true" />
          <span className="hidden tracking-tight sm:inline">portfolio.desktop</span>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 tabular-nums text-porcelain-100/90">
          {clock}
        </div>

        <div className="flex items-center gap-3 text-porcelain-100/70">
          <Wifi className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden="true" />
          <Volume2 className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden="true" />
          <span className="flex items-center gap-1">
            <BatteryFull className="h-[15px] w-[15px]" strokeWidth={2} aria-hidden="true" />
            <span className="hidden text-xs sm:inline">100%</span>
          </span>
        </div>
      </div>
    </header>
  )
}
