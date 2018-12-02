import $ from 'jquery';

const weatherSection = () => {
  const domString = `
  <div class="card" id="weatherCard" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title city-state">Nashville, TN</h5>
      <h6 class="card-subtitle mb-2 text-muted weather-desc">Sunny</h6>
      <img class="card-img weather-icon"></img>
      <p class="card-text">Percipitation: 0%</p>
      <p class="card-text">Humidity: 39%</p>
      <p class="card-text">Wind: 17 mph</p>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Saved Locations
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </div>
      <input id="zipCodeInputField" class="form-control mr-sm-2" type="enterZip" placeholder="Enter zip code" aria-label="Enter zip code">
    </div>
  </div>
  `;
  $('#weather').html(domString);
};

export default weatherSection;
