import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CountryInfo from './components/CountryInfo';
import './App.css';

function App() {
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [countryData, setCountryData] = useState(null);
  const [previousSearchPhrases, setPreviousSearchPhrases] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event) => {
    setCountry(event.target.value);
  }

  const handleSubmit = () => {
    axios.get(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => {
        console.log('response', response.data[0]);
        setCountryData(response.data[0]);
        setNotificationMessage(`Success! ${country.toUpperCase()} has been found!`);
        setPreviousSearchPhrases([response.data[0].name.official, ...previousSearchPhrases]);
        setSnackbarOpen(true);
      })
      .catch((e) => {
        setError(e);
        setSnackbarOpen(true);
      })
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const handlePreviousSearch = (countryName) => {
    setCountry(countryName);
    handleSubmit();
  }

  return (
    <div className="App">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={error ? error : notificationMessage}
        autoHideDuration={4000}
      />
      
      <h1>React Countries Info and Weather Info</h1>
      <TextField label="Country to search" variant="outlined" value={country} onChange={(event) => handleChange(event)} />
      <Button variant="contained" onClick={handleSubmit}>Search</Button>

      {countryData && <CountryInfo countryData={countryData} />}

      {previousSearchPhrases.length !== 0 && 
        <>
          <h4>Previously searched:</h4>
          {/* <ul>
          {previousSearchPhrases.map((countryName) => <li onClick={() => handlePreviousSearch(countryName)}>{countryName}</li>)}
          </ul> */}

          {/*  */}
          <List component="nav" aria-label="previously searched countries">
            {previousSearchPhrases.map((countryName, countryIndex) => 
              <ListItemButton
                selected={selectedIndex === countryIndex}
                onClick={(countryIndex) => setSelectedIndex(countryIndex)}>
                <ListItemText primary={countryName} />
              </ListItemButton>
            )}
          </List>
          {/*  */}
        </>}
    </div>
  );
}

export default App;
