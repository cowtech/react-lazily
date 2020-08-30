export * from './components/browse-happy';
export * from './components/icons';
export * from './components/made-in-italy';
export * from './components/new-version-checker';
export * from './components/ribbon';
export * from './components/shortcuts';
export * from './components/spinner';
export * from './components/top-anchor';
export * from './styling/apple';
export * from './styling/breakpoints';
export * from './styling/colors';
export * from './styling/environment';
export * from './styling/fonts';
export * from './styling/mixins';
export * from './styling/reset';
export * from './utils/array-utils';
export * from './utils/dom-utils';
export * from './utils/storage-utils';
export * from './utils/string-utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DetailedHTMLProps, ReactNode, ReactNodeArray } from 'react'

declare global {
  namespace JSX {
    type SitemapElement<T = {}> = DetailedHTMLProps<T & { children?: ReactNode | ReactNodeArray }, HTMLElement>

    interface IntrinsicElements {
      sitemap: SitemapElement
      urlset: SitemapElement<{ xmlns?: string }>
      url: SitemapElement
      loc: SitemapElement
      lastmod: SitemapElement
      changefreq: SitemapElement
      priority: SitemapElement
    }
  }
}
