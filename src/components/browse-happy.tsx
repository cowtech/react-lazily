import { createPortal } from 'react-dom'
import { useFela } from 'react-fela'
import { colorAmber200, colorAmber500, colorRed700, colorWhite } from '../styling/colors'
import { onServer, Style } from '../styling/environment'
import { linkStyle } from '../styling/mixins'
import { createMemoizedComponent } from '../utils/dom-utils'

// #region style
export const browseHappyStyle: Style = {
  display: 'none',
  width: '100%',
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: colorRed700,
  color: colorWhite,
  paddingTop: '1rem',
  paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
  paddingLeft: 'calc(1rem + env(safe-area-inset-left))',
  paddingRight: 'calc(1rem + env(safe-area-inset-right))',
  textAlign: 'center'
}

export const browseHappyLinkStyle: Style = {
  color: colorAmber500,
  fontWeight: 'bold',
  ...linkStyle(colorAmber500, colorAmber200)
}
// #endregion style

export function isModernBrowser(): boolean {
  try {
    return (
      Array.from(new Map([[1, 2]]).entries()).join(',') === '1,2' &&
      CSS.supports('display', 'grid') &&
      CSS.supports('display', 'flex') &&
      CSS.supports('color', 'var(--var)')
    )
  } catch (e) {
    // Some of these are not supported. Assume legacy browser.
    return false
  }
}

export interface BrowseHappyProps {
  message?: string
  additionalStyle?: Style
}

export const BrowseHappy = createMemoizedComponent(
  'BrowseHappy',
  function ({ message, additionalStyle }: BrowseHappyProps): JSX.Element | null {
    const { css } = useFela()

    message = message ?? 'Your browser is obsolete. For the best browsing experience, update it for free by visiting'

    const contents = (
      <div id="browseHappy" className={css(browseHappyStyle, additionalStyle ?? {})}>
        <span>{message}&nbsp;</span>
        <a
          href="https://browsehappy.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={css(browseHappyLinkStyle)}
        >
          BrowseHappy
        </a>
        .
      </div>
    )

    return onServer ? contents : createPortal(contents, document.getElementById('rl-modal-root')!)
  }
)

export const BrowseHappySSR: string = `
  document.addEventListener('DOMContentLoaded', function() {
    ${isModernBrowser};

    const element = document.getElementById('browseHappy');
    
    if(isModernBrowser()) {
      element.remove();
    } else {
      element.style.display = 'block';
    }
  });
`
