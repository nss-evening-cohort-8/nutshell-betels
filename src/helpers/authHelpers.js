/* eslint-disable import/no-cycle */

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
      $('#auth').fadeIn(1000);
      $('#nav').hide();
      $('#content-wrapper').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;
const getUserName = () => firebase.auth().currentUser.displayName;

export default { checkLoginStatus, getCurrentUid, getUserName };
