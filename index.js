const express = require('express') // nhung thu vien
require("dotenv").config()
const dataBaseConnect = require("./config/database")
dataBaseConnect.dataConnect()
const app = express()
const port = process.env.PORT
const RouterApi = require("./API/V1/routes/index")

RouterApi(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})