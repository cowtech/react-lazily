export interface IconsDefinitionsProps {
  definitions: string
}

export interface IconProps {
  name: string
  additionalStyle?: string
  onClick?: () => void
}

const iconStyle = 'inline-block align-middle w-1em h-1em stroke-0 stroke-current fill-current'

export function IconsDefinitions({ definitions }: IconsDefinitionsProps): JSX.Element {
  return (
    <svg
      className="absolute hidden w-0 h-0"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs dangerouslySetInnerHTML={{ __html: definitions }} />
    </svg>
  )
}

export function Icon({ name, additionalStyle, onClick }: IconProps): JSX.Element | null {
  return (
    <svg className={[iconStyle, additionalStyle].filter(Boolean).join(' ')} onClick={onClick}>
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}
