// ==== Libraries used ====
var mongoose = require("mongoose")

// ==== Local Modules used ====


// ==== Configuration ====
var Schema = mongoose.Schema

// ==== Primary schema ====
var tableSchema = new Schema({
    name: {
        type: String
    }
}, 
    {timestamps: {createdAt: true, updatedAt: false}}
)



module.exports = mongoose.model("table", tableSchema, "table")

