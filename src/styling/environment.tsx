import { IRenderer, IStyle } from 'fela'
import { renderToMarkup } from 'fela-dom'
import { renderToStaticMarkup } from 'react-dom/server.js'
import { RendererProvider } from 'react-fela'

export type Style = IStyle

export const env = process.env.NODE_ENV!

export const onServer = typeof window === 'undefined'

export const defaultStylePlaceholder = '@STYLE@'

export function renderHTML(
  renderer: IRenderer,
  Head: JSX.Element,
  Body: JSX.Element,
  lang: string = 'en',
  stylePlaceholder: string = defaultStylePlaceholder
): string {
  // Render body to generate styles
  const body = renderToStaticMarkup(<RendererProvider renderer={renderer}>{Body}</RendererProvider>)

  // Render styles
  const styles = renderToMarkup(renderer)

  return (
    '<!DOCTYPE html>' +
    renderToStaticMarkup(
      <html lang={lang}>
        {Head}
        <body dangerouslySetInnerHTML={{ __html: body }} />
      </html>
    ).replace(stylePlaceholder, styles)
  )
}
