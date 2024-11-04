export const toNormalCase = (str: string): string => {
    if (!str) return ''
    return str.charAt(0) + str.slice(1).toLowerCase()
}