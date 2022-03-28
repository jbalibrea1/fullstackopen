const Note = ({ name, number, id, delUser }) => {
  return (
    <div>
      <p>
        {name} {number}{' '}
        <button
          onClick={() => {
            delUser(id, name)
          }}
        >
          delete
        </button>
      </p>
    </div>
  )
}

export default Note
