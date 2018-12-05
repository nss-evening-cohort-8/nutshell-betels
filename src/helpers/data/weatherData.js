import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const weatherbitUrl = apiKeys.weatherbitKeys.baseURL;
const weatherKey = apiKeys.weatherbitKeys.apiKey;

const weatherGetter = zipcode => new Promise((resolve, reject) => {
  axios.get(`${weatherbitUrl}?postal_code=${zipcode}&units=I&key=${weatherKey}`)
    .then((result) => {
      console.log(result.data.data);
      resolve(result.data.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { weatherGetter };
