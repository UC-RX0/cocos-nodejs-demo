export const toFix = (num: number, fix: number = 3) => {
    const tempNum = num * 10 ** fix
    const targetNum = Math.floor(tempNum) / 10 ** fix
    return targetNum
}