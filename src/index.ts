import express from 'express';
import cors from 'cors';
import {videosRouter} from './routers/videos-router'
import bodyParser from 'body-parser';
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use('/videos', videosRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})