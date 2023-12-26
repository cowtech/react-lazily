import { renderToStaticMarkup } from 'react-dom/server'

export const env = process.env.NODE_ENV!

export const onServer = typeof window === 'undefined'

export function renderHTML(
  headComponent: JSX.Element,
  bodyComponent: JSX.Element | string,
  bodyClasses: string | undefined,
  lang: string = 'en'
): string {
  if (typeof bodyComponent !== 'string') {
    bodyComponent = renderToStaticMarkup(bodyComponent)
  }

  return (
    '<!DOCTYPE html>' +
    renderToStaticMarkup(
      <html lang={lang}>
        {headComponent}
        <body className={bodyClasses} dangerouslySetInnerHTML={{ __html: bodyComponent }} />
      </html>
    )
  )
}
