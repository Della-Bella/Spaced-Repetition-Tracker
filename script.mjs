// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import { getData, addData } from "./storage.mjs";
import { formatDateWithSuffix } from "./dateFormatting.js"; 
import { renderAgendas } from "./renderAgendas.mjs";

window.onload = function () {
  const dateInput = document.getElementById("topic-date");
  const today = new Date(); // 2. Create a new Date object
  const formattedDate = today.toISOString().split('T')[0];
  dateInput.value = formattedDate;
  console.log ("dateformating working");
}

const userDropdown = document.getElementById("select-users");
const users = getUserIds(); 

//  DOM Element References
console.log("window.onload: Getting DOM Element References.");
//--  ELEMENTS REFERENCE -- //
const userSelect = document.getElementById("user-select"); //drop-down menu

//-- ELEMENTS FORM REFERENCE--//
const addTopicForm = document.getElementById("add-topic");
const topicTitleInput = document.getElementById("topic-title");
const startDateInput = document.getElementById("topic-date");
const submitTaskButton = document.getElementById("submit-task"); 

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
      revisionDate: formatDateWithSuffix(date)
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
  sixMonths.setMonth(sixMonths.getMonth()+6);
  addRevision(sixMonths);

  const oneYear = new Date(startDate);
  oneYear.setFullYear(oneYear.getFullYear()+1);
  addRevision(oneYear);

  return revisions;
};

// Displaying Agendas for selected user

userDropdown.addEventListener('change', (event) => {
  const selectedUserID = event.target.value;

  if (!selectedUserID) {
    agendaContainer.innerHTML = "";
  }
  
  renderAgendas(selectedUserID);
});

// Submitting Form with new revision

addTopicForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedUserID = userDropdown.value;
  const topicName = topicTitleInput.value;
  const startDate = startDateInput.value;

  if (!selectedUserID){
    alert ("Please pick a user!");
    return;
  }

  if (!(topicName.trim()) || !startDate) {
    alert("Please Enter both topic and start date!");
    return;
  }

  const newAgendaArray = calculateRevisionDates (startDate, topicName);

  addData (selectedUserID, newAgendaArray);

  renderAgendas (selectedUserID);

  topicTitleInput.value = "";
});


populateUserDropdown();