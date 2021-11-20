// ==== Libraries used ====

// ==== Local modules used ====
var Table = require('./tableModel')


// ==== Controllers ====

// ==== Add new Table ====
exports.addTable = async (req, res, next) => {
    try{
        let reqBody = req.body
        
        // ==== Adding new table to database ====
        let newTable = await Table.create({
            name: reqBody.tableName
        })

        res.json(newTable)

    }catch(err){
        next(err)
    }
}


// ==== Function to List all existing tables ====
exports.listTables = async (req, res, next) => {
    try{

        let reqQuery = req.query
        let limit = parseInt(reqQuery.limit) || 10
        let offset = parseInt(reqQuery.offset) || 0
        
        let tableCount = await Table.find({}).countDocuments()
        let tableList = await Table.find({})
            .limit(limit)
            .skip(offset)
            .lean()

        // ==== Building response object for table list ====
        let resObj = {
            totalCount: tableCount,
            totalPages: Math.ceil(tableCount / limit),
            pageCount: (limit + offset) / limit,
            tableList: tableList
        }
        res.json(resObj)

    }catch(err){
        next(err)
    }
}