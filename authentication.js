const passport = require('passport')
const mongoose = require('mongoose')
const User = require('./users')

const sendJSONResponse = function(res, status, content){
    res.status(status)
    res.json(content)
}
module.exports.register = function(req, res) {
        if(!req.body.name ||!req.body.email ||!req.body.password){
        sendJSONResponse( res, 400, {"message":"All fields required"});
    return;
    }
    let user = new User()
    
    user.name = req.body.name
    user.email = req.body.email 
    user.setPassword(req.body.password)
    user.save(function(err){
        var token;
        if(err){
            sendJSONResponse(res,404, err)
        } else {
            token = user.generateJWT()
            sendJSONResponse(res,200,{"token":token})
        }
    })
}
module.exports.login = function(req, res){
if(!req.body.email||!req.body.password) {
    sendJSONResponse(res, 400, {"messsage":"All fields required"});
    return
}
passport.authenticate('local', 
function(err, user, info){
    let token;
    if(err){
        sendJSONResponse(res, 404, err);
        return
    }
    if(user){
        token = user.generateJWT();
        sendJSONResponse(res, 200,{"token":token})
    }
    else {
        sendJSONResponse(res,401,info)
    }
})(req, res)
}

module.exports.getUserByEmail = async function(req){
    console.log(1, req.email)
    const checkingEmail = await User.find({email:req.email}).exec()
    return checkingEmail
}

module.exports.getUserByName = async function(req){
    console.log(2,req.name)
    //console.log(req.name)
    const checkingName = await User.find({name:req.name}).exec()
    return checkingName
}

module.exports.getRegExpName = async function(req){
    console.log('reg', req.body.reg)
    const reg = req.body.reg
    const checkingReg = await User.find({name:{$regex:`^${reg}$`, $options:"s"}})
    console.log('name',checkingReg)
    return checkingReg
 }
 module.exports.getRegExpEmail = async function(req){
    console.log('reg', req.body.reg)
    const reg = req.body.reg
    const checkingRegEmail = await User.find({email:{$regex:`^${reg}$`}})
    console.log('email',checkingRegEmail)
    return checkingRegEmail
 }

module.exports.getRegExp = async function(req){
    console.log('reg', req.body.reg)
    const reg = req.body.reg
    const checkingReg = await User.find({name:{$regex:`^${reg}`}})
    console.log(checkingReg)
    return checkingReg
 }