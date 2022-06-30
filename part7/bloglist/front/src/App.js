import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch, useNavigate } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/loginReducer'
import { initializeAllUsers } from './reducers/usersReducer'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UsersInfo from './components/UsersInfo'
import UserList from './components/UserList'

import GlobalStyle from './components/GlobalStyles'
import { Button } from './components/Button'
import { NavBar } from './components/NavBar'
import { StyledLink } from './components/StyledLink'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    navigate('/')
  }

  const userMatch = useMatch('/users/:id')
  const userMatchId = userMatch
    ? users.find((users) => users.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogMatchId = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <GlobalStyle />
      {user === null ? (
        <div>
          <h1>Log in to application</h1>
          <Notification />
          <Togglable buttonLabel="Login">
            <LoginForm />
          </Togglable>
        </div>
      ) : (
        <div>
          <NavBar>
            <div>
              <StyledLink to="/">blogs</StyledLink>
              <StyledLink to="/users">users</StyledLink>
            </div>
            <div>
              <em>{user} logged in</em>{' '}
              <Button onClick={disconnect}>logout</Button>
            </div>
          </NavBar>
          <div>
            <Notification />
          </div>

          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users/" element={<UsersInfo />} />
            <Route
              path="/users/:id"
              element={<UserList blogUser={userMatchId} />}
            />
            <Route path="/blogs/:id" element={<Blog blog={blogMatchId} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
