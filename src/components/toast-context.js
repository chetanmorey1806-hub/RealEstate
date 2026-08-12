import { createContext, useContext } from 'react'

export const ToastContext = createContext(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  // A no-op keeps components usable (and testable) outside the provider.
  return ctx ?? { toast: () => {}, dismiss: () => {} }
}
