export function titleCase(input: string): string{
  return input.toLowerCase().replace(/(?:^[a-z])|(?:\s[a-z])/, (t: string) => t.toUpperCase());
}

export function regexQuote(raw: string): string{
  return raw.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}
