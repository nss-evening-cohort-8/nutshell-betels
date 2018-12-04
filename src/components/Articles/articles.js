import $ from 'jquery';
import articlesData from '../../helpers/data/articlesData';
import getCurrentUid2 from '../../helpers/authHelpers';

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
  $('#aritlces-add-container-form').html(domString);
  return domString;
};

const printArt = (dataArray) => {
  let domString = '';
  dataArray.forEach((data) => {
    console.log(data);
    domString += `
    <div class="card" style="width: 40rem;">
  <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <p class="card-text">${data.synopsis}</p>
    <a href="${data.url}" class="btn btn-primary">Go somewhere</a>
    <button type="button" class="btn btn-secondary">Edit</button>
    <button type="button" class="btn btn-danger">X</button>
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

const eventBinders = () => {
  addNewTask();
  printArtSecond2();
};

$('body').on('click', '#addArtButt', () => { formForTask(); });
$('body').on('click', '#addButtons', () => { eventBinders(); });

export default printArtSecond;
