import $ from 'jquery';
import axios from 'axios';
import articlesData from '../../helpers/data/articlesData';
import getCurrentUid2 from '../../helpers/authHelpers';
import apiKeys from '../../../db/apiKeys';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const formForTask = () => {
  const domString = `
  <div class="form-row">
  <div class="form-group">
    <input id="synopsisId" type="text" class="form-control" id="form-article-synopsis" placeholder="Discription">
    <input id="titleId" type="text" class="form-control" id="form-article-title" placeholder="Title">
    <input id="urlId" type="text" class="form-control" id="form-article-url" placeholder="URL"> 
    <button id="addButtons" class="btn btn-primary">Add Article</button>
  </div>
  </div>
  `;
  $('#aritlces-add-container-form').show();
  $('#aritlces-add-container-form').html(domString);
  return domString;
};

const printArt = (dataArray) => {
  let domString = '';
  dataArray.forEach((data) => {
    console.log(data);
    domString += `
    <div id="${data.id}" class="card cardStartDiv" style="width: 40rem;">
  <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <p class="card-text">${data.synopsis}</p>
    <a href="${data.url}" class="btn btn-primary">Go somewhere</a>
    <button id="editArtBut"type="button" class="btn btn-secondary">Edit</button>
    <button id="delArtBut" type="button" class="btn btn-danger">X</button>
  </div>
</div>
    `;
  });
  $('#articles-container').html(domString);
};

const printArtSecond = () => {
  articlesData.getArt()
    .then((data) => {
      printArt(data);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const printArtSecond2 = () => {
  articlesData.getArt()
    .then((data) => {
      $('#aritlces-add-container-form').hide();
      printArt(data);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

const artFromForm2 = () => {
  const taskFromForm = {
    synopsis: $('#synopsisId').val(),
    title: $('#titleId').val(),
    url: $('#urlId').val(),
    uid: getCurrentUid2.getCurrentUid(),
  };
  return taskFromForm;
};

const addNewTask = () => {
  const newTask = artFromForm2();
  articlesData.addNewAxios(newTask)
    .then(() => {
      console.log('DataBase is updated?', newTask);
      printArtSecond2();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const deleteArt = (idToDelete) => {
  articlesData.deleteArt(idToDelete)
    .then(() => {
      console.log('Delete button is wokring');
      printArtSecond2();
      // domTasks2.domTasks();
    })
    .catch((error) => {
      console.error('error in deleting task', error);
    });
};

const getSingleArt = artId => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/articles/${artId}.json`)
    .then((result) => {
      const singleArt = result.data;
      singleArt.id = artId;
      resolve(singleArt);
    })
    .catch((error) => {
      reject(error);
    });
});

// BELOW IS BEING WORKED ON FOR THE EDIT BUTTON

const formForTask2 = (art) => {
  const domString = `
  <div class="form-row">
  <div class="form-group">
    <input id="synopsisId" type="text" class="form-control" value="${art.synopsis}" id="form-article-synopsis" placeholder="Discription">
    <input id="titleId" type="text" class="form-control" value="${art.title}" id="form-article-title" placeholder="Title">
    <input id="urlId" type="text" class="form-control" value="${art.url}" id="form-article-url" placeholder="URL"> 
    <button id="addButtons2" data-single-edit-id=${art.id} class="btn btn-primary">Add Article</button>
  </div>
  </div>
  `;
  // $('#aritlces-add-container-form').html(domString);
  return domString;
};


const editArt = (idToEdit) => {
  getSingleArt(idToEdit) // only need fromGetter. added to this if you are importing from dataGetter
    .then((singleArt) => { // not 100% sure on the sigleArt unless it is the resolve
      let domString = '';
      domString += formForTask2(singleArt);
      // $('#aritlces-add-container-form').html(domString).show();
      console.log(domString);
      $('#aritlces-add-container-form').show();
      $('#aritlces-add-container-form').html(domString); // this is going to add the new form
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const eventBinder2 = () => {
  $('#aritlces-add-container-form').show();
  formForTask();
};

const eventBinders = () => {
  addNewTask();
  printArtSecond();
};

$('body').on('click', '#addArtButt', () => { eventBinder2(); });
$('body').on('click', '#addButtons', () => { eventBinders(); });
$('body').on('click', '#delArtBut', (e) => { const idNeeded = $(e.target).closest('div').parent(); const idNeeded2 = idNeeded[0].id; deleteArt(idNeeded2); });
$('body').on('click', '#editArtBut', (e) => { const idNeeded = $(e.target).closest('div').parent(); const idNeeded2 = idNeeded[0].id; editArt(idNeeded2); });

export default printArtSecond;
