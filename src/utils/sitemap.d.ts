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
