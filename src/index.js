import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';

import './index.scss';
import zipCodeTest from './helpers/data/weatherData';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  checkLoginStatus();
  loginButton();
  zipCodeTest();
};

initialize();
