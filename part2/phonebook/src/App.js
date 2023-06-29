import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Filter from './components/Filter'
import ShowAll from './components/ShowAll'
import ShowPerson from './components/ShowPerson'

const App = () => {
  /* State inits */
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('add a name...')
  const [newNumber, setNewNumber] = useState('add a phonenumber...')
  const [nameList, setNameList] = useState([])
  const [numberList, setNumberList] = useState([])
  const [filterName, setFilterName] = useState('')

  // Fecth stored data from database
  // 2.11 
  useEffect( () => {
    console.log("effect")
    numberService //2.13
      .getAll()
      .then(response => {
        console.log("promise fulfulled")
        setPersons(response.data)
      })
  }, [])
  console.log("render", persons.length, "notes")
    
  /* Event handlers */
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterName = (event) => setFilterName(event.target.value)



  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}
    // 2.7 check if the name is already in the phonebook
    if (nameList.includes(personObject.name)) { //check if nameObject.name already in namaeList, returns true if so
        alert(`${newName} is already added to phonebook`)

    } else { // continue normal execution 
        // 2.12 update info in server also
        numberService // 2.13
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(personObject))
            setNameList(nameList.concat(personObject.name))
            setNumberList(numberList.concat(personObject.number))
            setNewName('add a name...')      
            setNewNumber('add a phonenumber...')
          })
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input 
        value={filterName}
        onChange={handleFilterName}
        />

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input 
          value={newName}
          onChange={handleNameChange}
        /></div>
        <div>number: <input
          value={newNumber}
          onChange={handleNumberChange}
        /></div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <Filter filterName={filterName} persons={persons} />
    </div>
  )
}

export default App