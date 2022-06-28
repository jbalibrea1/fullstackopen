import React from 'react'
import { useSelector } from 'react-redux'
// import { voteAnecdotes } from '../reducers/anecdoteReducer'
// import { setNotification } from '../reducers/notificationReducer'
import Blog from '../components/Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  // const filter = useSelector((state) => state.filter)
  // const dispatch = useDispatch()

  // const vote = (anecdote) => {
  //   dispatch(voteAnecdotes(anecdote.id))
  //   dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  // }

  // FALTA short a - b
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
