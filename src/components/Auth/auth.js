import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleImage from '../../img/sign-in-with-google.png';
import backgroundImage from '../../img/home-bg.jpeg';

import './auth.scss';

const loginButton = () => {
  const domString = `
  <div class="page-container" class="text-center">
  <img class="bg-img" src="${backgroundImage}" alt="background-Image" />
      <div class="login-box card shadow rounded">
        <div class="card-header bg-transparent display-4 text-center">Welcome To Betels Group
        </div>
        <div class="card-body text-info">
          <a href="#" id="google-auth"><img src="${googleImage}" style="max-width: 20rem;" ></a>
        </div>
      </div>
  </div>
`;


  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginButton;
