const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    orderIndex: {
      type: Number,
    },
    avatar: { type: String },
    is_verified: {
      type: "boolean",
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 1,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    this.orderIndex = 0
    // Lấy giá trị orderIndex của user mới nhất
    User.findOne()
      .sort({orderIndex:-1})
      .exec((err, lastUser) => {
        if (err) return next(err);
        this.orderIndex =
          lastUser && lastUser.orderIndex ? lastUser.orderIndex + 1 : 0;
        next();
      });
  } catch (error) {
    console.log(error);
  }
});

userSchema.methods.isCheckPass = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model("Users", userSchema);
module.exports = User;
