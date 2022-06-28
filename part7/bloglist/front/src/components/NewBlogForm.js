import { React } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const NewBlog = () => {
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const newBlog = {
      title,
      author,
      url,
    }
    dispatch(createBlog(newBlog))
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input type="text" name="title" id="blog-title" />
        </div>
        <div>
          author
          <input type="text" name="author" id="blog-author" />
        </div>
        <div>
          url
          <input type="text" name="url" id="blog-url" />
        </div>
        <button type="submit" id="blog-create">
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
