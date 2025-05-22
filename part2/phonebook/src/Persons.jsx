function Persons({filteredPersons, persons, nameSearch}) {
    return nameSearch === '' ? persons.map(person => <p key={person.id}>{person.name} {person.number}</p>) : filteredPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>);
}

export default Persons;