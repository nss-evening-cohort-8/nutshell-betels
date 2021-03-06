// Author: Marshall Offutt
// Purpose: The get-and-print weather functions.

/* eslint import/no-cycle: 0 */
import $ from 'jquery';

import authHelpers from '../../helpers/authHelpers';
import locationsData from '../../helpers/data/locationsData';
import weatherData from '../../helpers/data/weatherData';
import dropdownStuff from './dropdown';

const printTheWeather = (currentLocation) => {
  const domString = `
  <div class="card" id="weatherCard" style="width: 28rem;">
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
    <div class="card-body" style="width: 28rem;">
    <h5>Enter zipcode and city to add a new location</h5>
      <div class="card-body d-inline-flex justify-content-between">
        <input id="zipCodeInputField" class="form-control mr-sm-2" type="number" placeholder="Zip code" aria-label="Enter zip code">
        <input id="cityInputField" class="form-control mr-sm-2" type="text" placeholder="City" aria-label="Enter city">
        <button class="btn btn-primary add-location">Add location</button>
      </div>
      </div>
  </div>
  `;
  $('#weather').html(domString);
  dropdownStuff.getLocationsForDropdown();
  $('#empty-bucket').hide();
};

const emptyBucket = () => {
  const domString = `
  <div class="card" style="width: 25rem;">
    <h5>Enter zipcode and city to set your current location</h5>
    <div class="card-body d-inline-flex justify-content-between">
      <input id="setZip" class="form-control mr-sm-2" type="number" placeholder="Zip code" aria-label="Enter zip code">
      <input id="setCity" class="form-control mr-sm-2" type="text" placeholder="City" aria-label="Enter city">
      <button class="btn btn-primary set-location">Set Current Location</button>
    </div>
  </div>
  `;
  $('#empty-bucket').html(domString);
};

const getTheWeather = () => {
  const uid = authHelpers.getCurrentUid();
  locationsData.getCurrentLocation(uid)
    .then(currentLocation => weatherData.weatherGetter(currentLocation.zipcode))
    .then((currentLocation) => {
      console.log(currentLocation);
      printTheWeather(currentLocation);
      $('#empty-bucket').hide();
    })
    .catch((error) => {
      console.error('error in getting location', error);
    });
};

const initializeWeather = () => {
  getTheWeather();
};

export default {
  initializeWeather,
  emptyBucket,
};
