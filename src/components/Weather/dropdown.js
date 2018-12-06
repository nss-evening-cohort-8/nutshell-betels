// Author: Marshall Offutt
// Purpose: Dropdown component for the weather builder.

/* eslint import/no-cycle: 0 */
import $ from 'jquery';

import authHelpers from '../../helpers/authHelpers';
import locationsData from '../../helpers/data/locationsData';
import setAllNotCurrent from './weatherCrud';

import './dropdown.scss';

const populateLocationsInDropdown = (locationsArray) => {
  let domString = '';
  locationsArray.forEach((location) => {
    if (location.isCurrent === false) {
      domString += `<span class="d-inline-flex justify-content-between align-items-center"><a class="dropdown-item" id="${location.id}">${location.city_name}</a> <i style="color: red;" class="fa fa-trash location-trash mb-3 mr-4" data-delete-id=${location.id}></i></span>`;
    }
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

$('body').on('click', '.dropdown-item', setAllNotCurrent);

export default {
  getLocationsForDropdown,
};
