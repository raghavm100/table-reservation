// ==== Libraries used ====
var router = require('express').Router()

// ==== Local Modules used ====
var ErrorCollection = require('../utils/errorCollection')

// ==== Route Modules ====
var tableRoutes = require('./table/tableRoutes')
var bookingRoutes = require('./booking/bookingRoutes')
var healthRoutes = require('./health/healthRoutes')
var devTestRoutes = require('./dev-test/devTestRoutes')


// ==== Routing internally ====
router.use('/tables', tableRoutes)
router.use('/bookings', bookingRoutes)
router.use('/health', healthRoutes)
router.use('/dev-test', devTestRoutes)



// ==== Default case ====
router.use((req, res, next) => {
    let errRes = ErrorCollection.invalidEndpoint
    res.status(errRes.code).json(errRes)
})

module.exports = router