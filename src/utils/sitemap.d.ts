import { DetailedHTMLProps, ReactNode } from 'react'

declare global {
  namespace JSX {
    type SitemapElement<T = {}> = DetailedHTMLProps<T & { children?: ReactNode }, HTMLElement>

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
