const router = require("express").Router();
const categoryCtrl = require("../controllers/category.controller");
const {
  verifyAccessToken,
  authAdmin,
} = require("../middlewares/index.middleware");

router
  .route("/")
  .get(categoryCtrl.getCategories)
  .post(verifyAccessToken, authAdmin, categoryCtrl.createCategory);

router
  .route("/:id")
  .delete(verifyAccessToken, authAdmin, categoryCtrl.deleteCategory)
  .put(verifyAccessToken, authAdmin, categoryCtrl.updateCategory);

module.exports = router;
