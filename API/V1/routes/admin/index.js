const routerAdmin = require("./admin.route");
const routerRoom = require("./room.route");
const middleware = require("../../middlewares/admin/admin.middleware");
const routerCategoryRoom = require("./category.room.route");
const routerRole = require("./role.route");
module.exports = (app) => {
  const admin = "/api/v1/admin";
  app.use(`${admin}/rooms`, middleware.adminAuthencation, routerRoom);
  app.use(
    `${admin}/category-rooms`,
    middleware.adminAuthencation,
    routerCategoryRoom
  );
  app.use(`${admin}/roles`, middleware.adminAuthencation, routerRole);
  app.use(admin, routerAdmin);
};
