import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request;
};

const createPerson = (newPerson) => axios.post(baseUrl, newPerson);

const updatePerson = (person, newNumber) => {
	const newData = { ...person, number: newNumber };
	return axios.put(`${baseUrl}/${person.id}`, newData);
};

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, createPerson, updatePerson, deletePerson };
