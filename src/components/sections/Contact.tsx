import { useState } from 'react'
import { Briefcase, Check, Copy, Link2, Mail, Send } from 'lucide-react'
import { WindowFrame } from '../shell/WindowFrame'
import { site } from '../../data/site'

export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API unavailable — the email is still visible to copy manually.
    }
  }

  return (
    <section id="contact" className="scroll-mt-14 px-4 py-16 sm:px-6 md:py-24 md:pl-24">
      <div className="mx-auto max-w-3xl">
        <WindowFrame
          id="contact-window"
          title="Mail — New Message"
          eyebrow="Compose"
          icon={<Mail className="h-4 w-4" />}
        >
          <div className="divide-y divide-porcelain-200 text-sm">
            <div className="flex items-center gap-3 px-6 py-2.5 text-shell-500">
              <span className="w-14 shrink-0 font-medium text-shell-400">To</span>
              <span className="truncate text-shell-700">{site.email}</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-2.5 text-shell-500">
              <span className="w-14 shrink-0 font-medium text-shell-400">Subject</span>
              <span className="truncate text-shell-700">Your work, and your UWC application</span>
            </div>
          </div>

          <div className="px-6 py-6 sm:px-8">
            <p className="max-w-xl text-[15px] leading-relaxed text-shell-600">
              I'm happy to talk about any of the projects above, my teaching work, or the UWC
              application itself — reach out and I'll get back to you.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-ubuntu-orange px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-ubuntu-orange/20 transition-colors hover:bg-ubuntu-orange-dark"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
                Email me
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-lg border border-porcelain-200 bg-porcelain-50 px-4 py-2.5 text-sm font-medium text-shell-600 transition-colors hover:bg-porcelain-100"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-ubuntu-orange" strokeWidth={2} />
                ) : (
                  <Copy className="h-4 w-4" strokeWidth={2} />
                )}
                {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-porcelain-200 pt-6">
              <SocialLink href={site.github} label="GitHub" icon={Link2} />
              <SocialLink href={site.linkedin} label="LinkedIn" icon={Briefcase} />
            </div>
            <p className="mt-2 text-xs text-shell-400">
              Social links are placeholders — update them in src/data/site.ts.
            </p>
          </div>
        </WindowFrame>
      </div>
    </section>
  )
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string
  label: string
  icon: typeof Link2
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-porcelain-200 bg-porcelain-50 px-4 py-2 text-sm font-medium text-shell-600 transition-colors hover:bg-ubuntu-orange hover:text-white"
    >
      <Icon className="h-4 w-4" strokeWidth={2} />
      {label}
    </a>
  )
}
