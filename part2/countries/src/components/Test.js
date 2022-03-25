import { useState, useEffect } from 'react'
import axios from 'axios'

export const Full = ({ country }) => {
  const [aloneCountry, setAloenCountry] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => {
        setAloenCountry(response.data)
      })
  }, [])
  console.log('ALONE', aloneCountry)

  const Test = ({ name }) => {
    console.log('NAME', name)
    return <p>{name}</p>
  }

  return (
    <div>
      {aloneCountry.map((name, i) => (
        <Test key={i} name={name} />
      ))}
    </div>
  )
}
