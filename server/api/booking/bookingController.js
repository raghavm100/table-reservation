// ==== Libraries used ====
var { validationResult } = require('express-validator')

// ==== Local modules used ====
var Table = require('../table/tableModel')
var Booking = require('./bookingModel')
var ErrorCollection = require('../../utils/errorCollection')
var MiscController = require('./miscController')

// ==== Controllers ====

// ==== Add new Table ====
exports.addBooking = async (req, res, next) => {
    try{
        validationResult(req).throw()
        let reqBody = req.body
        
        // ==== Building Query structures ====
        let builderQs = {
            bookingStart: reqBody.time,
            bookingEnd: reqBody.time + reqBody.duration,
        }

        // ==== Fetching available tables as per booking time ====
        let availableTables = await MiscController.checkTableAvailability(reqBody.time, reqBody.duration)

        // ==== Making a booking if any table is available ====
        if(availableTables.length === 0){
            let errRes = ErrorCollection.noTableAvailable
            res.status(errRes.code).json(errRes)
            return
        }
        let selectableTable = availableTables[Math.floor(Math.random() * availableTables.length)] // ==== Random table selection ====
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

        // ==== Aggregation for fetching all bookings and grouping as per table ====
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
        validationResult(req).throw()
        let reqParams = req.params
        let bookingId = reqParams.id

        // ==== Fetch booking details as per bookingId ====
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


// ==== Cancel a booking ====
exports.cancelBooking = async (req, res, next) => {
    try{
        validationResult(req).throw()
        let reqParams = req.params
        let bookingId = reqParams.id
        let genericRes = { message: "Booking cancelled successfully" }

        // ==== Fetching booking details ====
        let bookingDetails = await Booking.findById(bookingId)
        if(!bookingDetails){
            // ==== Throwing error if no error exists ====
            let errRes = ErrorCollection.noBooking
            res.status(errRes.code).json(errRes)
            return
        }

        // ==== Removing the booking if it exists ====
        await bookingDetails.remove()
        res.json(genericRes)
    }catch(err){
        next(err)
    }
}



// ==== Check for Availability ====
exports.checkAvailability = async (req, res, next) => {
    try{
        validationResult(req).throw()
        let reqBody = req.body

        // ==== Fetching available tables ====
        let availableTables = await MiscController.checkTableAvailability(reqBody.time, reqBody.duration)

        if(availableTables.length === 0){
            let errRes = ErrorCollection.noTableAvailable
            res.status(errRes.code).json(errRes)
            return
        }

        res.json(availableTables)

    }catch(err){
        next(err)
    }
}