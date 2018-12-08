// Author: Marshall Offutt
// Purpose: Reusable helper functions that interact with Firebase for locations. Axios CRUD methods.

import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getCurrentLocation = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/locations.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const locationsObject = results.data;
      const currentLocationsArray = [];
      if (locationsObject !== null) {
        Object.keys(locationsObject).forEach((locationId) => {
          locationsObject[locationId].id = locationId;
          currentLocationsArray.push(locationsObject[locationId]);
        });
      }
      currentLocationsArray.forEach((location) => {
        if (location.isCurrent === true) {
          resolve(location);
          console.log(location);
        }
      });
    })
    .catch((error) => {
      reject(error);
    });
});

const getAllLocations = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/locations.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const locationsObject = results.data;
      const locationsArray = [];
      if (locationsObject !== null) {
        Object.keys(locationsObject).forEach((locationId) => {
          locationsObject[locationId].id = locationId;
          locationsArray.push(locationsObject[locationId]);
        });
      }
      resolve(locationsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteLocationAxios = locationId => axios.delete(`${firebaseUrl}/locations/${locationId}.json`);

const addNewLocationAxios = locationObject => axios.post(`${firebaseUrl}/locations.json`, JSON.stringify(locationObject));

const updateIsCurrent = (locationId, isCurrent) => new Promise((resolve, reject) => {
  axios.patch(`${firebaseUrl}/locations/${locationId}.json`, { isCurrent })
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getCurrentLocation,
  getAllLocations,
  updateIsCurrent,
  addNewLocationAxios,
  deleteLocationAxios,
};
