// ==== Libraries used ====

// ==== Local Modules used ====
var Config = require('../../config/constants')


// ==== Basic Health check ====
exports.checkHealth = async(req, res, next) => {
    try{
        let responseObj = {
            server_health: "Server is healthy",
            env_health: Config.envHealth
        }

        res.json(responseObj)
    }catch(err){
        next(err)
    }
}