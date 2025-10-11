import fs from 'node:fs/promises'
import path from 'node:path'
import http from 'node:http'
import { getContentType } from './getContentType.js'
import { sendResponse } from './sendResponse.js'
import { getPrice } from "./getPrice.js"

const PORT = 8000

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
        try {
            console.log(typeof(body))
            console.log(typeof(JSON.parse(body)))

            let currentTxt = await fs.readFile('data.txt', "utf8")
            currentTxt += `${body}\n`

            fs.writeFile('data.txt', currentTxt)

        } catch (err) {
            throw new Error(`Invalid JSON format: ${err}`)
        }
        sendResponse(res, 200, "application/json", body)

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
