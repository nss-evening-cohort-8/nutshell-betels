/* eslint-disable import/no-cycle */

import $ from 'jquery';
import events from '../../helpers/data/eventsData';

const printEvents = (eventsArray) => {
  let domString = '';
  eventsArray.forEach((event) => {
    domString += `
      <div>
        <h1>${event.event}</h1>
        <h3>${event.startDate}</h3>
        <p>${event.location}</p>
        <button class='btn btn-danger delete-btn' data-delete-id=${event.id}>Delete</button>
        <button class='btn btn-info edit-btn' data-edit-id=${event.id}>Edit</button>
      </div>`;
    $('#events').html(domString);
  });
};

const loadEvents = () => {
  // const uid = authHelpers.getCurrentUid();
  events.getEvents()
    .then((eventsArray) => {
      printEvents(eventsArray);
    })
    .catch((error) => {
      console.error('error in getting events', error);
    });
};

export default loadEvents;
