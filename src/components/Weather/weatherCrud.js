/* eslint import/no-cycle: 0 */
import authHelpers from '../../helpers/authHelpers';
import locationsData from '../../helpers/data/locationsData';
import weatherCrap from './weather';

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

export default setAllNotCurrent;
