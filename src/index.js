import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';
import zipCodeTest from './helpers/data/weatherData';
import weatherSection from './components/Weather/weather';

import './index.scss';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  checkLoginStatus();
  loginButton();
  weatherSection();
  zipCodeTest();
};

initialize();
