import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'

// import the router from your routes file
import CarRouter from './routes/cars.js'
import ExteriorRouter from './routes/exterior.js'
import InteriorRouter from './routes/interior.js'
import RoofRouter from './routes/roof.js'
import WheelsRouter from './routes/wheels.js'

dotenv.config()

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use
app.use('/api/cars', CarRouter)
app.use('/api/exterior', ExteriorRouter)
app.use('/api/interior', InteriorRouter)
app.use('/api/roof', RoofRouter)
app.use('/api/wheels', WheelsRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})