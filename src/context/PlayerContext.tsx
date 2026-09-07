import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { tracks } from '../data/tracks'
import type { Track } from '../data/tracks'

interface PlayerContextValue {
  tracks: Track[]
  currentIndex: number
  currentTrack: Track
  isPlaying: boolean
  isOpen: boolean
  currentTime: number
  duration: number
  toggle: () => void
  play: () => void
  pause: () => void
  next: () => void
  prev: () => void
  selectTrack: (index: number) => void
  seek: (time: number) => void
  openPlayer: () => void
  closePlayer: () => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const currentTrack = tracks[currentIndex]

  useEffect(() => {
    setCurrentTime(0)
    setDuration(0)
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying && currentTrack.audioSrc) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const play = useCallback(() => {
    if (!currentTrack.audioSrc) return
    audioRef.current?.play().catch(() => setIsPlaying(false))
    setIsPlaying(true)
  }, [currentTrack.audioSrc])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  const selectTrack = useCallback(
    (index: number) => {
      const wasPlaying = isPlaying
      setCurrentIndex(((index % tracks.length) + tracks.length) % tracks.length)
      setIsPlaying(wasPlaying && Boolean(tracks[index]?.audioSrc))
    },
    [isPlaying],
  )

  const next = useCallback(() => selectTrack(currentIndex + 1), [currentIndex, selectTrack])

  const prev = useCallback(() => {
    const audio = audioRef.current
    // Spotify-style: restart the current track if we're more than a few
    // seconds in, rather than always hopping to the previous one.
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      setCurrentTime(0)
      return
    }
    selectTrack(currentIndex - 1)
  }, [currentIndex, selectTrack])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = time
    setCurrentTime(time)
  }, [])

  const value = useMemo<PlayerContextValue>(
    () => ({
      tracks,
      currentIndex,
      currentTrack,
      isPlaying,
      isOpen,
      currentTime,
      duration,
      toggle,
      play,
      pause,
      next,
      prev,
      selectTrack,
      seek,
      openPlayer: () => setIsOpen(true),
      closePlayer: () => setIsOpen(false),
    }),
    [currentIndex, currentTrack, isPlaying, isOpen, currentTime, duration, toggle, play, pause, next, prev, selectTrack, seek],
  )

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={currentTrack.audioSrc ?? undefined}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={next}
      />
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within a PlayerProvider')
  return ctx
}
