const jwt = require("jsonwebtoken");
module.exports = {
  generateToken: async (payload) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET || "something secret",
        { expiresIn: "7 days" },
        (err, token) => {
          if (err) {
            console.log("Error : ", err);
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  },
};
