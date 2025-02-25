const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    nameRoom : String,
    numberRoom: Number,
    avatar: String,
    price: Number,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true
}
)

const Rooms = mongoose.model('Rooms' , roomSchema , "rooms")

module.exports = Rooms