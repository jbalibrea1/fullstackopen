import { createSlice } from '@reduxjs/toolkit'

let timeout
const initialState = { type: null, msg: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log('action.payload ', action)
      const type = action.payload.type
      const msg = action.payload.notification
      state = { type: type, msg: msg }

      return state
    },
    reset: () => initialState,
  },
})

export const { showNotification, reset } = notificationSlice.actions

export const setNotification = (notification, type, time) => {
  return (dispatch) => {
    if(notification===null){dispatch(reset())}
    clearTimeout(timeout)
    dispatch(showNotification({ notification, type }))
    timeout = setTimeout(() => dispatch(reset()), time * 1000)
  }
}

export default notificationSlice.reducer
