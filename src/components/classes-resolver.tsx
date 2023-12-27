import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { sanitizeClassName, type CSSClassToken } from '../utils/string.js'

export type CSSClassesResolver = (...klasses: (CSSClassToken | CSSClassToken[])[]) => string

export type CSSClassesResolverContextType = [CSSClassesResolver, Dispatch<SetStateAction<CSSClassesResolver>>]

export const CSSClassesResolverContext = createContext<CSSClassesResolverContextType>(
  undefined as unknown as CSSClassesResolverContextType
)

interface CSSClassResolverProps {
  resolver?: CSSClassesResolver
  children?: ReactNode
}

export function defaultCSSClassesResolver(...klasses: (CSSClassToken | CSSClassToken[])[]): string {
  return sanitizeClassName(...(klasses.flat(Number.MAX_VALUE).filter(Boolean) as string[]))
}

export function CSSClassResolver({ resolver, children }: CSSClassResolverProps): JSX.Element {
  const [currentResolver, setResolver] = useState<CSSClassesResolver>(resolver ?? defaultCSSClassesResolver)
  return (
    <CSSClassesResolverContext.Provider value={[currentResolver, setResolver]}>
      {children}
    </CSSClassesResolverContext.Provider>
  )
}
