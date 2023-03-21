require('dotenv').config()
const express = require('express')
/*const path = require('path')
const ws = require('ws')*/
const fs = require('fs')
const bodyParser = require('body-parser')
//const jwt = require('express-jwt')
const passport= require('passport')
require('./db')
const LocalStrategy= require('passport-local').Strategy
//const session = require('express-session')
const mongoose = require('mongoose')
const Booki = require('./books')
const User = require('./users')
const Review = require('./reviews')
require('./passport')
//const {expressjwt:jwt} = require('express-jwt')
const ctrlAuth = require('./authentication')
//let register = require('./authentication').register
const app = express();
const jwt = require('jsonwebtoken')
/*const getToken=()=>{
    return localStorage('token')
}*/s

/*let auth = jwt({
    secret:process.env.JWT_SECRET,
    userProperty:'payload',
    algorithms:['HS256']
})*/
let auth = (req, res, next)=>{
    try{
        const {authorization} = req.headers
        console.log(10,req.headers.authorization)
        if(authorization){
            const token =  req.headers.authorization.split(" ")[1]
            console.log(11,token)
            const result = jwt.verify(token, process.env.JWT_SECRET)
            req.payload = result
        console.log(11,result,12,req.payload)
        next()
        } else {
            res.send("No Token")
        } 
    }
    catch{
        res.send('ERROR')
    }
}
    

app.use(function(err,req, res, next){
    if(err.name ==="UnauthorizedError"){
        res.status(401)
        res.json({"message":err.name + ":" + err.message})
    }
}) 
//const { IfStmt } = require('@angular/compiler')
mongoose.connect('mongodb://localhost:27017/books')
/*function Book (authors, title, description, year, pictureUrl, category, price, rating, shops)
    {
        //this._id=_id,
        this.authors = authors,
        this.title=title,
        this.description =description,
        this.year= year,
        this.pictureUrl=pictureUrl,
        this.category =category,
        this.price = price,
        this.rating= rating,
        this.shops = shops
    }*/
/*function Review (_id, bookId, timestamp, user, rating, comment ){
    //this.id = _id,
    this.bookId = bookId,
    this.timestamp = timestamp,
    this.user = user,
    this.rating = rating,
    this.comment=comment
}*/
//let books = []
let books=[/*
    new Book ('0','Fain Yakov, Moiseev Anton', 'Angular2 Development with TypeScript','A very good book!','2017','assets/pictures/async.jpg','Full-stack', 24.99,5, ["Landera"]),
    new Book ('1', 'Simpson Kyle', 'this&Object.prototypes Scopes&Closures oooooooooooooo oooooooooooooooo oooooooooooooooooo oooooooooooo oooooooooooo','A good-good','2019','assets/pictures/jsbasic.jpg', 'Front_end',45.99,2,["LAndera", "Beruta"]),
    new Book ('2', 'Holmes Simon', 'Getting MEAN with Mongo, Express, Angular, and Node','A smart-snart','2017','assets/pictures/mean.jpg', 'Full-stack',26.99,24["Beruta"]),
    new Book ('3', 'Simpson Kyle', 'this&Object.prototypes Scopes&Closures','A well-well','2019','assets/pictures/css_short.jpg', 'Front_end',45.99,2,["Beruta"])
*/]
let users =[]
let reviews = [
    //new Review(/*'0','0',*/"2014-05-20","User1",3,"No"),
    //new Review(/*'1','1',*/"2015-01-01", 'User2', 5,'No p"') 
]

function getProducts(){
    console.log(books)
    return books.map(book=>book._id)
}

function getBookById(bookId){
        return books.find(book=>book.id==bookId/*Id._tilte*/)
    }

function getReviewsForBook(bookId){
    return reviews.filter(review=>review.bookId===bookId)
    console.log(reviews)
    //return reviews
}
function send(res,status,content){
    res.status(status)
    res.json(content)
}
async function check(req, res){
    const article =await Booki.find().exec()//{
    const article1 = await Review.find().exec() 
    console.log(article)
        books=(article.map(item=>item))
        reviews = article1.map(item=>item)
        res.send(books/*article*/)
        console.log(books)
    }
async function check1(req, res){
    const article =await User.find().exec()//{
            //console.log(article)
            users=(article.map(item=>item))
            res.send(users)//turn article//res.send(books/*article*/)
            console.log(users)
        }

 async function addBook(req, res){
        //const {_id, name, title, description, year, pictureUrl, category, price, rating, shops} = req.body
        const newBook = new Booki/*Booki.insertOne({*/
        //Booki.insertOne(
            console.log(req.body)
            //newBook._id=req.body._id,
            newBook.authors=req.body.authors,
            newBook.title=req.body.title,
            newBook.description=req.body.description,
            newBook.year=req.body.year,
            newBook.pictureUrl=req.body.pictureUrl,
            newBook.category=req.body.category,
            newBook.price=req.body.price,
            newBook.rating=req.body.rating,
            newBook.shops=req.body.shops
            //const newBook1 = new Booki({authors:'Holmes Simon', title:'Getting MEAN with Mongo, Express, Angular, and Node',description:'A smart-snart',year:'2017',pictureUrl:'assets/pictures/mean.jpg', category:'Full-stack',price:26.99,rating:24,shops:[{address:"Beruta",shopUrl:'assets'}]})
            await newBook.save(/*function(err, insertedBook){
                if(err){
                    console.log(err)
                } else{
                    res.json(insertedBook)}
            }*/)/*.exec()*/
            //books.push(newBook)
            res.send(newBook)
       console.log(newBook,books)
       
    }

    /*async */function getAuthor(req, res, callback){
        if(req.payload&&req.payload.name){
            /*User.findOne({email:req.payload.email})
            .exec(function(error, user){
                if(!user){
                    sendJSONResponse(res, 404, {
                        "message":"User not found"
                    })
                    return
                }  else if (error){
                    console.log(error)
                    sendJSONResponse(res,400, error)
                    return
                }
                callback(req, res, user.name)
            })*/
            res.json(req.payload.name)
            console.log(100,req.payload.name)
        } else {
            /*sendJSONResponse(res, 404,{
                "message":"User not found"
            })*/console.log(404)
        }
    }

        /*async function doAddReview(req, res, author){
        const newReview = new Review
        if(req.payload&&req.payload.name){

        }
        newReview.bookId = req.params.bookId,
        newReview.author = req.payload.name,
        newReview.rating = req.body.rating,
        newReview.reviewtext = req.body.reviewtext,
        newReview.createdOn = req.body.createdOn
        await newReview.save()
        reviews.push(newReview)
        res.send(newReview)
        console.log(newReview)
        }*/

    async function addReviewToDb(req, res){
        let author;
        const newReview = new Review
        if(req.payload&&req.payload.name){
        author = req.payload.name}else {console.log("No name presented")}
        newReview.bookId = req.params.bookId,
        newReview.author = author/*req.payload.name/*body.author*/,
        newReview.rating = req.body.rating,
        newReview.reviewtext = req.body.reviewtext//,
        //newReview.createdOn = req.body.createdOn
        await newReview.save()
        reviews.push(newReview)
        res.send(newReview)
        console.log(newReview)
    }

   app.use(function(err, req, res,next){
    if(err.name==="UnauthorizedError"){
        res.status(401)
        res.json({"message":err.name + ":" + err.message})
    }
    
})

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//app.use(passport.initialize())
//app.use(passport.session())
/*passport.use(new LocalStrategy ({
    usernameField :'email'},
    function (username, password, done) {
        User.findOne({email: username}, function(err, user){
            if(err) return done(err);
            if(!user) {
                return done(null, false, {
                    message:"Incorrect username"
                });
            }
            if(!user.validPassword(password)){
                return done(null, false, {
                    message:"Incorrect password"
                })
            }
                return done(null, user)
        })        
    }
))*/
/*passport.use(new LocalStrategy ({
    usernameField :'email'},
    async function (username, password, done) {
        const user = await User.findOne({email: username})
        
            if(err) return done(err, false);
            if(!user) {
                return done(null, false, {
                    message:"Incorrect username"
                });
            }
            if(!user.validPassword(password)){
                return done(null, false, {
                    message:"Incorrect password"
                })
            }
                return done(null, user)
            
    }
))*/
app.use(passport.initialize())
/*passport.use(new LocalStrategy(
    function(username, password, done){
                if(username === "admin"&&password === "admin"){
                return done (null, username) 
            } else {
                return done("unauthorized access", false)
            }
        }
    ))*/

    app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Access-Control-Allow-Headers, Authorization');
    next()
})

/*const auth=()=>{
    return (req, res, next) =>{
        passport.authenticate("local",(error, user, info)=>{
            if(error) res.status(400).json({"statusCode":200, "message":error});
            req.login(user, function (error){
                if(error) return next(error);
                next()
            })
            })(req, res,next)
    }
}

const isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode":400, "message":"not authenticated"})
}

passport.serializeUser(function(user, done){
    if (user) done(null, user)
})
passport.deserializeUser(function(id, done){
    done(null,id)
})
*/
app.post('/authenticate'/*, auth()*/,(req, res)=>{
    res.status(200).json({"statusCode":200, message:"hello"})
})
app.post('/register', ctrlAuth.register)
app.post('/login', ctrlAuth.login)
app.get('/',(req, res)=>{
    check(req,res)
   /*let requestOptions={
        url:'http://localhost:8000',
        methof:"GET",
        json:{},
        qs:{offset:20}
    };
    request(requestOptions, function(error, response, body){
        if(error){
            console.log(error)
        } else if  
        (response.statusCode === 200){
            console.log(body)
        } else{
            console.log(response.statusCode)
        }
    })*/
})
app.get('/j', function(req, res){
    if(!req.headers.authorization){
        return res.status(401).json({"error":"Not Authorizated"})
   }
   const authHeader = req.headers.authorization
   const token = authHeader.split('.')[1]

   try{
    const user = jwt.verify(token, process.env.JWT_SECRET)
    return res.status(200).json({message:`Congrats,${user}`})
   }
   catch(error){
    return res.status(401).json({"error":"Not Authorizated"})
   }
    
    //check1(req, res)
    //res.json(getProducts())
})
app.get('/products/:bookPrice',(req,res)=>{
    res.json(getBookById(req.params.bookPrice))
    console.log(req.params.bookPrice)
    //res.send(getBookById(req.params.bookPrice))
})
app.get('/products/:bookId/reviews', function(req, res){
    res.json(getReviewsForBook(req.params.bookId))
})
app.get('/booksfile', (req,res)=>{
    fs.readFile('./model.json','utf8', function(err, data){
        if (err) throw err;
        console.log(data);
        res.send(data)
        })
})
app.post('/booksFromDb1', (req, res)=>{
    addBook(req, res)
    console.log("Done")
})
app.post('/products/:bookId/addReview',auth,(req, res)=>{
    addReviewToDb(req, res)
    console.log("Get reviews", req.headers.authorization)
})
app.post('/checkUserName', (req, res)=>{
    ctrlAuth.getUserByName(req.body)
    .then (response=>{res.send(response);console.log(response)})
    .catch(err=>console.log(err))
  })
  
  app.post('/checkUserEmail', (req, res)=>{
    ctrlAuth.getUserByEmail(req.body)
    .then (response=>{res.send(response);console.log(response)})
    .catch(err=>console.log(err))
  })

  app.put('/products/:bookId/addReview/updateRating',(req, res)=>{
    updateRating(req)
  }
  )

  const updateRating =async (req)=>{
    const bookid = req.params.bookId
    const newRating = req.body.rating
    console.log(req)
    const ratin =  await Booki.updateOne({_id:bookid}, {$set:{rating:newRating}})
    return ratin
  }

  app.post('/checkRegExpName', (req, res)=>{
    ctrlAuth.getRegExpName(req)
    .then(response=>{res.send(response);console.log(response)})
  })

  app.post('/checkRegExpEmail', (req, res)=>{
    ctrlAuth.getRegExpEmail(req)
    .then(response=>{res.send(response);console.log(response)})
  })

  app.post('/checkRegExp', (req, res)=>{
    ctrlAuth.getRegExp(req)
    .then(response=>{res.send(response);console.log(response)})
  })

app.get('/getAuthor',auth,(req, res)=>{
    getAuthor(req, res)
})

app.listen(8000, "localhost",()=> console.log('Server listen on port 8000'))
/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y3MzA2YjJmMDE2NzViMGVlNDE5NzkiLCJlbWFpbCI6IjEwMSIsIm5hbWUiOiJwZWV0IiwiZXhwIjoxNjc3NzUxOTAyLCJpYXQiOjE2NzcxNDcxMDN9.5DYuXkvXWQGUXOSfbSV9w71-cPyRQLUdc4rjQgb3-mQ*/
