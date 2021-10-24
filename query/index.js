const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//data structure
// posts = {
//   j123sdv: {
//     id: 'j123sdv',
//     title: 'post title',
//     comments: [
//       {
//         id: 'ascasca',
//         content: 'comment!'
//       }
//     ]
//   },
//   ksjdnvs: {
//     id: 'ksjdnvs',
//     title: 'post title',
//     comments: [
//       {
//         id: 'ksjndck',
//         content: 'comment!'
//       }
//     ]
//   }
// }

const posts = {}

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { postId, title } = data

    posts[postId] = { postId, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data

    const post = posts[postId]
    post.comments.push({
      id,
      content,
      status
    })
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data

    const post = posts[postId]
    const comment = post.comments.find((comment) => {
      return comment.id === id
    })

    comment.status = status
    comment.content = content
  }
}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  handleEvent(type, data)

  //console.log(posts)
  res.send({})
})

app.listen(4002, async () => {
  console.log('Listening on 4002')

  const res = await axios.get('http://localhost:4005/events')

  console.log('got the events', res.data)

  for (let event of res.data) {
    console.log('Processing event:', event.type)

    handleEvent(event.type, event.data)
  }
})
