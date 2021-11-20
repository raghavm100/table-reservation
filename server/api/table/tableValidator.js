// ==== Libraries used ====
var {body, param, query} = require('express-validator')

// ==== Local Modules used ====


exports.checkAddTable = [
    body("tableName")
        .exists().withMessage("table name does not exist")
        .bail()
        .isString().withMessage("table name has to be String")
        .bail()
        .custom(nameVal => {
            if(nameVal.trim() === "")
                return Promise.reject("table name cannot be an empty string")
            return Promise.resolve()
        })
]