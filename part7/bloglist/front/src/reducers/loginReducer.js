import blogService from '../services/blogs'
import loginService from '../services/login'
import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from '../reducers/notificationReducer'

const initialState = null
const authReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload.username
      return state
    },
    reset: () => initialState,
  },
})
export const { setUser, reset } = authReducer.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification(null))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'warning', 5))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(reset())
  }
}

export default authReducer.reducer
