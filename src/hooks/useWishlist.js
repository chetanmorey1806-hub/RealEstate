import { useCallback, useMemo } from 'react'
import useLocalStore from './useLocalStore'

const KEY = 'estatica-wishlist'

/**
 * Shortlisted property ids, persisted and shared across the whole app.
 * The returned object is memoised — every PropertyCard calls this hook, and an
 * unstable identity would invalidate the callers' `useMemo`s on every render.
 */
export default function useWishlist() {
  const [ids, setIds] = useLocalStore(KEY, [])

  const toggle = useCallback(
    (id) => {
      let added = false
      setIds((list) => {
        added = !list.includes(id)
        return added ? [...list, id] : list.filter((x) => x !== id)
      })
      return added
    },
    [setIds],
  )

  const clear = useCallback(() => setIds([]), [setIds])

  return useMemo(
    () => ({
      ids,
      toggle,
      clear,
      has: (id) => ids.includes(id),
      count: ids.length,
    }),
    [ids, toggle, clear],
  )
}
