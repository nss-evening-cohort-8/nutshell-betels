import $ from 'jquery';
import getArt from '../../helpers/data/articlesData';


const formForTask = () => {
  const domString = `
  <div class="form-row">
  <div class="form-group">
    <input type="text" class="form-control" id="form-article-synopsis" placeholder="Discription">
    <input type="text" class="form-control" id="form-article-title" placeholder="Title">
    <input type="text" class="form-control" id="form-article-url" placeholder="URL"> 
    <button id="addButtons" class="btn btn-primary">Add Task</button>
  </div>
  </div>
  `;
  $('#aritlces-add-container-form').html(domString);
  return domString;
};

const newArtFunction = () => {
  $('#addArtButt').click($('aritlces-add-container-form').show());
  // $('body').on('click', '#addArtButt', $('aritlces-add-container-form').show());
  // $('body').on('click', '#addArtButt2', () => { formForTask(); });
};


const printArt = (dataArray) => {
  let domString = '';
  dataArray.forEach((data) => {
    console.log(data);
    domString += `
    <div class="card" style="width: 40rem;">
  <div class="card-body">
    <h5 class="card-title">${data.title}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
    <button type="button" class="btn btn-secondary">Edit</button>
    <button type="button" class="btn btn-danger">X</button>
  </div>
</div>
    `;
  });
  $('#articles-container').html(domString);
  formForTask();
  // $('#addBut').html(formForTask2.formForTask());
  // the above prints the add form to dom
};

const printArtSecond = () => {
  getArt()
    .then((data) => {
      printArt(data);
      newArtFunction();
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};

// BELOW IS IN PROGRESS ;


// const artFromForm2 = () => {
//   const taskFromForm = {
//     id: $('#form-task-id').val(),
//     isCompleted: $('#form-task-complete').val(),
//     task: $('#form-task-name').val(),
//   };
//   return taskFromForm;
// };

// const addNewTask = () => {
//   const newTask = artFromForm2();
//   fromGetter.addNewAxios(newTask)
//     .then(() => {
//       console.log('DataBase is updated?', newTask);
//       printTaskSecond2.printTaskSecond();
//       // domTasks2.domTasks();
//     })
//     .catch((error) => {
//       console.error('error', error);
//     });
// };

// ABLOVE IS IN PROGRESS ;


export default printArtSecond;
