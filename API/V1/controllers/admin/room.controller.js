const Rooms = require("../../models/rooms.model")
//
module.exports.getRoom = async (req, res) => {
    const data = await Rooms.find({
        deleted: "false"
    })

    res.json({
        message : "Truy cap du lieu thanh cong!",
        data : data
        
    })
}
//
module.exports.addRoom = async (req, res) => {
    const dataClient = req.body;
    console.log(req.body)
    const data = new Rooms(req.body)
    await data.save()
    res.json(
        {
            message: "okay",
            code : 1
        }
    )
}