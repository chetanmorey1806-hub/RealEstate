import { useCallback } from 'react'
import useLocalStore from './useLocalStore'
import { filtersToParams } from '../utils/search'

const KEY = 'estatica-saved-searches'

/** Named filter sets the user can re-run later, persisted locally. */
export default function useSavedSearches() {
  const [items, setItems] = useLocalStore(KEY, [])

  const save = useCallback(
    (name, filters, sort) => {
      const query = filtersToParams(filters, sort).toString()
      const entry = {
        id: `${Date.now()}-${query.length}`,
        name: name.trim() || 'Untitled search',
        query,
        savedOn: new Date().toISOString(),
      }
      // Re-saving the same query replaces the old entry rather than piling up.
      setItems((list) => [entry, ...list.filter((s) => s.query !== query)].slice(0, 12))
      return entry
    },
    [setItems],
  )

  const remove = useCallback(
    (id) => setItems((list) => list.filter((s) => s.id !== id)),
    [setItems],
  )

  return { items, save, remove, clear: () => setItems([]) }
}
