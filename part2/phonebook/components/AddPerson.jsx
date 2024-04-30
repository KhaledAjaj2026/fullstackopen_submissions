import React from 'react';

export default function AddPerson({
	newName,
	newNumber,
	handleNewName,
	handleNewNumber,
	handleAddName,
}) {
	return (
		<div>
			<h2>Add a New</h2>
			<form onSubmit={handleAddName}>
				<div>
					name: <input value={newName} onChange={handleNewName} />
					number: <input value={newNumber} onChange={handleNewNumber} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</div>
	);
}
