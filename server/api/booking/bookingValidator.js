// ==== Libraries used ====
var {body, param, query} = require('express-validator')

// ==== Local Modules used ====


exports.checkAddBooking = [
    body("time")
        .exists().withMessage("time does not exist")
        .bail()
        .isInt().withMessage("time can only be an integer")
        .bail()
        .custom(timeVal => {
            if(timeVal < 8 || timeVal > 22)
                return Promise.reject("time can only range between 8 to 22")
            return Promise.resolve()
        }),

    body("duration")
        .exists().withMessage("duration does not exist")
        .bail()
        .isInt().withMessage("duration can only be an integer")
        .bail()
        .custom(durationVal => {
            if(durationVal < 1 || durationVal > 3)
                return Promise.reject("duration can only range between 1 to 3 hours")
            return Promise.resolve()
        }),

    body("bookingName")
        .exists().withMessage("booking name does not exist")
        .bail()
        .isAlpha().withMessage("booking name can only be alphabetical string")
        .bail()
        .custom(nameVal => {
            if(nameVal.trim() === "")
                return Promise.reject("table name cannot be an empty string")
            return Promise.resolve()
        })
]


exports.checkBookingDetails = [
    param("id")
        .isMongoId().withMessage("Invalid Booking Id")
]


exports.checkCancelBooking = [
    param("id")
        .isMongoId().withMessage("Invalid Booking Id")
]


exports.checkCheckAvailability = [
    body("time")
        .exists().withMessage("time does not exist")
        .bail()
        .isInt().withMessage("time can only be an integer")
        .bail()
        .custom(timeVal => {
            if(timeVal < 8 || timeVal > 22)
                return Promise.reject("time can only range between 8 to 22")
            return Promise.resolve()
        }),

    body("duration")
        .exists().withMessage("duration does not exist")
        .bail()
        .isInt().withMessage("duration can only be an integer")
        .bail()
        .custom(durationVal => {
            if(durationVal < 1 || durationVal > 3)
                return Promise.reject("duration can only range between 1 to 3 hours")
            return Promise.resolve()
        }),
]