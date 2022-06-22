import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector((state) => state.notification)
  console.log('props', props)
  console.log('props.notification', props.notification)
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  if (notification == null) {
    return null
  }
  return <div style={style}>{notification}</div>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
