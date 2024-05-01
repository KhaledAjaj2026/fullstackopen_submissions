import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import AllPersons from '../components/AllPersons';
import AddPerson from '../components/AddPerson';
import axios from 'axios';

const App = () => {
	useEffect(() => {
		axios.get('http://localhost:3001/persons').then((res) => {
			setPersons(res.data);
		});
	}, []);

	const [persons, setPersons] = useState([]);

	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	const handleNewName = (event) => {
		setNewName(event.target.value);
	};

	const handleNewNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	const handleAddName = (event) => {
		event.preventDefault();
		if (newName && newNumber) {
			if (persons.filter((person) => person.name === newName).length > 0) {
				alert(`${newName} is already added to the phonebook`);
			} else {
				const newPerson = { name: newName, number: newNumber };
				setPersons(persons.concat(newPerson));
			}
		} else {
			alert('Both name and number are required to enter person');
		}
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter search={search} handleSearch={handleSearch} />
			<AddPerson
				newName={newName}
				newNumber={newNumber}
				handleNewName={handleNewName}
				handleNewNumber={handleNewNumber}
				handleAddName={handleAddName}
			/>
			<AllPersons persons={persons} search={search} />
		</div>
	);
};

export default App;
