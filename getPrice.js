export function getPrice() {
    const currentPrice = 4000
    const randomNumber = Math.random() * 0.2 + 0.9
    const price = currentPrice * randomNumber
    //return a string
    return price.toFixed(2)
}