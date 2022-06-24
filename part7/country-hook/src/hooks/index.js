import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
export const useCountry = (name) => {
  console.log('🚀 ~ file: index.js ~ line 18 ~ useCountry ~ name', name)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      console.log('hola')
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then((response) => {
          console.log(
            '🚀 ~ file: index.js ~ line 27 ~ .then ~ response',
            response
          )
          setCountry(response.data[0])
        })
        .catch((error) => {
          setCountry(null)
        })
    }
  }, [name])

  return country
}
