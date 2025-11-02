import { getPrice } from '../getPrice.js'

export function checkPrice(req, res) {
    console.log("getprice request received")
    const price = getPrice()
    // sendResponse(res, 200, 'text/html', price)
    res.send(price)
}