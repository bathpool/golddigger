import fs from 'node:fs/promises'
import path from 'node:path'
import http from 'node:http'
import { EventEmitter } from 'node:events'
import { getContentType } from './getContentType.js'
import { sendResponse } from './sendResponse.js'
import { getPrice } from "./getPrice.js"
import express from 'express'

const PORT = process.env.PORT || 8000

const app = express()

app.use('/price', priceRoutes)
app.use('/invest', investRoutes)
app.use('/live', liveRoutes)

app.listen(PORT, console.log(`connected on port ${PORT}`))










const eventEmitter = new EventEmitter()

const server = http.createServer(async (req, res) => {

    if (req.url === "/price") {
        console.log("getprice request received")
        const price = getPrice()
        sendResponse(res, 200, 'text/html', price)

    }   else if(req.url === "/invest") {
        console.log("invest received")
        let body = ''
        for await (const chunk of req) {
            body += chunk
        }

        eventEmitter.on("save", async (body) => {
            let currentTxt = await fs.readFile('data.txt', "utf8")
            currentTxt += `${body}\n`
            await fs.writeFile('data.txt', currentTxt)
        })

        eventEmitter.emit("save", body)
     
        sendResponse(res, 200, "application/json", body)
    }   else if(req.url === "/live"){
        
            res.statusCode = 200
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

    }   else {
        
        console.log(req.url)

        const filePath = path.join('public', req.url === '/' ? 'index.html' : req.url)
        const ext = path.extname(filePath)
        const contentType = getContentType(ext)
        const content = await fs.readFile(filePath)
        
        sendResponse(res, 200, contentType, content)
    }

})

server.listen(PORT, console.log("connected"))





// server.js
// serve static files
// update with live price
// log user purchase to a text file
