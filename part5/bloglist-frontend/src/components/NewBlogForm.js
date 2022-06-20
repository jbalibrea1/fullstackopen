import { useState, React } from 'react'

const NewBlog = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
            id="blog-title"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
            id="blog-author"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
            id="blog-url"
          />
        </div>
        <button type="submit" id="blog-create">
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlog
