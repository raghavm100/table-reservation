// ==== Libraries used ====
var router = require('express').Router()

// ==== Local modules used ====
var controller = require('./tableController')
// var tradeValidator = require('./tradeValidator')

// ==== Routes ====

router.route('/')
    .get(controller.listTables)
    .post(controller.addTable)


module.exports = router