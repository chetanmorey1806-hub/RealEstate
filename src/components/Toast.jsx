import { useCallback, useMemo, useRef, useState } from 'react'
import { FiAlertCircle, FiCheck, FiHeart, FiInfo, FiX } from 'react-icons/fi'
import { ToastContext } from './toast-context'

const ICONS = {
  success: FiCheck,
  info: FiInfo,
  error: FiAlertCircle,
  like: FiHeart,
}

/**
 * Lightweight toast queue. Messages are announced through an aria-live region
 * so screen-reader users get the same confirmation sighted users do.
 */
export function ToastProvider({ children }) {
  const [items, setItems] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setItems((list) => list.filter((t) => t.id !== id))
    const t = timers.current.get(id)
    if (t) {
      clearTimeout(t)
      timers.current.delete(id)
    }
  }, [])

  const toast = useCallback(
    (message, { type = 'success', duration = 3200 } = {}) => {
      const id = `${Date.now()}-${Math.round(performance.now())}`
      setItems((list) => [...list.slice(-2), { id, message, type }])
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration),
      )
      return id
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-host" role="region" aria-label="Notifications">
        <div aria-live="polite" aria-atomic="false">
          {items.map((t) => {
            const Icon = ICONS[t.type] || FiInfo
            return (
              <div key={t.id} className={`toast toast-${t.type}`}>
                <Icon size={16} />
                <span>{t.message}</span>
                <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss">
                  <FiX size={14} />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </ToastContext.Provider>
  )
}
