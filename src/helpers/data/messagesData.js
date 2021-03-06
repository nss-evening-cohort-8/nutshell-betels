// Author: Mohammad Khezri
// Purpose: Calls for Event data

import axios from 'axios';
import apiKeys from '../../../db/apiKeys';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllMessages = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/messages.json`)
    .then((results) => {
      const messageObject = results.data;
      const messageArray = [];
      if (messageObject != null) {
        Object.keys(messageObject).forEach((messageId) => {
          messageObject[messageId].id = messageId;
          messageArray.push(messageObject[messageId]);
        });
      }
      resolve(messageArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteMessage = messageId => axios.delete(`${firebaseUrl}/messages/${messageId}.json`); // It send a request to Firebase for deleteing
const addMessageAxios = messageObject => axios.post(`${firebaseUrl}/messages.json`, JSON.stringify(messageObject));

const editMessageAxios = (messageObject, messageId) => new Promise((resolve, reject) => {
  axios.put(`${firebaseUrl}/messages/${messageId}.json`, JSON.stringify(messageObject))
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getAllMessages,
  deleteMessage,
  addMessageAxios,
  editMessageAxios,
};
