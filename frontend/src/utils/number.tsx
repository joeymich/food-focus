export const formatNumber = (num: number): string => {
    if(num == null) {
        return "0";
    }
    return parseFloat(num.toFixed(1)).toString()
}