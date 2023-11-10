import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY; // run in Powershell to run with api activated ($env:VITE_SOME_KEY=<API KEY HERE>) -and (npm run dev)
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const getWeather = (capital) => {
    const request = axios.get(`${baseUrl}${capital}&appid=${api_key}`);
    return request.then(response => response.data)
}

export default { getWeather }