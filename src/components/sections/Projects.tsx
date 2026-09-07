import { FolderOpen } from 'lucide-react'
import { WindowFrame } from '../shell/WindowFrame'
import { ProjectCard } from './ProjectCard'
import { projects } from '../../data/projects'

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-14 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <WindowFrame
          id="projects-window"
          title="Files — ~/projects"
          eyebrow={`${projects.length} items`}
          icon={<FolderOpen className="h-4 w-4" />}
        >
          <div className="p-5 sm:p-8">
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-shell-500">
              A few things I've built outside the classroom. Demo links and screenshots are
              placeholders for now — swap them in as each project gets a public home.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {projects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </WindowFrame>
      </div>
    </section>
  )
}
