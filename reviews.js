//const { NgIf } = require('@angular/common')
var mongoose = require('mongoose')

let reviewSchema = new mongoose.Schema({
    bookId:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    rating:{
        type:Number, required:true
    },
    reviewtext:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date, default:Date.now
    }
})

const Review = mongoose.model("Review", reviewSchema)
module.exports=Review