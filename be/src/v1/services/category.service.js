const Category = require("../models/category.model");

module.exports = {
  ProductService: {
    create: async (data) => {
      try {
        const newRecord = new Category(data);
        const result = await newRecord.save();
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },

    update: async (id, data) => {
      try {
        const newRecord = await Category.findOneAndUpdate(
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
        await Category.deleteOne({ _id: id });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },

    findOne: async (conditions) => {
      try {
        const user = await Category.findOne(conditions).exec();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    getAll: async (conditions, skip = 0, limit = 9999999) => {
      try {
        const listUsers = await Category.find(conditions)
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
        const user = await Category.findById(id).lean().exec();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
