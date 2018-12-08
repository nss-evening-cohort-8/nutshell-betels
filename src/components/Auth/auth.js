import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleImage from '../../img/sign-in-with-google.png';
import backgroundImage from '../../img/home-bg.jpeg';

import './auth.scss';

const loginButton = () => {
  const domString = `
  <div class="page-container d-flex justify-content-center align-items-center position-relative text-center">
  <img class="bg-img w-100" src="${backgroundImage}" alt="background-Image" />
      <div class="login-box bg-transparent position-absolute">
        <div class="bg-transparent text-light display-3 text-center">Welcome To Betels Group
        </div>
        <div class="text-info mt-3">
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
