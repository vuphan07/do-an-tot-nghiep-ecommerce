const Users = require("../models/user.model");
const Orders = require("../models/order.model");
const { UserService } = require("../services/user.service");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const {
  signAccessToken,
  signRefreshAccessToken,
} = require("../middlewares/index.middleware");
const APIfeatures = require("../utils/helper");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // Password Encryption
      if (!req?.body?.phone) delete req?.body?.phone;
      const newUser = new Users({
        ...req.body,
      });

      // Save mongodb
      await newUser.save();

      // Then create jsonwebtoken to authentication
      const accesstoken = await signAccessToken(newUser._id);
      const refreshtoken = await signRefreshAccessToken(newUser._id);

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 365 * 24 * 60 * 60 * 1000, // 365d
      });

      res.json({ accesstoken, refreshtoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const checkPass = await user.isCheckPass(password);
      if (!checkPass)
        return res.status(400).json({ msg: "Incorrect password." });

      // If login success , create access token and refresh token
      const accesstoken = await signAccessToken(user._id);
      const refreshtoken = await signRefreshAccessToken(user._id);

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accesstoken, refreshtoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async function (req, res) {
    try {
      const { password, _id, ...dataClone } = { ...req.body };
      if (!_id) {
        throw createError.BadRequest("missing id");
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        dataClone.password = await bcrypt.hash(password, salt);
      }
      const newUser = await UserService.update(_id, dataClone);
      if (!newUser) throw createError.BadRequest("update fail");
      res.json({
        status: "success",
        data: newUser,
      });
    } catch (error) {
      res
        .status(error.status || 400)
        .json({ status: error.status, message: error.message });
    }
  },
  changePassword: async function (req, res) {
    try {
      const { userId } = req;
      const { newPass, oldPass } = req.body;
      const user = await Users.findOne({ _id: userId });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const checkPass = await user.isCheckPass(oldPass);
      if (!checkPass)
        return res.status(400).json({ msg: "Incorrect old password." });

      const salt = await bcrypt.genSalt(10);
      const newPassHash = await bcrypt.hash(newPass, salt);
      const newUser = await UserService.update(userId, {
        password: newPassHash,
      });
      if (!newUser) throw createError.BadRequest("update fail");
      res.json({
        status: "success",
        data: "Đỏi mật khẩu thành công",
      });
    } catch (error) {
      res
        .status(error.status || 400)
        .json({ status: error.status, message: error.message });
    }
  },
  deleteUser: async function (req, res) {
    try {
      const { id } = { ...req.body };
      if (!id) {
        throw createError.InternalServerError();
      }
      const res = await UserService.update(id, { status: 0 });
      if (res) {
        return res.json({
          status: "success",
          message: "User deleted successfully",
        });
      }
      throw createError.InternalServerError();
    } catch (error) {
      res
        .status(error.status)
        .json({ status: error.status, message: error.message });
    }
  },
  myInfor: async function (req, res) {
    try {
      const { userId } = req;
      if (!userId) {
        throw createError.Unauthorized();
      }
      const user = await Users.findById(userId).select("-password");
      if (user) {
        res.json({ status: "success", data: user });
      } else {
        throw createError.InternalServerError();
      }
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ status: error.status || 500, message: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUser: async (req, res) => {
    try {
      if (req.query.status["eq"] === "") delete req.query.status;
      const features = new APIfeatures(Users.find(), { ...req.query })
        .filtering()
        .sorting();
      const features2 = new APIfeatures(Users.find(), { ...req.query })
        .filtering()
        .sorting()
        .paginating();
      Promise.all([
        await features.query.count(),
        await features2.query.select("-password"),
      ]).then((results) => {
        res.json({
          status: "success",
          data: {
            items: results[1],
            pagination: { totalItems: results[0] },
          },
        });
      });
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ status: error.status || 500, message: error.message });
    }
  },
  addCart: async (req, res) => {
    try {
      const { userId } = req;
      if (!userId) return res.status(400).json({ msg: "User does not exist." });
      await UserService.update(userId, {
        cart: req.body.cart,
      });

      return res.json({ msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCart: async (req, res) => {
    try {
      const { userId } = req;
      const { cartId } = req.body;
      if (!userId) return res.status(400).json({ msg: "User does not exist." });
      const user = await UserService.findOne({ _id: userId });
      const newCart = user?.cart?.filter((item) => item.cartId !== cartId);
      await UserService.update(userId, {
        cart: newCart,
      });

      return res.json({ msg: "deleted from cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCart: async (req, res) => {
    try {
      const { userId } = req;
      const { cartId, count } = req.body;
      if (!userId) return res.status(400).json({ msg: "User does not exist." });
      const user = await UserService.findOne({ _id: userId });
      const newCart = user?.cart?.map((item) => {
        const newItem = { ...item };
        if (item.cartId === cartId) {
          newItem.count = count;
        }
        return newItem;
      });
      await UserService.update(userId, {
        cart: newCart,
      });

      return res.json({ msg: "updated cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      // const rf_token = req.cookies.refreshtoken;
      const { userId } = req;
      if (!userId) {
        throw createError[401]();
      }
      const accessToken = await signAccessToken(userId);
      const refreshAccessToken = await signRefreshAccessToken(userId);

      res.json({
        status: "success",
        data: { accessToken, refreshAccessToken },
      });
    } catch (error) {
      res
        .status(error.status || 401)
        .json({ status: 3, message: error.message });
    }
    // try {
    //   const rf_token = req.cookies.refreshtoken;
    //   if (!rf_token)
    //     return res.status(400).json({ msg: "Please Login or Register" });

    //   jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    //     if (err)
    //       return res.status(400).json({ msg: "Please Login or Register" });

    //     const accesstoken = signAccessToken({ id: user.id });

    //     res.json({ accesstoken });
    //   });
    // } catch (err) {
    //   return res.status(500).json({ msg: err.message });
    // }
  },
  history: async (req, res) => {
    try {
      const history = await Orders.find({ user_id: req.userId });

      res.json(history);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
