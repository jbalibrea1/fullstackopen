import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const FullDir = ({ country }) => {
  const [weather, setWeather] = useState([])
  const cnt = country[0]
  const capital = cnt.capital
  console.log('weather', weather)

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: capital,
  }
  console.log('param,', params)
  useEffect(() => {
    console.log('promesa')
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => {
        const apiResponse = response.data
        console.log('promise fulfilled')
        setWeather(apiResponse)
      })
      .catch(error => {
        console.log('ERROR:', error)
      })
  }, [])

  if (weather.length === 0) {
    return 'Loading...'
  }

  return (
    <div>
      <h1>{cnt.name}</h1>
      <p>capital {cnt.capital}</p>
      <p>population {cnt.population}</p>
      <h2>languages</h2>
      <ul>
        {cnt.languages.map(lang => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={cnt.flags.png} alt={country.name}></img>
      <h2>Weahter in {capital}</h2>
      <p>
        <b>temperature: {weather.current.temperature} ℃</b>
      </p>
      <img src={weather.current.weather_icons}></img>
      <p>
        <b>wind: </b>
        {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </p>
    </div>
  )
}

export const Dir = ({ country, handleSwitchCountry }) => {
  return (
    <div>
      <p>
        {country}
        <button onClick={() => handleSwitchCountry(country)}>Show</button>
      </p>
    </div>
  )
}
