// ==== Libraries used ====
var mongoose = require("mongoose")

// ==== Local Modules used ====


// ==== Configuration ====
var Schema = mongoose.Schema

// ==== Primary schema ====
var bookingSchema = new Schema({
    table: {
        type: Schema.Types.ObjectId,
        ref: "table",
        required: [true, "Table is required"]
    },
    bookingStart: {
        type: Number,
        min: 8,
        max: 22
    },
    bookingEnd: {
        type: Number,
        min: 9,
        max: 23
    },
    bookingName: {
        type: String,
        required: [true, "booking name is required"]
    }
}, 
    {timestamps: {createdAt: true, updatedAt: false}}
)


module.exports = mongoose.model("booking", bookingSchema, "booking")

