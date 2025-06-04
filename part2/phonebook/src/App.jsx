import { useEffect, useState } from 'react'
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';
import personService from './directory/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameSearch, setNameSearch] = useState('');

  // Fetch data from db.json through json-server
  useEffect(() => {
    personService.getAll().then(res => {
      setPersons(res.data);
    });
  }, []);

  // Reset state for each field to empty
  const setStateToEmpty = () => {
    setNewName('');
    setNewNumber('');
  }

  // Handle user submitting new data for new person
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for duplicates
    if(findDuplicateNames(newName)) {
      // Warn if duplicate found
      if(window.confirm(`${newName} is already in the list. Change their number?`)) {
        // Create new person to replace old one
        const person = persons.find(person => person.name === newName);
        const newPerson = {...person, number: newNumber};
        // Replace old person with new one
        personService.update(person.id, newPerson).then(res => {
          // Revise person with new number by mapping persons list
          setPersons(persons.map(person => person.name === newName ? res.data : person));
          // Reset state for each field to empty
          setStateToEmpty();
        })
      } else {
        // Reset state for each field to empty
        setStateToEmpty();
      }
    // Add if NO duplicates found
    } else {
      // Create new person to add to list
      const newId = persons.length+1;
      const newPerson = {name: newName, number: newNumber, id: newId.toString()};
      // Add new person to server
      personService.create(newPerson).then(res => {
        // Set persons list to contain new person
        setPersons(persons.concat(res.data));
        // Reset state for each field to empty
        setStateToEmpty();
      });
    }
  }

  // Handle user deleting person from list
  const handleDelete = id => {
    const personToDelete = persons.find(person => person.id === id);
    if(window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)){
      // find person with matching id
      const newPersons = persons.filter(person => person.id !== id);
      // delete person from server
      personService.deleteItem(id);
      // remove person from list
      setPersons(newPersons);
    }
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
      <Persons filteredPersons={filteredPersons} persons={persons} nameSearch={nameSearch} deletePerson={handleDelete} />
    </div>
  );
}

export default App;