// scripts/tools.js
const container = document.getElementById('tools-container');
const modal = document.getElementById('tool-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalCategory = document.getElementById('modal-category');
const modalDesc = document.getElementById('modal-description');
const modalClose = document.getElementById('modal-close');

async function fetchTools() {
  try {
    const res = await fetch('data/tools.json');
    if (!res.ok) throw new Error('Failed to fetch tools');
    const tools = await res.json();
    renderTools(tools);
  } catch (err) {
    container.innerHTML = `<p class="error">Error loading tools: ${err.message}</p>`;
  }
}

function renderTools(tools) {
  container.innerHTML = tools.map(tool => `
    <div class="tool-card" data-name="${tool.name}" tabindex="0" aria-label="More about ${tool.name}">
      <img src="images/tools/${tool.image}" alt="${tool.name}" loading="lazy" />
      <h3>${tool.name}</h3>
      <p><strong>Category:</strong> ${tool.category}</p>
    </div>
  `).join('');

  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => showModal(tools.find(t => t.name === card.dataset.name)));
    card.addEventListener('keypress', e => {
      if (e.key === 'Enter') showModal(tools.find(t => t.name === card.dataset.name));
    });
  });
}

function showModal(tool) {
  modalTitle.textContent = tool.name;
  modalImage.src = `images/tools/${tool.image}`;
  modalImage.alt = tool.name;
  modalCategory.textContent = `Category: ${tool.category}`;
  modalDesc.textContent = tool.description;
  modal.classList.remove('hidden');
  modal.focus();
}

modalClose.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.add('hidden');
});

fetchTools();
