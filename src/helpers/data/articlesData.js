// Author: Wayne Collier
// Purpose: calling data from firebase, functions to CRUD, and API call
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
  axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5')
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});

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
