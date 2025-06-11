import {
  userDropdown,
  addTopic,
  topicTitleInput,
  startDate
} from "./domElements.js";

import { calculateRevisionDates } from "./dateLogic.js";
import { addData } from "./storage.mjs";
import { displayUserAgenda } from "./agenda.js";

export function initializeForm() {
  addTopic.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedUserID = userDropdown.value;
    const topicName = topicTitleInput.value;
    const topicStartDate = startDate.value;

    if (!selectedUserID) {
      alert("Please pick a user!");
      return;
    }

    if (!topicName.trim() || !topicStartDate) {
      alert("Please enter both topic and start date!");
      return;
    }

    const newAgendaArray = calculateRevisionDates(topicStartDate, topicName);
    addData(selectedUserID, newAgendaArray);
    displayUserAgenda(selectedUserID);
    topicTitleInput.value = "";
  });
}
