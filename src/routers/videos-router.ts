import {Request, Response,  Router} from 'express';

export const videosRouter = Router({})

const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
  ]

  videosRouter.get('/', (req : Request, res : Response) => {
    res.status(200).send(videos)
  })

  videosRouter.get('/:videoId', (req : Request, res : Response) => {
    if(req.params.videoId === '') {
      res.status(400).send({
        errorsMessages: [
          {
            message: "Incorrect id",
            field: "title"
          }
        ]
      })
    } else {
      const id : Number = +req.params.videoId
      let videoElem = videos.find((v) => v.id === id)
      if(videoElem) {
        res.status(200).send(videoElem)
      } else {
        res.status(404).send({
          errorsMessages: [
            {
              message: "Incorrect id",
              field: "title"
            }
          ],
          resultCode: 1
        })
      }
    }
  })

  videosRouter.post('/', (req : Request, res : Response) => {
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
        ]
      })
    }
  })

  videosRouter.put('/:index', (req : Request, res: Response) => {
    if(req.params.index) {
      const ind = videos.findIndex(item => +req.params.index  === +item.id)
      if(ind !== -1 && typeof req.body.title === 'string' && req.body.title.length <= 40) {
        videos[ind].title = req.body.title
        res.status(204).send(videos[ind])
      } else if (req.body.title === null || req.body.title.length > 40) {
          res.status(400).send({
            errorsMessages: [
              {
                message: "Incorrect title",
                field: "title"
              }
            ]
          })
      } else{
        res.status(404).send({
          errorsMessages: [
            {
              message: "Incorrect title",
              field: "title"
            }
          ]
        })
      }
    } else {
      res.status(400).send({
        errorsMessages: [
          {
            message: "Incorrect id",
            field: "title"
          }
        ]
      })
    }
  })
  videosRouter.delete('/:index', (req : Request, res: Response) => {
    if(req.params.index === '') {
      res.status(400).send({
        errorsMessages: [
          {
            message: "Incorrect id",
            field: "title"
          }
        ]
      })
    } else {
      const ind = videos.findIndex(item => +req.params.index  === +item.id)
      if(ind === -1 ) {
        res.status(404).send({
          errorsMessages: [
            {
              message: "Incorrect id",
              field: "title"
            }
          ]
        })
      } else {
        videos.splice( ind, 1)
        res.status(204).send()
      }
    }
  })