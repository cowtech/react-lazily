import { em, rem } from 'csx'
import React, { MouseEvent, useCallback, useEffect, useRef } from 'react'
import { media, style } from 'typestyle'
import { maxHeight6xx, maxWidth45x, maxWidth6xx } from '../styling/breakpoints'
import { colorGrey600, colorWhite } from '../styling/colors'
import { debugClassName } from '../styling/mixins'
import { createMemoizedComponent } from '../utils/dom-utils'
import { Icon } from './icons'

export interface TopAnchorProps {
  duration?: number
  backgroundColor?: string
  foregroundColor?: string
}

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

export function updateTopAnchorStatus(element: HTMLAnchorElement): void {
  if (!element) {
    return
  }

  element.setAttribute('data-hidden', (window.pageYOffset === 0).toString())
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

export const TopAnchor = createMemoizedComponent('TopAnchor', function ({
  duration,
  backgroundColor,
  foregroundColor
}: TopAnchorProps): JSX.Element {
  const className: string = style(
    debugClassName('top-anchor'),
    {
      width: em(4),
      height: em(4),
      bottom: rem(2),
      right: rem(2),
      position: 'fixed',
      zIndex: 101,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor ?? colorGrey600,
      color: foregroundColor ?? colorWhite,
      borderRadius: rem(0.5),
      opacity: 0.5,
      transition: 'opacity 0.2s ease',
      $nest: {
        '&[data-hidden=true]': { display: 'none' },
        '&:hover': { opacity: 1, color: foregroundColor ?? colorWhite },
        '&:focus, &:active, &:visited': { color: foregroundColor ?? colorWhite },
        '& svg, & .fa': { fontSize: em(2.5) }
      }
    },
    media({ minWidth: maxWidth45x + 1, maxWidth: maxWidth6xx }, { width: em(3), height: em(3), fontSize: em(1.5) }),
    media({ maxWidth: maxWidth45x }, { width: em(2), height: em(2), fontSize: em(1), padding: rem(0.5) }),
    media({ maxHeight: maxHeight6xx }, { width: em(2), height: em(2), fontSize: em(1), padding: rem(0.5) })
  )

  const element = useRef<HTMLAnchorElement>(null)

  const handleScroll = useCallback(() => {
    updateTopAnchorStatus(element.current!)
  }, [element])

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

  return (
    <a id="topAnchor" ref={element} className={className} onClick={handleScrollToTop} href="#top" title="Top">
      <Icon name="arrow-up" />
    </a>
  )
})

export const TopAnchorSSR: string = `
  document.addEventListener('DOMContentLoaded', function(){
    ${ease}
    ${animationProgress}
    ${updateTopAnchorStatus}
    ${scrollToTop}

    const element = document.getElementById('topAnchor')

    element.addEventListener('click', scrollToTop, false)
    window.addEventListener('scroll', function(){ updateTopAnchorStatus(element); }, false)
    updateTopAnchorStatus(element)
  });
`
