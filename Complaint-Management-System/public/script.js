// public/script.js
const API_BASE = "../backend/api";

let complaints = [];
let filtered = [];
let page = 1,
  per = 8,
  sort = "created_at",
  dir = "desc";

const $ = (selector) => document.querySelector(selector);

async function init() {
  await loadTypes();
  await loadComplaints();
  setupForm();
  setupControls();
}

async function loadTypes() {
  const res = await fetch(`${API_BASE}/getTypes.php`);
  const types = await res.json();
  const sel = $("#typeSelect");
  sel.innerHTML = types
    .map((t) => `<option value="${t.id}">${escapeHtml(t.name)}</option>`)
    .join("");
}

async function loadComplaints() {
  const url = new URL(`${API_BASE}/getComplaints.php`, location.href);
  url.searchParams.set("page", page);
  url.searchParams.set("per", per);
  url.searchParams.set("sort", sort);
  url.searchParams.set("dir", dir);
  const res = await fetch(url.toString());
  const j = await res.json();
  complaints = j.data;
  filtered = complaints;
  renderTable(j.meta);
}

function renderTable(meta) {
  const tbody = $("#complaintsTable tbody");
  tbody.innerHTML = "";
  complaints.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${escapeHtml(c.title)}</td>
      <td>${escapeHtml(c.type_name)}</td>
      <td>${escapeHtml(c.status)}</td>
      <td>${new Date(c.created_at).toLocaleString()}</td>
    `;
    tbody.appendChild(tr);
  });

  renderPagination(meta);
}

function renderPagination(meta) {
  const total = meta ? meta.total : 0;
  const totalPages = Math.ceil(total / per);
  const wrap = $("#pagination");
  wrap.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const b = document.createElement("button");
    b.textContent = i;
    if (i === page) b.style.fontWeight = "700";
    b.addEventListener("click", () => {
      page = i;
      loadComplaints();
    });
    wrap.appendChild(b);
  }
}

function setupForm() {
  $("#complaintForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      title: $("#title").value.trim(),
      description: $("#description").value.trim(),
      type_id: parseInt($("#typeSelect").value, 10),
      anonymous: $("#anonymous").checked ? 1 : 0,
      student_id: null, // if you implement login, set real id
    };
    const res = await fetch(`${API_BASE}/addComplaint.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await res.json();
    if (j.ok) {
      $("#formMsg").textContent = "Complaint sent — thank you.";
      $("#complaintForm").reset();
      page = 1;
      loadComplaints();
    } else {
      $("#formMsg").textContent = j.error || "Error";
    }
  });
}

function setupControls() {
  $("#search").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      loadComplaints();
      return;
    }
    // local filter across currently loaded page — for remote search, call backend with q param
    const filteredLocal = complaints.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.type_name && r.type_name.toLowerCase().includes(q))
    );
    renderFilteredLocal(filteredLocal);
  });

  $("#filterStatus").addEventListener("change", (e) => {
    const val = e.target.value;
    // remote filter
    page = 1;
    const url = new URL(`${API_BASE}/getComplaints.php`, location.href);
    if (val) url.searchParams.set("status", val);
    fetch(url.toString())
      .then((r) => r.json())
      .then((j) => {
        complaints = j.data;
        renderTable(j.meta);
      });
  });

  // clicking headers to sort
  document.querySelectorAll("#complaintsTable thead th").forEach((th) => {
    th.addEventListener("click", () => {
      const col = th.dataset.col || "created_at";
      if (sort === col) dir = dir === "desc" ? "asc" : "desc";
      else {
        sort = col;
        dir = "desc";
      }
      loadComplaints();
    });
  });
}

function renderFilteredLocal(rows) {
  const tbody = $("#complaintsTable tbody");
  tbody.innerHTML = "";
  rows.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${c.id}</td><td>${escapeHtml(
      c.title
    )}</td><td>${escapeHtml(c.type_name)}</td><td>${escapeHtml(
      c.status
    )}</td><td>${new Date(c.created_at).toLocaleString()}</td>`;
    tbody.appendChild(tr);
  });
}

function escapeHtml(s) {
  if (!s) return "";
  return s.replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        ch
      ])
  );
}

window.addEventListener("DOMContentLoaded", init);
