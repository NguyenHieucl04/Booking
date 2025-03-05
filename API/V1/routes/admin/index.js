const routerRoom = require("./room.route");
module.exports = (app) => {
  const admin = "/api/v1/admin";
  app.use(admin, routerRoom);
};
