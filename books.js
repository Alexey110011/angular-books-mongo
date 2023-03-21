
require('dotenv').config()
var mongoose = require('mongoose')
//const request= require('request')
//let crypto = require('crypto')
//let jwt = require('jsonwebtoken')

let shopSchema = new mongoose.Schema({
    address:String,
    shopUrl:String
})
let bookSchema = new mongoose.Schema({
 //public id:string,
 authors:String,
 title:String,
 description:String,
 year:String,
 pictureUrl:String,
 category:String,
 price: Number,
 rating:Number, 
 shops:String/*[shopSchema]*/
})
const Booki = mongoose.model("Book", bookSchema)
module.exports=Booki

/*let userSchema = new mongoose.Schema({
email:{
    type:String,
    unique:true,
    required:true
},
name:{
    type:String,
    required:true
},
hash:String,
salt:String
})

userSchema.methods.setPassword  = function(password) {
this.salt = crypto.randomBytes(16).toString('hex')
this.hash = crypto.pbkdf2Sync(password, this.salt,1000,64,'sha512').toString('hex')
}

userSchema.methods.validPassword = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000,64,'sha512').toString('hex')
    return this.hash === hash
}
userSchema.methods.generateJWT = function() {
    let expiry = new Date()
    expiry.setDate(expiry.getDate()+7)
    return jwt.sign({
    _id:this._id,
    email:this.email,
    name: this.name,
    exp: parseInt(expiry.getTime()/1000)
    }, process.env.JWT_SECRET)
}
const User = mongoose.model("User", userSchema)
module.exports=User*/