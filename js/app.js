"use strict";

/*
// Modal functionality
customElements.define('modal-page', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = document.getElementById('modal-create').innerHTML;
  }
});

function presentModal() {
  // create the modal with the `modal-page` component
  const modalElement = document.createElement('ion-modal');
  modalElement.component = 'modal-page';
  // present the modal
  document.body.appendChild(modalElement);
  return modalElement.present();
}

customElements.define('opslag-modal-page', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = document.getElementById('modal-opslag').innerHTML;
  }
});

function presentOpslagModal() {
  // create the modal with the `modal-page` component
  const modalElement = document.createElement('ion-modal');
  modalElement.component = 'modal-opslag';
  // present the modal
  document.body.appendChild(modalElement);
  return modalElement.present();
}

async function dismissModal() {
  let modal = document.getElementsByTagName('ion-modal')[0];
  await modal.dismiss({
    'dismissed': true
  });
}
*/

//-------Modal function ------//

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
