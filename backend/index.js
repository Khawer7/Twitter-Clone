import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './config/database.js'
import userRoute from './routes/userRoute.js'
import tweetRoute from './routes/tweetRoute.js'
import cors from 'cors'

import cookieParser from 'cookie-parser'

dotenv.config({
  path: '.env'
})

databaseConnection();

const app = express()
const port = process.env.PORT;

const corsOptions = {
  origin : 'http://localhost:5173',
  credentials : true
};

app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions));
app.use("/api/v1/user",userRoute)
app.use("/api/v1/tweet",tweetRoute)


app.get('/', (req, res) => {
console.log(req.cookies);
  res.send(`Hello World! ${process.env.PORT}`)
})


app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`)
})