import { FileText, GraduationCap, School, MapPin } from "lucide-react";
import { WindowFrame } from "../shell/WindowFrame";
import { site } from "../../data/site";
import me from "../../../public/screenshots/me-photo.png";

const skills = ["HTML", "CSS", "JS", "React", "Node.js", "Tailwind", "MongoDB"];

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-14 px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <WindowFrame
          id="about-window"
          title="about-me.md"
          eyebrow="Profile"
          icon={<FileText className="h-4 w-4" />}
        >
          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[220px_1fr] md:gap-10">
            <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-aubergine-600 to-aubergine-900 text-4xl font-semibold text-porcelain-50 shadow-inner">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-aubergine-600 to-aubergine-900 shadow-lg ring-2 ring-porcelain-200/50">
                  <img
                    src={me}
                    alt=""
                    className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-shell-900 mt-[20px]">
                  {site.name}
                </h3>
                <p className="text-sm text-shell-500">{site.role}</p>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-shell-500">
                <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                {site.city}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-shell-900">
                  <School
                    className="h-4 w-4 text-ubuntu-orange"
                    strokeWidth={2}
                  />
                  Teaching
                </div>
                <p className="text-[15px] leading-relaxed text-shell-600">
                  I work as a support teacher at an IT education center, helping
                  students build their first real programming skills — debugging
                  their first errors, explaining the concepts that don't click
                  from a textbook, and generally being the person in the room
                  who's already made the mistake they're about to make. It's
                  also where I first noticed how much of teaching is just
                  building the right small tool at the right moment — which is a
                  lot of why I started building software of my own.
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-shell-900">
                  <GraduationCap
                    className="h-4 w-4 text-ubuntu-orange"
                    strokeWidth={2}
                  />
                  Why UWC
                </div>
                <p className="text-[15px] leading-relaxed text-shell-600">
                  I'm applying to United World Colleges because I want to be in
                  a classroom that looks like the world I'm actually trying to
                  build software for — and because the projects below are, so
                  far, self-taught and self-directed. I want the kind of
                  environment, and the kind of peers, that push that further
                  than I can on my own.
                </p>
              </div>

              <div>
                <div className="mb-2 text-sm font-semibold text-shell-900">
                  Skills &amp; tools
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-porcelain-200 bg-porcelain-100 px-2.5 py-1 text-xs font-medium text-shell-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </WindowFrame>
      </div>
    </section>
  );
}
