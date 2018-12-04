import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const weatherbitUrl = apiKeys.weatherbitKeys.baseURL;
const weatherKey = apiKeys.weatherbitKeys.apiKey;

const weatherGetter = zipCode => new Promise((resolve, reject) => {
  axios.get(`${weatherbitUrl}?postal_code=${zipCode}&units=I&key=${weatherKey}`)
    .then((result) => {
      resolve(result.data.data[0]);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { weatherGetter };
