import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

const handleSubmit = (event) => {
  event.preventDefault();

  // check for duplicates
  if(findDuplicateNames(newName)) {
    // warn if duplicate found
    alert(`${newName} is already in the list!`);
  } else {
    // add if NO duplicates found
    const newPerson = {name: newName};
    setPersons(persons.concat(newPerson));
  }



  setNewName('');
}

const handleNoteChange = (event) => {
  setNewName(event.target.value);
}

const findDuplicateNames = (name) => persons.find(person => person.name === name);

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, i) => <p key={i}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App