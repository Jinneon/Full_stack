import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css';

const Country = ({ searchedCountry, country }) => {
  if (country.length === 1) {
    return (
      <div>
        <h1>{country[0].name.common}</h1>
          Capital {country[0].capital.toString()}
          <br></br>
          Population {country[0].population.toString()}
          <h2>Languages</h2>
            {Object.values(country[0].languages).map(language => <li key={language}>{language}</li>)}
            <img src={country[0].flags.png}
             alt={country[0].name.common} 
             height="auto" width="140" />
          <h3>Weather for {country[0].capital.toString()}</h3>
          <Weather city={country[0].capital.toString()} />
      </div>
    )
  }
  else if (country.length <= 10) {
    return (
      <div>
        {country.map((c) => <div key={c.name.common}>{c.name.common}
          <button type="button" onClick={() => searchedCountry(c.name.common)}>show</button></div>)}
      </div>
    )}
  else {
    return (
      <div>
        Filter matches by search word
      </div>
    )
  }
}

const Weather = ({ city }) => {
  const apiKey = process.env.REACT_APP_API_KEY
  const [checkWeather, sWeather] = useState(null)
 
  

  const h = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => {
        sWeather(response.data)
      })
  }
  
  useEffect(h, [])
  if(checkWeather === null)
  {
    return null
  }
  return (
    <div>
      <div> {checkWeather.main.temp} Celsius</div>
      <img  src={`http://openweathermap.org/img/wn/${checkWeather.weather[0].icon}@2x.png`}
        height="140" width="140" />
      <div><b>Speed for wind is:</b> {checkWeather.wind.speed} m/s</div>
     
    </div>
  )
}

const App = () => {


  const [countries, setCountries] = useState([])
  const [sCountry, searchedCountry] = useState('')


  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(resp => {
        console.log('help', resp.data)
        setCountries(resp.data)
      })
  }
  useEffect(hook, [])

  const country = countries.filter
  (country =>
     country.name.common.toLowerCase().includes(sCountry.toLowerCase().trim()))
 
  const hSearch = (event) => {
    searchedCountry(event.target.value)
  }
  return (
    <div>
      <h1>Search for countries</h1> <input value={sCountry} onChange={hSearch} />
      <Country country={country} searchedCountry={searchedCountry} />
    </div >

  );
}

export default App; 
