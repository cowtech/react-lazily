export function titleCase(input: string): string {
  return input.toLowerCase().replace(/(?:^[a-z])|(?:\s[a-z])/, t => t.toUpperCase())
}

export function quoteRegexp(raw: string): string {
  return raw.replace(/([!$()*+./:=?[\\\]^{|}])/g, '\\$1')
}

export function cleanCSSClasses(raw: string): string {
  return raw.replaceAll('\n', '').replaceAll(/\s+/g, ' ').trim()
}
