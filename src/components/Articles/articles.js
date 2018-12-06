import $ from 'jquery';
import axios from 'axios';
import articlesData from '../../helpers/data/articlesData';
import getCurrentUid2 from '../../helpers/authHelpers';
import apiKeys from '../../../db/apiKeys';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const formForTask = () => {
  const domString = `
  <div class="form-row mx-auto" style="width: 40rem">
  <div class="form-group" style="width: 40rem">
    <input id="synopsisId" type="text" class="form-control" id="form-article-synopsis" placeholder="Discription">
    <input id="titleId" type="text" class="form-control" id="form-article-title" placeholder="Title">
    <input id="urlId" type="text" class="form-control" id="form-article-url" placeholder="URL"> 
    <button id="addButtons" class="btn btn-primary">Add Article</button>
    <button id="addCancelButtons2" class="btn btn-primary">Cancel</button>
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
    domString += `
    <div id="${data.id}" class="card cardStartDiv" style="width: 40rem;">
  <div class="card-body">
    <h5 class="card-title">${data.synopsis}</h5>
    <p class="card-text">${data.title}</p>
    <a href="${data.url}" target="_blank"  class="btn btn-primary" >Go somewhere</a>
    <button id="editArtBut"type="button" class="btn btn-primary">Edit</button>
    <button id="delArtBut" type="button" class="btn btn-primary">X</button>
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
      printArtSecond2();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const deleteArt = (idToDelete) => {
  articlesData.deleteArt(idToDelete)
    .then(() => {
      printArtSecond2();
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

const formForTask2 = (art) => {
  const domString = `
  <div class="form-row mx-auto" style="width: 40rem">
  <div class="form-group" style="width: 40rem">
    <input id="synopsisId" type="text" class="form-control" value="${art.synopsis}" id="form-article-synopsis" placeholder="Discription">
    <input id="titleId" type="text" class="form-control" value="${art.title}" id="form-article-title" placeholder="Title">
    <input id="urlId" type="text" class="form-control" value="${art.url}" id="form-article-url" placeholder="URL"> 
    <button id="addButtons2" data-single-edit-id=${art.id} class="btn btn-primary">Update</button>
    <button id="addCancelButtons2" data-single-edit-id=${art.id} class="btn btn-primary">Cancel</button>
  </div>
  </div>
  `;
  return domString;
};


const editArt = (idToEdit) => {
  getSingleArt(idToEdit)
    .then((singleArt) => {
      let domString = '';
      domString += formForTask2(singleArt);
      console.log(domString);
      $('#aritlces-add-container-form').show();
      $('#aritlces-add-container-form').html(domString);
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateArt = (artId) => {
  const updatedArt = artFromForm2();
  articlesData.updateArt(updatedArt, artId)
    .then(() => {
      printArtSecond2();
    })
    .catch((error) => {
      console.error('error', error);
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

const eventBinders3 = () => {
  $('#aritlces-add-container-form').hide();
};

$('body').on('click', '#addArtButt', () => { eventBinder2(); });
$('body').on('click', '#addButtons', () => { eventBinders(); });
$('body').on('click', '#addCancelButtons2', () => { eventBinders3(); });
$('body').on('click', '#delArtBut', (e) => { const idNeeded = $(e.target).closest('div').parent(); const idNeeded2 = idNeeded[0].id; deleteArt(idNeeded2); });
$('body').on('click', '#editArtBut', (e) => { const idNeeded = $(e.target).closest('div').parent(); const idNeeded2 = idNeeded[0].id; editArt(idNeeded2); });
$('body').on('click', '#addButtons2', () => { const idNeeded = $('#addButtons2').data('single-edit-id'); updateArt(idNeeded); });

const getStockApi = () => {
  articlesData.stockApi()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('error in getting location', error);
    });
};

getStockApi();

export default printArtSecond;
