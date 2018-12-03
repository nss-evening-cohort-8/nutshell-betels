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
          const newMessage = messageObject[messageId];
          newMessage.id = messageId;
          messageArray.push(newMessage);
        });
      }
      resolve(messageArray);
    })
    .catch((error) => {
      reject(error);
    });
});


export default getAllMessages;
