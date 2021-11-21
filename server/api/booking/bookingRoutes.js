// ==== Libraries used ====
var router = require('express').Router()

// ==== Local modules used ====
var controller = require('./bookingController')
var bookingValidator = require('./bookingValidator')

// ==== Routes ====
router.route('/')
    .post(bookingValidator.checkAddBooking, controller.addBooking)
    .get(controller.getBookings)

router.route('/check-availability')
    .post(bookingValidator.checkCheckAvailability, controller.checkAvailability)

router.route('/:id')
    .get(bookingValidator.checkBookingDetails, controller.getBookingDetails)
    .delete(bookingValidator.checkCancelBooking, controller.cancelBooking)


module.exports = router