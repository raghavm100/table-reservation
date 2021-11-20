// ==== Libraries used ====

// ==== Local modules used ====
var Table = require('../table/tableModel')
var Booking = require('./bookingModel')
var ErrorCollection = require('../../utils/errorCollection')

// ==== Controllers ====

// ==== Add new Table ====
exports.addBooking = async (req, res, next) => {
    try{
        let reqBody = req.body
        
        // ==== Building Query structures ====
        let builderQs = {
            bookingStart: reqBody.time,
            bookingEnd: reqBody.time + reqBody.duration,
        }
        let qs = {
            $or: [
                {
                    bookingEnd: {$gt: reqBody.time},
                    bookingStart: {$lt: reqBody.time + reqBody.duration}
                },
                builderQs
            ]
        }

        // ==== Fetching all booked tables ====
        let bookedTables = await Booking.find(qs, {table: 1}).lean()
        bookedTables = bookedTables.map(booking => booking.table)

        // ==== Fetching all available tables ====
        let availableTables = await Table.find({_id: {$nin: bookedTables}}, {_id: 1}).lean()

        // ==== Making a booking if any table is available ====
        if(availableTables.length === 0){
            // ==== TODO: Send responde, No tables available ====
            res.end("NO TABLE AVAILABLE!!!!")
            return
        }
        let selectableTable = availableTables[Math.floor(Math.random() * availableTables.length)]
        builderQs.table = selectableTable._id
        builderQs.bookingName = reqBody.bookingName
        let newBooking = await Booking.create(builderQs)

        res.json(newBooking)

    }catch(err){
        next(err)
    }
}


// ==== Fetching all bookings ====
exports.getBookings = async(req, res, next) => {
    try{

        let allBookings = await Booking.aggregate([
            {
                $group: {
                    _id: "$table",
                    "bookingList": {$push: {
                        "bookingId": "$_id",
                        "bookingName": "$bookingName",
                        "starting": "$bookingStart",
                        "end": "$bookingEnd"
                    }}
                }
            },
            {
                $lookup: {
                    from: "table",
                    localField: "_id",
                    foreignField: "_id",
                    as: "table"
                }
            },
            {
                $unwind: "$table"
            },
            {
                $project: {
                    "tableName": "$table.name",
                    "tableId": "$table._id",
                    "_id": 0,
                    "bookingList": 1
                }
            }
        ])

        res.json(allBookings)
    }catch(err){
        next(err)
    }
}


// ==== Get booking details ====
exports.getBookingDetails = async(req, res, next) => {
    try{
        let reqParams = req.params
        let bookingId = reqParams.id

        let bookingDetails = await Booking.findById(bookingId)
            .populate("table", "name")
            .lean()
        if(!bookingDetails){
            let errRes = ErrorCollection.noBooking
            res.status(errRes.code).json(errRes)
            return
        }

        res.json(bookingDetails)
    }catch(err){
        next(err)
    }
}