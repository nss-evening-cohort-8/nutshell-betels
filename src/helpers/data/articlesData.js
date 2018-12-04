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


const addNewAxios = newEntry => axios.post(`${baseUrl}/articles.json`, JSON.stringify(newEntry));
const deleteArt = artId => axios.delete(`${baseUrl}/articles/${artId}.json`);
const updateArt = (friendsObject, artId) => axios.put(`${baseUrl}/tasks/${artId}.json`, JSON.stringify(friendsObject));
// const deleteArt = taskId => axios.delete(`${baseUrl}/articles/${taskId}.json`);


// export default {
//   getArt,
//   addNewAxios,
//   deleteTask,
//   updateTask,
//   getSingleTask,
// };
export default {
  getArt,
  addNewAxios,
  deleteArt,
  updateArt,
};
