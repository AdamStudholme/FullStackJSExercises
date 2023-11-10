const CountryList = ( {countries , showDetailsHandler} ) =>{

    if(countries.length > 10){
        return <p>Please narrow down the search</p>
    }else if(countries.length === 1){
        return null
    } else {
     return(
        countries.map(country => <li key={country}>{country}<button onClick={() => showDetailsHandler(country)}>Show Details</button></li>)
     )  
    }  
    }

export default CountryList