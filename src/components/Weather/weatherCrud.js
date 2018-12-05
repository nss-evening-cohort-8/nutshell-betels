/* eslint import/no-cycle: 0 */
import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import locationsData from '../../helpers/data/locationsData';
import weatherCrap from './weather';

const gettingLocationFromInputFields = () => {
  const location = {
    zipcode: $('#zipCodeInputField').val(),
    city_name: $('#cityInputField').val(),
    isCurrent: false,
    uid: authHelpers.getCurrentUid(),
  };
  return location;
};

const addNewLocation = () => {
  const newLocation = gettingLocationFromInputFields();
  locationsData.addNewLocationAxios(newLocation)
    .then(() => {
      weatherCrap.initializeWeather();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const setNewLocation = (locationId) => {
  const isItCurrent = true;
  locationsData.updateIsCurrent(locationId, isItCurrent);
  weatherCrap.initializeWeather();
};

const setAllNotCurrent = (e) => {
  const locationId = e.target.id;
  const uid = authHelpers.getCurrentUid();
  locationsData.getAllLocations(uid)
    .then((locationsArray) => {
      locationsArray.forEach((location) => {
        let isItCurrent = location.isCurrent;
        if (isItCurrent === true) {
          isItCurrent = false;
        }
        locationsData.updateIsCurrent(location.id, isItCurrent);
        setNewLocation(locationId);
      });
    });
};

$('body').on('click', '.add-location', addNewLocation);

export default setAllNotCurrent;
