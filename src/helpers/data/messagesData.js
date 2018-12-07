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
const editMessageAxios = (messageId, messageObject) => axios.patch(`${firebaseUrl}/messages/${messageId}.json`, JSON.stringify(messageObject));

export default {
  getAllMessages,
  deleteMessage,
  addMessageAxios,
  editMessageAxios,
};
