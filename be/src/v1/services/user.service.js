const User = require("../models/user.model");

module.exports = {
  UserService: {
    create: async (data) => {
      try {
        const newRecord = new User(data);
        const result = await newRecord.save();
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },

    update: async (id, data) => {
      try {
        const newRecord = await User.findOneAndUpdate(
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
        await User.deleteOne({ _id: id });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },

    findOne: async (conditions) => {
      try {
        const user = await User.findOne(conditions).exec();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    getAll: async (conditions, skip = 0, limit = 9999999) => {
      try {
        const listUsers = await User.find(conditions)
          .skip(skip)
          .limit(limit)
          .select("-password");
        return listUsers;
      } catch (error) {
        throw new Error(error);
      }
    },

    getById: async (userId) => {
      try {
        const user = await User.findById(userId)
          .lean()
          .select("-password")
          .exec();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
