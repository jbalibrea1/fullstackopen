import { React } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks/'

import { Button } from './Button'
import { Form, Input } from './FormStyle'

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
    <>
      <Form onSubmit={addBlog}>
        <div>
          <Input {...title} placeholder="Title" />
          <Input {...author} placeholder="author" />
          <Input {...url} placeholder="Url" />
        </div>
        <div>
          <Button type="submit" id="blog-create">
            create
          </Button>
        </div>
      </Form>
    </>
  )
}

export default BlogForm
