import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const APIkey = '9f70f05ada3c4dffe84c4cb851891b8b';
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const ShowCountry = ({ country, setInput }) => {
	return <button onClick={() => setInput(country.name.common)}>show</button>;
};

const RenderCountry = ({ country }) => {
	console.log('country in RenderCountry: ', country);
	const languages = () => Object.values(country.languages);

	return (
		<>
			<div>
				<h2>{country.name.common}</h2>
				<p>Capital: {country.capital ? country.capital[0] : 'none'}</p>
				<p>Area: {country.area}</p>
				<h3>Languages:</h3>
				<ul>
					{languages().map((language, i) => (
						<li key={i}>{language}</li>
					))}
				</ul>
				<p style={{ fontSize: '10rem', margin: 0 }}>{country.flag}</p>
			</div>
		</>
	);
};

const RenderWeather = ({ country, weather, setWeather }) => {
	axios
		.get(
			`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=imperial&appid=${APIkey}`
		)
		.then((res) => {
			const newWeather = {
				...weather,
				temp: res.data.main.temp,
				wind: res.data.wind.speed,
			};
			setWeather(newWeather);
		});
	console.log('weather: ', weather);
	return (
		<div>
			<h3>Weather in {country.name.common}</h3>
			<p>temperature: {}</p>
		</div>
	);
};

export default function App() {
	const [input, setInput] = useState('');
	const [countryList, setCountryList] = useState([]);
	const [weather, setWeather] = useState({ temp: 0, wind: 0 });

	const handleInput = (event) => {
		setInput(event.target.value);
	};

	useEffect(() => {
		findCountries(input);
	}, [input]);

	const findCountries = (input) => {
		axios.get(countryUrl).then((res) => {
			const countries = res.data.filter((country) => {
				const commonName = country.name.common.toLowerCase();
				return commonName.includes(input.toLowerCase());
			});
			setCountryList(countries);
		});
	};

	// console.log('input: ', input);
	// console.log('countryList: ', countryList);

	return (
		<>
			<input type='text' value={input} onChange={handleInput} />
			<div>
				<ul>
					{countryList.length === 1 ? (
						<>
							<RenderCountry country={countryList[0]} />
							<RenderWeather
								country={countryList[0]}
								weather={weather}
								setWeather={setWeather}
							/>
						</>
					) : countryList.length <= 10 ? (
						countryList.map((country, i) => (
							<div key={i}>
								<li>{country.name.common}</li>
								<ShowCountry country={countryList[i]} setInput={setInput} />
							</div>
						))
					) : (
						'Too many matches, specify another filter'
					)}
				</ul>
			</div>
		</>
	);
}
