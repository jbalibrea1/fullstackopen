export const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className={`notification ${message.color}`}>{message.show}</div>
}
