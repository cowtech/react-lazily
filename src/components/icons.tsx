export interface IconsDefinitionsProps {
  definitions: string
  additionalStyle?: string
  skipDefaultStyles?: boolean
}

export interface IconProps {
  name: string
  additionalStyle?: string
  skipDefaultStyles?: boolean
  onClick?: () => void
}

const iconStyle = 'inline-block align-middle w-1em h-1em stroke-0 stroke-current fill-current'
const iconDefinitionStyle = 'absolute hidden w-0 h-0'

export function IconsDefinitions({
  definitions,
  skipDefaultStyles,
  additionalStyle
}: IconsDefinitionsProps): JSX.Element {
  return (
    <svg
      className={[!skipDefaultStyles ? iconDefinitionStyle : false, additionalStyle].filter(Boolean).join(' ').trim()}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs dangerouslySetInnerHTML={{ __html: definitions }} />
    </svg>
  )
}

export function Icon({ name, additionalStyle, skipDefaultStyles, onClick }: IconProps): JSX.Element | null {
  return (
    <svg
      className={[!skipDefaultStyles ? iconStyle : false, additionalStyle].filter(Boolean).join(' ').trim()}
      onClick={onClick}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
