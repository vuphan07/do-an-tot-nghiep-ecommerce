const productCtrl = require("../controllers/product.controller");
const {
  verifyAccessToken,
  authAdmin,
} = require("../middlewares/index.middleware");
const router = require("express").Router();

router.get("/", productCtrl.getProducts);
router.get("/recommend", verifyAccessToken, productCtrl.getProductsRecommended);
router.post("/", verifyAccessToken, authAdmin, productCtrl.createProduct);
router.post("/like", verifyAccessToken, productCtrl.likeProduct);
router.post("/unlike", verifyAccessToken, productCtrl.unlikeProduct);
router.post("/view", verifyAccessToken, productCtrl.updateViewProduct);
router.post("/comment", verifyAccessToken, productCtrl.createComment);
router.delete("/:id", verifyAccessToken, authAdmin, productCtrl.deleteProduct);
router.put("/:id", verifyAccessToken, authAdmin, productCtrl.updateProduct);
router.get("/:id", productCtrl.getProductDetail);
router.get("/relate/:id", productCtrl.getProductsRelate);

module.exports = router;
