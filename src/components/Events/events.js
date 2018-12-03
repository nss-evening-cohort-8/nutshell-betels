import $ from 'jquery';
import getEvents from '../../helpers/data/eventsData';
// import authHelpers from '../../helpers/authHelpers';

const printEvent = (eventsArray) => {
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

const eventsPage = () => {
  // const uid = authHelpers.getCurrentUid();
  getEvents.getEvents()
    .then((eventsArray) => {
      printEvent(eventsArray);
    })
    .catch((error) => {
      console.error('error in getting events', error);
    });
};

export default eventsPage;
