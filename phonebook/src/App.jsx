import { useState, useEffect } from 'react'
import axios from 'axios'
import Notification from './components/Notification'

const Filter = (props) => {
  return (
  <div>
    <form>
      {props.text} <input  value={props.value} onChange={props.change}/>
    </form>
  </div>
  )
}

const AddContact = (props) => {
  return(
    <div>
      <h2>Add a new contact</h2>
      <form>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button 
          type="submit" onClick={props.addPerson}>add</button>
        </div>
      </form>
    </div>
  )
}

const Numbers = (props) => {
  return (
  <div>
    <h2>Numbers</h2>
        <div>
          {props.persons.map(person => {
            if (person.name.toLowerCase().includes(props.search.toLowerCase()) === true) {
              return (
                <div 
                  key={person.name}>{person.name} {person.number} {' '}
                  <button onClick={() => props.removePerson(person)}>delete</button>
                </div>
            )
          }
        })} 
        </div>
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const addPerson = (event) => {
    console.log('person added')
    event.preventDefault()
    const personObject =
    {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      console.log(`${newName} is already added to phonebook`)
      const person = persons.find(p => p.name ===newName)

      if (window.confirm(`${newName} is already added to phonebook, 
        replace the old number with a new one?`))
        axios
          .put(`http://localhost:3001/api/persons/${person.id}`, personObject)
          .then(response =>{
            console.log(response.data)
            setPersons(persons.map(p => {
              if (p.id === person.id) {
                return response.data
              } else {
                return p
              }
            }))
            setNewName('')
            setNewNumber('')
          })
    } else {
      axios
        .post(`http://localhost:3001/api/persons`, personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
            setErrorMessage(
              'Person was added'
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
        })
    }
  } 

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      console.log('person deleted')
      axios
        .delete(`http://localhost:3001/api/persons/${person.id}`)
        .then(() => {
          setPersons(p => p.filter(thisperson => thisperson.id !== person.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter text='filter shown with' value={search} change={handleSearchChange}/>
      <AddContact newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addPerson={addPerson}/>
      <Numbers persons={persons} search={search} removePerson={removePerson}/>
    </div>
  )

}

export default App