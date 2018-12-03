import $ from 'jquery';
import getArt from '../../helpers/data/articlesData';


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
  // $('#addBut').html(formForTask2.formForTask());
  // the above prints the add form to dom
};

const printArtSecond = () => {
  getArt()
    .then((data) => {
      printArt(data);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};


export default printArtSecond;
