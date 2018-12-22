import { percent, rem } from 'csx'
import * as React from 'react'
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

export function checkVersion(currentVersion: string, element?: HTMLDivElement): Promise<boolean> {
  return fetch('/manifest.json', {
    cache: 'no-store',
    headers: [['Cache-Control', 'no-cache']]
  })
    .then(response => response.json())
    .then((manifest: { version: string }) => {
      const newVersionAvailable = currentVersion !== manifest.version

      if (element) {
        if (newVersionAvailable) element.removeAttribute('data-hidden')
        else element.remove()
      }

      return currentVersion !== manifest.version
    })
    .catch(() => false) // No error checking required. Just assume there is no version
}

export function updateVersion(ev: React.MouseEvent<HTMLElement>): void {
  ev.preventDefault()
  location.reload(true) // tslint:disable-line deprecation
}

export const newVersionCheckerClassName = style(debugClassName('new-version-checker'), {
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

export class NewVersionChecker extends React.Component<NewVersionCheckerProps, NewVersionCheckerState> {
  state = { newVersionAvailable: false }

  render(): JSX.Element | null {
    // The check on window is for SSR
    if (typeof window !== 'undefined' && !this.state.newVersionAvailable) return null // tslint:disable-line strict-type-predicates

    const message = this.props.message || 'There is a shiny new version.'
    const action = this.props.action || 'Update now!'

    return (
      <div
        id="newVersionChecker"
        className={newVersionCheckerClassName}
        data-current-version={this.props.currentVersion}
        data-hidden={typeof window === 'undefined' || !this.state.newVersionAvailable} // tslint:disable-line strict-type-predicates
      >
        <span>{message}&nbsp;</span>
        <a href="#" onClick={this.handleClick.bind(this)}>
          {action}
        </a>
      </div>
    )
  }

  async componentDidMount(): Promise<void> {
    const newVersionAvailable = await checkVersion(this.props.currentVersion)
    this.setState(() => ({ newVersionAvailable }))
  }

  async handleClick(ev: React.MouseEvent<HTMLElement>): Promise<void> {
    ev.preventDefault()
    location.reload(true) // tslint:disable-line deprecation
  }
}

export const NewVersionCheckerSSR = `
  document.addEventListener('DOMContentLoaded', function(){
    ${checkVersion}
    ${updateVersion}

    const element = document.getElementById('newVersionChecker');
    element.querySelector('a').addEventListener('click', updateVersion, false);

    checkVersion(element.getAttribute('data-current-version'), element);
  });
`
