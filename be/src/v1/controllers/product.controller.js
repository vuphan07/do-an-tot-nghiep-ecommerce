const Products = require("../models/product.model");
const rateModel = require("../models/rate.model");
const userModel = require("../models/user.model");
const { ProductService } = require("../services/product.service");
const { pythonRecommend } = require("../../python.service");
const { RateService } = require("../services/rate.service");
const { UserService } = require("../services/user.service");
const { randomize } = require("../utils");
const { EnumRate } = require("../utils/constant");
const APIfeatures = require("../utils/helper");
const { responseSuccess } = require("../utils/response");

function paginate(array, page_size, page_number) {
  return array?.slice((page_number - 1) * page_size, page_number * page_size);
}

const productCtrl = {
  getProductsRecommended: async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    try {
      let { userId } = req;
      Promise.all([
        userModel.find().select("_id").sort({ _id: 1 }).lean(),
        Products.find(),
      ])
        .then(([users, products]) => {
          const indexOfUser = users.findIndex(
            (user) => user._id.toString() == userId
          );
          pythonRecommend([indexOfUser + ""], async (data) => {
            let productsNeed = [];
            const responseData = data.toString();
            if (responseData === "null") {
            console.log("productsxxxx");
              productsNeed = paginate(products, limit, page);
            }else {
             const responseDataSorted = JSON.parse(responseData)?.map((val, idx) => Object.assign({}, { value: val, index: idx }))
             .sort((a, b) => b.value - a.value);
              const listIdNeed = paginate(responseDataSorted, limit, page)?.map(item=>item.index);
              productsNeed = products.filter(product => listIdNeed?.includes(product.orderIndex))
            }
            res.json({
              status: "success",
              data: {
                items: productsNeed,
                pagination: { totalItems: products.length },
              },
            });
          });
        })
        .catch((e) => {
          return res.status(500).json({ msg: e.message });
        });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getProducts: async (req, res) => {
    try {
   
      const features = new APIfeatures(Products.find().sort({ sold: -1 }), {
        ...req.query,
      })
        .filtering()
        .sorting();
      const features1 = new APIfeatures(
        Products.find().sort({ sold: -1 }),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();

      Promise.all([
        await features.query.count(),
        await features1.query.populate("category"),
      ]).then((results) => {
        // res.json("oke");
        // return;
        res.json({
          status: "success",
          data: {
            items: results[1],
            pagination: { totalItems: randomize(results[0]) },
          },
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        title,
        purchase_price,
        sale_price,
        discount_price,
        description,
        images,
        options,
        category,
        quantity,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      const newProduct = new Products({
        title: title.toLowerCase(),
        description,
        images,
        options,
        category,
        purchase_price,
        sale_price,
        discount_price,
        quantity,
      });

      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createComment: async (req, res) => {
    try {
      const { userId } = req;
      const { user_name, user_avatar, rate, content, product_id, _id } =
        req.body;
      if (!product_id) return res.status(400).json({ msg: "No product_id" });

      await Products.findByIdAndUpdate(product_id, {
        $push: {
          comments: {
            _id,
            user_id: userId,
            user_name,
            user_avatar,
            rate,
            content,
          },
        },
      });
      await RateService.update({
        product_id: product_id,
        user_id: userId,
        rate: rate,
      });

      res.json({ msg: "Created a comment" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProductDetail: async (req, res) => {
    try {
      const record = await Products.findOne({ _id: req.params.id });
      res.json(responseSuccess(record));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProductsRelate: async (req, res) => {
    try {
      const record = await Products.findOne({ _id: req.params.id });
      const records = await Products.find({ category: record.category });
      res.json(responseSuccess(records));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likeProduct: async function (req, res) {
    try {
      const { product_id } = req.body;
      const { userId } = req;
      if (!product_id) {
        throw new Error();
      }
      const record = await Products.findOne({ _id: product_id });
      const listLikes = record.likes;
      if (listLikes.includes(userId)) {
        return res.json(responseSuccess("Done"));
      }
      await Products.updateOne(
        { _id: product_id },
        {
          $addToSet: { likes: userId },
        }
      );
      await RateService.update({
        product_id,
        user_id: userId,
        rate: EnumRate.like,
      });
      res.json(responseSuccess("Done"));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unlikeProduct: async function (req, res) {
    try {
      const { product_id } = req.body;
      const { userId } = req;
      if (!product_id) {
        throw new Error();
      }
      const record = await Products.findOne({ _id: product_id });
      const listLikes = record.likes;
      if (!listLikes.includes(userId)) {
        return res.json(responseSuccess("Done"));
      }
      await Products.updateOne(
        { _id: product_id },
        {
          $pull: { likes: userId },
        }
      );
      await RateService.update({
        product_id,
        user_id: userId,
        rate: EnumRate.dislike,
      });
      res.json(responseSuccess("Done"));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateViewProduct: async function (req, res) {
    try {
      const { product_id } = req.body;
      const { userId } = req;
      if (!product_id) {
        throw new Error();
      }
      const record = await Products.findOne({ _id: product_id });
      if (!record) {
        throw new Error("product not found");
      }
      await RateService.update({
        product_id,
        user_id: userId,
        rate: EnumRate.view,
      });
      res.json(responseSuccess("Done"));
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        title,
        purchase_price,
        sale_price,
        discount_price,
        description,
        images,
        options,
        category,
        quantity,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          description,
          images,
          options,
          category,
          purchase_price,
          sale_price,
          discount_price,
          quantity,
        }
      );

      res.json({ msg: "Updated a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
