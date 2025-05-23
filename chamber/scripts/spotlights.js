async function loadSpotlights() {
  const response = await fetch('data/members.json');
  const members = await response.json();

  // Filter only silver and gold members
  const spotlightCandidates = members.filter(m => m.level === 2 || m.level === 3);

  // Randomly pick 2 or 3
  const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
  const shuffled = spotlightCandidates.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  const container = document.querySelector('.spotlight-container');
  container.innerHTML = '';

  selected.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>Phone: ${member.phone}</p>
      <p>Address: ${member.address}</p>
      <p>Level: ${member.level === 3 ? 'Gold' : 'Silver'}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    container.appendChild(card);
  });
}

loadSpotlights();
