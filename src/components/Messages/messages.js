import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import messagesData from '../../helpers/data/messagesData';

const moment = require('moment');

moment().format();
const timestampFunction = () => moment().format('YYYY-MM-DD h:mm:ss a');

const messageSection = (messageArray) => {
  let domString = '';
  domString += `<div class="card rounded shadow w-100">
      <div class="class-header">
      <h5 class="text-center bg-dark text-light p-2">Messages</h5>
      </div>`;
  if (messageArray.length > 20) {
    messageArray.shift(messageArray.length - 20, messageArray.length);
  }
  messageArray.forEach((messages) => {
    // const userUid = firebase.auth().currentUser;
    domString += `
      <div class="card-body p-0 px-1 d-flex justify-content-between ">
          <div class="flex-item">
            <h6 class="m-1">${messages.userName}</h6>
            <p class="text-secondary m-1">${timestampFunction()}</p>
          </div>
        <div class="mo w-100 mx-3 p-2" style="background-color:#fffde7;">
          <p class="mssg flex-item w-100 text-primary">${messages.message}</p>
        </div>
        <div class="w-25 flex-item test">
          <button type="submit" class="editt-btn btn btn-light m-1" data-edit-id="${messages.id}"><i class="fas fa-edit" style="font-size: 20px;"></i></button>
          <button type="submit" class="del-btn btn btn-light m-1" data-delete-id="${messages.id}"><i class="fas fa-trash-alt" style="font-size: 20px;"></i></button>
        </div>
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
    .then((messageArray) => {
      messageSection(messageArray);
    })
    .catch((error) => {
      console.error(error);
    });
};

// ----------------- ADDING MESSAGE --------------------------
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
      getMessages(); // this function creates data to DOM
      $('#msgInput').val('');
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// ----------------- DELETING MESSAGE ------------------------

const deleteMessage = (e) => {
  // const idToDelete = e.target.dataset.deleteId; // Grabs the id from Delete button
  const idToDelete = $(e.target).closest('.del-btn').data('delete-id');
  console.log(idToDelete);
  messagesData.deleteMessage(idToDelete) // Delete from Firebase
    .then(() => {
      getMessages(); // pupulate the messages again
    })
    .catch((error) => {
      console.error(error, 'Error Deleteing Message');
    });
};


$('body').on('keyup', '#msgInput', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    addNewMessage();
  }
});

$('body').on('click', '.del-btn', deleteMessage); // On body when click on delete button then run deleteMessage function
// $('body').on('click', '.edit-btn', editMessage); // On body when click on delete button then
//  run editeMessage function


// ----------------- Editing MESSAGE ------------------------

const gettingMessageObjectFromEdit = (message) => {
  const editedMessage = {
    message,
    userUid: authHelpers.getCurrentUid(),
    userName: authHelpers.getUserName(),
    isEdited: true,
    // timestamp: timestampFunction(),
  };
  return editedMessage;
};


$('body').on('keyup', '.inputEditedText', (e) => {
  if (e.keyCode === 13) {
    const editedText = e.target.value;
    const edittId = e.target.dataset.inputId;
    console.log(edittId);
    messagesData.editMessageAxios(gettingMessageObjectFromEdit(editedText), edittId)
      .then(() => {
        getMessages();
      });
  }
});


const editMessage = (e) => {
  e.preventDefault(); console.log(e.target);
  const messageIdToEdit = $(e.target).closest('.editt-btn').attr('data-edit-id'); console.log(messageIdToEdit);
  const messageToEdit = $(e.target).closest('.test').siblings('.mo')[0];
  const divHtml = $(e.target).closest('.test').siblings('.mo')[0].innerText;
  const editableText = `<input type="text" data-input-id="${messageIdToEdit}" class="inputEditedText border border-warning w-100 p-2 mx-3" style="background-color:#fff9c4;" id="editedWords" value="${divHtml}"/>`;
  $(messageToEdit).replaceWith(editableText);
};

$('body').on('click', '.editt-btn', editMessage);

// $('body').on('click', '.editt-btn', editMessage, console.log('hi'));

const initializeMessagesPage = () => {
  getMessages();
};

export default initializeMessagesPage;
