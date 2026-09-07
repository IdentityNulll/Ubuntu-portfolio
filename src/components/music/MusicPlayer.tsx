import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { usePlayer } from '../../context/PlayerContext'
import { WindowControls } from '../shell/WindowFrame'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function activeLyricIndex(lyrics: { time: number; text: string }[], t: number) {
  let idx = -1
  for (let i = 0; i < lyrics.length; i++) {
    if (lyrics[i].time <= t) idx = i
    else break
  }
  return idx
}

export function MusicPlayer() {
  const {
    tracks,
    currentIndex,
    currentTrack,
    isPlaying,
    isOpen,
    currentTime,
    duration,
    toggle,
    next,
    prev,
    selectTrack,
    seek,
    closePlayer,
  } = usePlayer()

  const lyricsRef = useRef<HTMLDivElement>(null)
  const activeIndex = useMemo(
    () => (currentTrack.lyrics ? activeLyricIndex(currentTrack.lyrics, currentTime) : -1),
    [currentTrack.lyrics, currentTime],
  )

  useEffect(() => {
    if (activeIndex < 0) return
    const line = lyricsRef.current?.children[activeIndex]
    line?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [activeIndex])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePlayer()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closePlayer])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closePlayer}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-shell-700/80 shadow-2xl shadow-black/60"
          >
            <div className="flex items-center justify-between gap-3 bg-gradient-to-b from-shell-800 to-shell-900 px-4 py-2.5">
              <div className="flex min-w-0 items-center gap-2 text-porcelain-100/90">
                <Music className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="truncate text-[13px] font-medium tracking-tight">
                  Spotify — Now Playing
                </span>
              </div>
              <WindowControls onClose={closePlayer} />
            </div>

            <div className="bg-[#121212] p-5 text-white sm:p-6">
              <p className="mb-4 text-[11px] text-white/40">
                Placeholder tracks — real audio drops into src/data/tracks.ts.
              </p>

              <div className="flex items-center gap-4">
                {currentTrack.albumArt ? (
                  <img
                    src={currentTrack.albumArt}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-lg object-cover shadow-lg sm:h-24 sm:w-24"
                  />
                ) : (
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1ed760] to-[#14833b] shadow-lg sm:h-24 sm:w-24">
                    <Music className="h-8 w-8 text-black/70" strokeWidth={2} />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold">{currentTrack.title}</p>
                  <p className="truncate text-sm text-white/60">{currentTrack.artist}</p>
                  <p className="mt-1 text-xs text-white/35">
                    Track {currentIndex + 1} of {tracks.length}
                  </p>
                </div>
              </div>

              {currentTrack.audioSrc ? (
                <>
                  <div className="mt-5">
                    <input
                      type="range"
                      min={0}
                      max={duration || 0}
                      value={Math.min(currentTime, duration || 0)}
                      onChange={(e) => seek(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#1ed760]"
                    />
                    <div className="mt-1 flex justify-between text-[11px] text-white/40">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-6">
                    <button
                      onClick={prev}
                      aria-label="Previous track"
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      <SkipBack className="h-6 w-6" strokeWidth={2} fill="currentColor" />
                    </button>
                    <button
                      onClick={toggle}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1ed760] text-black transition-transform hover:scale-105 active:scale-95"
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" strokeWidth={2} fill="currentColor" />
                      ) : (
                        <Play className="ml-0.5 h-5 w-5" strokeWidth={2} fill="currentColor" />
                      )}
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next track"
                      className="text-white/70 transition-colors hover:text-white"
                    >
                      <SkipForward className="h-6 w-6" strokeWidth={2} fill="currentColor" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-5 flex items-center justify-center gap-6 rounded-lg border border-dashed border-white/15 py-3">
                  <SkipBack className="h-5 w-5 text-white/25" strokeWidth={2} />
                  <span className="text-xs font-medium text-white/40">No audio yet for this track</span>
                  <SkipForward className="h-5 w-5 text-white/25" strokeWidth={2} />
                </div>
              )}

              <div className="mt-6 border-t border-white/10 pt-4">
                {currentTrack.lyrics ? (
                  <div
                    ref={lyricsRef}
                    className="h-40 space-y-2 overflow-y-auto text-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {currentTrack.lyrics.map((line, i) => (
                      <p
                        key={i}
                        className={
                          i === activeIndex
                            ? 'text-base font-semibold text-[#1ed760] transition-colors'
                            : 'text-sm text-white/35 transition-colors'
                        }
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="py-6 text-center text-xs text-white/30">
                    No synced lyrics yet for this track.
                  </p>
                )}
              </div>

              <div className="mt-5 space-y-1 border-t border-white/10 pt-4">
                {tracks.map((track, i) => (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(i)}
                    className={`flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors ${
                      i === currentIndex ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded ${
                        i === currentIndex ? 'text-[#1ed760]' : 'text-white/30'
                      }`}
                    >
                      <Music className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium text-white/85">
                        {track.title}
                      </span>
                      <span className="block truncate text-[11px] text-white/40">{track.artist}</span>
                    </span>
                    {!track.audioSrc && (
                      <span className="shrink-0 rounded-full border border-white/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wide text-white/30">
                        No audio
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
