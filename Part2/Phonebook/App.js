import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import FilterP from "./components/FilterP";
import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
  
    { name: 'Jin', number: '555-55-55', id: 1 },
    { name: 'Jiyeon', number: '39-44-5323523', id: 2 },
    { name: 'Jinneon', number: '777-666-555', id: 3 },
    { name: 'React', number: '799-666-555', id: 4 },
 
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setSearch] = useState('')
//Add name
  const addName = (event) => 
  {    
    event.preventDefault()  
    if (persons.find((person) => person.name === newName))  {
     // setError(true);
      window.alert(newName + ' has already been added');
      return false;
      
    }
    console.log('button clicked', event.target)
    const noteObject = {
      name: newName,
      number: newNumber
      
    }
    setPersons(persons.concat(noteObject))
    setNewNumber('')
    setNewName('')
    addName('')
      }
      const personSearched = persons.filter(person => person.name.includes(filter))
      const hNameChange = (event) =>
       {
             console.log(event.target.value) 
           setNewName(event.target.value) 
           }
           const hNumberChange = (event) =>
       {
             console.log(event.target.value) 
           setNewNumber(event.target.value) 
           }
           const hSearch = (event) => {
            console.log(event.target.value)
            setSearch(event.target.value)
          }

           

  return (
    <div>
      <h2>Phonebook</h2>

      <h2> Add new person </h2>
      <PersonForm addName={addName} newName={newName}
      hNameChange={hNameChange} newNumber={newNumber}
      hNumberChange={hNumberChange} />
            <FilterP header= 'Filter persons: '
      name={filter} hSearch={hSearch} />
      <h2>Numbers</h2>
      <Persons personSearched={personSearched} />

      ...
    </div>
  )

}

export default App
