// 1. Fetch JSON data and render cards
fetch('data/discover.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch discover.json');
    }
    return response.json();
  })
  .then(data => {
    const grid = document.getElementById('discover-grid');

    data.forEach(item => {
      const card = document.createElement('section');
      card.classList.add('card');

      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      grid.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error loading discover cards:', error);
  });

// 2. Handle localStorage visit message
const visitMessage = document.getElementById('visitMessage');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (!lastVisit) {
  visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
} else {
  const msInDay = 1000 * 60 * 60 * 24;
  const daysSince = Math.floor((now - parseInt(lastVisit, 10)) / msInDay);

  if (daysSince < 1) {
    visitMessage.textContent = 'Back so soon! Awesome!';
  } else {
    visitMessage.textContent = `You last visited ${daysSince} day${daysSince === 1 ? '' : 's'} ago.`;
  }
}

localStorage.setItem('lastVisit', now);
