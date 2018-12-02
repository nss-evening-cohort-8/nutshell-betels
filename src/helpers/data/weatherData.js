import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

// const firebaseUrl = apiKeys.firebaseKeys.databaseURL;
const weatherbitUrl = apiKeys.weatherbitKeys.baseURL;
const weatherKey = apiKeys.weatherbitKeys.apiKey;

const weatherGetter = zipCode => new Promise((resolve, reject) => {
  axios.get(`${weatherbitUrl}?postal_code=${zipCode}&units=I&key=${weatherKey}`)
    .then((result) => {
      resolve(result);
      console.log(result);
    })
    .catch((error) => {
      reject(error);
    });
});

const zipCode = 37211;

const zipCodeTest = () => {
  weatherGetter(zipCode);
};

export default zipCodeTest;
