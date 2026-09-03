import { BookOpen, Flame, PenLine, Store } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Project {
  id: string
  folder: string
  name: string
  tagline: string
  description: string
  tags: string[]
  icon: LucideIcon
  iconBg: string
  demoUrl: string | null
  demoLabel?: string
  repoUrl: string | null
  screenshot?: string
  badge?: string
}

export const projects: Project[] = [
  {
    id: 'ielts-grader',
    folder: 'ielts-grader/',
    name: 'IELTS Essay Grader',
    tagline: 'AI-based IELTS writing assessment',
    description:
      "An AI-based tool that grades IELTS writing tasks — scoring essays against the same band-descriptor criteria examiners use (task achievement, coherence & cohesion, lexical resource, grammatical range) and returning specific, actionable feedback instead of just a number.",
    tags: ['AI / NLP', 'Python', 'Education'],
    icon: PenLine,
    iconBg: 'from-ubuntu-orange to-ubuntu-orange-dark',
    demoUrl: 'https://t.me/SmartIeltsEssayBot',
    demoLabel: 'Try the bot',
    repoUrl: null,
    screenshot: '/screenshots/ielts-bot-screenshot.png',
  },
  {
    id: 'ascension',
    folder: 'ascension/',
    name: 'Ascension',
    tagline: 'Personal analytics & life-tracking app',
    description:
      "A full-stack personal analytics tool I built — and use every day — to track quests and XP, habit metrics, my morning routine, and a running journal. Treats staying consistent like a game with a save file. An Android companion app is currently in progress.",
    tags: ['React', 'Node.js', 'PostgreSQL', 'Android — in progress'],
    icon: Flame,
    iconBg: 'from-aubergine-600 to-aubergine-900',
    demoUrl: 'https://ascension-mini.netlify.app/quests',
    repoUrl: null,
    screenshot: '/screenshots/ascension-screenshot.png',
    badge: 'In active development',
  },
  {
    id: 'credit-tracker',
    folder: 'credit-tracker/',
    name: 'Local Shop Credit Tracker',
    tagline: 'Debt-ledger tool for small local shops',
    description:
      "Many small shops here still track customer credit — who bought on credit, and who still owes — in a paper notebook. This tool replaces the notebook: log a sale on credit, record partial payments, and see who's overdue at a glance.",
    tags: ['Full-stack', 'Small business', 'Local impact'],
    icon: Store,
    iconBg: 'from-shell-500 to-shell-800',
    demoUrl: 'https://credit-final.netlify.app/',
    repoUrl: null,
    screenshot: '/screenshots/credit-tracker.png'
  },
  {
    id: 'milliy-sertifikat',
    folder: 'tilup/',
    name: 'TilUp',
    tagline: 'Online course platform — built for client Milliy Sertifikat',
    description:
      "An online course platform, TilUp, built for a client, Milliy Sertifikat — course catalog, student enrollment, and content delivery. My first project taken from a client brief all the way to a live, maintained product, including the back-and-forth of real client requirements.",
    tags: ['Client project', 'Full-stack', 'Ed-tech'],
    icon: BookOpen,
    iconBg: 'from-ubuntu-orange-light via-ubuntu-orange to-aubergine-700',
    demoUrl: 'https://tilupacademy.uz/',
    repoUrl: null,
    screenshot: '/screenshots/tilup-screenshot.png',
    badge: 'Client work',
  },
]
