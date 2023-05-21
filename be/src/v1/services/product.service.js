const Product = require("../models/product.model");

module.exports = {
  ProductService: {
    create: async (data) => {
      try {
        const newRecord = new Product(data);
        const result = await newRecord.save();
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },

    update: async (id, data) => {
      try {
        const newRecord = await Product.findOneAndUpdate(
          { _id: id },
          { $set: { ...data } },
          { new: true }
        );
        return newRecord;
      } catch (error) {
        throw new Error(error);
      }
    },

    delete: async (id) => {
      try {
        await Product.deleteOne({ _id: id });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },

    findOne: async (conditions) => {
      try {
        const user = await Product.findOne(conditions).exec();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    getAll: async (conditions, skip = 0, limit = 9999999) => {
      try {
        const listUsers = await Product.find(conditions)
          .skip(skip)
          .limit(limit)
          .select("-password");
        return listUsers;
      } catch (error) {
        throw new Error(error);
      }
    },

    getById: async (id) => {
      try {
        const user = await Product.findById(id).lean().exec();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
