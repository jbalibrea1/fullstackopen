import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    user: loginReducer,
    blogs: blogReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
})

export default store
