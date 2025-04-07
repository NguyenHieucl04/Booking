const express = require("express"); // nhung thu vien
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const dataBaseConnect = require("./config/database");
dataBaseConnect.dataConnect();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Địa chỉ frontend
    credentials: true, // Cho phép gửi cookie
  })
); // Cho phép mọi yêu cầu CORS
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
