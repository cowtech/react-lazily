import { useCallback, useEffect } from 'react'
import { createMemoizedComponent } from '../utils/dom-utils'

function triggerShortcuts(shortcuts: { [key: string]: () => void }, ev: KeyboardEvent): void {
  // First of all, if within a input, ignore unless is Esc or Enter
  if (
    ev.key !== 'Escape' &&
    ev.key !== 'Enter' &&
    ['input', 'select'].includes((ev.target as HTMLElement).tagName.toLowerCase())
  ) {
    return
  }

  const handler = shortcuts[ev.key]

  if (handler) {
    ev.preventDefault()
    handler()
  }
}

export interface ShortcutsProps {
  shortcuts: {
    [key: string]: () => void
  }
}

export const Shortcuts = createMemoizedComponent('Shortcuts', function ({ shortcuts }: ShortcutsProps): null {
  const handleShortcuts = useCallback(
    (ev: KeyboardEvent) => {
      triggerShortcuts(shortcuts, ev)
    },
    [shortcuts]
  )

  useEffect(() => {
    document.addEventListener('keyup', handleShortcuts, false)

    return () => {
      document.removeEventListener('keyup', handleShortcuts, false)
    }
  })

  return null
})
