// ---- Settings: change these ----
const CATEGORIES = ["Mobiles", "Laptops & computers", "Chargers & cables", "Home appliances", "Batteries", "Circuit boards & parts", "Other"];
const STORAGE_KEY = "rewire-listings-v1";

// Sample listings shown to everyone. Replace with your own.
const SEED = [
  { id: "s1", title: "Old Android phones (lot of 5)", category: "Mobiles", condition: "For parts only", price: 800, qty: 5, location: "Visakhapatnam", phone: "919999999999" },
  { id: "s2", title: "HP laptop, 4GB RAM, battery weak", category: "Laptops & computers", condition: "Working", price: 7500, qty: 1, location: "Gajuwaka, Visakhapatnam", phone: "919999999999" },
  { id: "s3", title: "Mixed phone chargers and USB cables", category: "Chargers & cables", condition: "Working", price: 150, qty: 20, location: "Dwaraka Nagar, Visakhapatnam", phone: "919999999999" },
  { id: "s4", title: "Table fan, motor humming", category: "Home appliances", condition: "Needs repair", price: 300, qty: 1, location: "Madhurawada, Visakhapatnam", phone: "919999999999" }
];

// ---- Storage (browser only; see README for sharing listings between visitors) ----
function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
}
function save(items) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); return true; } catch { return false; }
}

let mine = load();
let activeCategory = "All";

const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// ---- Filters ----
function renderChips() {
  const box = $("#chips");
  box.innerHTML = ["All", ...CATEGORIES].map((c) =>
    `<button type="button" class="chip" aria-pressed="${c === activeCategory}" data-cat="${esc(c)}">${esc(c)}</button>`
  ).join("");
}
$("#chips").addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  activeCategory = b.dataset.cat;
  renderChips();
  renderGrid();
});
$("#search").addEventListener("input", renderGrid);

// ---- Listings ----
function renderGrid() {
  const q = $("#search").value.trim().toLowerCase();
  const items = [...mine, ...SEED].filter((i) =>
    (activeCategory === "All" || i.category === activeCategory) &&
    (!q || (i.title + " " + i.location).toLowerCase().includes(q))
  );
  $("#grid").innerHTML = items.map((i) => {
    const text = encodeURIComponent(`Hi, I'm interested in your listing "${i.title}" on ReWire.`);
    return `<article class="card">
      <span class="cat">${esc(i.category)}</span>
      <h3>${esc(i.title)}</h3>
      <div class="price">₹${Number(i.price).toLocaleString("en-IN")}</div>
      <p class="meta">${esc(i.condition)}. Quantity: ${esc(i.qty)}<br>${esc(i.location)}</p>
      <a class="btn" href="https://wa.me/${esc(i.phone)}?text=${text}" target="_blank" rel="noopener">Message on WhatsApp</a>
    </article>`;
  }).join("");
  $("#empty").hidden = items.length > 0;
}

// ---- Sell form ----
const sel = document.querySelector('select[name="category"]');
sel.innerHTML = CATEGORIES.map((c) => `<option>${esc(c)}</option>`).join("");

$("#sellForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  mine.unshift({ id: "u" + Date.now(), ...d });
  const ok = save(mine);
  e.target.reset();
  activeCategory = "All";
  renderChips();
  renderGrid();
  $("#msg").textContent = ok ? "Published. Your listing is at the top of the list." : "Published for this visit only. Browser storage is unavailable.";
  document.getElementById("browse").scrollIntoView();
});

renderChips();
renderGrid();
