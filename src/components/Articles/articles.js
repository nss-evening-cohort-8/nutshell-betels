// Author: Wayne Collier
// Purpose: To print articles, API stock News, stock Ticker and News module

import $ from 'jquery';
import axios from 'axios';
import articlesData from '../../helpers/data/articlesData';
import getCurrentUid2 from '../../helpers/authHelpers';
import apiKeys from '../../../db/apiKeys';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const trading = () => {
  const domString = `
  <div class="tradingview-widget-container">
  <div id="tradingview_cbf65"></div>
  <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener"
      target="_blank"><span class="blue-text">AAPL chart</span></a> by TradingView</div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
    new TradingView.widget(
      {
        "width": 1000,
        "height": 300,
        "symbol": "NASDAQ:AAPL",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "Light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_cbf65"
      }
    );
  </script>
</div>
  `;
  $('tradingDOM').html(domString);
};


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

const articlesHeader = () => {
  const domString = `
  <div class="headerArticleWrapper" style="width: 40rem">
        <div class="card imgH3" style="width: 40rem">
          <img class="artImg" src="https://vignette.wikia.nocookie.net/halofanon/images/c/c9/BBC_News.png/revision/latest?cb=20101105020913
 https://vignette.wikia.nocookie.net/halofanon/images/c/c9/BBC_News.png/revision/latest?cb=20101105020913
 "
            alt="Card image cap" style="width: 10rem">
          <h3>From News, Videos and Post Malone updates. Stay Informed!
          </h3>
          <button id="addArtButt" type="button" class="btn btn-primary">Add</button>
        </div>
        
      </div>
  `;
  $('#newArticlesHeaderDOM').html(domString);
};

const printArt = (dataArray) => {
  let domString = '';
  dataArray.forEach((data) => {
    domString += `
    <div id="${data.id}" class="card cardStartDiv" style="width: 40rem;">
  <div class="card-body">
    <h5 class="card-title">${data.synopsis}</h5>
    <p class="card-text">${data.title}</p>
    <a href="${data.url}" target="_blank"  class="btn btn-primary" >Read More</a>
    <button id="editArtBut"type="button" class="btn btn-primary">Edit</button>
    <button id="delArtBut" type="button" class="btn btn-primary">X</button>
  </div>
</div>
    `;
  });
  $('#articles-container').html(domString);
  articlesHeader();
  trading();
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


const stockString = (data) => {
  const domString2 = `
  <div class="card-group">
  <div class="card">
  <img class="card-img-top" src="https://images-na.ssl-images-amazon.com/images/I/61T4iK0hdqL._SX466_.jpg" height="180" width="293" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${data.AAPL.news[0].headline}</h5>
      <p class="card-text">${data.AAPL.news[0].summary}<a href="${data.AAPL.news[0].url}"target="_blank">CLICK HERE</a></p>
    </div>
    <div class="card-footer">
      <small class="text-muted"> Updated: ${data.AAPL.chart[0].date}</small>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="https://regmedia.co.uk/2017/07/28/shutterstock_facebook3.jpg" height="180" width="293" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${data.FB.news[0].headline}</h5>
      <p class="card-text">${data.FB.news[0].summary}<a href="${data.FB.news[0].url}"target="_blank">CLICK HERE</a></p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Updated: ${data.FB.chart[0].date}</small>
    </div>
  </div>
  <div class="card">
    <img class="card-img-top" src="http://www.logosvectorfree.com/wp-content/uploads/2017/12/Tesla-Logo-Vector-Free-PNG.jpg" height="180" width="293" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${data.TSLA.news[0].headline}</h5>
      <p class="card-text">${data.TSLA.news[0].summary}<a href="${data.TSLA.news[0].url}"target="_blank">CLICK HERE</a></p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Updated: ${data.TSLA.chart[0].date}</small>
    </div>
  </div>
</div>
  `;
  $('#stockNews').html(domString2);
};


const getStockApi = () => {
  articlesData.stockApi()
    .then((data) => {
      stockString(data);
    })
    .catch((error) => {
      console.error('error in getting location', error);
    });
};


export default { printArtSecond, getStockApi };
