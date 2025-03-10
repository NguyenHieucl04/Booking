const Rooms = require("../../models/rooms.model");

// //[GET] /api/v1/admin/rooms?page={number}&status={status}&keyword={nameRoom}&sortkey={truong}&sortvalue=asc || desc
const paginationHelper = require("../../helper/pagination.help");
module.exports.getRoom = async (req, res) => {
  try {
    const {
      status = null,
      keyword = null,
      limit = 2,
      page = 1,
      sortkey = "position",
      sortvalue = "asc",
    } = req.query;
    const find = {
      deleted: false,
    };

    if (status) {
      find.status = status;
    }
    if (keyword) {
      const title = new RegExp(keyword, "i");
      find.nameRoom = title;
    }
    const allRooms = await Rooms.countDocuments(find);
    // console.log(allRooms);

    const sort = {};
    // console.log(req.query);
    if (sortkey && sortvalue) {
      sort[sortkey] = sortvalue;
    } else {
      sort.position = "asc";
    }

    const data = await Rooms.find(find)
      .limit(parseInt(limit))
      .skip((page - 1) * parseInt(limit))
      .sort(sort);
    // console.log(req.admin);
    res.status(200).json({
      message: "Truy cap du lieu thanh cong!",
      code: 200,
      data: data,
      pagination: {
        total: allRooms,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR",
      code: 500,
      error: error,
    });
  }
};
// [POST] /api/v1/admin/rooms/create
module.exports.addRoom = async (req, res) => {
  try {
    const dataClient = req.body;
    const allRooms = await Rooms.countDocuments();
    const position =
      req.body.position !== undefined ? req.body.position : allRooms + 1;
    dataClient.position = position;
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
// [GET] /api/v1/admin/rooms/detail/:idRoom
module.exports.detailRoom = async (req, res) => {
  try {
    const idRoom = req.params.idRoom;
    const roomExist = await Rooms.findOne({ deleted: false, _id: idRoom });
    if (!roomExist) {
      return res.status(400).json({
        message: "Room not exist!",
        code: 400,
      });
    }

    return res.status(200).json({
      message: "Successful!",
      code: 200,
      data: roomExist,
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
        message: "Room not exist!",
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

// [PATCH] /api/v1/admin/rooms/change-status/:idRoom
module.exports.changeStatusRoom = async (req, res) => {
  try {
    const idRoom = req.params.idRoom;
    const status = req.body.status;
    const room = await Rooms.findOne({ deleted: false, _id: idRoom });
    if (!room) {
      res.status(400).json({
        message: " Room not exist!",
        code: 400,
      });
      return;
    }

    const allowedFields = [
      "available", //Phòng trống, có thể đặt.
      "occupied", //	Phòng đang có khách.
      "reserved", // Phòng đã được đặt trước, nhưng khách chưa nhận phòng.
      "maintenance", // 	Phòng đang được bảo trì, không thể đặt.
      "cleaning", // Phòng đang được dọn dẹp.
    ];
    if (!allowedFields.includes(status)) {
      res.status(400).json({
        message: "Invalid status!",
        code: 400,
      });
      return;
    }
    await Rooms.updateOne(
      {
        _id: idRoom,
      },
      {
        status: status,
      }
    );

    res.status(200).json({
      code: 200,
      message: "Change status of room successful!",
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      code: 500,
    });
  }
};

//[GET] /api/v1/admin/rooms-delete
module.exports.roomDelete = async (req, res) => {
  try {
    const data = await Rooms.find({ deleted: true });
    res.status(200).json({
      message: "Successful!",
      code: 200,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      code: 500,
    });
  }
};
// [PATCH] /api/v1/admin/rooms/undelete/:idRoom

module.exports.undelete = async (req, res) => {
  try {
    const idRoom = req.params.idRoom;
    const room = await Rooms.findOne({ deleted: true, _id: idRoom });
    if (!room) {
      res.status(400).json({
        message: "Room not exist!",
        code: 400,
      });
      return;
    }
    await Rooms.updateOne({ _id: idRoom }, { deleted: false });
    res.status(200).json({
      message: "Successful!",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR!",
      code: 500,
    });
  }
};
