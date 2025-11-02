import express from 'express'
import { checkPrice } from '../controllers/checkPrice.js'

export const priceRoutes = express.Router()

priceRoutes.get('/', checkPrice)