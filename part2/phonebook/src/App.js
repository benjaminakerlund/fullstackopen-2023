import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace' }
  ]) 
  const [newName, setNewName] = useState('add a name...')
  const [nameList, setNameList] = useState([persons[0].name, persons[1].name])

  // Component for displaying a name
  const Name = ({ name }) => <div>{name}</div>

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }

    // 2.7 check if the name is already in the phonebook
    if (nameList.includes(nameObject.name)) { //check if nameObject.name already in namaeList, returns true if so
      // Issue  warning with the Alert method
      alert(`${newName} is already added to phonebook`)
    } else {
      // continue normal execution 
      setPersons(persons.concat(nameObject))
      setNameList(nameList.concat(nameObject.name))
      setNewName('add a name...')      
    }
  }
 
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  //<Name key={persons[0].name} name={persons[0].name}/>
  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addName}>
        name: <input 
          value={newName}
          onChange={handleNameChange}
        />
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      {persons.map(element => <Name key={element.name} name={element.name}/> )}
    </div>
  )
}

export default App