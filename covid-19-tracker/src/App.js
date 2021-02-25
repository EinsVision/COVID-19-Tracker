import './App.css';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';

// https://disease.sh/v3/covid-19/countries (data)
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      // all of the data from the country response
      setCountryInfo(data);
    })
  }

  return (
    <div className="app">
      <div className='app__left'>
        <div className='app__header'>
          <h1>COVID-19 TRACKER🛵</h1>
          <FormControl className='app__dropdown'>
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              {/* list of worldwide */}
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>    
                ))
              }
              
            </Select>
          </FormControl>
        </div>
        
        <div className='app__stats'>
          {/* InfoBoxs title='Coronavirus cases' */}
          <InfoBox
            title='Coronavirus Cases' 
            cases={123}
            total={2000}
          />

          <InfoBox
            title='Recovered' 
            cases={123}
            total={3000}
          />

          <InfoBox
            title='Deaths' 
            cases={123}
            total={10}
          />
          
        </div>
       
        {/* Map */}
        <Map />
      </div>
      <Card className='app__right'>
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}
          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
