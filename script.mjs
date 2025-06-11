// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./common.mjs";
import { getData, addData } from "./storage.mjs";
import { formatDateWithSuffix } from "./dateFormatting.js";


// Dom references

export const userDropdown = document.getElementById("select-users");
export const addTopic = document.getElementById("add-topic");
export const topicTitleInput = document.getElementById("topic-title");
export const startDate = document.getElementById("topic-date");
export const submitTask = document.getElementById("submit-task");
const agendaContainer = document.getElementById("agenda-container");

window.onload = function () {
  const dateInput = document.getElementById("topic-date");
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  dateInput.value = formattedDate;
  console.log("dateformating working");

  populateUserDropdown();
};


const users = getUserIds();



console.log("Consts Reference Created");

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
export function calculateRevisionDates(startDateString, topicName) {
  const startDateObj = new Date(startDateString);
  if (isNaN(startDateObj)) {
    throw new Error("Invalid Date Format");
  }

  const revisions = [];

  const addRevision = (date, intervalLabel) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    revisions.push({
      topic: topicName,
      interval: intervalLabel, // new propriety to store labels
      revisionDate: date.toISOString().split("T")[0] 
    });
  };

  const oneWeek = new Date(startDateObj);
  oneWeek.setDate(oneWeek.getDate() + 7);
  addRevision(oneWeek, "1 Week");

  const oneMonth = new Date(startDateObj);
  oneMonth.setMonth(oneMonth.getMonth() + 1);
  addRevision(oneMonth, "1 Month");

  const threeMonths = new Date(startDateObj);
  threeMonths.setMonth(threeMonths.getMonth() + 3);
  addRevision(threeMonths, "3 Months");

  const sixMonths = new Date(startDateObj);
  sixMonths.setMonth(sixMonths.getMonth() + 6);
  addRevision(sixMonths, "6 Months");

  const oneYear = new Date(startDateObj);
  oneYear.setFullYear(oneYear.getFullYear() + 1);
  addRevision(oneYear, "1 Year");

  return revisions;
}

// --- NEW REUSABLE DISPLAY FUNCTION (from main branch) ---
// This display logic now has its own function so we can call it from anywhere.
export function displayUserAgenda(userId) {
  agendaContainer.innerHTML = ""; //clear display

  if (!userId) {
    return; // If no user is selected, don't show anything.
  }

  const agendaItems = getData(userId);
  if (!agendaItems) {
    return; // No data for this user
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const items = agendaItems
    .filter(item => new Date(item.revisionDate) >= today)
    .sort((a, b) => new Date(a.revisionDate) - new Date(b.revisionDate));

  if (items.length === 0) {
  agendaContainer.textContent = "No upcoming revisions.";
  return;
  }

  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');

    li.textContent = `${item.topic}  - ${formatDateWithSuffix(new Date(item.revisionDate))} - ${item.interval}`; // add date labe in li
    ul.appendChild(li);
  });
  agendaContainer.appendChild(ul);
}

// New event listener calling the reusable display function (from main branch)
userDropdown.addEventListener('change', (event) => {
  const selectedUserID = event.target.value;
  displayUserAgenda(selectedUserID);
});

// Your form submission logic, updated to work with the new functions and variables
addTopic.addEventListener('submit', (event) => {
  event.preventDefault();

  const selectedUserID = userDropdown.value;
  const topicName = topicTitleInput.value;
  const topicStartDate = startDate.value;

  if (!selectedUserID) {
    alert("Please pick a user!");
    return;
  }

  if (!(topicName.trim()) || !topicStartDate) {
    alert("Please Enter both topic and start date!");
    return;
  }

  const newAgendaArray = calculateRevisionDates(topicStartDate, topicName);

  addData(selectedUserID, newAgendaArray);

  // Refresh the display using the new function
  displayUserAgenda(selectedUserID);

  // Clear the input for the next entry
  topicTitleInput.value = "";
});

// Initialize the page

