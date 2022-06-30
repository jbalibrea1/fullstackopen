import { React, useRef } from 'react'
import { useSelector } from 'react-redux'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

import { UlStyle, StyleLinkList, LiStyle } from './ListStyle'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const newBlogRef = useRef()

  const blogsForSort = [...blogs]

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="create new" ref={newBlogRef}>
        <BlogForm />
      </Togglable>
      <UlStyle>
        {blogsForSort
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <LiStyle key={blog.id}>
              <StyleLinkList to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </StyleLinkList>
            </LiStyle>
          ))}
      </UlStyle>
    </div>
  )
}

export default BlogList
