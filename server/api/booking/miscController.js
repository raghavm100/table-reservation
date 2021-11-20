// ==== Libraries used ====

// ==== Local Modules used ====
var Booking = require('./bookingModel')
var Table = require('../table/tableModel')

// ==== Controllers ====


// ==== Function to fetch availability ====
exports.checkTableAvailability = async (startTime, duration) => {
    try{

        // ==== Building Query structures ====
        let builderQs = {
            bookingStart: startTime,
            bookingEnd: startTime + duration,
        }
        let qs = {
            $or: [
                {
                    bookingEnd: {$gt: startTime},
                    bookingStart: {$lt: startTime + duration}
                },
                builderQs
            ]
        }

        // ==== Fetching all booked tables ====
        let bookedTables = await Booking.find(qs, {table: 1}).lean()
        bookedTables = bookedTables.map(booking => booking.table)

        // ==== Fetching all available tables ====
        let availableTables = await Table.find({_id: {$nin: bookedTables}}, {_id: 1, name: 1}).lean()
        return availableTables

    }catch(err){
        // ==== TODO: Throw error ====
        return []
    }
}