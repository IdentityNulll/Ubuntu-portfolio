export interface LyricLine {
  time: number
  text: string
}

const LRC_TAG = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g

// Parses standard .lrc timed-lyric text ("[mm:ss.xx]line") into a sorted
// array. A line can carry more than one timestamp tag.
export function parseLRC(raw: string): LyricLine[] {
  const lines: LyricLine[] = []

  for (const rawLine of raw.split(/\r?\n/)) {
    const tags = [...rawLine.matchAll(LRC_TAG)]
    if (tags.length === 0) continue

    const text = rawLine.replace(LRC_TAG, '').trim()
    if (!text) continue

    for (const tag of tags) {
      const minutes = Number(tag[1])
      const seconds = Number(tag[2])
      const fraction = tag[3] ? Number(tag[3].padEnd(3, '0')) / 1000 : 0
      lines.push({ time: minutes * 60 + seconds + fraction, text })
    }
  }

  return lines.sort((a, b) => a.time - b.time)
}
