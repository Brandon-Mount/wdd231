fetch("data/discover.json")
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById("discover-grid");
    data.forEach(item => {
      const card = document.createElement("section");
      card.classList.add("card");
      card.innerHTML = `
        <h2>${item.title}</h2>
        <figure>
          <img src="${item.image}" alt="${item.title}">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;
      grid.appendChild(card);
    });
  });
