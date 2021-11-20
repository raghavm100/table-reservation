
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

    // ==== Tables not available ====
    noTableAvailable: {
        code: 404,
        message: "No Tables Available for given time & duration"
    },

    // ==== Booking not found ====
    noBooking: {
        code: 404,
        message: "Booking not found"
    }


}