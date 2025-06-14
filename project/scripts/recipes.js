const recipeContainer = document.querySelector('#recipe-container');
const lastViewedSection = document.querySelector('#last-viewed');

async function fetchRecipes() {
  try {
    const response = await fetch('data/recipes.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const recipes = await response.json();
    displayRecipes(recipes);
    showLastViewed(recipes);
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    recipeContainer.innerHTML = '<p class="error">Unable to load recipes. Please try again later.</p>';
  }
}

function displayRecipes(recipes) {
  recipeContainer.innerHTML = recipes.map(recipe => `
    <div class="recipe-card" data-name="${recipe.name}">
      <img src="images/recipes/${recipe.image}" alt="${recipe.name}" loading="lazy">
      <h3>${recipe.name}</h3>
      <p><strong>Time:</strong> ${recipe.time} mins</p>
      <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
    </div>
  `).join('');

  // Add event listener to store last viewed
  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name');
      localStorage.setItem('lastViewedRecipe', name);
    });
  });
}

function showLastViewed(recipes) {
  const lastViewed = localStorage.getItem('lastViewedRecipe');
  if (lastViewed) {
    const match = recipes.find(r => r.name === lastViewed);
    if (match) {
      lastViewedSection.innerHTML = `
        <h2>Last Viewed Recipe</h2>
        <div class="recipe-card mini">
          <img src="images/recipes/${match.image}" alt="${match.name}" loading="lazy">
          <h3>${match.name}</h3>
          <p><strong>Time:</strong> ${match.time} mins</p>
          <p><strong>Difficulty:</strong> ${match.difficulty}</p>
        </div>
      `;
    }
  }
}

fetchRecipes();