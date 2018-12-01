import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import './auth.scss';

const loginButton = () => {
  const domString = '<button class="btn btn-primary" id="google-auth">Login</button>';
  $('#auth').html(domString);
  $('#google-auth').on('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  });
};

export default loginButton;
