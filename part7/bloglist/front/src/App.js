import { React,  useEffect } from 'react'

import Notification from './components/Notification'

import Togglable from './components/Togglable'


import LoginForm from './components/LoginForm'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser,logout  } from './reducers/loginReducer'
import { initializeAllUsers } from './reducers/usersReducer'
import { Routes, Route, useMatch, Link } from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UsersInfo from './components/UsersInfo'
import UserList from './components/UserList'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
  }, [dispatch])



  const disconnect = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
  }

  const userMatch = useMatch('/users/:id')
  const userMatchId = userMatch
    ? users.find((users) => users.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogMatchId = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const stylePadding = {
    paddingRight: 5,
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
          <Link to="/" style={stylePadding}>
          blogs
          </Link>
          <Link to="/users" style={stylePadding}>
            users
          </Link>
          <em>{user} logged in</em> <button onClick={disconnect}>logout</button>
          <div>
            <Notification />
          </div>
          <Routes>
            <Route path="/"
              element={ <BlogList />}
            />
            <Route  path="/users/"
              element={ <UsersInfo/>}/>
            <Route  path="/users/:id"
              element={<UserList blogUser={userMatchId}/>}
            />
            <Route  path="/blogs/:id"
              element={<Blog blog={blogMatchId}/>}
            />

          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
