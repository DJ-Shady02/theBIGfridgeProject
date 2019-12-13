"use strict";

// Modal functionality
customElements.define('modal-page', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = document.getElementById('modal-sell').innerHTML;
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

async function dismissModal() {
  let modal = document.getElementsByTagName('ion-modal')[0];
  await modal.dismiss({
    'dismissed': true
  });
}
