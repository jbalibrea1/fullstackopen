import { React } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/'

const BlogForm = () => {
  const dispatch = useDispatch()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    dispatch(createBlog(newBlog))
    title.input.clear()
    author.input.clear()
    url.input.clear()
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input {...title}/>
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url
          <input {...url}/>
        </div>
        <button type="submit" id="blog-create">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
