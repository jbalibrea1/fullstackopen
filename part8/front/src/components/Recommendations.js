import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = ({ show }) => {
  const book = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (!show) return null
  if (book.loading || user.loading) return <div>loading...</div>

  const { allBooks } = book.data
  const favoriteGenre = user?.data?.me?.favoriteGenre
  console.log('user', user)
  console.log('fav', favoriteGenre)

  const bookRecommended = allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>recommendations</h2>
      {bookRecommended.length > 0 ? (
        <>
          <p>
            books in your favorite genre <b>{favoriteGenre}</b>
          </p>

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {bookRecommended.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <p>
            No books with your preferences <b>{favoriteGenre}</b>
          </p>
        </>
      )}
    </div>
  )
}

export default Recommendations
