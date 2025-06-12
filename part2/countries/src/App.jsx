import { useEffect, useState } from "react";
import countries from "./directory/countries"

function App() {
  // state variable containing list of countries
  const [countryList, setCountryList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // fetch list of countries from API, initialize countryList
  useEffect(() => {
    countries.getCountries().then(res => setCountryList(res.data));
  }, []);
  
  // handle user input by updating state variable 'searchInput'
  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);

    if(searchInput) {
      const newCountryList = countries.getCountries().then(res => {
        return res.data.filter(country => country.name.common.includes(searchInput))
      });
      setCountryList(newCountryList);
    }
  }

  console.log("country list: ", countryList);

  return (
    <>
    <form>
     <label htmlFor="country-search">find countries</label>
     <input id="country-search" onChange={handleSearchInput} />
    </form>
    <div>
      {countryList.length > 0 ? 
        countryList.map((country, i) => <p key={i}>{country.name.common}</p>) 
        : <p>Too many matches, specify another filter</p>}
    </div>
    </>
  )
}

export default App
