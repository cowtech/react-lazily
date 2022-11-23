export function titleCase(input: string): string {
  return input.toLowerCase().replace(/(?:^[a-z])|(?:\s[a-z])/, t => t.toUpperCase())
}

export function quoteRegexp(raw: string): string {
  return raw.replaceAll(/([!$()*+./:=?[\\\]^{|}])/g, '\\$1')
}
