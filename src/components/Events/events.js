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
    $('#events-add-container-form').html(domString).hide();
  });
};

const eventForm = (event) => {
  const domString = `
  <div class="form-row2 m-5">
  <div class="form-group2">
    <label  for="form-task-id"></label>
    <input type="text" class="form-control" value="${event.uid}" id="form-event-id" placeholder="Event Id">
    <label for="form-task-complete"></label>
    <input type="text" class="form-control" value="${event.event}" id="form-event-name" placeholder="Name of Event">
    <label for="form-task-name"></label>
    <input type="text" class="form-control" value="${event.startDate}" id="form-event-date" placeholder="Date of Event">
    <label for="form-task-name"></label>
    <input type="text" class="form-control" value="${event.location}" id="form-event-location" placeholder="Location of Event">
    </div>
  </div>
  `;
  return domString;
};

const buildAddForm = () => {
  const emptyEvent = {
    event: '',
    startDate: '',
    location: '',
    uid: '',
  };
  let domString = '<h3 class="pt-5">Add New Event</h3>';
  domString += eventForm(emptyEvent);
  domString += '<button id="add-event">Save New Event</button>';
  $('#events-add-container-form').html(domString).show();
};

const formForEvent = () => {
  const eventFromForm = {
    uid: $('#form-event-id').val(),
    event: $('#form-event-name').val(),
    startDate: $('#form-event-date').val(),
    location: $('#form-event-location').val(),
  };
  return eventFromForm;
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

// Delete Event //
const deleteEvent = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  events.deleteEvent(idToDelete)
    .then(() => {
      loadEvents();
      $('#events-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting friend', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '#add-button', buildAddForm); // Adds event
  $('body').on('click', '.delete-btn', deleteEvent); // deletes event
};

const initializeEventsPage = () => {
  loadEvents();
  bindEvents();
};

const plusNewEvent = () => {
  const newEvent = formForEvent();
  events.addNewEvent(newEvent)
  // console.log(newEvent)
    .then(() => {
      $('#events-add-container-form').hide();
      initializeEventsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-event', plusNewEvent); // Adds event

export default { initializeEventsPage };
