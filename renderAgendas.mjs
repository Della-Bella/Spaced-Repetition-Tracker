export function renderAgendas(user) {
  const agendaItems = getData(user);

  agendaContainer.innerHTML = "";

  if (!agendaItems || agendaItems.length === 0) {
    agendaContainer.textContent = "No agenda available for this user.";
    return;
  }

  const today = new Date();
  today.setHours(0,0,0,0);

  const items = agendaItems
    .filter(item => new Date(item.revisionDate) >= today)
    .sort((a,b) => new Date(a.revisionDate) - new Date(b.revisionDate));

  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.topic} - ${item.revisionDate}`;
    ul.appendChild(li);
  });
  agendaContainer.appendChild(ul);
}