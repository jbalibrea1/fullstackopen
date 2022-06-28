import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  const { msg } = notification
  const { type } = notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (type === null) {
    return null
  }

  return (
    <div style={style} className={type}>
      {msg}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
