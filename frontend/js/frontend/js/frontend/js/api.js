// Issue #3: API layer for order status.
// Uses mock data now so the frontend works standalone.
// Backend teammate (Dan Kinara): replace the MOCK block with a real fetch to your endpoint.
const API_BASE = "http://localhost:8000"; // backend base URL (Flask/FastAPI)

async function fetchOrderStatus(orderNumber) {
  // --- REAL BACKEND (uncomment when backend is ready) ---
  // const res = await fetch(`${API_BASE}/api/orders/${encodeURIComponent(orderNumber)}`);
  // if (!res.ok) {
  //   if (res.status === 404) throw new Error("Order not found");
  //   throw new Error("Unable to reach the server. Try again.");
  // }
  // return res.json();

  // --- MOCK (remove once backend is live) ---
  await new Promise((r) => setTimeout(r, 900)); // simulate network delay
  const known = {
    "NS-100245": { status: "Shipped", eta: "Aug 16", carrier: "FedEx", tracking: "7721 9930" },
    "NS-100301": { status: "Processing", eta: "Aug 18", carrier: "—", tracking: "—" },
    "NS-100440": { status: "Delivered", eta: "Aug 12", carrier: "UPS", tracking: "1Z 999 AA1" },
  };
  const data = known[orderNumber.toUpperCase()];
  if (!data) throw new Error("Order not found. Check the number and try again.");
  return { orderNumber: orderNumber.toUpperCase(), ...data };
}