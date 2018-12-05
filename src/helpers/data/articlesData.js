import axios from 'axios';

import apiKeys from '../../../db/apiKeys';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getArt = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/articles.json`)
    .then((result) => {
      const allArtObject = result.data;
      const allArtArray = [];
      if (allArtObject != null) {
        Object.keys(allArtObject).forEach((artId) => {
          const newArt = allArtObject[artId];
          newArt.id = artId;
          allArtArray.push(newArt);
        });
      }
      resolve(allArtArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const stockApi = () => new Promise((resolve, reject) => {
  axios.get('https://api.iextrading.com/1.0/stock/aapl/batch?types=quote,news,chart&range=1m&last=10')
    .then((result) => {
      console.log(result.data);
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});
stockApi();
const addNewAxios = newEntry => axios.post(`${baseUrl}/articles.json`, JSON.stringify(newEntry));
const deleteArt = artId => axios.delete(`${baseUrl}/articles/${artId}.json`);
const updateArt = (friendsObject, artId) => axios.put(`${baseUrl}/articles/${artId}.json`, JSON.stringify(friendsObject));

export default {
  getArt,
  addNewAxios,
  deleteArt,
  updateArt,
  stockApi,
};
