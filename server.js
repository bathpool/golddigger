import express from 'express'

const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use('/price', priceRoutes)
app.use('/invest', investRoutes)
app.use('/live', liveRoutes)
//for local test: not needed when deploy to vercel
app.use(express.static('public'))

app.listen(PORT, console.log(`connected on port ${PORT}`))
