import { React, useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import SuccesNotification from './components/SuccessNotification'
import Togglable from './components/Togglable'

import NewBlog from './components/NewBlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successNotification, setSuccessNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (createBlog) => {
    try {
      newBlogRef.current.toggleVisibility()
      await blogService.create(createBlog).then((returnedBlogs) => {
        setBlogs(blogs.concat(returnedBlogs))
        setSuccessNotification(
          `a new blog ${createBlog.title} by ${createBlog.author}`
        )
        setTimeout(() => {
          setSuccessNotification(null)
        }, 5000)
      })
    } catch (exception) {
      setErrorMessage(`cant add a new blog called ${createBlog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogUpdate) => {
    try {
      await blogService.update(blogUpdate.id, {
        title: blogUpdate.title,
        author: blogUpdate.author,
        url: blogUpdate.url,
        likes: blogUpdate.likes,
      })

      setSuccessNotification(
        `Blog update ${blogUpdate.title} by ${blogUpdate.author}`
      )
      setTimeout(() => {
        setSuccessNotification(null)
      }, 5000)
      setBlogs(
        blogs.map((blogs) => (blogs.id !== blogUpdate.id ? blogs : blogUpdate))
      )
    } catch (exception) {
      setErrorMessage(`Cant update ${blogUpdate.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (deleteBlog) => {
    const popup = window.confirm(
      `Remove ${deleteBlog.title} by ${deleteBlog.author} ?`
    )
    try {
      if (popup) {
        console.log('hola', deleteBlog)
        blogService.deleteBlog(deleteBlog.id)
        setSuccessNotification(`Blog  ${deleteBlog.title} deleted successfully`)
        setTimeout(() => {
          setSuccessNotification(null)
        }, 5000)
        setBlogs(blogs.filter((blog) => blog.id !== deleteBlog.id))
      }
    } catch (exception) {
      setErrorMessage(`Cant delete ${deleteBlog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const newBlogRef = useRef()

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification message={errorMessage} />
          <Togglable buttonLabel="Login">
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              handleUserName={({ target }) => setUsername(target.value)}
              password={password}
              handlePassword={({ target }) => setPassword(target.value)}
            />
          </Togglable>
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            <p>
              {user.name} logged in <button onClick={logout}>logout</button>
            </p>
            <SuccesNotification message={successNotification} />
          </div>
          <h2>create new</h2>
          <Togglable buttonLabel="New Blog" ref={newBlogRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default App
