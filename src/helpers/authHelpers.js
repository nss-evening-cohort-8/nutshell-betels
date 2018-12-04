import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const getCurrentUid = () => firebase.auth().currentUser.uid;

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').fadeOut(1000);
      $('#nav').fadeIn(1000);
      $('#content-wrapper').fadeIn(1000);
    } else {
      $('#auth').fadeIn(1000);
      $('#nav').fadeOut(1000);
      $('#content-wrapper').fadeOut(1000);
    }
  });
};

export default { checkLoginStatus, getCurrentUid };
