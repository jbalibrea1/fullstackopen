import { React,  useEffect, useRef } from 'react'

import Notification from './components/Notification'

import Togglable from './components/Togglable'

import NewBlog from './components/NewBlogForm'
import LoginForm from './components/LoginForm'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser,logout  } from './reducers/loginReducer'
import { initializeAllUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch, Link } from 'react-router-dom'

import BlogList from './components/BlogList'
import UsersInfo from './components/UsersInfo'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

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

  const match = useMatch('/users/:id')
  const userMatchId = match
    ? users.find((users) => users.id === match.params.id)
    : null

  console.log('userMatchId',userMatchId)


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
          <Link to="/users">
          users
          </Link>
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

          <Routes>
            <Route path="/"
              element={ <BlogList />}
            />
            <Route  path="/users/"
              element={ <UsersInfo/>}/>
            <Route  path="/users/:id"
              element={<UserList blogUser={userMatchId}/>}
            />

          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
