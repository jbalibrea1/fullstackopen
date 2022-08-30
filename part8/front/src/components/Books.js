import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)
  const [genreFilter, setGenreFilter] = useState(null)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!show) return null
  if (result.loading) return <div>loading...</div>

  const { allBooks } = result.data

  const uniquesGenres = [...new Set(allBooks.flatMap((b) => b.genres))]

  const handleGenre = (genre = null) => {
    setGenreFilter(genre)
    if (!genre) {
      setBooks(allBooks)
    } else {
      const filter = allBooks.filter((book) => book.genres.includes(genre))
      setBooks(filter)
    }
  }

  return (
    <div>
      <h2>books</h2>
      {genreFilter ? (
        <p>
          in genre <strong>{genreFilter}</strong>{' '}
        </p>
      ) : (
        ''
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniquesGenres.map((genre) => (
          <button key={genre} onClick={() => handleGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleGenre()}>all genres</button>
      </div>
    </div>
  )
}

export default Books
