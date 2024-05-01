import React from 'react';
import personService from '../services/persons';

export default function DeletePerson({
	person,
	persons,
	setPersons,
	setMessage,
}) {
	const initiateDeletion = () => {
		if (confirm(`Delete ${person.name}?`)) {
			personService
				.deletePerson(person.id)
				.then((res) => {
					setPersons(persons.filter((p) => p.id !== person.id));
				})
				.then((res) => {
					const newMessage = {
						type: 'success',
						text: `Deleted ${person.name}`,
					};
					setMessage(newMessage);
					setTimeout(() => {
						setMessage({ type: '', text: '' });
					}, 3000);
				})
				.catch((err) => {
					const newMessage = {
						type: 'error',
						text: `${person.name} has already been removed from the server`,
					};
					setMessage(newMessage);
					setTimeout(() => {
						setMessage({ type: '', text: '' });
					}, 3000);
				});
		} else {
			alert('Deletion cancelled');
		}
	};

	return <button onClick={initiateDeletion}>delete</button>;
}
