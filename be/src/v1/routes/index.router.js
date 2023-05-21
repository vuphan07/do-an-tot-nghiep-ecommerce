const createError = require("http-errors");
const UserRoute = require("./user.router");
const ProductRoute = require("./product.router");
const CategoryRoute = require("./category.router");
const UploadRoute = require("./upload.router");
const OrdersRoute = require("./orders.router");
const {
  getDataDashBoard,
  getAnalysisOrder,
} = require("../controllers/index.controller");
const {
  verifyAccessToken,
  authAdmin,
} = require("../middlewares/index.middleware");
const route = (app) => {
  app.use(`/api/users`, UserRoute);
  app.use(`/api/products`, ProductRoute);
  app.use(`/api/categories`, CategoryRoute);
  app.use(`/api/upload`, UploadRoute);
  app.use(`/api/orders`, OrdersRoute);
  app.use(
    "/api/admin/dashboard",
    verifyAccessToken,
    authAdmin,
    getDataDashBoard
  );
  app.use(
    "/api/admin/order-analysis",
    // verifyAccessToken,
    // authAdmin,
    getAnalysisOrder
  );

  app.use("/", (req, res) => {
    res.send("hello babe");
  });
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  // error handler middleware
  app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  });
};

module.exports = route;
