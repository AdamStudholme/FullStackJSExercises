import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'
import Weather from './components/Weather'
import countryService from './services/countries'
import weatherService from './services/weather'

function App() {
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const [search, setSearch] = useState(null)
  const [weather, setWeather] = useState(null)

  //fetch list of inital countries
  useEffect(() => {
    countryService
      .getAll()
      .then(countriesList => setCountries(countriesList.map(country => country.name.common)))
  }, []
  )

  if (!countries) {
    return null
  }

  //Filter countries with Regex and display results
  const searchRegex = new RegExp(search, 'gi');
  const filteredList = search === null || search.trim() === ""
    ? countries
    : countries.filter(country => country.match(searchRegex));

  //Handlers for seach and button to view country details     
  const handleCountrySearch = input => setSearch(input.target.value);
  const handleShowDetails = country => setSearch(country);

  //Filter to fetch country details when the filtered list is down to one country
  if (filteredList.length === 1 && country === null) {
    countryService // Fetches country details
      .getCountry(filteredList[0])
      .then(country => setCountry(country));

  } else if (filteredList.length > 1 && country !== null) {
    setCountry(null) // Reset country and weathter to null once search is restarted
    setWeather(null)
  }

  //Fetches the weather for the capital of the current country details
  if (country !== null && weather === null) {
    weatherService
      .getWeather(country.capital)
      .then(JSON => {
        setWeather(JSON);        
      })
  }

  return (
    <>
      <p>Find Country: <input onChange={handleCountrySearch}></input></p>
      <CountryList countries={filteredList} showDetailsHandler={handleShowDetails} />
      <CountryDetail country={country} />
      <Weather weatherObj={weather} />
    </>
  )
}

export default App
