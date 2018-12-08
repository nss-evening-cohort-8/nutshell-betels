import './navbar.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        $('#nav').fadeOut(1000);
        $('#content-wrapper').fadeOut(1000);
        $('#auth').fadeIn(1000);
      }).catch((err) => {
        console.log('You are stil logged in', err);
      });
    }
  });
};


const createNavbar = () => {
  const domString = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand mr-5" href="#" style="font-weight: 500; font-size: 2em;">Betels</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <div class="nav-item float-left mx-3" id="auth"></div>
    
    <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a id="navbar-button-logout" class="nav-link" href="#">Logout</a>
        </li>
    </ul>
 
    </div>
</nav>`;

  $('#nav').html(domString);
  navbarEvents();
};

export default createNavbar;
