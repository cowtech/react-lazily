import { useCallback, useEffect } from 'react';
import { createMemoizedComponent } from "../utils/dom-utils.mjs";
function triggerShortcuts(shortcuts, ev) {
    // First of all, if within a input, ignore unless is Esc or Enter
    if (ev.key !== 'Escape' &&
        ev.key !== 'Enter' &&
        ['input', 'select'].includes(ev.target.tagName.toLowerCase())) {
        return;
    }
    const handler = shortcuts[ev.key];
    if (handler) {
        ev.preventDefault();
        handler();
    }
}
export const Shortcuts = createMemoizedComponent('Shortcuts', function ({ shortcuts }) {
    const handleShortcuts = useCallback((ev) => {
        triggerShortcuts(shortcuts, ev);
    }, [shortcuts]);
    useEffect(() => {
        document.addEventListener('keyup', handleShortcuts, false);
        return () => {
            document.removeEventListener('keyup', handleShortcuts, false);
        };
    });
    return null;
});
