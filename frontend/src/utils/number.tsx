export const formatNumber = (num: number): string => {
    return parseFloat(num.toFixed(1)).toString()
}