"use strict";



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
      console.log("i was here");
      _db.collection("posts").doc(user.uid).onSnapshot(function(postDoc) {
        console.log("Current data: ", postDoc.data());
        //cardContainer.innerHTML =

      });


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



//-------Modal function ------//

// Get the modal
var modal = document.getElementById("myModal");
var createModal = document.getElementById("createModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function openModal() {
  modal.style.display = "block";
}
function openCreateModal() {
  createModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
function closeModal() {
  createModal.style.display = "none";
}




// ------ Create post ------ //

function createPost() {
  // Get user info
  const createImage = document.querySelector('#create-image');
  const createTitle = document.querySelector('#create-title');
  // no need to get password repeat, we already checked if they were equal
  const createDescription = document.querySelector('#create-description');
  const createCategory = document.querySelector('#create-category');
  const createQuality= document.querySelector('#create-quality');
  const createAmount = document.querySelector('#create-amount');
  const createExpiration = document.querySelector('#create-expiration');
  const createPrice = document.querySelector('#create-price');


  // Handle errors

  /*if (signupLastName.value == "" || signupAddress.value == "" || signupCity.value == signupPostal.value || signupPhone.value == "") { // If error
    console.log("Invalid values" + "Correct values and try again");
    // show error to user
    return; // Do not create user
  } else {
    // remove error in case they come back or have to try again and recieve new errors
  };*/


  let newPostId = "";
  // add post
  _db.collection("posts").add({
      img: ["img/img-placeholder.jpg"],
      title: createTitle.value,
      description: createDescription.value,
      category: createCategory.value,
      quality: createQuality.value,
      amount: createAmount.value,
      expirationDate: new Date(createExpiration.value).getTime(),
      price: createPrice.value,
      uploadDate: new Date().getTime(),
      userId: _auth.currentUser.uid

  }).then(function(postRef) {
    newPostId = postRef.id;
  });

  _db.collection("users").doc(_auth.currentUser.uid).onSnapshot(function(userDoc) {
    console.log(userDoc.posts);
    /*.update({
        posts: postArray
    });*/
});

}
