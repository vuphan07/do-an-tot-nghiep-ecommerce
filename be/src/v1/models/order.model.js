const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    products: [],
    orderId: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    amount: { type: Number, required: true },
    address: { type: Object },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
