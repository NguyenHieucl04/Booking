const Rooms = require("../../models/rooms.model");

//[GET] /api/v1/admin/rooms
module.exports.getRoom = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    const data = await Rooms.find(find);

    res.status(200).json({
      message: "Truy cap du lieu thanh cong!",
      code: 200,
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
  try {
    const dataClient = req.body;
    const data = new Rooms(dataClient);
    await data.save();
    res.json({
      message: "Create room hotel successful!",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      code: 500,
    });
  }
};

// [PATCH] /api/v1/admin/rooms/edit/:idRoom
module.exports.editRoom = async (req, res) => {
  try {
    const id = req.params.idRoom;
    const roomExist = await Rooms.findOne({ deleted: false, _id: id });
    if (!roomExist) {
      res.status(400).json({
        message: "Product not exist!",
        code: 400,
      });
      return;
    }

    await Rooms.updateOne(
      {
        _id: id,
      },
      {
        ...req.body,
      }
    );
    res.status(200).json({
      message: `Edit product has ${id} successful!`,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      code: 500,
      error: error,
    });
  }
};

// [PATCH] /api/v1/admin/rooms/delete/:idRoom

module.exports.deleteRoom = async (req, res) => {
  try {
    const id = req.params.idRoom;
    const roomExist = await Rooms.findOne({ deleted: false, _id: id });
    if (!roomExist) {
      res.status(400).json({
        message: "Product not exist!",
        code: 400,
      });
      return;
    }
    await Rooms.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
      }
    );
    res.status(200).json({
      message: `Delete product has ${id} successful!`,
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      code: 500,
      error: error,
    });
  }
};
