import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import messagesData from '../../helpers/data/messagesData';

const moment = require('moment');

moment().format();
const timestampFunction = () => moment().format('YYYY-MM-DD h:mm:ss a');


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
            <p class="text-secondary m-1">${timestampFunction()}</p>
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
              <input class="inputNewMsg form-control w-100" type="text" placeholder="What's in your mind?" id="msgInput">
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


// ----------------- DELETING MESSAGE ------------------------

const deleteMessage = (e) => {
  const idToDelete = e.target.dataset.deleteId; // Grabs the id from Delete button
  messagesData.deleteMessage(idToDelete) // Delete from Firebase
    .then(() => {
      getMessages(); // pupulate the messages again
    })
    .catch((error) => {
      console.error(error, 'Error Deleteing Message');
    });
};

// ----------------- ADDING MESSAGE ------------------------
const gettingMessageFromInputField = () => {
  const message = {
    message: $('#msgInput').val(),
    userUid: authHelpers.getCurrentUid(),
    userName: authHelpers.getUserName(),
    isEdited: false,
    timestamp: timestampFunction(),
  };
  return message;
};


const addNewMessage = () => {
  const newMessage = gettingMessageFromInputField();
  messagesData.addMessageAxios(newMessage)
    .then(() => {
      messageSection();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('keyup', '#msgInput', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    addNewMessage();
    $('#msgInput').val('');
  }
});

$('body').on('click', '.del-btn', deleteMessage); // On body when click on delete button then run deleteMessage function

const initializeMessagesPage = () => {
  getMessages();
};

export default initializeMessagesPage;
