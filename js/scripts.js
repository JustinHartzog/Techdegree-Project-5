const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';



fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(response => response.json())
  .then(data => resultsJSON = data)
  .then(data => generateImage(data.results))
  .then(() => createModals(resultsJSON.results))



function generateImage(data) {
var users ='';
  $.each(data, function(index, data){
  const html = `
  <div class="card">
      <div class="card-img-container">
          <img class="card-img" src="${data.picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
          <p class="card-text">${data.email}</p>
          <p class="card-text cap">${data.location.city + ', ' + data.location.state}</p>
      </div>
  </div>
        `;

users += html;

});
gallery.innerHTML = users;
}
const x = modalContainer.children;
console.log(x);
const y = gallery.children;
console.log(y);




gallery.addEventListener('click', (e) => {
  let z = e.target.closest(".card");
  for (let i = 0; i <= y.length; i += 1) {
    if(z == y[i]){
      w = x[i];
    }
  }
  console.log(z);
  w.style.display = '';
  $('.modal-container').show();
  $('button').click(function () {
    w.style.display = 'none';
    $('.modal-container').hide();
  });

});



function createModals(resultsJSON) {
  var modal = '';
  $.each(resultsJSON, function(index, resultsJSON){
  const html = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${resultsJSON.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${resultsJSON.name.first} ${resultsJSON.name.last}</h3>
                <p class="modal-text">${resultsJSON.email}</p>
                <p class="modal-text cap">${resultsJSON.location.city}</p>
                <hr>
                <p class="modal-text">${' ' + resultsJSON.cell}</p>
                <p class="modal-text cap">${resultsJSON.location.street + ', ' + resultsJSON.location.state + ', ' + resultsJSON.location.postcode}</p>
                <p class="modal-text">Birthday: ${formatBOD(resultsJSON.dob.date)}</p>
            </div>
            </div>
        `;
modal += html;

});
modalContainer.innerHTML = modal;
body.appendChild(modalContainer);
$('.modal').hide();
$('.modal-container').hide();
}
function formatBOD(setence) {
  const expression  = /(\d{4})-(\d{2})-(\d{2})(.+)/;
  return setence.replace(expression, "$2/$3/$1");
}
