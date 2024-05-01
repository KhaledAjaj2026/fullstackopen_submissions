import React from 'react';
import personService from '../services/persons';

export default function DeletePerson({ person, persons, setPersons }) {
	const initiateDeletion = () => {
		if (confirm(`Delete ${person.name}?`)) {
			personService.deletePerson(person.id).then((res) => {
				setPersons(persons.filter((p) => p.id !== person.id));
			});
		} else {
			alert('Deletion cancelled');
		}
	};

	return <button onClick={initiateDeletion}>delete</button>;
}
