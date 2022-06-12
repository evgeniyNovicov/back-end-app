import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express()
const port = process.env.PORT || 5000

const videos = [
  {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
  {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
  {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
  {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
  {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req : Request, res : Response) => {
  res.send("videos")
})

app.get('/videos', (req : Request, res : Response) => {
  res.send(videos)
})

app.get('/videos/:videoId', (req : Request, res : Response) => {
  const id : Number = +req.params.videoId
  let videoElem = videos.find((v) => v.id === id)
  res.send(videoElem)
})

app.post('/videos', (req : Request, res : Response) => {
  const video = {id: +(Date.now()), title: req.body.title, author: 'it-incubator.eu'};
  videos.push(video)
  res.send(videos)
})

app.put('/videos/:index', (req : Request, res: Response) => {
  const ind = videos.findIndex(item => +req.params.index  === +item.id)
  videos[ind].title = req.body.title
  res.send(videos[ind])
})

app.delete('/videos/:index', (req : Request, res: Response) => {
  const ind = videos.findIndex(item => +req.params.index  === +item.id)
  if(ind === -1) {
    res.send('Такого видео нет')
  } else {
    const newVideos = videos.splice( ind, 1)
    res.send(newVideos)
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})