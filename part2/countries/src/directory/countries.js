import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getCountries = () => axios.get(`${baseUrl}/all`);

const getSpecificCountry = (name) => axios.get(`${baseUrl}/name/${name}`);

export default { getCountries, getSpecificCountry };