import weather from "../services/weather"

const Weather = ({weatherObj}) => {
    if(weatherObj === null){
        return null
    }else
    return(<>
        <h2>{`Weather in ${weatherObj.name}`}</h2>
        <p>Temperature: {(Math.floor(parseFloat(weatherObj.main.temp) - 273))}°C</p>
        <img src={`https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`}></img>
        <p>Wind: {weatherObj.wind.speed} m/s</p>
    </>)
}

export default Weather