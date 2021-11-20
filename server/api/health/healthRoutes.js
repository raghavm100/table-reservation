// ==== Libraries used ====
var router = require('express').Router()

// ==== Local modules used ====
var controller = require('./healthController')

// ==== Routes ====

router.route('/')
    .get(controller.checkHealth)

module.exports = router