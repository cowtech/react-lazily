export function titleCase(input) {
    return input.toLowerCase().replace(/(?:^[a-z])|(?:\s[a-z])/, t => t.toUpperCase());
}
export function quoteRegexp(raw) {
    return raw.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}
