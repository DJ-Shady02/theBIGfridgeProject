"use strict";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDqJP-26kE2eu80t7I7ov4pHneEYGBK8Hg",
  authDomain: "thebigfridge-exam.firebaseapp.com",
  databaseURL: "https://thebigfridge-exam.firebaseio.com",
  projectId: "thebigfridge-exam",
  storageBucket: "thebigfridge-exam.appspot.com",
  messagingSenderId: "254950745655",
  appId: "1:254950745655:web:29d57f775cad704d8bc1b2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Make auth and firestore references
const _auth = firebase.auth();
const _db = firebase.firestore();

// Force long polling for Jakob to be able to use firestore
// This creates longer loadtimes, but ensures the minority of users who experience this connection issue are able to use the app as well.
_db.settings({
  experimentalForceLongPolling: true
});

// hide welcome tabs
function hideWelcomeTabs() {
  const tabs = document.querySelectorAll('.welcome-tab');
  for (let tab of tabs) {
    tab.style.display = "none";
  }
}

// show login form
function showLogin() {
  // hide all tabs
  hideWelcomeTabs();

  // then show login tab
  const loginTab = document.querySelector('#login-form');
  loginTab.style.display = "block";
}

// show signup form
function showSignup() {
  // hide all tabs
  hideWelcomeTabs();

  // then show first signup tab
  const signupTab = document.querySelector('#signup-form');
  signupTab.style.display = "block";
}

// show welcome index
function showWelcomeIndex() {
  // hide all tabs
  hideWelcomeTabs();

  // then show first signup tab
  const indexTab = document.querySelector('#welcome-index');
  indexTab.style.display = "flex";
}

const _firstTab = document.querySelector('#signup-form-tab-one');
const _secondTab = document.querySelector('#signup-form-tab-two');
// show first tab of the signup form
function showFirstSignupTab() {
  // hide the first tab
  _secondTab.style.display = "none";

  // then show first signup tab
  _firstTab.style.display = "block";
}

// show second tab of the signup form
function showSecondSignupTab() {
  // check if the first tab has been filled in
  const signupEmail = document.querySelector('#signup-email');
  const signupPassword = document.querySelector('#signup-password');
  const signupPasswordRepeat = document.querySelector('#signup-password-repeat');

  // Handle errors
  if (signupEmail.value == "" || signupPassword.value == "" || signupPasswordRepeat.value == "" || signupPassword.value != signupPasswordRepeat.value) { // If error
    console.log("Invalid values" + "Correct values and try again");
    // show error to user
    return; // Do not show the second tab
  } else {
    // remove error in case they go back to the first tab
  }

  // hide the first tab
  _firstTab.style.display = "none";

  // then show first signup tab
  _secondTab.style.display = "block";
}

// ---------- Firebase auth functionality ---------- //

// Listen for auth status changes
// If logged in and page refreshes, stay logged in.
_auth.onAuthStateChanged(user => {
  console.log("User Credentials:");
  console.log(user);
  if (user) {
    // Go directly to home
    showTab("home");
    showTabbar(true);
  } else {
    // If no user, let them log in
    showTab("welcome");
    showTabbar(false);
  }
});

// Signup
function signupUser() {
  // Get user info
  const signupEmail = document.querySelector('#signup-email');
  const signupPassword = document.querySelector('#signup-password');
  // no need to get password repeat, we already checked if they were equal
  const signupFirstName = document.querySelector('#signup-first-name');
  const signupLastName = document.querySelector('#signup-last-name');
  const signupAddress = document.querySelector('#signup-address');
  const signupCity = document.querySelector('#signup-city');
  const signupPostal = document.querySelector('#signup-postal');
  const signupPhone = document.querySelector('#signup-phone');
  const signupCash = document.querySelector('#signup-cash');
  const signupMobilePay = document.querySelector('#signup-mobilepay');

  // Handle errors
  // signupEmail and -password has already been checked
  if (signupFirstName.value == "" || signupLastName.value == "" || signupAddress.value == "" || signupCity.value == signupPostal.value || signupPhone.value == "") { // If error
    console.log("Invalid values" + "Correct values and try again");
    // show error to user
    return; // Do not create user
  } else {
    // remove error in case they come back or have to try again and recieve new errors
  };

  // Sign up the user
  _auth.createUserWithEmailAndPassword(signupEmail.value, signupPassword.value).then(cred => {
    return _db.collection('users').doc(cred.user.uid).set({
      firstName: signupFirstName.value,
      lastName: signupLastName.value,
      address: signupAddress.value,
      city: signupCity.value,
      postal: signupPostal.value,
      phone: signupPhone.value,
      cash: signupCash.checked,
      mobilePay: signupMobilePay.checked,
    });
  }).then(() => {
    // go to home
    showTab("home");
    showTabbar(true);

    // Reset the form field input
  }).catch(err => {
    // display error
    console.log(err.message);
    //signupForm.querySelector('.error').innerHTML = err.message;
  });
}

// Logout
const logout = document.querySelector('#logout');
function logoutUser() {
  _auth.signOut();
  showTabbar(false);
  console.log("User logged out");
}

// Login
function loginUser() {
  // Get user info
  const loginEmail = document.querySelector('#login-email');
  const loginPassword = document.querySelector('#login-password');

  _auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value).then(cred => {
    // go to home
    showTab("home");
    showTabbar(true);
  });
}

// Hide or show tabbar
function showTabbar(boolean) {
  const tabbar = document.querySelector('nav');
  if (boolean === true) {
    tabbar.style.display = "flex";
  } else {
    tabbar.style.display = "none";
  }
}
