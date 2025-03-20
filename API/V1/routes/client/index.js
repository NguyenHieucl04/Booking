const routerUser = require("./user.route");
const cartRouter = require("./cart.route");
const middleware = require("../../middlewares/client/index.middlewars");
module.exports = (app) => {
  const url = "/api/v1/client";
  app.use(url, routerUser);
  app.use(`${url}/cart`, middleware.middleware, cartRouter);
};
