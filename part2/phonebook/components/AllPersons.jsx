import React from 'react';
import personService from '../services/persons';
import DeletePerson from './DeletePerson';

export default function AllPersons({ persons, search, setPersons }) {
	return (
		<div>
			<h2>Numbers</h2>
			<ul>
				{search
					? persons.map((person) => {
							if (person.name.toLowerCase().includes(search.toLowerCase())) {
								return (
									<li key={person.name}>
										{person.name} {person.number}
									</li>
								);
							}
					  })
					: persons.map((person) => (
							<div key={person.name}>
								<li>
									{person.name} {person.number}
								</li>
								<DeletePerson
									person={person}
									persons={persons}
									setPersons={setPersons}
								/>
							</div>
					  ))}
			</ul>
		</div>
	);
}
