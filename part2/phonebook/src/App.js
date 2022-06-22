import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/personForm'
import Persons from './components/Persons'
import service from './services/persons'
import { Notification } from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)
  const [newChange, setNewChange] = useState('')

  const [msg, setNewMsg] = useState(null)

  useEffect(() => {
    service.getAll().then(initialPersons => {
      setPersons(initialPersons)
      // setFilterPersons(initialPersons)
    })
  }, [])

  // add || update person
  const addUser = event => {
    event.preventDefault()
    const user = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    // Update
    const personName = persons.map(n => n.name)
    if (personName.includes(newName)) {
      const oldPerson = persons.filter(e => e.name === newName)
      const oldId = oldPerson[0].id
      const updatePerson = { ...oldPerson[0], number: newNumber }
      const pop = window.confirm(
        ` ${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (pop === true) {
        service
          .update(oldId, updatePerson)
          .then(returnedPersons => {
            setPersons(
              persons.map(person =>
                person.id !== oldId ? person : returnedPersons
              )
            )
            setNewMsg({ show: `Updated ${newName}`, color: 'green' })
            setTimeout(() => {
              setNewMsg(null)
            }, 5000)
          })
          .catch(err => {
            console.log('error', err)
            setPersons(persons.filter(n => n.id !== oldId))
            setNewMsg({
              show: `Information of ${newName} has already been removed from server`,
              color: 'red',
            })
            setTimeout(() => {
              setNewMsg(null)
            }, 5000)
          })
        setNewName('')
        setNewNumber('')
      }
    } else {
      // add
      service
        .create(user)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewMsg({ show: `Added ${newName}`, color: 'green' })
          setTimeout(() => {
            setNewMsg(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)
          const errorVal = Object.values(error.response.data)
          console.log(errorVal)
          setNewMsg({ show: `${errorVal}`, color: 'red' })
          setTimeout(() => {
            setNewMsg(null)
          }, 5000)
        })
    }
  }

  // delete Person
  const delUser = (id, name) => {
    const popup = window.confirm(`Delete ${name}`)
    if (popup === true) {
      service
        .del(id)
        .then(response => {
          setNewMsg({ show: `${name} removed from server`, color: 'green' })
          setTimeout(() => {
            setNewMsg(null)
          }, 5000)
        })
        .catch(err => {
          console.log(err)
          setNewMsg({
            show: `Information of ${name} has already been removed from server`,
            color: 'red',
          })
          setTimeout(() => {
            setNewMsg(null)
          }, 5000)
        })
      setPersons(persons.filter(x => x.id !== id))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
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
      <Notification message={msg} />
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
        <Persons persons={persons} delUser={delUser} />
      ) : (
        <Persons persons={filterPersons} delUser={delUser} />
      )}
    </div>
  )
}

export default App
