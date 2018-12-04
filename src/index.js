import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import loginButton from './components/Auth/auth';
import checkLoginStatus2 from './helpers/authHelpers';
import createNavbar from './components/Navbar/navbar';
import weatherStuff from './components/Weather/weather';
import printArt from './components/Articles/articles';
import loadEvents from './components/Events/events';
import getMessages from './components/Messages/messages';

import './index.scss';

const initializeData = () => {
  weatherStuff.initializeWeather();
};

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  loginButton();
  checkLoginStatus2.checkLoginStatus(initializeData);
  createNavbar();
  getMessages();
  printArt();
  loadEvents.initializeEventsPage();
};

initializeApp();
