import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { onServer } from '../environment.js'
import { cleanCSSClasses, sanitizeClassName } from '../utils/string.js'
import { Icon } from './icons.js'

export interface TopAnchorProps {
  duration?: number
  backgroundColor?: string
  foregroundColor?: string
  className?: string
  skipDefaultClassName?: boolean
}

const topAnchorStyle = cleanCSSClasses(`
  fixed hidden items-center justify-center
  w-$rl-top-anchor-size h-$rl-top-anchor-size bottom-2rem right-2rem p-1rem z-101 
  rounded-5px opacity-0 opacity-50 transition-opacity ease-linear duration-200
`)

function updateTopAnchorStatus(element: HTMLAnchorElement): void {
  if (!element) {
    return
  }

  const top = window.pageYOffset === 0
  element.classList.toggle('hidden', top)
  element.classList.toggle('flex', !top)
}

export function scrollToTop(ev: MouseEvent, duration: number = 350): void {
  ev.preventDefault()

  const startTime = Date.now()
  const base = window.scrollY

  function scroll(y: number): void {
    if (window.scrollTo) {
      window.scrollTo(0, y)
    } else {
      document.body.scrollTop = y
    }
  }

  // Step function for the the animation
  function animate(): void {
    // Compute the progress
    const progress = Math.min((Date.now() - startTime) / duration, 1)

    // Perform scrolling - Uses easeInOutQuad taken here: https://gist.github.com/gre/1650294
    const delta = base * (progress < 0.5 ? Math.pow(progress, 2) * 2 : (4 - progress * 2) * progress - 1)
    scroll(Math.max(base - delta, 0))

    // Next step or fail stop
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      scroll(0)
      document.body.scrollTop = 0
    }
  }

  animate()
}

export function TopAnchor({
  duration,
  backgroundColor,
  foregroundColor,
  className,
  skipDefaultClassName
}: TopAnchorProps): JSX.Element {
  const element = useRef<HTMLAnchorElement>(null)

  const handleScroll = useCallback(() => {
    updateTopAnchorStatus(element.current!)
  }, [element])

  const handleScrollToTop = useCallback(
    (ev: MouseEvent) => {
      scrollToTop(ev, duration)
    },
    [duration]
  )

  // Handle events
  useEffect(() => {
    // Register the scroll event
    window.addEventListener('scroll', handleScroll, false)

    // Perform the first update
    handleScroll()

    // Remove event binding upon exist
    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [])

  const colorStyle = cleanCSSClasses(`
    bg-${backgroundColor ?? 'grey-600'} text-${foregroundColor ?? 'white'} 
    hover:opacity-100 hover:text-${foregroundColor ?? 'white'}
  `)

  const topAnchorIconStyle = cleanCSSClasses(`font-size-1_5em text-${foregroundColor ?? 'white'}`)

  const contents = (
    <a
      ref={element}
      id="rl-top-anchor"
      className={sanitizeClassName(
        !skipDefaultClassName && topAnchorStyle,
        !skipDefaultClassName && colorStyle,
        className
      )}
      onClick={handleScrollToTop}
      href="#top"
      title="Top"
    >
      <Icon name="arrow-up" className={sanitizeClassName(!skipDefaultClassName && topAnchorIconStyle)} />
    </a>
  )

  return onServer ? contents : createPortal(contents, document.querySelector('#rl-modal-root')!)
}

export const TopAnchorScript: string = `
  document.addEventListener('DOMContentLoaded', function(){
    ${updateTopAnchorStatus};
    ${scrollToTop};

    const element = document.querySelector('#rl-top-anchor');

    element.addEventListener('click', scrollToTop, false);
    window.addEventListener('scroll', () => updateTopAnchorStatus(element), false);
    updateTopAnchorStatus(element);
  });
`
