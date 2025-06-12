import { agendaContainer } from "./domElements.js";
import { getData } from "./storage.mjs";
import { formatDateWithSuffix } from "./dateFormatting.js";

export function displayUserAgenda(userId) {
  agendaContainer.innerHTML = "";

  if (!userId) return;

  const agendaItems = getData(userId);
  if (!agendaItems) {
    agendaContainer.textContent = "No upcoming revisions.";
    return
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

  const ul = document.createElement("ul");
  const para = document.createElement('h3')
  para.textContent = "The agenda for user 3 is shown, with the revision dates shown as follows:"
  items.forEach(item => {
    const li = document.createElement("li");
    const formattedDate = formatDateWithSuffix(new Date(item.revisionDate));
    li.textContent = `${item.topic}, ${formattedDate}`;
    ul.appendChild(li);
  });
  agendaContainer.appendChild(para);
  agendaContainer.appendChild(ul);
}
