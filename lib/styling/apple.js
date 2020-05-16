import React from 'react';
import { env } from './environment';
export const appleScreenSizes = [
    { id: 'iphone-x', label: 'iPhone X, XS, 11 Pro (1125px x 2436px)', width: 375, height: 812, ratio: 3 },
    { id: 'iphone-x-max', label: 'iPhone X, XS Max, 11 Pro Max (1125px x 2436px)', width: 375, height: 812, ratio: 3 },
    { id: 'iphone-xr', label: 'iPhone XR (828px x 1792px), 11', width: 414, height: 896, ratio: 2 },
    { id: 'iphone-8', label: 'iPhone 8, 7, 6s, 6, SE (2nd gen) (750px x 1334px)', width: 375, height: 667, ratio: 2 },
    {
        id: 'iphone-8-plus',
        label: 'iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px)',
        width: 414,
        height: 736,
        ratio: 3
    },
    { id: 'iphone-5', label: 'iPhone 5 (640px x 1136px), SE (1st gen)', width: 320, height: 568, ratio: 2 },
    { id: 'ipad-pro-9', label: 'iPad Pro 9.7, iPad Mini, Air (1536px x 2048px)', width: 768, height: 1024, ratio: 2 },
    { id: 'ipad-pro-10', label: 'iPad Pro 10.5" (1668px x 2224px)', width: 834, height: 1112, ratio: 2 },
    { id: 'ipad-pro-11', label: 'iPad Pro 11" (1668px x 2388px)', width: 834, height: 1194, ratio: 2 },
    { id: 'ipad-pro-12', label: 'iPad Pro 12.9" (2048px x 2732px)', width: 1024, height: 1366, ratio: 2 }
];
export function generateAppleSplashTags(url, whitelist = []) {
    const isTemplateUrl = typeof url === 'string';
    const sizes = whitelist.length
        ? appleScreenSizes.filter((s) => whitelist.includes(s.id))
        : appleScreenSizes;
    return sizes.map(({ label, width, height, ratio }) => {
        const spec = `${width * ratio}x${height * ratio}`;
        const href = isTemplateUrl ? url.replace('SUFFIX', spec) : url[spec];
        return (React.createElement("link", { key: [width, ratio, height].join('-'), rel: "apple-touch-startup-image", media: `(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: portrait)`, href: href, "data-splash-id": env === 'development' ? label : null }));
    });
}
