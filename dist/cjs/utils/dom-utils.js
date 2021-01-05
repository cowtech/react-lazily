import { memo } from 'react';
export function updateBodySize(offset) {
    document.body.style.setProperty('--rl-ios-height', `${window.visualViewport.height - offset}px`);
}
export function handleIOSMinHeight(offset = 0) {
    if ('visualViewport' in window) {
        window.visualViewport.addEventListener('resize', updateBodySize.bind(undefined, offset));
        window.addEventListener('resize', updateBodySize.bind(undefined, offset));
    }
    document.body.style.setProperty('--rl-ios-height', `${window.innerHeight - offset}px`);
}
export function loadScript(url, tag) {
    return new Promise((resolve) => {
        if (document.querySelector(`script[data-tag="${tag}"]`)) {
            return resolve();
        }
        const script = document.createElement('script');
        script.src = url;
        script.setAttribute('data-tag', tag);
        script.onload = () => {
            setTimeout(resolve, 100);
        };
        document.head.appendChild(script);
    });
}
export function createMemoizedComponent(name, component) {
    const created = memo(component);
    created.displayName = name;
    return created;
}