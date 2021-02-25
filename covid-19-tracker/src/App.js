import './App.css';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';

// https://disease.sh/v3/covid-19/countries (data)
function App() {

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // async -> send a request, wait for it, do something
    const getCountriesData = async () => {
      await fetch ('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,  // United States of America
            value: country.countryInfo.iso2 // UK, USA, Korea
          }
        ));

        setCountries(countries);
      })
    };

    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className='app__header'>
        <h1>COVID-19 TRACKER🛵</h1>
        <FormControl className='app__dropdown'>
          <Select
            variant='outlined'
            value='abc'
          >
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>    
              ))
            }
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            <MenuItem value='worldwide'>Option two</MenuItem>
            <MenuItem value='worldwide'>Option three</MenuItem>
            <MenuItem value='worldwide'>Option four</MenuItem>
          </Select>
        </FormControl>
      </div>
      
      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
