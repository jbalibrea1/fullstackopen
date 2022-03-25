const Note = ({ content, date }) => {
  return (
    <div>
      <li>{content}</li>
      <time>{date}</time>
    </div>
  )
}

export default Note
