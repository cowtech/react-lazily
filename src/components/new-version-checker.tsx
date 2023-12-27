import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { onServer } from '../environment.js'
import { cleanCSSClasses } from '../utils/string.js'
import { CSSClassesResolverContext } from './classes-resolver.js'

const newVersionCheckerStyle = cleanCSSClasses(`
  fixed hidden text-center w-full bottom-0 left-0 z-100 bg-green-900 text-white 
  pt-1rem
  pb-[calc(1rem_+_env(safe-area-inset-bottom))]
  pl-[calc(1rem_+_env(safe-area-inset-left))]
  pr-[calc(1rem_+_env(safe-area-inset-right))]
`)

const newVersionCheckerLinkStyle = cleanCSSClasses('font-bold text-amber-500 hover:text-amber-200')

export interface NewVersionCheckerProps {
  message?: string
  className?: string
  skipDefaultClassName?: boolean
  action?: string
}

export function NewVersionChecker({
  message,
  className,
  skipDefaultClassName,
  action
}: NewVersionCheckerProps): JSX.Element | null {
  const resolveClasses = useContext(CSSClassesResolverContext)

  message = message ?? 'There is a shiny new version.'
  action = action ?? 'Update now!'

  const contents = (
    <div
      id="rl-new-version-checker"
      className={resolveClasses(!skipDefaultClassName && newVersionCheckerStyle, className)}
    >
      <span>{message}&nbsp;</span>
      <a href="#" className={resolveClasses(!skipDefaultClassName && newVersionCheckerLinkStyle)}>
        {action}
      </a>
    </div>
  )

  return onServer ? contents : createPortal(contents, document.querySelector('#rl-modal-root')!)
}

export function NewVersionCheckerScript(currentVersion: string): string {
  return `
  document.addEventListener('DOMContentLoaded', function(){
    const element = document.querySelector('#rl-new-version-checker');

    if (!navigator.serviceWorker) {
      element.remove();
      return;
    }


    element.querySelector('a').addEventListener(
      'click', 
      event => {
        event.preventDefault();
        location.reload();
      }, 
      false
    );
    
    navigator.serviceWorker.addEventListener('message', event => {
      const { type, payload } = event.data;
  
      if (type === 'new-version-available' && payload.version !== '${currentVersion}') {
        element.style.display = 'block';
      }
    });
  });
`
}
