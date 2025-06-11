import {
  userDropdown,
  startDate
} from "./modules/domElements.js";

import { populateUserDropdown } from "./modules/dropdown.js";
import { displayUserAgenda } from "./modules/agenda.js";
import { initializeForm } from "./modules/formHandler.js";

window.onload = function () {
  const today = new Date();
  startDate.value = today.toISOString().split("T")[0];

  populateUserDropdown();
  initializeForm();

  userDropdown.addEventListener("change", (event) => {
    displayUserAgenda(event.target.value);
  });
};
