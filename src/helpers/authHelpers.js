/* eslint-disable import/no-cycle */

import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import weatherStuff from '../components/Weather/weather';
import printArt2 from '../components/Articles/articles';
import loadEvents from '../components/Events/events';
import initializeMessagesPage from '../components/Messages/messages';

const initializeData = () => {
  weatherStuff.initializeWeather();
  printArt2.printArtSecond();
  loadEvents.initializeEventsPage();
  initializeMessagesPage();
};

const checkLoginStatus = () => {
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
