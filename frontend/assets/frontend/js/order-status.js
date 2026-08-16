// Northstar Support - Order Status
// Handles order lookup and displays the backend response.

const form = document.getElementById("order-status-form");
const input = document.getElementById("order-number");
const errorEl = document.getElementById("order-error");
const processingEl = document.getElementById("processing");
const resultEl = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");

// Valid order format: NS-100245
const ORDER_RE = /^[A-Za-z]{2}-?\d{4,8}$/;

function showError(message) {
  errorEl.textContent = message;
  input.setAttribute("aria-invalid", "true");
}

function clearError() {
  errorEl.textContent = "";
  input.removeAttribute("aria-invalid");
}

function renderResult(order) {
  resultEl.innerHTML = `
    <div class="result-head">
      <span class="status-badge status-${order.status.toLowerCase()}">
        ${order.status}
      </span>
      <span class="result-order">${order.orderNumber}</span>
    </div>

    <dl class="result-grid">
      <div>
        <dt>Estimated delivery</dt>
        <dd>${order.eta}</dd>
      </div>

      <div>
        <dt>Carrier</dt>
        <dd>${order.carrier}</dd>
      </div>

      <div>
        <dt>Tracking number</dt>
        <dd>${order.tracking}</dd>
      </div>
    </dl>

    <p class="result-help">
      Still have a question?
      <a href="returns-refunds.html">See returns &amp; refunds</a>
      or open a ticket and we'll help.
    </p>
  `;

  resultEl.hidden = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  clearError();
  resultEl.hidden = true;

  const orderNumber = input.value.trim();

  // Check empty input
  if (!orderNumber) {
    showError("Please enter an order number.");
    input.focus();
    return;
  }

  // Check order-number format
  if (!ORDER_RE.test(orderNumber)) {
    showError(
      "That doesn't look like a valid order number (e.g. NS-100245)."
    );
    input.focus();
    return;
  }

  // Show processing state
  processingEl.hidden = false;
  submitBtn.disabled = true;
  submitBtn.textContent = "Checking…";

  try {
    // Call the real Northstar backend
    const order = await fetchOrderStatus(orderNumber);

    renderResult(order);
  } catch (error) {
    resultEl.innerHTML = `
      <p class="result-error">${error.message}</p>
    `;

    resultEl.hidden = false;
  } finally {
    processingEl.hidden = true;
    submitBtn.disabled = false;
    submitBtn.textContent = "Check status";
  }
});

// Clear validation errors while typing
input.addEventListener("input", clearError);