import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import AllPersons from '../components/AllPersons';
import AddPerson from '../components/AddPerson';
import personService from '../services/persons';

const App = () => {
	useEffect(() => {
		personService.getAll().then((res) => {
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
			const filteredPerson = persons.filter(
				(person) => person.name === newName
			);
			if (filteredPerson.length > 0) {
				if (confirm(`${newName} already exists. Update their number?`)) {
					personService
						.updatePerson(filteredPerson[0], newNumber)
						.then((res) => {
							const updatedPersons = [...persons];
							updatedPersons.find((p) => p.name === newName).number = newNumber;
							setPersons(updatedPersons);
							setNewName('');
							setNewNumber('');
						});
				}
			} else {
				const newPerson = { name: newName, number: newNumber };
				personService.createPerson(newPerson).then((res) => {
					setPersons(persons.concat(res.data));
					setNewName('');
					setNewNumber('');
				});
			}
		} else {
			alert('Both name and number are required to enter person');
		}
	};

	const handleDeletion = (name, id) => {
		personService.deletePerson(name, id).then((res) => {
			console.log(res);
		});
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
			<AllPersons persons={persons} search={search} setPersons={setPersons} />
		</div>
	);
};

export default App;
