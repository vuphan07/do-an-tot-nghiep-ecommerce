const router = require("express").Router();
const orderCtrl = require("../controllers/order.controller");
const {
  verifyAccessToken,
  authAdmin,
} = require("../middlewares/index.middleware");

router
  .route("/")
  .get(verifyAccessToken, orderCtrl.getPayments)
  .post(verifyAccessToken, orderCtrl.createPayment);

router.get("/all", verifyAccessToken, authAdmin, orderCtrl.getPaymentsAll);

router.get(
  "/checkIsOrdered/:productId",
  verifyAccessToken,
  orderCtrl.chekIsOrderedProduct
);

router
  .route("/:id")
  .get(verifyAccessToken, orderCtrl.getOrderDetail)
  .delete(verifyAccessToken, authAdmin, orderCtrl.deleteOrder)
  .put(verifyAccessToken, authAdmin, orderCtrl.updateOrder);

module.exports = router;
