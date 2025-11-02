import { eventEmitter } from '../utils/emitter.js'

export function saveInvest(req, res) {

    eventEmitter.emit("save", req.body)
    res.json(req.body)

}