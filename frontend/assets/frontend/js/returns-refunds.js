// Issue #5: Returns & refunds request handling logic.

const rForm = document.getElementById("returns-form");
const rInput = document.getElementById("return-order");
const rError = document.getElementById("return-error");
const rResult = document.getElementById("return-result");

/*
 * Handles supported return and refund requests.
 *
 * Supported examples:
 * - "return"
 * - "return my order"
 * - "I want to return an item"
 * - "refund"
 * - "I want a refund"
 * - "money back"
 *
 * Unsupported requests receive a sensible response.
 */
function handleReturnsRefundsRequest(request, orderNumber = "") {
  const text = String(request || "").trim().toLowerCase();
  const order = String(orderNumber || "").trim().toUpperCase();

  if (!text) {
    return {
      supported: false,
      type: "error",
      message: "Please enter a return or refund request."
    };
  }

  const isReturn =
    text === "return" ||
    /\b(return|returns|send back|exchange)\b/.test(text);

  const isRefund =
    text === "refund" ||
    /\b(refund|refunded|money back|reimburse|reimbursement)\b/.test(text);

  if (isReturn) {
    return {
      supported: true,
      type: "return",
      title: "Return request received",
      message:
        `Your return request${
          order ? ` for ${order}` : ""
        } has been received. ` +
        "Please follow the return instructions provided by Northstar Support."
    };
  }

  if (isRefund) {
    return {
      supported: true,
      type: "refund",
      title: "Refund information",
      message:
        `Refund information${
          order ? ` for ${order}` : ""
        }: refunds are normally issued within 5–7 business days ` +
        "after the returned item is received and approved."
    };
  }

  return {
    supported: false,
    type: "unsupported",
    message:
      "Sorry, I can currently assist with return and refund questions. " +
      "Please submit a return or refund request."
  };
}


/*
 * Current interface:
 * The existing page asks for an order number and starts a return.
 *
 * Issue #6 will later add the customer-facing return/refund selection.
 */
if (rForm) {
  rForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    rError.textContent = "";
    rResult.hidden = true;

    const orderNumber = rInput.value.trim();

    if (!orderNumber) {
      rError.textContent = "Please enter an order number.";
      return;
    }

    const orderPattern = /^[A-Za-z]{2}-?\d{4,8}$/;

    if (!orderPattern.test(orderNumber)) {
      rError.textContent =
        "Please enter a valid order number, e.g. NS-100245.";
      return;
    }

    const response = handleReturnsRefundsRequest(
      "return",
      orderNumber
    );

    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!response.supported) {
      rError.textContent = response.message;
      return;
    }

    rResult.innerHTML = `
      <div class="result-head">
        <span class="status-badge status-processing">
          ${response.title}
        </span>

        <span class="result-order">
          ${orderNumber.toUpperCase()}
        </span>
      </div>

      <p class="result-help">
        ${response.message}
      </p>
    `;

    rResult.hidden = false;
  });
      }
