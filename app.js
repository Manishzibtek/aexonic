const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
const route = require('./route')
const auth = require('./middleware/auth.middleware')




app.use(auth());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/',route);



// database connection

mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})

const  port  = 8080 || process.env.PORT;
app.listen(port, ()=>{
    console.log(`server running with port number ${port}` )
})