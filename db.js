var mongoose = require('mongoose')
mongoose.set('strictQuery', true)
var dbURI = "mongodb://localhost:27017/books"

mongoose.connection.on('connection', function(){
    console.log("Connection to" +dbURI)
})
mongoose.connection.on('error', function(){
    console.log("Error"+ error)
})
mongoose.connection.on("disconnected", function(){
    console.log("Disconnected")
})
gracefulShutdown= function(msg, callback){
mongoose.connection.on('close', function(){
    console.log("Mongoose disconnected through" + msg);
    callback()
})
}

process.on("SIGUSR2", function(){
    gracefulShutdown("nodemon restart",function(){
        process.kill(process.pid, 'SIGUSR2')
    })
})

process.on("SIGINT", function(){
    gracefulShutdown("app termination",function(){
        process.exit(0)
    })
})

process.on("SIGTERM", function(){
    gracefulShutdown("Heroku app shutdown",function(){
        process.exit(0)
    })
})
require('./books')