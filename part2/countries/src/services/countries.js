import axios from 'axios'

const allUrl = "https://studies.cs.helsinki.fi/restcountries//api/all"
const countryBaseUrl ="https://studies.cs.helsinki.fi/restcountries/api/name/"


const getAll = () =>{
    const request = axios.get(allUrl);
    return request.then( response => response.data);
}

const getCountry = (country) => {
    const request = axios.get(`${countryBaseUrl}${country}`);
    return request.then(response => response.data)
}

export default { getAll , getCountry }