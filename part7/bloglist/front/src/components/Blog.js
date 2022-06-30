import { React } from 'react'
import { useDispatch } from 'react-redux'
import { voteBlogs, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/'

import { Button } from './Button'
import { UlStyle, LiStyle } from './ListStyle'
import { Form, Input } from './FormStyle'
import { StyledAnchor } from './StyledAnchor'

const Blog = ({ blog }) => {
  if (!blog) {
    return null
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const comment = useField('text')

  const handleVote = (blog) => {
    dispatch(voteBlogs(blog))
  }

  const handleRemoveBlog = (blog) => {
    dispatch(deleteBlog(blog.id, blog.title))
    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog, comment.value))
    comment.input.clear()
  }

  return (
    <div className="blog">
      <h2>blog app</h2>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>
        <StyledAnchor href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </StyledAnchor>
        <div>
          {blog.likes} likes
          <Button buttonLeftMargin="20px" onClick={() => handleVote(blog)}>
            add likes
          </Button>
        </div>
      </div>
      <p>Added By {blog.user.username}</p>

      <h3>comments</h3>
      <Form onSubmit={handleAddComment}>
        <Input {...comment} />
        <Button type="submit" buttonLeftMargin="20px">
          add comment
        </Button>
      </Form>
      <UlStyle>
        {blog.comments.map((comment, index) => (
          <LiStyle key={index}>{comment.comment}</LiStyle>
        ))}
      </UlStyle>
      <Button absolute bottom onClick={() => handleRemoveBlog(blog)}>
        Delete Blog
      </Button>
    </div>
  )
}

export default Blog
