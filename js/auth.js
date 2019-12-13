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
const auth = firebase.auth();
const db = firebase.firestore();

// Force long polling for Jakob to be able to use firestore
db.settings({
  experimentalForceLongPolling: true
});

// ---------- Firebase auth functionality ---------- //

// Listen for auth status changes
auth.onAuthStateChanged(user => {
  console.log(user);
  if (user) {
    // Get data
    db.collection('guides').onSnapshot(snapshot => {
      _setupGuides(snapshot.docs);
      _setupUI(user);
    }, err => {
      console.log(err.message);
    });
  } else {
    _setupGuides([]); //Call it with empty array
    _setupUI();
  }
});

// Create new guide
const createForm = document.querySelector('#create-form')
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('guides').add({
    title: createForm['title'].value,
    content: createForm['content'].value
  }).then(() => {
    // close modal and reset form

    // Get the modal
    const modal = document.querySelector('#modal-create');
    // Close modal
    M.Modal.getInstance(modal).close();
    // Reset the form field input
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  })
})

// Signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  //Prevent from refreshing page
  e.preventDefault();

  // Get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // Sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });
  }).then(() => {
    // Get the modal
    const modal = document.querySelector('#modal-signup');
    // Close modal
    M.Modal.getInstance(modal).close();
    // Reset the form field input
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
