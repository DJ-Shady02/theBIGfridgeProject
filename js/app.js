"use strict";

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
  modalElement.component = 'opslag-modal-page';
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

// ---------- Profile Tab ---------- //

// Load the users own profile info for their tab
const profileTab = document.querySelector("#profile");
function loadOwnProfile() {
  //let htmlTemplate = "";
  //no htmlTemplate needed as we are not for looping

  // check if it has already been loading
  let user = "";
  if (profileTab.classList.contains("loaded") === true) {
    return;
  } else { //load user
    user = _auth.currentUser;
    profileTab.classList.add("loaded");
  }

  _db.collection("users").doc(user.uid).onSnapshot(function(userDoc) {
    console.log("Current data: ", userDoc.data());

    // profile picture
    const picture = document.querySelector('#profile-img');
    // check if picture exists
    if (userDoc.data().profilePicture) {
      picture.src = `img/${userDoc.data().profilePicture}`;
    } else {
      console.log("No profile picture available");
      picture.src = "img/profile-picture-placeholder.jpg";
    }

    // amount of posts
    const postCount = document.querySelector('#profile-posts .pangolin');
    // if any posts exist
    if (userDoc.data().posts) {
      // display the array length
      postCount.innerHTML = userDoc.data().posts.length;
    } else {
      // display the default value
      postCount.innerHTML = "0";
    }

    // amount of followers
    const followerCount = document.querySelector('#profile-followers .pangolin');
    // if any followers exist
    if (userDoc.data().followers) {
      // display the array length
      followerCount.innerHTML = userDoc.data().followers.length;
    } else {
      // display the default value
      followerCount.innerHTML = "0";
    }

    // amount of following
    const followingCount = document.querySelector('#profile-following .pangolin');
    // if any followers exist
    if (userDoc.data().following) {
      // display the array length
      followingCount.innerHTML = userDoc.data().following.length;
    } else {
      // display the default value
      followingCount.innerHTML = "0";
    }

    // name - no need to check if it exists
    const name = document.querySelector('#profile-name');
    name.innerHTML = (`${userDoc.data().firstName} ${userDoc.data().lastName}`);

    // bio
    const bio = document.querySelector('#profile-bio');
    // if a bio exist
    if (userDoc.data().bio) {
      // display the array length
      followingCount.innerHTML = userDoc.data().bio;
    } else {
      // display nothing
    }

    // posts in cards
    const cardContainer = document.querySelector(".profile.card-container");
    // if any posts exists (again)
    if (userDoc.data().posts) {
      // post posts
      /*
      _db.collection("posts").doc(user.uid).onSnapshot(function(postDoc) {
        console.log("Current data: ", postDoc.data());
      });
      */

      /* card template
      <section class="card">
        <img src="img/img-placeholder.jpg" class="card-img" alt="bruger uploadet billede">
        <div class="card-header">
          <h3 class="card-title">Eksempel 1</h3>
        </div>
        <div class="card-content">
          <p>2.2 km</p>
          <p>10 kr</p>
        </div>
      </section>
      */
    } else {
      cardContainer.innerHTML = "<p>Du har ingen opslag</p>"
    }
  });

}
