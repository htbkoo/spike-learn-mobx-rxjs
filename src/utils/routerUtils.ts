export function getBasename(): string {
    return getFirstPartPath(window.location.pathname);
}

export function getFirstPartPath(pathname: string, delimiter: string = "/"): string {
    const startIndex = pathname.indexOf(delimiter);
    const endIndex = pathname.indexOf(delimiter, startIndex + 1);
    return pathname.substring(startIndex, endIndex !== -1 ? endIndex : pathname.length);
}
