const User = require("../../models/user.model");
// const md5 = require("md5");
module.exports.middleware = async (req, res, next) => {
  try {
    const tokenBeare = req.headers.token;
    const userDataBase = await User.findOne({
      token: tokenBeare,
      deleted: false,
    });
    if (!userDataBase) {
      res.json({
        message: "Token incorrect!",
        code: 400,
      });
      return;
    }
    req.user = userDataBase;
    next();
  } catch (error) {
    res.json({
      message: "Server error!",
      code: 500,
    });
    return;
  }
};
