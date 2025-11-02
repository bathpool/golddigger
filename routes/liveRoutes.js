import express from 'express'
import { liveData } from '../controllers/liveData.js'

export const liveRoutes = express.Router()

liveRoutes.get('/', liveData)