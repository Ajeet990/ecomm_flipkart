import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConn from './db/connection.js'
import authRouter from './routes/authRouter.js'
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import {verifyUser} from './middleware/verifyUser.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())
app.use('/api', authRouter)
app.use('/api/product', verifyUser, productRouter)
app.use('/api/category', categoryRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})