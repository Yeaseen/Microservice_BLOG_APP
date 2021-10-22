import React, { useState, useEffect } from 'react'

import axios from 'axios'

import CommentCreate from './CommentCreate'
import CommentList from './CommentList'
const PostList = () => {
  const [posts, setPosts] = useState({})

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts')

    setPosts(res.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  //console.log(posts)

  const renderedPosts = Object.values(posts).map((post) => {
    //console.log(post.postId)
    return (
      <div
        key={post.postId}
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.postId} />
          <CommentCreate postId={post.postId} />
        </div>
      </div>
    )
  })

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  )
}

export default PostList
