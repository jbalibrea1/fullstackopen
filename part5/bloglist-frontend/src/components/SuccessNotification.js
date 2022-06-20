import React from 'react'
const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="notification success">{message}</div>
}

export default SuccessNotification
