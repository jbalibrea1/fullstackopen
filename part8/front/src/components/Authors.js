import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = ({ show, authors, setError }) => {
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthday authors={authors} setError={setError} />
    </div>
  )
}

const SetBirthday = ({ authors, setError }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')
  const options = authors.map((a) => ({ value: a.name, label: a.name }))

  const [editBorn, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()

    editBorn({
      variables: { name: selectedOption.value, SetBornTo: parseInt(born) },
    })

    setSelectedOption(null)
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found')
    }
  }, [result.data]) //eslint-disable-line
  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={selectedOption}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          <span>born</span>
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </>
  )
}

export default Authors
