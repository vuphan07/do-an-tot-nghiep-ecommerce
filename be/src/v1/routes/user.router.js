const router = require("express").Router();
const userCtrl = require("../controllers/user.controller");
const {
  verifyAccessToken,
  authAdmin,
} = require("../middlewares/index.middleware");
const rateModel = require("../models/rate.model");

router.get("/rate", (req, res) => {
  console.log("first")
  rateModel.find().then((response) => {
    res.send(response);
  });
});
router.post("/register", userCtrl.register);

router.post("/login", userCtrl.login);
router.post("/change_pass", verifyAccessToken, userCtrl.changePassword);
router.post("/update", verifyAccessToken, userCtrl.updateUser);

router.get("/logout", userCtrl.logout);

router.get("/refresh_token", userCtrl.refreshToken);

router.get("/infor", verifyAccessToken, userCtrl.myInfor);

router.get("/:id", verifyAccessToken, authAdmin, userCtrl.getUser);

router.patch("/addcart", verifyAccessToken, userCtrl.addCart);
router.patch("/deletecart", verifyAccessToken, userCtrl.deleteCart);
router.patch("/updatecart", verifyAccessToken, userCtrl.updateCart);

router.get("/history", verifyAccessToken, userCtrl.history);
router.get("/", verifyAccessToken, authAdmin, userCtrl.getAllUser);

module.exports = router;
