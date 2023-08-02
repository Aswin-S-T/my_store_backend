const { errorResponse, successResponse } = require("../constants/response");
const User = require("../models/users/userSchema");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/helper");

module.exports = {
  register: (userData) => {
    return new Promise(async (resolve, reject) => {
      let {
        email,
        phone,
        password,
        username,
        firstName,
        lastName,
        user_type,
        storeName,
      } = userData;
      let user = await User.findOne({ $or: [{ email }, { phone }] });
      if (user) {
        resolve(errorResponse);
      } else {
        user = new User({
          email,
          phone,
          password,
          username,
          firstName,
          lastName,
          user_type,
          storeName,
        });
        let hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        let token = await generateToken({ email });

        let resposeObj = {};
        user["token"] = token;
        successResponse.data = user;
        resolve(successResponse);
      }
    });
  },
  login: (userData) => {
    return new Promise(async (resolve, reject) => {
      let { email, password } = userData;
      await User.findOne({ email }).then(async (user) => {
        if (user) {
          await bcrypt.compare(password, user.password).then(async (same) => {
            if (same) {
              let token = await generateToken({ email });
              let responseObj = {};
              responseObj = user;
              responseObj.token = token;
              successResponse.data = responseObj;
              resolve(successResponse);
            } else {
              resolve(errorResponse);
            }
          });
        } else {
          resolve(errorResponse);
        }
      });
    });
  },
};
