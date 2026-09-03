import { motion } from 'framer-motion'
import { Code2, ExternalLink, ImageOff } from 'lucide-react'
import type { Project } from '../../data/projects'

function LinkSlot({
  href,
  icon: Icon,
  label,
  placeholderLabel,
}: {
  href: string | null
  icon: typeof ExternalLink
  label: string
  placeholderLabel: string
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md bg-ubuntu-orange px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-ubuntu-orange-dark"
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        {label}
      </a>
    )
  }

  return (
    <span
      className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-md border border-dashed border-shell-400/50 px-3 py-1.5 text-xs font-medium text-shell-400"
      title="Placeholder — add your link in src/data/projects.ts"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      {placeholderLabel}
    </span>
  )
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-porcelain-200 bg-white shadow-sm transition-shadow hover:shadow-lg hover:shadow-black/5"
    >
      <div
        className="relative flex h-36 items-center justify-center overflow-hidden bg-porcelain-100 sm:h-40"
        style={
          project.screenshot
            ? undefined
            : {
                backgroundImage:
                  'repeating-linear-gradient(135deg, rgba(0,0,0,0.035) 0 2px, transparent 2px 14px)',
              }
        }
      >
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`${project.name} screenshot`}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-md transition-transform duration-300 group-hover:scale-110 ${project.iconBg}`}
            >
              <Icon className="h-7 w-7 text-white" strokeWidth={2} />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-shell-900/70 px-3 py-1.5 backdrop-blur-sm">
              <ImageOff className="h-3 w-3 text-porcelain-200/70" strokeWidth={2} />
              <span className="text-[10px] font-medium uppercase tracking-wide text-porcelain-200/70">
                Screenshot placeholder — swap in a real one
              </span>
            </div>
          </>
        )}
        {project.badge && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-shell-900/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-porcelain-50 backdrop-blur-sm">
            {project.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-shell-400">
          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
          {project.folder}
        </div>

        <div>
          <h3 className="text-lg font-medium text-shell-900">{project.name}</h3>
          <p className="text-sm text-shell-500">{project.tagline}</p>
        </div>

        <p className="text-sm leading-relaxed text-shell-600">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-porcelain-100 px-2 py-0.5 text-[11px] font-medium text-shell-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <LinkSlot
            href={project.demoUrl}
            icon={ExternalLink}
            label={project.demoLabel ?? 'Live demo'}
            placeholderLabel="Add demo link"
          />
          <LinkSlot
            href={project.repoUrl}
            icon={Code2}
            label="Source"
            placeholderLabel="Add repo link"
          />
        </div>
      </div>
    </motion.article>
  )
}
