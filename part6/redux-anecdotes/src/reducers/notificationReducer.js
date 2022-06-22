import { createSlice } from '@reduxjs/toolkit'

let timeout
const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    },
  },
})

export const { showNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return (dispatch) => {
    window.clearTimeout(timeout)
    dispatch(showNotification(notification))
    timeout = window.setTimeout(
      () => dispatch(showNotification(initialState)),
      time * 1000
    )
  }
}

export default notificationSlice.reducer
