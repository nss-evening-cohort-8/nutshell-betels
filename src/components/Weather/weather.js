// Author: Marshall Offutt
// Purpose: The get-and-print weather functions.

/* eslint import/no-cycle: 0 */
import $ from 'jquery';

import authHelpers from '../../helpers/authHelpers';
import locationsData from '../../helpers/data/locationsData';
import weatherData from '../../helpers/data/weatherData';
import dropdownStuff from './dropdown';

const weatherSection = (currentLocation) => {
  const domString = `
  <div class="card" id="weatherCard" style="width: 25rem;">
    <div class="card-body d-inline-flex justify-content-between">
      <div class="section">
        <h4 class="card-title city-state" id="wea-city">${currentLocation[0].city_name}, ${currentLocation[0].state_code}</h4>
        <h5 class="card-subtitle mb-2 text-muted" id="wea-desc">${currentLocation[0].weather.description}</h5>
        <div class="d-inline-flex justify-content-between align-items-center">
          <img src="https://www.weatherbit.io/static/img/icons/${currentLocation[0].weather.icon}.png" class="card-img weather-icon" id="wea-img"/>
          <h4 class="card-title" id="wea-temp">${currentLocation[0].temp}°F</h4>
        </div>
        <p class="card-text" id="wea-wind">Wind speed: ${currentLocation[0].wind_spd} mph</p>
        <p class="card-text" id="wea-hum">Relative humidity: ${currentLocation[0].rh} %</p>
      </div>
      <div class="section">

        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="locationsDropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Saved Locations
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="locationsChoices">
          </div>
        </div>

      </div>
    </div>
      <p>Enter zipcode and city to add a new location</p>
      <div class="card-body d-inline-flex justify-content-between">
        <input id="zipCodeInputField" class="form-control mr-sm-2" type="enterZip" placeholder="Enter zip code" aria-label="Enter zip code">
        <input id="cityInputField" class="form-control mr-sm-2" type="enterCity" placeholder="Enter city name" aria-label="Enter city">
        <button class="btn btn-primary add-location">Add location</button>
      </div>
  </div>
  `;
  $('#weather').html(domString);
  dropdownStuff.getLocationsForDropdown();
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  locationsData.getCurrentLocation(uid)
    .then(currentLocation => weatherData.weatherGetter(currentLocation.zipcode))
    .then((currentLocation) => {
      weatherSection(currentLocation);
    })
    .catch((error) => {
      console.error('error in getting location', error);
    });
};

const initializeWeather = () => {
  weatherPage();
};

export default {
  initializeWeather,
  weatherSection,
};
