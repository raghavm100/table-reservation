// ==== Libraries used ====
var router = require('express').Router()

// ==== Local modules used ====
var controller = require('./devTestController')

// ==== Routes ====

router.route('/clear-records')
    .post(controller.clearRecords)

module.exports = router