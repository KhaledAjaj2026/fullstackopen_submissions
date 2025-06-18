import { useEffect, useState } from "react";
import countries from "./directory/countries"

function App() {
  // state variable containing list of countries
  const [countryList, setCountryList] = useState([]);

  // fetch list of countries from API, initialize countryList
  useEffect(() => {
    countries.getCountries().then(res => setCountryList(res.data));
  }, []);
  
  // handle user input by updating state variable 'searchInput'
  const handleSearchInput = (event) => {
    countries.getCountries().then(res => {
      const newCountryList = res.data.filter(country => country.name.common.includes(event.target.value))
      setCountryList(newCountryList);
    });
  }

  return (
    <>
      <form>
      <label htmlFor="country-search">find countries</label>
      <input id="country-search" onChange={handleSearchInput} />
      </form>
      <div>
        {countryList.length === 1 ? 
          <div>
            <h2>{countryList[0].name.common}</h2>
            <p>Capital {countryList[0].capital[0]}</p>
            <p>Area {countryList[0].area}</p>
            <h3>Languages</h3>
            <ul>
              {Object.values(countryList[0].languages).map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
            <img 
              src={countryList[0].flags.svg} 
              style={{width: "15rem", height: "auto"}} 
              alt={`flag of ${countryList[0].name.common}`}
            />
          </div>
        : countryList.length <= 10 ? 
          countryList.map((country, i) => <p key={i}>{country.name.common}</p>) 
        : <p>Too many matches, specify another filter</p>}
      </div>
    </>
  )
}

export default App
