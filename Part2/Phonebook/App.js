import Note from './components/Note'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
//Add name
  const addName = (event) => 
  {    
    event.preventDefault()  
    if (persons.find((name) => name.content === newName))  {
     // setError(true);
      window.alert(newName + ' has already been added');
      return false;
      
    }
    console.log('button clicked', event.target)
    const noteObject = {
      content: newName,
      number: newNumber
      
    }
    setPersons(persons.concat(noteObject))
    setNewNumber('')
    setNewName('')
    addName('')
      }

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

           

  return (
    <div>
      <h2>Phonebook</h2>

      <h2> Add new person </h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={hNameChange}  />
          <div>number: <input value={newNumber} onChange={hNumberChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(note =>
          <Note key={note.id} note={note} />
        )}
      ...
    </div>
  )

}

export default App
