import $ from 'jquery';
import messagesData from '../../helpers/data/messagesData';

const messageSection = (messagesArray) => {
  let domString = '';
  domString += `     <div class="card rounded shadow">
      <div class="class-header">
      <h5 class="text-center bg-dark text-light p-2">Messages</h5>
      </div>`;

  messagesArray.forEach((messages) => {
    domString += `
      <div class="card-body">
        <p>${messages.userUid}</p>
        <p>${messages.timestamp}</p>
        <p>${messages.message}</p>
        <hr>
      </div>
    `;
  });
  domString += `
           
            <div class="card-footer">
              <input class="w-100" type="text" placeholder="What's in your mind?" id="msgInput">
            </div>
            </div>`;
  $('#messages-container').html(domString);
};

const getMessages = () => {
  messagesData()
    .then((data) => {
      messageSection(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default getMessages;
