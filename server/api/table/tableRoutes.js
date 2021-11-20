// ==== Libraries used ====
var router = require('express').Router()

// ==== Local modules used ====
var controller = require('./tableController')
var tableValidator = require('./tableValidator')

// ==== Routes ====

router.route('/')
    .get(controller.listTables)
    .post(tableValidator.checkAddTable, controller.addTable)

module.exports = router