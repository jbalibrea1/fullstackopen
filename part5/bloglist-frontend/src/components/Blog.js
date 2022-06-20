import { useState, React } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const removeBlog = () => {
    deleteBlog(blog)
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
            <button onClick={addLike}>add likes</button>
          </p>
          <button onClick={removeBlog}>Delete</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Blog
