const Note = ({ name, number, id }) => {
  const delUser = (id, name) => {
    window.confirm(`Delete ${id.name}`)
    console.log('iod', id)
  }
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
