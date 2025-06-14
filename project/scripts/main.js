// scripts/main.js

// ========== Hamburger Menu ==========
const menuBtn = document.getElementById("menu-button");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ========== Date Info ==========
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// ========== LocalStorage Visit Counter ==========
const visitMessage = document.getElementById("visit-message");
let lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (lastVisit) {
  const daysAgo = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
  visitMessage.textContent = `Welcome back! It's been ${daysAgo} day(s) since your last visit.`;
} else {
  visitMessage.textContent = `Welcome! This is your first visit.`;
}
localStorage.setItem("lastVisit", now.toString());

// ========== Fetch Cooking Tips from Local JSON ==========
fetch("data/tips.json")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch tips.json");
    return res.json();
  })
  .then(tips => {
    const container = document.querySelector(".tips-container");
    const sampleTips = tips.sort(() => 0.5 - Math.random()).slice(0, 3); // Pick 3 random

    sampleTips.forEach(tip => {
      const tipCard = document.createElement("div");
      tipCard.classList.add("tip");
      tipCard.innerHTML = `
        <h3>${tip.title}</h3>
        <p>${tip.description}</p>
      `;
      container.appendChild(tipCard);
    });
  })
  .catch(err => {
    document.querySelector(".tips-container").textContent = "Unable to load tips.";
    console.error(err);
  });

// ========== Modal Dialog ==========
const modal = document.getElementById("modal");
const openBtn = document.getElementById("view-modal");
const closeBtn = document.getElementById("close-modal");

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
