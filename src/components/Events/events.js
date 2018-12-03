import axios from 'axios';

import apiKeys from '../../../db/apiKeys';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getEvents = () => new Promise((resolve, reject) => {
  axios
    .get(`${baseUrl}/events.json`)
    .then((result) => {
      const allEventsObject = result.data;
      const allEventsArray = [];
      if (allEventsObject != null) {
        Object.keys(allEventsObject).forEach((eventId) => {
          const newEvent = allEventsObject[eventId];
          newEvent.id = eventId;
          allEventsArray.push(newEvent);
        });
      }
      resolve(allArtArray);
    })
    .catch((err) => {
      reject(err);
    });
});


const deleteEvent = eventId => axios.delete(`${baseUrl}/events/${eventId}.json`);


// export default {
//   getArt,
//   addNewAxios,
//   deleteTask,
//   updateTask,
//   getSingleTask,
// };
export default getArt;