import { useCallback, useEffect, useRef, useState } from 'react'

const supported = typeof navigator !== 'undefined' && 'wakeLock' in navigator

export function useWakeLock() {
  const [active, setActive] = useState(false)
  const sentinelRef = useRef<WakeLockSentinel | null>(null)

  const request = useCallback(async () => {
    if (!supported) return
    try {
      const sentinel = await navigator.wakeLock.request('screen')
      sentinelRef.current = sentinel
      setActive(true)
      sentinel.addEventListener('release', () => setActive(false))
    } catch {
      setActive(false)
    }
  }, [])

  const release = useCallback(() => {
    sentinelRef.current?.release()
    sentinelRef.current = null
    setActive(false)
  }, [])

  const toggle = useCallback(() => {
    if (active) release()
    else request()
  }, [active, request, release])

  // Browsers auto-release the lock when the tab is backgrounded; reclaim it
  // once the visitor comes back, if it was switched on.
  useEffect(() => {
    function onVisibility() {
      if (document.visibilityState === 'visible' && active && !sentinelRef.current) {
        request()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [active, request])

  useEffect(() => {
    return () => {
      sentinelRef.current?.release()
    }
  }, [])

  return { active, supported, toggle }
}
