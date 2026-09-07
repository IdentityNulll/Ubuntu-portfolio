import type { LyricLine } from '../lib/lrc'

export interface Track {
  id: string
  title: string
  artist: string
  albumArt: string | null
  audioSrc: string | null
  lyrics: LyricLine[] | null
}

// ── Edit me ───────────────────────────────────────────────────────────────
// `lyrics` is left null on all three — song lyrics are copyrighted, so
// pasting the real thing into this file (and publishing it on the site)
// isn't something to do here, even for personal use. If you want synced
// lyrics for a track, use a source you have the rights to (a purchased
// .lrc file, one you time yourself, etc.), then either build a
// LyricLine[] by hand ({ time: seconds, text }) or paste raw .lrc text
// through parseLRC() from src/lib/lrc.ts. albumArt works the same way —
// a path under public/, or leave it null for the generic placeholder cover.
export const tracks: Track[] = [
  {
    id: 'reflections',
    title: 'Reflections',
    artist: 'The Neighbourhood',
    albumArt: null,
    audioSrc: '/music/reflections-the-neighbourhood.flac',
    lyrics: null,
  },
  {
    id: '505',
    title: '505',
    artist: 'Arctic Monkeys',
    albumArt: null,
    audioSrc: '/music/505-arctic-monkeys.flac',
    lyrics: null,
  },
  {
    id: 'welcome-and-goodbye',
    title: 'welcome and goodbye',
    artist: 'Dream, Ivory',
    albumArt: null,
    audioSrc: '/music/welcome-and-goodbye-dream-ivory.mp3',
    lyrics: null,
  },
]
