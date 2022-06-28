import { React,  useEffect, useRef } from 'react'

import Notification from './components/Notification'

import Togglable from './components/Togglable'

import NewBlog from './components/NewBlogForm'
import LoginForm from './components/LoginForm'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser,logout  } from './reducers/loginReducer'
import { initializeAllUsers } from './reducers/usersReducer'

import BlogList from './components/BlogList'
// import UsersInfo from './components/UsersInfo'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const newBlogRef = useRef()

  const disconnect = () => {
    console.log('DII')
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <Togglable buttonLabel="Login">
            <LoginForm/>
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            <p>
              {user} logged in <button onClick={disconnect}>logout</button>
            </p>
            <Notification />
          </div>
          <h2>create new</h2>
          <Togglable buttonLabel="New Blog" ref={newBlogRef}>
            <NewBlog />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
