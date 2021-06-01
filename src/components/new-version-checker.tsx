import React, { MouseEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useFela } from 'react-fela'
import { colorAmber200, colorAmber500, colorGreen900, colorWhite } from '../styling/colors'
import { onServer, Style } from '../styling/environment'
import { createMemoizedComponent } from '../utils/dom-utils'

// #region style
export const newVersionCheckerStyles: Style = {
  display: 'none',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: colorGreen900,
  color: colorWhite,
  paddingTop: 'calc(1rem + env(safe-area-inset-top))',
  paddingBottom: '1rem',
  paddingLeft: 'calc(1rem + env(safe-area-inset-left))',
  paddingRight: 'calc(1rem + env(safe-area-inset-right))',
  textAlign: 'center'
}

export const newVersionCheckerLinkStyles: Style = {
  color: colorAmber500,
  fontWeight: 'bold',
  '&:hover, &:focus, &:active': { color: colorAmber200 }
}
// #endregion style

export function listenForUpdates(currentVersion: string, callback: (newVersion: string) => void): void {
  if (!navigator.serviceWorker) {
    return
  }

  navigator.serviceWorker.addEventListener('message', (event: Event) => {
    const { type, payload } = (event as MessageEvent).data

    if (type === 'new-version-available' && payload.version !== currentVersion) {
      callback(payload.version)
    }
  })
}

export function updateVersion(ev: MouseEvent): void {
  ev.preventDefault()
  location.reload(true)
}

export interface NewVersionCheckerProps {
  currentVersion: string
  message?: string
  additionalStyles?: Style
  action?: string
}

export interface NewVersionCheckerState {
  newVersionAvailable: boolean
}

export const NewVersionChecker = createMemoizedComponent(
  'NewVersionChecker',
  function ({ currentVersion, message, additionalStyles, action }: NewVersionCheckerProps): JSX.Element | null {
    const { css } = useFela()
    const [newVersionAvailable, setNewVersionAvailable] = useState(false)

    useEffect(() => {
      listenForUpdates(currentVersion, () => setNewVersionAvailable(true))
    }, [])

    // The check on window is for SSR
    if (typeof window !== 'undefined' && !newVersionAvailable) {
      return null
    }

    message = message ?? 'There is a shiny new version.'
    action = action ?? 'Update now!'

    const contents = (
      <div
        id="newVersionChecker"
        className={css(newVersionCheckerStyles, additionalStyles ?? {})}
        data-current-version={currentVersion}
      >
        <span>{message}&nbsp;</span>
        <a href="#" onClick={updateVersion} className={css(newVersionCheckerLinkStyles)}>
          {action}
        </a>
      </div>
    )

    return onServer ? contents : createPortal(contents, document.getElementById('rl-modal-root')!)
  }
)

export const NewVersionCheckerSSR: string = `
  document.addEventListener('DOMContentLoaded', function(){
    ${listenForUpdates};
    ${updateVersion};

    const element = document.getElementById('newVersionChecker');
    element.querySelector('a').addEventListener('click', updateVersion, false);
    
    listenForUpdates(element.getAttribute('data-current-version'), () => {
      element.classList.display = 'block';
    });
  });
`
