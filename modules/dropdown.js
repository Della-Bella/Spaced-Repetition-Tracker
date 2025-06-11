import { userDropdown } from "./domElements.js";
import { getUserIds } from "./common.mjs";

export function populateUserDropdown() {
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a user...";
  defaultOption.selected = true;
  userDropdown.appendChild(defaultOption);

  const users = getUserIds();
  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    userDropdown.appendChild(option);
  });
}
