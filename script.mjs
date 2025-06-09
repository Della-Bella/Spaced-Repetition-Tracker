// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import { getData } from "./storage.mjs";

// window.onload = function () {
//   //  const users = getUserIds();
// //document.querySelector("body").innerText = `There are ${users.length} users`;
// }

const userDropdown = document.getElementById("select-users");
const users = getUserIds(); 

//  DOM Element References
console.log("window.onload: Getting DOM Element References.");
//--  ELEMENTS REFERENCE -- //
const userSelect = document.getElementById("user-select"); //dropdonw menu

//-- ELEMENTS FORM REFERENCE--//
const addTopic = document.getElementById("add-topic");
const topicTtitle = document.getElementById("topic-title");
const startDate = document.getElementById("start-date");
const submitTask = document.getElementById("submit-task"); 

//--AREA DISPLAY REF--//
const agendaContainer = document.getElementById("agenda-container"); // Not used yet

console.log("Cosnts Reference Created");


//-- Populates Dropdown menu--//

function populateUserDropdown() {

  // Add the default option that appears first
  const defaultOption = document.createElement('option');
  defaultOption.value = ""; 
  defaultOption.textContent = "Select a user...";
  defaultOption.selected = true; // Makes it the default selected item
  userDropdown.appendChild(defaultOption);

  users.forEach(user => {
    const optionElement = document.createElement("option");
    optionElement.value = user.id;
    optionElement.textContent = user.name;
    userDropdown.appendChild(optionElement);
  }); 
  console.log("Dropdown done");
}

// Calculating revision dates

function calculateRevisionDates (startDateString, topicName) {
  const startDate = new Date (startDateString);
  if (isNaN(startDate)) {
    throw new Error ("Invalid Date Format");
  };

  const revisions = [];

  const addRevision = (date) =>{
    const yyyy = date.getFullYear();
    const mm = String (date.getMonth()+1).padStart(2, '0');
    const dd = String (date.getDate()).padStart(2, '0');
    revisions.push({
      topic: topicName,
      revisionDate: `${yyyy}-${mm}-${dd}`
    });
  };

  const oneWeek = new Date(startDate);
  oneWeek.setDate(oneWeek.getDate()+7);
  addRevision(oneWeek);

  const oneMonth = new Date(startDate);
  oneMonth.setMonth(oneMonth.getMonth()+1);
  addRevision(oneMonth);

  const threeMonths = new Date(startDate);
  threeMonths.setMonth(threeMonths.getMonth()+3);
  addRevision(threeMonths);

  const sixMonths = new Date(startDate);
  sixMonths.setMonth(sixMonths.getMonth()+1);
  addRevision(sixMonths);

  const oneYear = new Date(startDate);
  oneYear.setFullYear(oneYear.getFullYear()+1);
  addRevision(oneYear);

  return revisions;
};

// Displaying Agendas for selected user

userDropdown.addEventListener('change', (event) => {
  const selectedUserID = event.target.value;
  const agendaItems = getData(selectedUserID);

  agendaContainer.innerHTML = "";

  if (!agendaItems || agendaItems.length === 0) {
    agendaContainer.textContent = "No agenda available for this user.";
    return;
  }

  const ul = document.createElement('ul');
  agendaItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.topic} - ${item.revisionDate}`;
    ul.appendChild(li);
  })
  agendaContainer.appendChild(ul);
})

populateUserDropdown();