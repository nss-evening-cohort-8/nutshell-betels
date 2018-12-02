import $ from 'jquery';
import 'bootstrap';

const weatherSection = () => {
  const domString = `
  <div class="card" id="weatherCard" style="width: 25rem;">
    <div class="card-body d-inline-flex justify-content-between">
      <div class="section">
        <h4 class="card-title city-state">Nashville, TN</h4>
        <h5 class="card-subtitle mb-2 text-muted weather-desc">Sunny</h5>
        <div class="d-inline-flex justify-content-between align-items-center">
          <img class="card-img weather-icon" src="https://www.weatherbit.io/static/img/icons/c01d.png"></img>
          <h4 class="card-title">67°F</h4>
        </div>
        <p class="card-text">Percipitation: 0%</p>
        <p class="card-text">Humidity: 39%</p>
        <p class="card-text">Wind: 17 mph</p>
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

export default weatherSection;
