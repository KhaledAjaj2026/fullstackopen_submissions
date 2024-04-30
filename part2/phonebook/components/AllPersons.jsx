import React from 'react';

export default function AllPersons({ persons, search }) {
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
							<li key={person.name}>
								{person.name} {person.number}
							</li>
					  ))}
			</ul>
		</div>
	);
}
