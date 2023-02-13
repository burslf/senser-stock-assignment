export function percentageVariation(newPrice: number, initialPrice: number) {
    return Math.round((newPrice - initialPrice) / initialPrice * 100) / 100
}