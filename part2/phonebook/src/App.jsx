import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import AllPersons from '../components/AllPersons';
import AddPerson from '../components/AddPerson';
import personService from '../services/persons';
import Notification from '../components/Notification';

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
	const [message, setMessage] = useState({ type: '', text: '' });

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
						})
						.then((res) => {
							const newMessage = {
								type: 'success',
								text: `Changed number for ${newName}`,
							};
							setMessage(newMessage);
							setTimeout(() => {
								setMessage({ type: '', text: '' });
							}, 3000);
						});
				}
			} else {
				const newPerson = { name: newName, number: newNumber };
				personService
					.createPerson(newPerson)
					.then((res) => {
						setPersons(persons.concat(res.data));
						setNewName('');
						setNewNumber('');
					})
					.then((res) => {
						const newMessage = {
							type: 'success',
							text: `Added ${newName}`,
						};
						setMessage(newMessage);
						setTimeout(() => {
							setMessage({ type: '', text: '' });
						}, 3000);
					});
			}
		} else {
			alert('Both name and number are required to enter person');
		}
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={message} setMessage={setMessage} />
			<Filter search={search} handleSearch={handleSearch} />
			<AddPerson
				newName={newName}
				newNumber={newNumber}
				handleNewName={handleNewName}
				handleNewNumber={handleNewNumber}
				handleAddName={handleAddName}
			/>
			<AllPersons
				persons={persons}
				search={search}
				setPersons={setPersons}
				setMessage={setMessage}
			/>
		</div>
	);
};

export default App;
