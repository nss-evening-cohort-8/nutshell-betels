import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import loginButton from './components/Auth/auth';

import './index.scss';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  checkLoginStatus();
  loginButton();
};

initialize();
