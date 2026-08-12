import { useCallback, useEffect, useState } from 'react'

/**
 * localStorage-backed state that stays in sync across every component using
 * the same key — React state alone would leave a card's heart out of date
 * when the same property is favourited elsewhere on the page.
 */
const listeners = new Map()

function notify(key, value) {
  const set = listeners.get(key)
  if (set) set.forEach((fn) => fn(value))
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export default function useLocalStore(key, fallback) {
  const [value, setValue] = useState(() => read(key, fallback))

  useEffect(() => {
    if (!listeners.has(key)) listeners.set(key, new Set())
    const set = listeners.get(key)
    set.add(setValue)

    // Another tab changing the same key should update this one too.
    const onStorage = (e) => {
      if (e.key === key) setValue(read(key, fallback))
    }
    window.addEventListener('storage', onStorage)

    return () => {
      set.delete(setValue)
      window.removeEventListener('storage', onStorage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const write = useCallback(
    (next) => {
      const resolved = typeof next === 'function' ? next(read(key, fallback)) : next
      try {
        localStorage.setItem(key, JSON.stringify(resolved))
      } catch {
        // storage full or blocked — keep the in-memory value working anyway
      }
      notify(key, resolved)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  )

  return [value, write]
}
