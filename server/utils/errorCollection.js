
/*
    ====
    This file holds all custom and
    generic error messages with their
    status code. 

    This file acts as a dictionary for
    error codes.
    ====
*/

module.exports = {

    // ==== Generic errors ====
    notFound: {
        code: 404
    },

    notAcceptable: {
        code: 406
    },


    // ==== Custom Errors ====

    // ==== Table not found ====
    noTable: {
        code: 404,
        message: "Table not found"
    },

    // ==== Booking not found ====
    noBooking: {
        code: 404,
        message: "Booking not found"
    }


}