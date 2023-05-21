const RateSv = require("../models/rate.model");
const { ProductService } = require("./product.service");
const { UserService } = require("./user.service");

module.exports = {
  RateService: {
    create: async ({ user_id, product_id, rate }) => {
      try {
        const p = await ProductService.getById(product_id);
        const u = await UserService.getById(user_id);
        const newRecord = new RateSv({
          user_id,
          product_id,
          product_index: p?.orderIndex,
          user_index: u?.orderIndex,
          rate,
        });
        const result = await newRecord.save();
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },

    update: async ({ user_id, product_id, rate }) => {
      try {
        let newRecord;
        const p = await ProductService.getById(product_id);
        const u = await UserService.getById(user_id);
        const isExist = await RateSv.findOne({ user_id, product_id });
        if (!isExist) {
          newRecord = await RateSv.create({
            user_id,
            product_id,
            product_index: p?.orderIndex,
            user_index: u?.orderIndex,
            rate,
          });
        } else {
          newRecord = await RateSv.updateOne(
            { user_id, product_id },
            { $inc: { rate: rate } },
            { new: true }
          );
        }

        return newRecord;
      } catch (error) {
        throw new Error(error);
      }
    },

    findOne: async (conditions) => {
      try {
        const user = await RateSv.findOne(conditions).exec();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
