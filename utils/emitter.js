// emitter.js
import fs from 'node:fs/promises'
import { EventEmitter } from 'node:events'
import path from 'node:path'
export const eventEmitter = new EventEmitter();

const filePath = path.join(process.cwd(), 'data.txt')

// one listener only
eventEmitter.on('save', async (body) => {
  try {
    const line = JSON.stringify(body) + '\n'   // NDJSON
    await fs.appendFile(filePath, line, 'utf8') // create if missing, append if exists
  } catch (err) {
    console.error('Failed to append to data.txt:', err)
  }
})