import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { onServer } from '../environment.js'
import { cleanCSSClasses } from '../utils/string.js'
import { CSSClassesResolverContext, type CSSClassesResolverContextType } from './classes-resolver.jsx'

export interface BrowseHappyProps {
  message?: string
  className?: string
  skipDefaultClassName?: boolean
}

const browseHappyStyle = cleanCSSClasses(`
  fixed hidden text-center w-full bottom-0 left-0 z-100 bg-red-700 text-white 
  pt-1rem
  pb-[calc(1rem_+_env(safe-area-inset-bottom))]
  pl-[calc(1rem_+_env(safe-area-inset-left))]
  pr-[calc(1rem_+_env(safe-area-inset-right))]
`)

const browseHappyLinkStyle = cleanCSSClasses('font-bold text-amber-500 hover:text-amber-200')

export function BrowseHappy({ message, className, skipDefaultClassName }: BrowseHappyProps): JSX.Element | null {
  const [resolveClasses] = useContext<CSSClassesResolverContextType>(CSSClassesResolverContext)

  message = message ?? 'Your browser is obsolete. For the best browsing experience, update it for free by visiting'

  const contents = (
    <div id="rl-browse-happy" className={resolveClasses(!skipDefaultClassName && browseHappyStyle, className)}>
      <span>{message}&nbsp;</span>
      <a
        href="https://browsehappy.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={resolveClasses(!skipDefaultClassName && browseHappyLinkStyle)}
      >
        BrowseHappy
      </a>
      .
    </div>
  )

  return onServer ? contents : createPortal(contents, document.querySelector('#rl-modal-root')!)
}

export const BrowseHappyScript: string = `
  document.addEventListener('DOMContentLoaded', function() {
    const element = document.querySelector('#rl-browse-happy');

    try {
      if (
        [...new Map([[1, 2]]).entries()].join(',') === '1,2' &&
        CSS.supports('display', 'grid') &&
        CSS.supports('display', 'flex') &&
        CSS.supports('color', 'var(--var)')
      ) {
        element.remove();
      } else {
        element.style.display = 'block';
      }
    } catch {
      // Some of these are not supported. Assume legacy browser.
      element.style.display = 'block';
    }
  });
`
