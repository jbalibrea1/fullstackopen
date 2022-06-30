import { React, useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from '../components/Togglable'
import { Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const newBlogRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogsForSort = [...blogs]

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="create new" ref={newBlogRef}>
        <BlogForm />
      </Togglable>
      {blogsForSort.sort((a, b) => b.likes - a.likes).map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
