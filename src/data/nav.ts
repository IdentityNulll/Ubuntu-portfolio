import { Home, User, FolderKanban, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavId = 'hero' | 'about' | 'projects' | 'contact'

export interface NavItem {
  id: NavId
  label: string
  icon: LucideIcon
  iconBg: string
}

export const navItems: NavItem[] = [
  {
    id: 'hero',
    label: 'Home',
    icon: Home,
    iconBg: 'from-ubuntu-orange to-ubuntu-orange-dark',
  },
  {
    id: 'about',
    label: 'About Me',
    icon: User,
    iconBg: 'from-aubergine-600 to-aubergine-900',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
    iconBg: 'from-shell-500 to-shell-800',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    iconBg: 'from-ubuntu-orange-light via-ubuntu-orange to-aubergine-700',
  },
]
