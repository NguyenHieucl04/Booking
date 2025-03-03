// const express = require("express")
// // const router = express.Router();

const routerUser = require("./user.route")
module.exports = (app) => {
    app.use("/api/v1/", routerUser)
    
}

