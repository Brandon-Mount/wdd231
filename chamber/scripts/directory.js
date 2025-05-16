const displayContainer = document.getElementById('membersDisplay');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');

gridBtn.addEventListener('click', () => {
  displayContainer.classList.add('grid');
  displayContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  displayContainer.classList.add('list');
  displayContainer.classList.remove('grid');
});

async function getMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  displayContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership">Level: ${['Member', 'Silver', 'Gold'][member.level - 1]}</p>
    `;
    displayContainer.appendChild(card);
  });
}

getMembers();
