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

app.get('/videos', (req : Request, res : Response) => {
  res.status(200).send(videos)
})

app.get('/videos/:videoId', (req : Request, res : Response) => {
  const id : Number = +req.params.videoId
  let videoElem = videos.find((v) => v.id === id)
  if(videoElem) {
    res.status(200).send(videoElem)
  } else {
    res.status(404).send({
      errorsMessages: [
        {
          message: "Incorrect id",
          field: "id"
        }
      ],
      resultCode: 1
    })
  }
})

app.post('/videos', (req : Request, res : Response) => {
  if(typeof req.body.title === 'string' &&  req.body.title.trim() && req.body.title.length <= 40 ) {
    const video = {id: +(Date.now()), title: req.body.title, author: 'it-incubator.eu'};
    videos.push(video)
    res.status(201).send(video)
  } else {
    res.status(400).send({
      errorsMessages: [
        {
          message: "Incorrect title",
          field: "title"
        }
      ],
      resultCode: 1
    })
  }
})

app.put('/videos/:index', (req : Request, res: Response) => {
  if(+req.params.index) {
    const ind = videos.findIndex(item => +req.params.index  === +item.id)
    if(ind !== -1 && typeof req.body.title === 'string') {
      videos[ind].title = req.body.title
      res.status(204).send(videos[ind])
    } else {
      res.status(400).send({
        errorsMessages: [
          {
            message: "Incorrect id",
            field: "id"
          }
        ],
        resultCode: 1
      })
    }
  }
})

app.delete('/videos/:index', (req : Request, res: Response) => {
  const ind = videos.findIndex(item => +req.params.index  === +item.id)
  if(ind === -1) {
    res.status(404).send('Такого видео нет')
  } else {
    const newVideos = videos.splice( ind, 1)
    res.status(204).send()
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})