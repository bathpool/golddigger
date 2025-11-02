import express from 'express'
import { saveInvest } from '../controllers/saveInvest.js'

export const investRoutes = express.Router()

investRoutes.post('/', saveInvest)