import { cleanCSSClasses, sanitizeClassName } from '../utils/string.js'

export interface IconsDefinitionsProps {
  definitions: string
  className?: string
  skipDefaultClassName?: boolean
}

export interface IconProps {
  name: string
  className?: string
  skipDefaultClassName?: boolean
  onClick?: () => void
}

const iconStyle = cleanCSSClasses('inline-block align-middle w-1em h-1em stroke-0 stroke-current fill-current')
const iconDefinitionStyle = cleanCSSClasses('absolute hidden w-0 h-0')

export function IconsDefinitions({ definitions, skipDefaultClassName, className }: IconsDefinitionsProps): JSX.Element {
  return (
    <svg
      className={sanitizeClassName(!skipDefaultClassName && iconDefinitionStyle, className)}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs dangerouslySetInnerHTML={{ __html: definitions }} />
    </svg>
  )
}

export function Icon({ name, className, skipDefaultClassName, onClick }: IconProps): JSX.Element | null {
  return (
    <svg className={sanitizeClassName(!skipDefaultClassName && iconStyle, className)} onClick={onClick}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
