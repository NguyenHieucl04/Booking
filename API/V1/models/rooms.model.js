const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const roomSchema = new mongoose.Schema(
  {
    nameRoom: String,
    numberRoom: Number,
    avatar: String,
    price: Number,
    status: String,
    description: String,
    peopleMax: Number,
    thumbnail: {
      type: Array,
      default: [],
    },
    imageArray: {
      type: Array,
      default: [],
    },
    bed: Number,
    livePeople: Number,
    discountPersent: Number,
    slug: {
      type: String,
      slug: "nameRoom",
      unique: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Rooms = mongoose.model("Rooms", roomSchema, "rooms");

module.exports = Rooms;
