import React from 'react';
import { env } from './environment';
export const appleScreenSizes = [
    { id: 'iphone-11-pro', devices: ['iPhone 11 Pro', 'iPhone XS', 'iPhone X'], width: 375, height: 812, ratio: 3 },
    {
        id: 'iphone-11-pro-max',
        devices: ['iPhone 11 Pro Max', 'iPhone XS Max', 'iPhone X Max'],
        width: 375,
        height: 812,
        ratio: 3
    },
    { id: 'iphone-11', devices: ['iPhone 11', 'iPhone 11', 'iPhone XR'], width: 414, height: 896, ratio: 2 },
    {
        id: 'iphone-8',
        devices: ['iPhone 8', 'iPhone 7', 'iPhone 6s', 'iPhone 6', 'iPhone SE (2nd gen)'],
        width: 375,
        height: 667,
        ratio: 2
    },
    {
        id: 'iphone-8-plus',
        devices: ['iPhone 8 Plus', 'iPhone 7 Plus', 'iPhone 6s Plus', 'iPhone 6 Plus'],
        width: 414,
        height: 736,
        ratio: 3
    },
    { id: 'iphone-se-1', devices: ['iPhone 5', 'iPhone SE (1st gen)'], width: 320, height: 568, ratio: 2 },
    { id: 'ipad-pro-12', devices: ['iPad Pro 12.9"'], width: 1024, height: 1366, ratio: 2 },
    { id: 'ipad-pro-11', devices: ['iPad Pro 11"'], width: 834, height: 1194, ratio: 2 },
    { id: 'ipad-pro-10', devices: ['iPad Pro 10.5"'], width: 834, height: 1112, ratio: 2 },
    { id: 'ipad', devices: ['iPad', 'iPad Pro 9.7', 'iPad Air', 'iPad Mini'], width: 768, height: 1024, ratio: 2 }
];
function splashParams(width, height, ratio, url, orientation) {
    const spec = `${width * ratio}x${height * ratio}`;
    const isTemplateUrl = typeof url === 'string';
    return [
        [width, height, ratio].join('-'),
        `(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: ${orientation})`,
        isTemplateUrl ? url.replace('SUFFIX', spec) : url[spec] // Href
    ];
}
export function generateAppleSplashTags(url, includeLandscape = true, whitelist = []) {
    const sizes = whitelist.length
        ? appleScreenSizes.filter((s) => whitelist.includes(s.id))
        : appleScreenSizes;
    const tags = [];
    for (const { devices, width, height, ratio } of sizes) {
        const portraitId = env === 'development' ? `${devices.join(', ')} - Portrait` : null;
        const [portraitKey, portraitQuery, portraitHref] = splashParams(width, height, ratio, url, 'portrait');
        const tags = [
            React.createElement("link", { key: portraitKey, rel: "apple-touch-startup-image", media: portraitQuery, href: portraitHref, "data-splash-id": portraitId })
        ];
        if (includeLandscape) {
            const landscapeId = env === 'development' ? `${devices.join(', ')} - Landscape` : null;
            const [landscapeKey, landscapeQuery, landscapeHref] = splashParams(height, width, ratio, url, 'landscape');
            tags.push(React.createElement("link", { key: landscapeKey, rel: "apple-touch-startup-image", media: landscapeQuery, href: landscapeHref, "data-splash-id": landscapeId }));
        }
    }
    return tags;
}
