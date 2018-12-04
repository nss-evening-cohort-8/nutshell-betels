import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getCurrentLocation = uid => new Promise((resolve, reject) => {
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
      locationsArray.forEach((location) => {
        if (location.isCurrent === true) {
          resolve(locationsArray);
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

export default {
  getCurrentLocation,
  getAllLocations,
};
