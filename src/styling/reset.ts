import { IRenderer, IStyle } from 'fela'
import { maxHeight6xx, maxWidth45x, maxWidth7xx } from './breakpoints'

export const normalizeCss =
  '/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}'

export function globalRule(renderer: IRenderer, selector: string, rule: IStyle): void {
  renderer.renderStatic(rule, selector)
}

export function resetStyles(renderer: IRenderer): void {
  renderer.renderStatic(normalizeCss)

  globalRule(renderer, 'html', {
    fontSize: '10px', // This sets 1rem = 10px
    '--rl-ribbon-display': 'block',
    '--rl-top-anchor-size': '4em',
    [`@media(max-width: ${maxWidth7xx}px)`]: {
      '--rl-ribbon-display': 'none'
    },
    [`@media(max-width: ${maxWidth45x}px)`]: {
      '--rl-top-anchor-size': '3em'
    },
    [`@media(max-width: ${maxHeight6xx}px)`]: {
      '--rl-top-anchor-size': '3em'
    }
  })

  globalRule(renderer, '*, *:hover, *:focus, *:active, *:before, *::after', {
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
