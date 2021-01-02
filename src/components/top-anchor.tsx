import React, { MouseEvent, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { classes, style } from 'typestyle'
import { colorGrey600, colorWhite } from '../styling/colors'
import { onServer } from '../styling/environment'
import { debugClassName } from '../styling/mixins'
import { createMemoizedComponent } from '../utils/dom-utils'
import { Icon } from './icons'

// #region style
const topAnchorBaseClassName = style(debugClassName('top-anchor-base'), {
  width: 'var(--rl-top-anchor-size)',
  height: 'var(--rl-top-anchor-size)',
  bottom: '2rem',
  right: '2rem',
  padding: '1rem',
  position: 'fixed',
  zIndex: 101,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  opacity: 0.5,
  transition: 'opacity 0.2s ease'
})

export const topAnchorHiddenClassName = style(debugClassName('top-anchor-hidden'), {
  $unique: true,
  display: 'none'
})

const topAnchorIconClassName = style(debugClassName('top-anchor-icon'), {
  fontSize: '1.5em'
})
// #endregion style

export function animationProgress(startTime: number, duration: number): number {
  if (!duration) {
    duration = 350
  }

  return Math.min((Date.now() - startTime) / duration, 1)
}

// This is easeInOutQuad taken here: https://gist.github.com/gre/1650294
export function ease(x: number): number {
  return x < 0.5 ? Math.pow(x, 2) * 2 : (4 - x * 2) * x - 1
}

export function updateTopAnchorStatus(element: HTMLAnchorElement, klass: string): void {
  if (!element) {
    return
  }

  element.classList.toggle(klass, window.pageYOffset === 0)
}

export function scrollToTop(ev: MouseEvent, duration: number): void {
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
    const progress = animationProgress(startTime, duration)

    // Perform scrolling
    const delta = base * ease(progress)
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

export interface TopAnchorProps {
  duration?: number
  backgroundColor?: string
  foregroundColor?: string
  className?: string
}

export const TopAnchor = createMemoizedComponent(
  'TopAnchor',
  function ({ duration, backgroundColor, foregroundColor, className }: TopAnchorProps): JSX.Element {
    const topAnchorClassName = style(debugClassName('top-anchor'), {
      backgroundColor: backgroundColor ?? colorGrey600,
      color: foregroundColor ?? colorWhite,
      $nest: {
        '&:hover': { opacity: 1, color: foregroundColor ?? colorWhite },
        '&:focus, &:active, &:visited': { color: foregroundColor ?? colorWhite }
      }
    })

    const element = useRef<HTMLAnchorElement>(null)

    const handleScroll = useCallback(() => {
      updateTopAnchorStatus(element.current!, topAnchorHiddenClassName)
    }, [element, topAnchorHiddenClassName])

    const handleScrollToTop = useCallback(
      (ev: MouseEvent) => {
        scrollToTop(ev, duration!)
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

    const contents = (
      <a
        id="topAnchor"
        ref={element}
        className={classes(topAnchorBaseClassName, topAnchorClassName, className)}
        onClick={handleScrollToTop}
        href="#top"
        title="Top"
      >
        <Icon name="arrow-up" className={topAnchorIconClassName} />
      </a>
    )

    return onServer ? contents : createPortal(contents, document.getElementById('rl-modal-root')!)
  }
)

export const TopAnchorSSR: string = `
  document.addEventListener('DOMContentLoaded', function(){
    ${ease};
    ${animationProgress};
    ${updateTopAnchorStatus};
    ${scrollToTop};

    const element = document.getElementById('topAnchor');

    element.addEventListener('click', scrollToTop, false);
    window.addEventListener('scroll', () => updateTopAnchorStatus(element, '${topAnchorHiddenClassName}'), false);
    updateTopAnchorStatus(element, '${topAnchorHiddenClassName}');
  });
`
