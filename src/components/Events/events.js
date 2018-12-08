// Author: Chase
// Purpose: Getting and printing event functions.

/* eslint-disable import/no-cycle */

import $ from 'jquery';
import events from '../../helpers/data/eventsData';
import './events.scss';

// Had to put this function into the print events so events wouldn't show on page when logged out //
const eventStuff = () => {
  const domString = `
      <div class="card pl-2" style="width: 40rem">
      <h3 class="mr-5 ml-2 d-flex justify-content-center">Events</h3>
      <div>
        <button id="add-button" type="button" class="btn btn-primary m-3 ml-3" style="width: 33rem">Add Event</button>
      </div>
    </div>
  `;
  return domString;
};

const printEvents = (eventsArray) => {
  let domString = '';
  eventsArray.forEach((event) => {
    domString += `
    <div class="card-media">
      <div class="card-media-object-container" ${event.uid}>
        <img class="img-here" src=${event.img}
      </div>
    <div class="card-media-body">
        <h3 class="subtle">${event.startDate}</h3>
      <h3 class="card-media-body-heading">${event.event}</h3>
        <h4 class="card-media-body-supporting-bottom-text subtle">${event.location}</h4>
        <a href="${event.url}" class="card-media-body-supporting-bottom-text card-media-link u-float-right">VIEW EVENT</a>
        <button class='btn btn-danger delete-btn m-1' data-delete-id=${event.id}>Delete</button>
        <button class='btn btn-info edit-btn m-1' data-edit-id=${event.id}>Edit</button>
      </div>
    </div>
  </div>`;
    $('#events-container').html(eventStuff());
    $('#events-container').append(domString);
    $('#events-add-container-form').html(domString).hide();
  });
};

const eventForm = (event) => {
  const domString = `
  <div class="form-row2 m-3">
  <div class="form-group2">
    <label  for="form-task-id"></label>
    <input type="text" class="form-control" value="${event.img}" id="form-img-id" placeholder="${event.img}">
    <label  for="form-task-id"></label>
    <input type="text" class="form-control" value="${event.uid}" id="form-event-id" placeholder="Event Id">
    <label for="form-task-complete"></label>
    <input type="text" class="form-control" value="${event.event}" id="form-event-name" placeholder="Name of Event">
    <label for="form-task-name"></label>
    <input type="text" class="form-control" value="${event.startDate}" id="form-event-date" placeholder="Date of Event">
    <label for="form-task-name"></label>
    <input type="text" class="form-control" value="${event.location}" id="form-event-location" placeholder="Location of Event">
    <label for="form-task-name"></label>
    <input type="text" class="form-control" value="${event.url}" id="form-event-url" placeholder="Event URL">
    </div>
  </div>
  `;
  return domString;
};

// Form Building //

const buildAddForm = () => {
  const emptyEvent = {
    event: '',
    startDate: '',
    location: '',
    url: '',
    uid: '',
    img: 'https://source.unsplash.com/collection/1658153/250x350',
  };
  let domString = '<h2 class="d-flex justify-content-center pt-4">Add New Event</h2>';
  domString += eventForm(emptyEvent);
  domString += `<div class="d-flex justify-content-center p-3">
    <button id="add-event" class="btn btn-dark">Save New Event</button></div>`;
  $('#events-add-container-form').html(domString).show();
};

const formForEvent = () => {
  const eventFromForm = {
    img: $('#form-img-id').val(),
    uid: $('#form-event-id').val(),
    event: $('#form-event-name').val(),
    startDate: $('#form-event-date').val(),
    location: $('#form-event-location').val(),
    url: $('#form-event-url').val(),
  };
  return eventFromForm;
};

// Loads Events to page //

const loadEvents = () => {
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

// Adds New Event //

const plusNewEvent = () => {
  const newEvent = formForEvent();
  events.addNewEvent(newEvent)
    .then(() => {
      $('#events-add-container-form').hide();
      initializeEventsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// Edit Event //

const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  events.getSingleEvent(idToEdit)
    .then((singleEvent) => {
      let domString = '<h2 class="d-flex justify-content-center pt-4">Edit Event</h2>';
      domString += eventForm(singleEvent);
      domString += `<div class="d-flex justify-content-center p-3">
        <button id="edit-event" class="btn btn-dark" data-single-edit-id=${singleEvent.id}>Update Event</button></div>`;
      $('#events-add-container-form').html(domString).show();
      $('#events-container').hide();
    })
    .catch((error) => {
      console.error('error in getting single friend', error);
    });
};

const editEvent = (e) => {
  const updatedEvent = formForEvent();
  const eventId = e.target.dataset.singleEditId;
  events.updateEvent(updatedEvent, eventId)
    .then(() => {
      $('#events-add-container-form').html('').hide();
      $('#events-container').html('');
      $('#events-container').show();
      initializeEventsPage(); // always need to call the database like this
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-event', plusNewEvent); // Adds event
$('body').on('click', '.edit-btn', showEditForm); // Shows Edit form
$('body').on('click', '#edit-event', editEvent); // Saves Edit

export default { initializeEventsPage };
