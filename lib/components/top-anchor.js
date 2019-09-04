import { em, rem } from 'csx';
import React from 'react';
import { media, style } from 'typestyle';
import { maxHeight6xx, maxWidth45x, maxWidth6xx } from '../styling/breakpoints';
import { colorGrey600, colorWhite } from '../styling/colors';
import { debugClassName } from '../styling/mixins';
import { createMemoizedComponent } from '../utils/dom-utils';
import { Icon } from './icons';
export function animationProgress(startTime, duration) {
    if (!duration) {
        duration = 350;
    }
    return Math.min((Date.now() - startTime) / duration, 1);
}
// This is easeInOutQuad taken here: https://gist.github.com/gre/1650294
export function ease(x) {
    return x < 0.5 ? Math.pow(x, 2) * 2 : (4 - x * 2) * x - 1;
}
export function updateTopAnchorStatus(element) {
    if (!element) {
        return;
    }
    element.setAttribute('data-hidden', (window.pageYOffset === 0).toString());
}
export function scrollToTop(ev, duration) {
    ev.preventDefault();
    const startTime = Date.now();
    const base = window.scrollY;
    function scroll(y) {
        if (window.scrollTo) {
            window.scrollTo(0, y);
        }
        else {
            document.body.scrollTop = y;
        }
    }
    // Step function for the the animation
    function animate() {
        // Compute the progress
        const progress = animationProgress(startTime, duration);
        // Perform scrolling
        const delta = base * ease(progress);
        scroll(Math.max(base - delta, 0));
        // Next step or fail stop
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
        else {
            scroll(0);
            document.body.scrollTop = 0;
        }
    }
    animate();
}
export const TopAnchor = createMemoizedComponent('TopAnchor', function ({ duration, backgroundColor, foregroundColor }) {
    const className = style(debugClassName('top-anchor'), {
        width: em(4),
        height: em(4),
        bottom: rem(2),
        right: rem(2),
        position: 'fixed',
        zIndex: 101,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor || colorGrey600,
        color: foregroundColor || colorWhite,
        borderRadius: rem(0.5),
        opacity: 0.5,
        transition: 'opacity 0.2s ease',
        $nest: {
            '&[data-hidden=true]': { display: 'none' },
            '&:hover': { opacity: 1, color: foregroundColor || colorWhite },
            '&:focus, &:active, &:visited': { color: foregroundColor || colorWhite },
            '& svg, & .fa': { fontSize: em(2.5) }
        }
    }, media({ minWidth: maxWidth45x + 1, maxWidth: maxWidth6xx }, { width: em(3), height: em(3) }), media({ maxWidth: maxWidth45x }, { width: em(2), height: em(2) }), media({ maxHeight: maxHeight6xx }, { width: em(2), height: em(2) }));
    const element = React.useRef(null);
    const handleScrollToTop = (ev) => scrollToTop(ev, duration);
    // Handle events
    React.useEffect(() => {
        const handleScroll = updateTopAnchorStatus.bind(null, element.current);
        // Register the scroll event
        window.addEventListener('scroll', handleScroll, false);
        // Perform the first update
        handleScroll();
        // Remove event binding upon exist
        return function () {
            window.removeEventListener('scroll', handleScroll, false);
        };
    }, []);
    return (React.createElement("a", { id: "topAnchor", ref: element, className: className, onClick: handleScrollToTop, href: "#top", title: "Top" },
        React.createElement(Icon, { name: "arrow-up" })));
});
export const TopAnchorSSR = `
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
`;
