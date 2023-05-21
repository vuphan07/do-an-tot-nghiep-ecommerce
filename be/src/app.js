const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const route = require("./v1/routes/index.router");
const cors = require("cors");
const productModel = require("./v1/models/product.model");
const { exec } = require("child_process");
const rateService = require("./v1/services/rate.service");
const User = require("./v1/models/user.model");
const Product = require("./v1/models/product.model");
//init dbs
require("./v1/databases/init.mongodb");
// require('./v1/databases/init.redis')
//user middleware
app.use(helmet());
app.use(morgan("combined"));
// compress responses
app.use(compression());

// add body-parser
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//router
route(app);

module.exports = app;
