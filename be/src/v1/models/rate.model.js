const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    product_index: { type: Number, default: null},
    user_index: { type: Number, default:null },
    rate: 0,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rates", rateSchema);
