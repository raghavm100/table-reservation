
/*
    ====
    This project is build and managed
    by Raghav Mishra.
    ---------------------------------
    This Project is an assignment for 
    Intellect.co
    ---------------------------------
    This server manages normal CRUD
    commands on table reservation.
    ---------------------------------

    Developed and Designed by:
    Raghav Mishra.
    ====
*/

// ==== Libraries used ====
var http = require("http")

// ==== Local Modules used ====
var app = require('./server/server')

// ==== Setting up and starting http server ====
var server = http.createServer(app)
server.listen(app.get('port'), () => {
    console.log(`Express server is running on port ${app.get('port')}`)
})