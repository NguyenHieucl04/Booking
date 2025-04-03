const routerUser = require("./user.route");
const cartRouter = require("./cart.route");
const routerVoucher = require("./voucher.route");
const middleware = require("../../middlewares/client/index.middlewars");
const routerCallBack = require("./callBackMomo.route");
module.exports = (app) => {
  const url = "/api/v1/client";
  app.use(url, routerUser);
  app.use(url, routerCallBack);
  app.use(`${url}/cart`, middleware.middleware, cartRouter);
};
