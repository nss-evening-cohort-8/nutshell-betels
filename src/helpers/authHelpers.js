import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#page-container').fadeOut(1000);
      $('#nav').fadeIn(1000);
    } else {
      $('#page-container').fadeIn(1000);
      $('#nav').fadeOut(1000);
    }
  });
};

export default checkLoginStatus;
