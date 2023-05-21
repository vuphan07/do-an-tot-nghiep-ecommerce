const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

const adminCtrl = {
  getDataDashBoard: async (req, res) => {
    try {
      Promise.all([
        userModel.count(),
        productModel.count(),
        orderModel.find().exec(),
      ])
        .then((response) => {
          const order = response[2];
          const totalAmount = order
            ?.filter((item) => item.status === "done")
            .reduce((sum, order) => sum + order.amount, 0);
          res.json({
            totalUser: response[0],
            totalProduct: response[1],
            totalOrder: order.length,
            totalAmount: totalAmount,
          });
        })
        .catch((err) => {
          res.json({ msg: "error" });
        });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAnalysisOrder: async (req, res) => {
    try {
      const response = await orderModel.aggregate([
        {
          $group: {
            _id: { $month: { $toDate: "$createdAt" } },
            total: { $sum: "$amount" },
          },
        },
      ]);
      console.log(response);
      res.send("oke");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = adminCtrl;
