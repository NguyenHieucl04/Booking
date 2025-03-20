const express = require("express");
const routerUser = express.Router();
const controller = require("../../controllers/client/user.controller");
const middleware = require("../../middlewares/client/index.middlewars");
//[]
routerUser.post("/login", controller.login);

// [POST] /api/v1/client/add
routerUser.post("/register", controller.addUser);

// [POST] /api/v1/client/password/forgot
routerUser.post("/password/forgot", controller.forgotPassword);
// [POST] /api/v1/client/password/otp
routerUser.post("/password/otp", controller.checkOtp);
// [POST] /api/v1/client/password/rest
routerUser.patch(
  "/password/rest",
  middleware.middleware,
  controller.resetPassword
);
// [GET] /api/v1/client/logout
routerUser.get("/logout", controller.logout);
module.exports = routerUser;
