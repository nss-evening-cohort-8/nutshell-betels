import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#nav').show();
      $('#content-wrapper').show();
    } else {
      $('#auth').show();
      $('#nav').hide();
      $('#content-wrapper').hide();
    }
  });
};

export default checkLoginStatus;
