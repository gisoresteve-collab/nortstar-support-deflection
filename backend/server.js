const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary order data for the prototype
const orders = [
  {
    orderNumber: "NS-100245",
    status: "Shipped",
    eta: "18 Aug 2026",
    carrier: "Northstar Logistics",
    tracking: "TRK-849201"
  },
  {
    orderNumber: "NS-100246",
    status: "Processing",
    eta: "20 Aug 2026",
    carrier: "Not assigned",
    tracking: "Not available"
  },
  {
    orderNumber: "NS-100247",
    status: "Delivered",
    eta: "12 Aug 2026",
    carrier: "Northstar Logistics",
    tracking: "TRK-849202"
  }
];

// Health-check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "northstar-api"
  });
});

// Order-status endpoint
app.get("/api/orders/:orderNumber", (req, res) => {
  const orderNumber = req.params.orderNumber.trim().toUpperCase();

  const order = orders.find(
    (item) => item.orderNumber.toUpperCase() === orderNumber
  );

  if (!order) {
    return res.status(404).json({
      error: "ORDER_NOT_FOUND",
      message: "We could not find an order with that number."
    });
  }

  res.json(order);
});

// Start server
app.listen(PORT, () => {
  console.log(`Northstar API running on http://localhost:${PORT}`);
});
