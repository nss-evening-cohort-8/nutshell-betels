import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeData) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').fadeOut(1000);
      $('#nav').fadeIn(1000);
      $('#content-wrapper').fadeIn(1000);
      initializeData();
    } else {
      $('#content-wrapper').fadeOut(1000);
      $('#nav').fadeOut(1000);
      $('#auth').fadeIn(1000);
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;
const getUserName = () => firebase.auth().currentUser.displayName;

export default { checkLoginStatus, getCurrentUid, getUserName };
