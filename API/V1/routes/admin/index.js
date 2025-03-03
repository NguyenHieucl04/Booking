
const routerRoom = require("./room.route")
module.exports = (app) => {
   app.use("/api/v1/admin" , routerRoom )
    
}

