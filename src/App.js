import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CountryInfo from './components/CountryInfo';
import './App.css';

function App() {
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [countryData, setCountryData] = useState(null);

  const handleChange = (event) => {
    setCountry(event.target.value);
  }

  const handleSubmit = () => {
    axios.get(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => {
        console.log('response', response.data[0])
        setCountryData(response.data[0])
      })
      .catch((e) => {
        setError(e);
      })
  }

  return (
    <div className="App">
      <h1>React Countries Info and Weather Info</h1>
      <TextField label="Country to search" variant="outlined" value={country} onChange={(event) => handleChange(event)} />
      <Button variant="contained" onClick={handleSubmit}>Search</Button>

      {countryData ? 
        <CountryInfo 
          altSpellings={countryData.altSpellings}
          borders={countryData.borders} 
          capital={countryData.capital} />
        : null}
    </div>
  );
}

export default App;
