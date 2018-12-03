import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import loginButton from './components/Auth/auth';
import checkLoginStatus from './helpers/authHelpers';
import createNavbar from './components/Navbar/navbar';

import './index.scss';

const initialize = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  loginButton();
  checkLoginStatus();
  createNavbar();
};

initialize();
