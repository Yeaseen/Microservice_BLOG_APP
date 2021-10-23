const express = require('express')
const cors = require('cors')

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

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  if (type === 'PostCreated') {
    const { postId, title } = data

    posts[postId] = { postId, title, comments: [] }
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data

    const post = posts[postId]
    post.comments.push({
      id,
      content
    })
  }

  console.log(posts)
  res.send({})
})

app.listen(4002, () => {
  console.log('Listening on 4002')
})
