import { IRenderer, IStyle } from 'fela'
import { maxHeight6xx, maxWidth45x, maxWidth7xx } from './breakpoints'

export const normalizeCss =
  '/** * Minified by jsDelivr using clean-css v4.2.3. * Original file: /npm/modern-normalize@1.1.0/modern-normalize.css * * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files *//*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */*,::after,::before{box-sizing:border-box}html{-moz-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"}hr{height:0;color:inherit}abbr[title]{text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}'

export function globalRule(renderer: IRenderer, selector: string, rule: IStyle): void {
  renderer.renderStatic(rule, selector)
}

export function defineScopedVariables(
  renderer: IRenderer,
  scope: string,
  variables: Record<string, unknown>,
  selector: string = 'html'
): void {
  const definitions = Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')

  renderer.renderStatic(`${selector}{${definitions}}`, scope)
}

export function resetStyles(renderer: IRenderer): void {
  renderer.renderStatic(normalizeCss)

  globalRule(renderer, 'html', {
    fontSize: '10px', // This sets 1rem = 10px
    '--rl-ribbon-display': 'block',
    '--rl-top-anchor-size': '4em'
  })

  defineScopedVariables(renderer, `@media(max-width: ${maxWidth7xx}px)`, {
    '--rl-ribbon-display': 'none'
  })

  defineScopedVariables(renderer, `@media(max-width: ${maxWidth45x}px)`, {
    '--rl-top-anchor-size': '3em'
  })

  defineScopedVariables(renderer, `@media(max-width: ${maxHeight6xx}px)`, {
    '--rl-top-anchor-size': '3em'
  })

  globalRule(renderer, '*, *:hover, *:focus, *:active, *::before, *::after', {
    boxSizing: 'border-box',
    outline: 'none'
  })

  globalRule(renderer, 'body, a, p, strong, em, li, dd, dt, button, input, select, textarea, h1, h2, h3, h4, h5, h6', {
    margin: 0,
    lineHeight: 1.4
  })

  globalRule(renderer, 'h1', { fontSize: '3.5em' })
  globalRule(renderer, 'h2', { fontSize: '2.5em' })
  globalRule(renderer, 'h3', { fontSize: '2em' })
  globalRule(renderer, 'h4', { fontSize: '1.5em' })
  globalRule(renderer, 'h5, h6', { fontSize: '1em' })

  globalRule(renderer, 'a', {
    textDecoration: 'none',
    transition: 'color 0.2s ease'
  })

  globalRule(renderer, 'strong', { fontWeight: 'bold' })

  globalRule(renderer, 'ul, ol', { paddingLeft: '1.7rem' })
  globalRule(renderer, 'ul.unstyled, ol.unstyled', {
    listStyle: 'none',
    margin: 0,
    paddingLeft: 0
  })

  globalRule(renderer, 'dl', { margin: 0 })
  globalRule(renderer, 'dt', { fontWeight: 'bold' })
  globalRule(renderer, 'dt:nth-child(n + 1)', { marginTop: '1rem' })
  globalRule(renderer, 'dl', { margin: '0' })
}
