// ==== Libraries used ====
var router = require('express').Router()

// ==== Local modules used ====
var controller = require('./bookingController')
// var tradeValidator = require('./tradeValidator')

// ==== Routes ====

router.route('/')
    .post(controller.addBooking)
    .get(controller.getBookings)

router.route('/:id')
    .get(controller.getBookingDetails)


module.exports = router