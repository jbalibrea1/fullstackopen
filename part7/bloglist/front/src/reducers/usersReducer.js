import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []
const userReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsers(state, action) {
      state = action.payload
      return state
    },
    reset: () => initialState,
  },
})

export const { setUsers, reset } = userReducer.actions

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default userReducer.reducer
