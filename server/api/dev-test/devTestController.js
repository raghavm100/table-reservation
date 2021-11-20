// ==== Libraries used ====

// ==== Local Modules used ====
var Config = require('../../config/constants')
var Booking = require('../booking/bookingModel')
var Table = require('../table/tableModel')


// ==== Basic Health check ====
exports.clearRecords = async(req, res, next) => {
    try{
        let genericRes = { message: "Database cleared" }
        await Booking.remove({})
        await Table.remove({})
        res.json(genericRes)
    }catch(err){
        next(err)
    }
}