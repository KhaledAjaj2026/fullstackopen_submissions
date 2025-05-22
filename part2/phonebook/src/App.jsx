import { useEffect, useState } from 'react'
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameSearch, setNameSearch] = useState('');

const handleSubmit = (event) => {
  event.preventDefault();

  // Check for duplicates
  if(findDuplicateNames(newName)) {
    // Warn if duplicate found
    alert(`${newName} is already in the list!`);
  } else {
    // Add if NO duplicates found
    const newPerson = {name: newName, number: newNumber};
    setPersons(persons.concat(newPerson));
  }

  // Reset state for each field to empty
  setNewName('');
  setNewNumber('');
}

// Handle name input by setting state to input value
const handleNameChange = (event) => {
  setNewName(event.target.value);
}

// Handle number input by setting state to input value
const handleNumberChange = (event) => {
  setNewNumber(event.target.value);
}

// Handle number input by setting state to input value
const handleSearchChange = (event) => {
  setNameSearch(event.target.value);
}

// Filter for persons whose names contain nameSearch input
useEffect(() => {
  const newPersons = persons.filter(person => person.name.toUpperCase().includes(nameSearch.toUpperCase()));
  setFilteredPersons(newPersons);
}, [nameSearch, persons]);

// Find duplicate names in list of persons
const findDuplicateNames = (name) => persons.find(person => person.name === name);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameSearch={nameSearch} handleSearchChange={handleSearchChange}  />
      <h2>Add a New Person</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} persons={persons} nameSearch={nameSearch} />
    </div>
  )
}

export default App