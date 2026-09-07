import { site } from '../data/site'

export function Footer() {
  return (
    <footer className="px-4 pb-28 pt-4 text-center text-xs text-porcelain-200/40 sm:px-6">
      <p>
        Built with React, Tailwind CSS &amp; Framer Motion · {site.name} ·{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  )
}
