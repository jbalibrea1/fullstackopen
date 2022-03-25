import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/personForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)
  const [newChange, setNewChange] = useState('')
  // const [notes, setNotes] = useState([])

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'notes')

  const addUser = event => {
    event.preventDefault()
    const user = {
      name: newName,
      number: newNumber,
    }
    const personExist = persons.find(x => x.name === user.name)
    if (personExist !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(user))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
    console.log(newName)
  }
  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setNewChange(event.target.value)
    const fix = new RegExp(event.target.value, 'i')
    const filterpersons = persons.filter(person => person.name.match(fix))
    setFilterPersons(filterpersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newChange} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addUser}
        valueName={newName}
        onChangeName={handleNameChange}
        valueNumber={newNumber}
        onChangeNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      {newChange === '' ? (
        <Persons persons={persons} />
      ) : (
        <Persons persons={filterPersons} />
      )}
    </div>
  )
}

export default App
