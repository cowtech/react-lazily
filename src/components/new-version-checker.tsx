import { percent, rem } from 'csx'
import React from 'react'
import { style } from 'typestyle'
import { colorAmber200, colorAmber500, colorGreen900, colorWhite } from '../styling/colors'
import { debugClassName } from '../styling/mixins'

export interface NewVersionCheckerProps {
  currentVersion: string
  message?: string
  action?: string
}

export interface NewVersionCheckerState {
  newVersionAvailable: boolean
}

export function listenForUpdates(currentVersion: string, callback: (newVersion: string) => void): void {
  navigator.serviceWorker.addEventListener('message', (event: ServiceWorkerMessageEvent) => {
    const { type, payload } = event.data
    if (type === 'new-version-available' && payload.version !== currentVersion) {
      callback(payload.version)
    }
  })
}

export function updateVersion(ev: React.MouseEvent): void {
  ev.preventDefault()
  location.reload(true) // tslint:disable-line deprecation
}

export const newVersionCheckerClassName: string = style(debugClassName('new-version-checker'), {
  width: percent(100),
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: colorGreen900,
  color: colorWhite,
  padding: rem(1),
  paddingTop: `max(${rem(1)}, env(safe-area-inset-top))`,
  paddingLeft: `max(${rem(1)}, env(safe-area-inset-left))`,
  paddingRight: `max(${rem(1)}, env(safe-area-inset-right))`,
  textAlign: 'center',
  $nest: {
    '&[data-hidden=true]': { display: 'none' },
    '& a': {
      color: colorAmber500,
      fontWeight: 'bold',
      $nest: {
        '&:hover, &:focus, &:active': { color: colorAmber200 }
      }
    }
  }
})

export const NewVersionChecker: React.NamedExoticComponent<NewVersionCheckerProps> = React.memo(function({
  currentVersion,
  message,
  action
}: NewVersionCheckerProps): JSX.Element | null {
  const [newVersionAvailable, setNewVersionAvailable] = React.useState(false)

  React.useEffect(() => {
    listenForUpdates(currentVersion, () => setNewVersionAvailable(true))
  }, [])

  // The check on window is for SSR
  // tslint:disable-next-line strict-type-predicates
  if (typeof window !== 'undefined' && !newVersionAvailable) {
    return null
  }

  message = message || 'There is a shiny new version.'
  action = action || 'Update now!'

  return (
    <div
      id="newVersionChecker"
      className={newVersionCheckerClassName}
      data-current-version={currentVersion}
      data-hidden={typeof window === 'undefined' || !newVersionAvailable} // tslint:disable-line strict-type-predicates
    >
      <span>{message}&nbsp;</span>
      <a href="#" onClick={updateVersion}>
        {action}
      </a>
    </div>
  )
})

NewVersionChecker.displayName = 'NewVersionChecker'

export const NewVersionCheckerSSR: string = `
  document.addEventListener('DOMContentLoaded', function(){
    ${listenForUpdates}
    ${updateVersion}

    const element = document.getElementById('newVersionChecker')

    element.querySelector('a').addEventListener('click', updateVersion, false)
    listenForUpdates(element.getAttribute('data-current-version'), () => element.removeAttribute('data-hidden'))
  });
`
