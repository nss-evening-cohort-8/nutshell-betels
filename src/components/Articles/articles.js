import $ from 'jquery';
import getArt from '../../helpers/data/articlesData';


const printArt = (dataArray) => {
  let domString = '';
  dataArray.forEach((data) => {
    domString += `
    <div class="card" style="width: 18rem;">
  <img class="card-img-top" src=".../100px180/" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    `;
  });
  $('#articles-container').html(domString);
  // $('#addBut').html(formForTask2.formForTask());
  // the above prints the add form to dom
};

const printTaskSecond = () => {
  getArt()
    .then((data) => {
      printTask(data);
    })
    .catch((error) => {
      console.error('error in getting one friend', error);
    });
};





