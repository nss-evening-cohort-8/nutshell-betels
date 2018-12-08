// Author: Chase Hamby
// Purpose: Calls for Event data

/* eslint-disable import/no-cycle */
import axios from 'axios';
import eventStuff from '../../components/Events/events';
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
      resolve(allEventsArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSingleEvent = eventId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/events/${eventId}.json`)
    .then((result) => {
      const singleEvent = result.data;
      singleEvent.id = eventId;
      resolve(singleEvent);
    })
    .catch((error) => {
      reject(error);
    });
});

const printSingleEvent = () => {
  getEvents()
    .then((data) => {
      eventStuff.printEvents(data);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const deleteEvent = eventId => axios.delete(`${baseUrl}/events/${eventId}.json`);

const addNewEvent = allEventsObject => axios.post(`${baseUrl}/events.json`, JSON.stringify(allEventsObject));

const updateEvent = (allEventsObject, eventId) => axios.put(`${baseUrl}/events/${eventId}.json`, JSON.stringify(allEventsObject));

export default {
  getEvents,
  deleteEvent,
  addNewEvent,
  updateEvent,
  printSingleEvent,
  getSingleEvent,
};
