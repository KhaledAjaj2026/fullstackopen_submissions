function Persons({filteredPersons, persons, nameSearch, deletePerson}) {
    return (
        nameSearch === '' ? persons.map(person => {
            return <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></p>
        }) : filteredPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)
    );
}

export default Persons;