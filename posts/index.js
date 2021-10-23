const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const postId = randomBytes(4).toString('hex')
  const { title } = req.body
  posts[postId] = {
    postId,
    title
  }

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      postId,
      title
    }
  })

  res.status(201).send(posts[postId])
})

app.post('/events', (req, res) => {
  console.log('Received  Event', req.body.type)

  res.send({})
})
app.listen(4000, () => {
  console.log('Listening on 4000')
})
