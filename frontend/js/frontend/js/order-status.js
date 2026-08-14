// Issue #3: Order status interface logic
// Handles: empty input, invalid input, processing state, response display.
const form = document.getElementById("order-status-form");
const input = document.getElementById("order-number");
const errorEl = document.getElementById("order-error");
const processingEl = document.getElementById("processing");
const resultEl = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");

// Order number format: letters, digits, dashes — e.g. NS-100245
const ORDER_RE = /^[A-Za-z]{2}-?\d{4,8}$/;

function showError(msg) {
  errorEl.textContent = msg;
  input.setAttribute("aria-invalid", msg ? "true" : "false");
}

function clearError() {
  errorEl.textContent = "";
  input.removeAttribute("aria-invalid");
}

function renderResult(order) {
  resultEl.innerHTML = `
    <div class="result-head">
      <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
      <span class="result-order">${order.orderNumber}</span>
    </div>
    <dl class="result-grid">
      <div><dt>Estimated delivery</dt><dd>${order.eta}</dd></div>
      <div><dt>Carrier</dt><dd>${order.carrier}</dd></div>
      <div><dt>Tracking number</dt><dd>${order.tracking}</dd></div>
    </dl>
    <p class="result-help">Still have a question? <a href__="returns-refunds.html">See returns &amp; refunds</a> or open a ticket and we'll help.</p>
  `;
  resultEl.hidden = false;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearError();
  resultEl.hidden = true;

  const value = input.value.trim();

  // Empty input
  if (!value) {
    showError("Please enter an order number.");
    input.focus();
    return;
  }
  // Invalid format
  if (!ORDER_RE.test(value)) {
    showError("That doesn't look like a valid order number (e.g. NS-100245).");
    input.focus();
    return;
  }

  // Processing state
  processingEl.hidden = false;
  submitBtn.disabled = true;
  submitBtn.textContent = "Checking…";

  try {
    const order = await fetchOrderStatus(value);
    renderResult(order);
  } catch (err) {
    resultEl.innerHTML = `<p class="result-error">${err.message}</p>`;
    resultEl.hidden = false;
  } finally {
    processingEl.hidden = true;
    submitBtn.disabled = false;
    submitBtn.textContent = "Check status";
  }
});

// Clear error as the user types
input.addEventListener("input", clearError);