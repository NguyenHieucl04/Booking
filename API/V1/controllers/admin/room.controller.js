const Rooms = require("../../models/rooms.model");

//[GET] /api/v1/admin/rooms
module.exports.getRoom = async (req, res) => {
  try {
    const data = await Rooms.find({
      deleted: "false",
    });

    res.json({
      message: "Truy cap du lieu thanh cong!",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "SERVER ERROR",
      code: 500,
    });
  }
};
// [POST] /api/v1/admin/rooms/create
module.exports.addRoom = async (req, res) => {
  const dataClient = req.body;
  // console.log(req.body);
  const data = new Rooms(dataClient);
  await data.save();
  res.json({
    message: "okay",
    code: 1,
  });
};
