// Category 2: Returns & refunds — starter logic (mock).
const rForm = document.getElementById("returns-form");
const rInput = document.getElementById("return-order");
const rError = document.getElementById("return-error");
const rResult = document.getElementById("return-result");

rForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  rError.textContent = "";
  rResult.hidden = true;
  const value = rInput.value.trim();
  if (!value) {
    rError.textContent = "Please enter an order number.";
    return;
  }
  // mock response
  await new Promise((r) => setTimeout(r, 800));
  rResult.innerHTML = `
    <div class="result-head">
      <span class="status-badge status-processing">Return started</span>
      <span class="result-order">${value.toUpperCase()}</span>
    </div>
    <p class="result-help">Refunds are issued within 5–7 business days after we receive the item. You'll get an email confirmation shortly.</p>
  `;
  rResult.hidden = false;
});