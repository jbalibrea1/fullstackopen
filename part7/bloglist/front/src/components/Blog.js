import { useState, React } from 'react'
import { useDispatch } from 'react-redux'
import { voteBlogs, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const vote = (blog) => {
    dispatch(voteBlogs(blog))
    dispatch(setNotification(`you voted '${blog.title}'`, 'success', 10))
  }

  const removeBlog = (blog) => {
    dispatch(deleteBlog(blog.id))
    dispatch(
      setNotification(
        `Blog  '${blog.title}' deleted successfully`,
        'warning',
        10
      )
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="titleAndAuthor">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'close' : 'view'}</button>
      </div>
      {visible ? (
        <div>
          <p>url: {blog.url}</p>
          <p>
            likes: {blog.likes}
            <button onClick={() => vote(blog)}>add likes</button>
          </p>
          <button onClick={() => removeBlog(blog)}>Delete</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Blog
