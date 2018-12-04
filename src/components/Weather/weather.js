import $ from 'jquery';
import 'bootstrap';

import authHelpers from '../../helpers/authHelpers';
import locationsData from '../../helpers/data/locationsData';
import weatherData from '../../helpers/data/weatherData';

const weatherSection = () => {
  const domString = `
  <div class="card" id="weatherCard" style="width: 25rem;">
    <div class="card-body d-inline-flex justify-content-between">
      <div class="section">
        <h4 class="card-title city-state" id="wea-city"></h4>
        <h5 class="card-subtitle mb-2 text-muted weather-desc" id="wea-desc"></h5>
        <div class="d-inline-flex justify-content-between align-items-center">
          <img class="card-img weather-icon" id="wea-img"></img>
          <h4 class="card-title" id="wea-temp"></h4>
        </div>
        <p class="card-text" id="wea-perc"></p>
        <p class="card-text" id="wea-wind"></p>
      </div>
      <div class="section">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Saved Locations
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Chicago</a>
            <a class="dropdown-item" href="#">Houston</a>
            <a class="dropdown-item" href="#">Los Angeles</a>
          </div>
        </div>
      </div>
    </div>
      <div class="card-body d-inline-flex justify-content-between">
        <input id="zipCodeInputField" class="form-control mr-sm-2" type="enterZip" placeholder="Enter zip code" aria-label="Enter zip code">
        <button class="btn btn-primary">Add location</button>
      </div>
  </div>
  `;
  $('#weather').html(domString);
};

const printTheWeather = (locationsArray) => {
  $('#wea-city').html(infoObject.city_name);
  $('#wea-desc').html(infoObject.weather.description);
  $('#wea-img').add.src='../../img/icons/{icon_code}';
  $('#wea-temp').html(infoObject.temp);
  $('#wea-perc').html(infoObject.precip);
  $('#wea-wind').html(infoObject.wind_spd);
  });
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  locationsData.getCurrentLocation(uid)
    .then(locationsArray => weatherData.weatherGetter(locationsArray.zipcode))
    .then((locationsArray) => {
      printTheWeather(locationsArray);
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const printWeatherFromLocation = (infoObject) => {
  
};

const initializeWeather = () => {
  weatherSection();
  weatherPage();
};

export default {
  initializeWeather,
  weatherPage,
};
