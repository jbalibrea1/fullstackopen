import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [country, setCountry] = useState([])
  const [countryFull, setCountryFull] = useState([])
  const [newChange, setNewChange] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then(response => {
      setCountryFull(response.data)
      setCountry(response.data)
    })
  }, [])

  const handleFilterChange = event => {
    setNewChange(event.target.value)
    const fix = new RegExp(event.target.value, 'i')
    const filter = countryFull.filter(country => country.name.match(fix))
    setCountry(filter)
  }

  const handleSwitchCountry = countryN => {
    console.log('llega al boton', countryN)
    const filterv2 = countryFull.filter(country => country.name.match(countryN))
    setCountry(filterv2)
    setNewChange(countryN)
  }

  return (
    <div>
      <Filter value={newChange} onChange={handleFilterChange} />
      <Country country={country} handleSwitchCountry={handleSwitchCountry} />
    </div>
  )
}

export default App
