/* eslint-disable import/no-cycle */

import $ from 'jquery';
import events from '../../helpers/data/eventsData';

const printEvents = (eventsArray) => {
  let domString = '';
  eventsArray.forEach((event) => {
    domString += `
      <div class="card" style="width: 40rem;">
        <div class="card-body">
          <h5 class="card-title">${event.event}</h5>
          <h3>${event.startDate}</h3>
          <p class="card-text">${event.location}</p>
          <button class='btn btn-danger delete-btn' data-delete-id=${event.id}>Delete</button>
          <button class='btn btn-info edit-btn' data-edit-id=${event.id}>Edit</button>
        </div>
      </div>`;
    $('#events-container').html(domString);
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
