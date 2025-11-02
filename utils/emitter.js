// emitter.js
import fs from 'node:fs/promises'
import { EventEmitter } from 'node:events'
export const eventEmitter = new EventEmitter();

eventEmitter.on("save", async (body) => {
    
    console.log("Event triggered:", body)
    eventEmitter.on("save", async (body) => {
        let currentTxt = await fs.readFile('data.txt', "utf8")
        currentTxt += `${body}\n`
        await fs.writeFile('data.txt', currentTxt)
    })

});