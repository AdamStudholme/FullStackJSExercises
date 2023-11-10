const CountryDetail = ({ country }) =>{
    if(country === null){
        return null
    }   
    
    const languageArray = Object.values(country.languages)
      

     return(
        <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km<sup>2</sup></p>
        <h2>Languages</h2>
        <p>{languageArray.map(lan => <li key={lan}>{lan}</li>)}</p>
        <br></br>
        <img src={country.flags.png} alt={country.flags.alt}></img>
        </>
     )    
    }

export default CountryDetail