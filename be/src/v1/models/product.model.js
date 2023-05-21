const mongoose = require("mongoose");
const Category = require("./category.model");
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    purchase_price: {
      type: Number,
      trim: true,
      required: true,
    },
    sale_price: {
      type: Number,
      trim: true,
      required: true,
    },
    discount_price: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
      ref: Category,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    orderIndex: {
      type: Number,
    },
    comments: [],
    likes: [],
  },
  {
    timestamps: true, //important
  }
);

productSchema.pre("save", async function (next) {
  try {
    this.orderIndex = 0;
    // Lấy giá trị orderIndex của user mới nhất
    Product.findOne()
      .sort({ orderIndex: -1 })
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

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
