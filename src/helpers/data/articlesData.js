import axios from 'axios';

import apiKeys from '../../db/apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getArt = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/articles.json`)
    .then((result) => {
      const allArtObject = result.data;
      const allArtArray = [];
      if (allTasksObject != null) {
        Object.keys(allArtObject).forEach((taskId) => {
          const newTask = allArtObject[taskId];
          newTask.id = taskId;
          allArtArray.push(newTask);
        });
      }
      resolve(allArtArray);
    })
    .catch((err) => {
      reject(err);
    });
});


// const addNewAxios = randomName => axios.post(`${baseUrl}/tasks.json`, JSON.stringify(randomName));

// const deleteTask = taskId => axios.delete(`${baseUrl}/tasks/${taskId}.json`);

// const updateTask = (artObject, taskId) => axios.put(`${baseUrl}/tasks/${taskId}.json`, JSON.stringify(artObject));


// export default {
//   getArt,
//   addNewAxios,
//   deleteTask,
//   updateTask,
//   getSingleTask,
// };
export default getArt;