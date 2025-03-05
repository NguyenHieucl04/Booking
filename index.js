const express = require("express"); // nhung thu vien
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const dataBaseConnect = require("./config/database");
dataBaseConnect.dataConnect();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const port = process.env.PORT;
const RouterApiAdmin = require("./API/V1/routes/admin/index");
const RouterApiClient = require("./API/V1/routes/client/index");
RouterApiAdmin(app);
RouterApiClient(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
