import { getPrice } from '../utils/getPrice.js'

export function liveData(req, res) {

    res.status(200)
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    const interval = setInterval( () => {
            const price = getPrice()
            console.log(price)
            //data: ...\n\n: This is the specific format for Server-Sent Events.
            res.write(
                `data: ${price}\n\n`
            )
            console.log("hello")
        }, 10000)

    req.on('close', () => {
        clearInterval(interval)
        console.log('Client disconnected, interval cleared.')
    })

}