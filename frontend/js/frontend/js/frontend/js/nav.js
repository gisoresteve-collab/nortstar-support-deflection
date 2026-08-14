// Shared navigation bar — rendered on every page.
// Issue #2: Create application navigation
const NAV_LINKS = [
  { label: "Dashboard", href: "index.html" },
  { label: "Order Status", href: "order-status.html" },
  { label: "Returns & Refunds", href: "returns-refunds.html" },
];

function renderNav(activeHref) {
  const links = NAV_LINKS.map((link) => {
    const isActive = link.href === activeHref ? "nav-link active" : "nav-link";
    return `<a class="${isActive}" href__="${link.href}">${link.label}</a>`;
  }).join("");

  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.innerHTML = `
    <div class="nav-brand">
      <span class="nav-logo">★</span>
      <span class="nav-title">Northstar Support</span>
    </div>
    <div class="nav-links">${links}</div>
  `;
  document.body.prepend(nav);
}

// Auto-detect current page from the filename
const current = window.location.pathname.split("/").pop() || "index.html";