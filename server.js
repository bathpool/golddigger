import fs from 'node:fs/promises'
import path from 'node:path'
import http from 'node:http'

const PORT = 8000

const server = http.createServer(async (req, res) => {

    const filePath = path.join('public', 'index.html')
    const content = await fs.readFile(filePath)

    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end(content)

})

server.listen(PORT, console.log("connected"))





// server.js
// serve static files
// update with live price
// log user purchase to a text file
