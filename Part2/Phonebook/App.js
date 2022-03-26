import React from "react";
import { useState } from "react";
import Note from './components/Note'
//If empty use line below
//const App = () => {  const [notes, setNotes] = useState([])

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [numNotes, setNumber] =useState(props.notes)
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  //Let's add a new piece of state called newNote for 
  //storing the user-submitted input  
  //and let's set it as the input element's value attribute:
 // const [newNote, setNewNote] = useState(    'a new note...'  ) 
    const[newName, addNewName] = useState('');
    const[newNumber, addNewNumber] = useState('');
    const [cantAdd, setError] = useState(false);

  //
  //Adds number
  

  //Adds note
  const addNote = (event) => {   
   event.preventDefault()  
   if (notes.find((note) => note.content === newName))  {
    setError(true);
    window.alert(newName + ' has already been added');
    return false;
    
  }
   console.log('button clicked', event.target)
   const noteObject = {
    content: newName,
    date: new Date().toISOString(),
    important: Math.random() < 0.5,
    id: notes.length + 1,
  }

  setNotes(notes.concat(noteObject))
 // setPersons(persons.concat(noteObject))
  addNewName('')
  }

   const handleNameChange = (event) =>
    {  
       console.log(event.target.value)
       addNewName(event.target.value) 
    }
   //<form onSubmit={addNote}>    <input /> Creates form to app
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}> 
      {cantAdd && <p className="cantAdd"></p>}
      <input
       value={newName}
       onChange={handleNameChange} />
     <button type="submit">save</button> 
       </form>  
      <h2>Numbers</h2>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
         
        
      </ul>  
    </div>
  )
}
/* {notes.map(note => 
          <Note key={note.id} note={note} />
        )}*/

export default App 
