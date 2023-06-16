import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '041-1234567'},
    { name: 'Ada Lovelace', number: '044-3456997'}
  ]) 
  const [newName, setNewName] = useState('add a name...')
  const [newNumber, setNewNumber] = useState('add a phonenumber...')
  const [nameList, setNameList] = useState([persons[0].name, persons[1].name])
  const [numberList, setNumberList] = useState([persons[0].number, persons[1].number])
  const [filterName, setFilterName] = useState()
  

  // Display components
  const Name = (props) => <div>{props.name} {props.number}</div>

  // Components for changing the phonebook list
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber}

    // 2.7 check if the name is already in the phonebook
    if (nameList.includes(personObject.name)) { //check if nameObject.name already in namaeList, returns true if so
      alert(`${newName} is already added to phonebook`)

    } else { // continue normal execution 
      setPersons(persons.concat(personObject))
      setNameList(nameList.concat(personObject.name))
      setNumberList(numberList.concat(personObject.number))
      setNewName('add a name...')      
      setNewNumber('add a phonenumber...')
    }
  }

  // 2.9* Component for displaying persons depending on filter
  const ShowPersons = (props) => {
    // IF statement to check if filter condition is ''
    if (filterName === undefined) {
      // No filter was selected, display content as usual
      return (
        <div>
          {props.persons.map(element => <Name 
            key={element.name} 
            name={element.name} 
            number={element.number} /> )} 
        </div>
      )
    } else if (filterName === '') {
      // No filter was selected, display content as usual
      return (
        <div>
          {props.persons.map(element => <Name 
            key={element.name} 
            name={element.name} 
            number={element.number} /> )} 
        </div>
      )
    } 
    else {
      // Something was typed into the filter, display content accordingly
      return (
        <div>
          {props.persons.filter(person => person.name.toUpperCase().includes(filterName.toUpperCase())).map(person => (
            <Name key={person.name} name={person.name} number={person.number} />
          ))}
        </div>
      )
    }
  }
 

  // Event handlers 
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterName = (event) => setFilterName(event.target.value)

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
      <ShowPersons persons={persons} />
    </div>
  )
}

export default App