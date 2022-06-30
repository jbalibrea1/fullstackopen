import {  React } from 'react'
import { useDispatch } from 'react-redux'
import { voteBlogs, deleteBlog,commentBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/'

const Blog = ({ blog }) => {
  if(!blog){
    return null
  }

  const dispatch = useDispatch()
  const comment = useField('text')

  const handleVote = (blog) => {
    dispatch(voteBlogs(blog))
  }

  const handleRemoveBlog = (blog) => {
    dispatch(deleteBlog(blog.id, blog.title))
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog, comment.value))
    comment.input.clear()
  }

  return (
    <div className="blog">
      <h2>blog app</h2>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={() => handleVote(blog)}>add likes</button></p>
        <button onClick={() => handleRemoveBlog(blog)}>Delete</button>
      </div>
      <p>Added By {blog.user.username}</p>
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input {...comment}/>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
