import express from 'express'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'
import userRoutes from './routes/userRouter.js'
import errorHandler from './middleware/errorMiddleware.js'
import connectDB from './config/dbConnection.js'
dotenv.config()
const app = express()
connectDB()
app.use(express.json())
app.use('/api/contacts',contactRoutes)
app.use('/api/users',userRoutes)
app.use(errorHandler)

const port  = process.env.PORT
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})