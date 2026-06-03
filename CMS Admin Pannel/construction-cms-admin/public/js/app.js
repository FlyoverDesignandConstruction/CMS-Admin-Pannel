const API_BASE = "/api";
const STORAGE_KEY = "construction-cms-admin-data-v1";

const sectionConfigs = {
  banners: {
    label: "Home Page Banners",
    singular: "Banner",
    titleField: "title",
    noteField: "subtitle",
    imageField: "image_url",
    columns: ["title", "button_text", "sort_order", "status"],
    fields: [
      { name: "title", label: "Banner Title", type: "text", required: true },
      { name: "subtitle", label: "Subtitle", type: "textarea", wide: true },
      { name: "button_text", label: "Button Text", type: "text" },
      { name: "button_link", label: "Button Link", type: "text" },
      { name: "image_url", label: "Image URL", type: "url", wide: true },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] }
    ]
  },
  "company-profile": {
    label: "Company Profile",
    singular: "Profile",
    titleField: "headline",
    noteField: "summary",
    columns: ["headline", "years_experience", "status"],
    fields: [
      { name: "headline", label: "Headline", type: "text", required: true, wide: true },
      { name: "summary", label: "Company Summary", type: "textarea", wide: true },
      { name: "mission", label: "Mission", type: "textarea", wide: true },
      { name: "vision", label: "Vision", type: "textarea", wide: true },
      { name: "years_experience", label: "Years Experience", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] }
    ]
  },
  services: {
    label: "Services",
    singular: "Service",
    titleField: "name",
    noteField: "summary",
    columns: ["name", "icon_name", "sort_order", "status"],
    fields: [
      { name: "name", label: "Service Name", type: "text", required: true },
      { name: "summary", label: "Service Summary", type: "textarea", wide: true },
      { name: "icon_name", label: "Icon Name", type: "text" },
      { name: "sort_order", label: "Sort Order", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] }
    ]
  },
  projects: {
    label: "Project Portfolio",
    singular: "Project",
    titleField: "name",
    noteField: "summary",
    imageField: "image_url",
    columns: ["name", "category", "location", "status"],
    fields: [
      { name: "name", label: "Project Name", type: "text", required: true },
      { name: "category", label: "Category", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "client_name", label: "Client Name", type: "text" },
      { name: "completion_year", label: "Completion Year", type: "number" },
      { name: "image_url", label: "Image URL", type: "url", wide: true },
      { name: "summary", label: "Project Summary", type: "textarea", wide: true },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] }
    ]
  },
  testimonials: {
    label: "Testimonials",
    singular: "Testimonial",
    titleField: "client_name",
    noteField: "quote_text",
    columns: ["client_name", "client_role", "rating", "status"],
    fields: [
      { name: "client_name", label: "Client Name", type: "text", required: true },
      { name: "client_role", label: "Client Role", type: "text" },
      { name: "quote_text", label: "Testimonial", type: "textarea", wide: true },
      { name: "rating", label: "Rating", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] }
    ]
  },
  posts: {
    label: "News and Blog Posts",
    singular: "Post",
    titleField: "title",
    noteField: "excerpt",
    columns: ["title", "slug", "published_at", "status"],
    fields: [
      { name: "title", label: "Post Title", type: "text", required: true, wide: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea", wide: true },
      { name: "body", label: "Body", type: "textarea", wide: true },
      { name: "published_at", label: "Publish Date", type: "date" },
      { name: "status", label: "Status", type: "select", options: ["published", "draft"] }
    ]
  },
  contacts: {
    label: "Contact Information",
    singular: "Contact Detail",
    titleField: "office_name",
    noteField: "address",
    columns: ["office_name", "phone", "email", "status"],
    fields: [
      { name: "office_name", label: "Office Name", type: "text", required: true },
      { name: "address", label: "Address", type: "textarea", wide: true },
      { name: "phone", label: "Phone", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "map_url", label: "Map URL", type: "url", wide: true },
      { name: "facebook_url", label: "Facebook URL", type: "url" },
      { name: "linkedin_url", label: "LinkedIn URL", type: "url" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] }
    ]
  },
  messages: {
    label: "Contact Messages",
    singular: "Message",
    titleField: "sender_name",
    noteField: "message",
    columns: ["sender_name", "sender_email", "subject", "status"],
    fields: [
      { name: "sender_name", label: "Sender Name", type: "text", required: true },
      { name: "sender_email", label: "Sender Email", type: "email" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "subject", label: "Subject", type: "text", wide: true },
      { name: "message", label: "Message", type: "textarea", wide: true },
      { name: "status", label: "Status", type: "select", options: ["new", "read", "replied"] }
    ]
  }
};

const sampleData = {
  banners: [
    {
      id: 1,
      title: "Building Strong Foundations",
      subtitle: "Commercial and residential construction delivered with practical planning.",
      button_text: "View Projects",
      button_link: "/projects",
      image_url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
      sort_order: 1,
      status: "active"
    },
    {
      id: 2,
      title: "Modern Project Management",
      subtitle: "From site preparation to finishing work, every stage stays visible.",
      button_text: "Our Services",
      button_link: "/services",
      image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
      sort_order: 2,
      status: "active"
    }
  ],
  "company-profile": [
    {
      id: 1,
      headline: "Reliable Construction Partner Since 2010",
      summary: "ConstructCo manages building, renovation, and civil works for private and commercial clients.",
      mission: "Deliver durable projects with clear communication, disciplined safety, and accountable teams.",
      vision: "Become the most trusted regional construction company for long-life building projects.",
      years_experience: 16,
      status: "active"
    }
  ],
  services: [
    {
      id: 1,
      name: "Commercial Building",
      summary: "Planning and construction for offices, showrooms, warehouses, and mixed-use spaces.",
      icon_name: "building",
      sort_order: 1,
      status: "active"
    },
    {
      id: 2,
      name: "Renovation Works",
      summary: "Structural improvement, interior upgrades, exterior repair, and phased renovation support.",
      icon_name: "hammer",
      sort_order: 2,
      status: "active"
    }
  ],
  projects: [
    {
      id: 1,
      name: "Riverside Office Complex",
      category: "Commercial",
      location: "Yangon",
      client_name: "Riverside Group",
      completion_year: 2025,
      image_url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      summary: "Five-floor office facility with reinforced concrete structure and energy-conscious facade.",
      status: "active"
    },
    {
      id: 2,
      name: "North Gate Residential Villas",
      category: "Residential",
      location: "Mandalay",
      client_name: "North Gate Estate",
      completion_year: 2024,
      image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      summary: "Residential villa project with site utilities, road access, and landscape coordination.",
      status: "active"
    }
  ],
  testimonials: [
    {
      id: 1,
      client_name: "Aung Min",
      client_role: "Property Developer",
      quote_text: "The team kept the project schedule clear and solved site issues quickly.",
      rating: 5,
      status: "active"
    }
  ],
  posts: [
    {
      id: 1,
      title: "How We Prepare a Site Before Construction",
      slug: "site-preparation-before-construction",
      excerpt: "A short look at surveying, utilities, access planning, and safety preparation.",
      body: "Good construction starts before concrete is poured. Site preparation includes surveys, access planning, drainage checks, and safety controls.",
      published_at: "2026-05-20",
      status: "published"
    }
  ],
  contacts: [
    {
      id: 1,
      office_name: "Main Office",
      address: "No. 45 Industrial Road, Yangon",
      phone: "+95 9 123 456 789",
      email: "info@constructco.example",
      map_url: "https://maps.google.com",
      facebook_url: "https://facebook.com",
      linkedin_url: "https://linkedin.com",
      status: "active"
    }
  ],
  messages: [
    {
      id: 1,
      sender_name: "Mya Thet",
      sender_email: "mya@example.com",
      phone: "+95 9 222 333 444",
      subject: "Warehouse construction estimate",
      message: "Please send information about your commercial warehouse construction service.",
      status: "new"
    }
  ]
};

let state = {
  section: "dashboard",
  data: loadStoredData(),
  editingId: null,
  apiAvailable: false,
  search: ""
};

const contentArea = document.getElementById("contentArea");
const pageTitle = document.getElementById("pageTitle");
const apiStatus = document.getElementById("apiStatus");
const searchInput = document.getElementById("searchInput");
const editorDialog = document.getElementById("editorDialog");
const editorForm = document.getElementById("editorForm");
const formFields = document.getElementById("formFields");
const dialogTitle = document.getElementById("dialogTitle");
const dialogSection = document.getElementById("dialogSection");

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => switchSection(button.dataset.section));
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value.trim().toLowerCase();
  render();
});

document.getElementById("closeDialog").addEventListener("click", closeEditor);
document.getElementById("cancelEdit").addEventListener("click", closeEditor);
editorForm.addEventListener("submit", saveEditor);

hydrateFromApi().then(render);

function loadStoredData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return structuredClone(sampleData);
  }
  try {
    return { ...structuredClone(sampleData), ...JSON.parse(stored) };
  } catch (error) {
    return structuredClone(sampleData);
  }
}

function saveStoredData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

async function hydrateFromApi() {
  try {
    const resourceNames = Object.keys(sectionConfigs);
    const responses = await Promise.all(resourceNames.map((resource) => apiRequest(`/${resource}`)));
    state.data = Object.fromEntries(resourceNames.map((resource, index) => [resource, responses[index]]));
    state.apiAvailable = true;
  } catch (error) {
    state.apiAvailable = false;
  }
  updateApiStatus();
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

function updateApiStatus() {
  apiStatus.textContent = state.apiAvailable ? "API Connected" : "Demo Storage";
  apiStatus.classList.toggle("is-live", state.apiAvailable);
}

function switchSection(section) {
  state.section = section;
  state.editingId = null;
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.section === section);
  });
  render();
}

function render() {
  updateApiStatus();
  if (state.section === "dashboard") {
    renderDashboard();
    return;
  }
  renderSection(state.section);
}

function renderDashboard() {
  pageTitle.textContent = "Dashboard";
  const metrics = Object.entries(sectionConfigs).map(([resource, config]) => {
    const count = state.data[resource]?.length || 0;
    return `
      <article class="metric-card">
        <span>${escapeHtml(config.label)}</span>
        <strong>${count}</strong>
      </article>
    `;
  });

  const latestMessages = (state.data.messages || []).slice(0, 4).map((message) => {
    return makeTableRow("messages", message, ["sender_name", "subject", "status"], false);
  }).join("");

  contentArea.innerHTML = `
    <div class="metric-grid">${metrics.join("")}</div>
    <article class="panel-card">
      <div class="section-toolbar">
        <div>
          <h2>Recent Contact Messages</h2>
          <span class="toolbar-count">${state.data.messages?.length || 0} total</span>
        </div>
        <button class="ghost-button" data-open-section="messages">Open Messages</button>
      </div>
      <div class="table-wrap">
        <table class="cms-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${latestMessages || `<tr><td colspan="3" class="empty-state">No messages found.</td></tr>`}</tbody>
        </table>
      </div>
    </article>
  `;

  const openButton = contentArea.querySelector("[data-open-section]");
  openButton?.addEventListener("click", () => switchSection(openButton.dataset.openSection));
}

function renderSection(resource) {
  const config = sectionConfigs[resource];
  const records = getFilteredRecords(resource);
  pageTitle.textContent = config.label;

  contentArea.innerHTML = `
    <article class="panel-card">
      <div class="section-toolbar">
        <div>
          <h2>${escapeHtml(config.label)}</h2>
          <span class="toolbar-count">${records.length} record${records.length === 1 ? "" : "s"}</span>
        </div>
        <button class="primary-button" data-action="add">+ Add ${escapeHtml(config.singular)}</button>
      </div>
      <div class="table-wrap">
        <table class="cms-table">
          <thead>
            <tr>
              <th>Content</th>
              ${config.columns.slice(1).map((column) => `<th>${escapeHtml(labelize(column))}</th>`).join("")}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${records.length ? records.map((record) => makeTableRow(resource, record, config.columns, true)).join("") : makeEmptyRow(config.columns.length + 1)}
          </tbody>
        </table>
      </div>
    </article>
  `;

  contentArea.querySelector("[data-action='add']").addEventListener("click", () => openEditor(resource));
  contentArea.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => openEditor(resource, Number(button.dataset.edit)));
  });
  contentArea.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteRecord(resource, Number(button.dataset.delete)));
  });
  contentArea.querySelectorAll("[data-toggle]").forEach((button) => {
    button.addEventListener("click", () => toggleStatus(resource, Number(button.dataset.toggle)));
  });
}

function getFilteredRecords(resource) {
  const records = state.data[resource] || [];
  if (!state.search) {
    return records;
  }
  return records.filter((record) => {
    return Object.values(record).some((value) => String(value || "").toLowerCase().includes(state.search));
  });
}

function makeTableRow(resource, record, columns, includeActions) {
  const config = sectionConfigs[resource];
  const firstColumn = columns[0];
  const otherColumns = columns.slice(1);
  const imageMarkup = config.imageField && record[config.imageField]
    ? `<img class="thumb" src="${escapeAttribute(record[config.imageField])}" alt="">`
    : `<span class="thumb" aria-hidden="true"></span>`;
  const note = record[config.noteField] || "";
  const actionMarkup = includeActions ? `
    <td>
      <div class="row-actions">
        <button class="table-button" data-toggle="${record.id}">${statusActionLabel(record.status)}</button>
        <button class="table-button" data-edit="${record.id}">Edit</button>
        <button class="danger-button" data-delete="${record.id}">Delete</button>
      </div>
    </td>
  ` : "";

  return `
    <tr>
      <td>
        <div class="content-title">
          ${imageMarkup}
          <span>
            <span class="record-name">${escapeHtml(record[firstColumn] || record[config.titleField] || "Untitled")}</span>
            <span class="record-note">${escapeHtml(note)}</span>
          </span>
        </div>
      </td>
      ${otherColumns.map((column) => `<td>${formatCell(column, record[column])}</td>`).join("")}
      ${actionMarkup}
    </tr>
  `;
}

function makeEmptyRow(colspan) {
  return `<tr><td colspan="${colspan}" class="empty-state">No records found.</td></tr>`;
}

function formatCell(column, value) {
  if (column === "status") {
    return `<span class="status-pill ${escapeAttribute(value || "inactive")}">${escapeHtml(value || "inactive")}</span>`;
  }
  return escapeHtml(value || "-");
}

function statusActionLabel(status) {
  if (status === "active" || status === "published" || status === "replied") {
    return "Disable";
  }
  if (status === "new") {
    return "Mark Read";
  }
  return "Activate";
}

function nextStatus(status, resource) {
  if (resource === "messages") {
    return status === "new" ? "read" : status === "read" ? "replied" : "new";
  }
  if (resource === "posts") {
    return status === "published" ? "draft" : "published";
  }
  return status === "active" ? "inactive" : "active";
}

function openEditor(resource, id = null) {
  const config = sectionConfigs[resource];
  const record = id ? state.data[resource].find((item) => item.id === id) : {};
  state.editingId = id;
  state.editingResource = resource;

  dialogSection.textContent = config.label;
  dialogTitle.textContent = id ? `Edit ${config.singular}` : `Add ${config.singular}`;
  formFields.innerHTML = config.fields.map((field) => makeField(field, record || {})).join("");
  editorDialog.showModal();
}

function makeField(field, record) {
  const value = record[field.name] ?? "";
  const required = field.required ? "required" : "";
  const wide = field.wide || field.type === "textarea" ? " is-wide" : "";

  if (field.type === "select") {
    return `
      <div class="field${wide}">
        <label for="${field.name}">${escapeHtml(field.label)}</label>
        <select id="${field.name}" name="${field.name}" ${required}>
          ${field.options.map((option) => `<option value="${escapeAttribute(option)}" ${option === value ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}
        </select>
      </div>
    `;
  }

  if (field.type === "textarea") {
    return `
      <div class="field${wide}">
        <label for="${field.name}">${escapeHtml(field.label)}</label>
        <textarea id="${field.name}" name="${field.name}" ${required}>${escapeHtml(value)}</textarea>
      </div>
    `;
  }

  return `
    <div class="field${wide}">
      <label for="${field.name}">${escapeHtml(field.label)}</label>
      <input id="${field.name}" name="${field.name}" type="${field.type}" value="${escapeAttribute(value)}" ${required}>
    </div>
  `;
}

function closeEditor() {
  editorDialog.close();
  editorForm.reset();
  state.editingId = null;
  state.editingResource = null;
}

async function saveEditor(event) {
  event.preventDefault();
  const resource = state.editingResource;
  const config = sectionConfigs[resource];
  const formData = new FormData(editorForm);
  const payload = Object.fromEntries(formData.entries());

  config.fields.forEach((field) => {
    if (field.type === "number" && payload[field.name] !== "") {
      payload[field.name] = Number(payload[field.name]);
    }
  });

  if (state.apiAvailable) {
    try {
      const saved = await apiRequest(
        state.editingId ? `/${resource}/${state.editingId}` : `/${resource}`,
        {
          method: state.editingId ? "PUT" : "POST",
          body: JSON.stringify(payload)
        }
      );
      upsertLocalRecord(resource, saved);
    } catch (error) {
      state.apiAvailable = false;
      upsertLocalRecord(resource, { ...payload, id: state.editingId || Date.now() });
    }
  } else {
    upsertLocalRecord(resource, { ...payload, id: state.editingId || Date.now() });
  }

  saveStoredData();
  closeEditor();
  render();
}

function upsertLocalRecord(resource, record) {
  const records = state.data[resource] || [];
  const index = records.findIndex((item) => item.id === record.id);
  if (index >= 0) {
    records[index] = { ...records[index], ...record };
  } else {
    records.unshift(record);
  }
  state.data[resource] = records;
}

async function deleteRecord(resource, id) {
  const ok = window.confirm("Delete this record?");
  if (!ok) {
    return;
  }
  if (state.apiAvailable) {
    try {
      await apiRequest(`/${resource}/${id}`, { method: "DELETE" });
    } catch (error) {
      state.apiAvailable = false;
    }
  }
  state.data[resource] = (state.data[resource] || []).filter((item) => item.id !== id);
  saveStoredData();
  render();
}

async function toggleStatus(resource, id) {
  const record = (state.data[resource] || []).find((item) => item.id === id);
  if (!record) {
    return;
  }
  const updated = { ...record, status: nextStatus(record.status, resource) };
  if (state.apiAvailable) {
    try {
      await apiRequest(`/${resource}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: updated.status })
      });
    } catch (error) {
      state.apiAvailable = false;
    }
  }
  upsertLocalRecord(resource, updated);
  saveStoredData();
  render();
}

function labelize(value) {
  return value.replaceAll("_", " ");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
