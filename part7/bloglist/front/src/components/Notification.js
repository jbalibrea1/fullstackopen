import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const { msg,type } = props.notification

  if (!type) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
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
