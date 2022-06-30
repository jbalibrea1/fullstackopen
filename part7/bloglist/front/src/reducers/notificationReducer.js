import { createSlice } from '@reduxjs/toolkit'

let timeout
const initialState = { type: null, msg: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      const { type, msg } = action.payload
      state = { type, msg }
      return state
    },
    reset: () => initialState,
  },
})

export const { showNotification, reset } = notificationSlice.actions

export const setNotification = (msg, type, time) => {
  return (dispatch) => {
    if (!msg) {
      dispatch(reset())
    }
    clearTimeout(timeout)
    dispatch(showNotification({ msg, type }))
    timeout = setTimeout(() => dispatch(reset()), time * 1000)
  }
}

export default notificationSlice.reducer
