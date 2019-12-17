"use strict";

// SPA functionality //

// hide all pages
function hideAllTabs() {
  let tabs = document.querySelectorAll(".tab");
  for (let tab of tabs) {
    tab.style.display = "none";
  }
}

// show page or tab
function showTab(tabId) {
  hideAllTabs();
  document.querySelector(`#${tabId}`).style.display = "block";
  location.href = `#${tabId}`;
  setActiveTab(tabId);
}

// sets active tabbar/ menu item
function setActiveTab(tabId) {
  let tabs = document.querySelectorAll("nav a");
  for (let tab of tabs) {
    if (`#${tabId}` === tab.getAttribute("href")) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }

  }
}

// set default page
function setDefaultTab() {
  let tab = "welcome";
  if (location.hash) {
    tab = location.hash.slice(1);
  }
  showTab(tab);
}

setDefaultTab();

// show a spinning loader when loading
function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}
