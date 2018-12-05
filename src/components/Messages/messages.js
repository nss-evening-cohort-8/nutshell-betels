import $ from 'jquery';
import messagesData from '../../helpers/data/messagesData';

const moment = require('moment');

moment().format();
const rightNow = () => moment().format('YYYY-MM-DD h:mm:ss a');


const messageSection = (messagesArray) => {
  let domString = '';
  domString += `     <div class="card rounded shadow">
      <div class="class-header">
      <h5 class="text-center bg-dark text-light p-2">Messages</h5>
      </div>`;

  messagesArray.forEach((messages) => {
    // const userUid = firebase.auth().currentUser;
    domString += `
      <div class="card-body p-0 px-1 d-flex justify-content-between ">
          <div class="flex-item">
            <h6 class="m-1">${messages.userName}</h6>
            <p class="text-secondary m-1">${rightNow()}</p>
          </div>
        <p class="flex-item mx-5 py-3 px-3 w-100" style="background-color:#fffde7 ;">${messages.message}</p>
        <button type="submit" class="edit-btn btn btn-light flex-item m-1" data-edit-id=${messages.id}><i class="fas fa-edit" style="font-size: 24px";></i></button>
        <button type="submit" class="del-btn btn btn-light flex-item m-1" data-delete-id=${messages.id}><i class="fas fa-trash-alt" style="font-size: 24px";></i></button>
      </div>
      <hr>
    `;
  });
  domString += `
            <div class="card-footer">
              <input class="form-control w-100" type="text" placeholder="What's in your mind?" id="msgInput">
            </div>
            </div>`;
  $('#messages-container').html(domString);
};

const getMessages = () => {
  messagesData.getAllMessages()
    .then((data) => {
      messageSection(data);
    })
    .catch((error) => {
      console.error(error);
    });
};


const deleteMessage = (e) => {
  const idToDelete = e.target.dataset.deleteId; // Grabs the id from Delete button
  messagesData.deleteMessage(idToDelete) // Delete from Firebase
    .then(() => {
      getMessages();
    })
    .catch((error) => {
      console.error(error, 'Error Deleteing Message');
    });
};
const bindEvents = () => {
  $('body').on('click', '.del-btn', deleteMessage); // On body when click on delete button then run deleteMessage function
};

const initializeMessagesPage = () => {
  getMessages();
  bindEvents();
};

export default initializeMessagesPage;
