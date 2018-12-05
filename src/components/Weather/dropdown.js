import $ from 'jquery';

import authHelpers from '../../helpers/authHelpers';
import locationsData from '../../helpers/data/locationsData';

import './dropdown.scss';

const populateLocationsInDropdown = (locationsArray) => {
  let domString = '';
  locationsArray.forEach((location) => {
    domString += '<div class="container d-inline-flex>';
    domString += `<a class="dropdown-item" id="${location.id}">${location.city_name}   </a>`;
    domString += `<i class="fa fa-trash location-trash" data-delete-id=${location.id}></i>`;
    domString += '</div>';
  });
  $('#locationsChoices').html(domString);
};

const getLocationsForDropdown = () => {
  const uid = authHelpers.getCurrentUid();
  locationsData.getAllLocations(uid)
    .then((locationsArray) => {
      populateLocationsInDropdown(locationsArray);
    })
    .catch((error) => {
      console.error('error in getting all locations', error);
    });
};

export default getLocationsForDropdown;
