// Northstar Support API layer

const API_BASE = "http://localhost:3000";

async function fetchOrderStatus(orderNumber) {
  const response = await fetch(
    `${API_BASE}/api/orders/${encodeURIComponent(orderNumber)}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Order not found. Check the order number and try again.");
    }

    throw new Error("Unable to reach the server. Please try again.");
  }

  return response.json();
}