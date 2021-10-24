const express = require('express')

const axios = require('axios')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved'

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    })
  }

  res.send({})
})

app.listen(4003, () => {
  console.log('Listening on 4003')
})
