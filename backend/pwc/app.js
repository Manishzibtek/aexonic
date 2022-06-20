const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Model = require('./model')
const cors = require('cors')
const ObjectId = mongoose.Types.ObjectId;


app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
mongoose.connect("mongodb://localhost:27017/pwc",{useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log("db conneted")
}).catch((err)=>{
    console.log(err)
})


app.get('/', (req, res) => {
    console.log("hellod workd")
})

app.post('/createUser', async (req, res) => {
    var body = req.body;

    var data = new Model({
        name: body.name,
        email: body.email,
        age: body.age
    })
    await data.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('create successfully')
    })

})

app.get('/getProfile',async(req,res)=>{
     console.log(req.param.email,"manish")
    //  await Model.find({email:req.param.email})
    return new Promise(async(resolve, reject)=>{
         await Model.find({},function (err,data) {
         console.log(data)
        if (err) {
           reject(err)
        }
        
        res.json(data)
      })
    })
    //  await Model.findOne({email: req.param.email},function (err,data) {
    //      console.log(data)
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send(data)
    // })
})
// app.get('/getUserDetails/:id', async (res, req) => {
//     console.log("1234444",req.param.id);
//     // const mongoose = 
//     // Model.find({email: req.param.email})
//     // console.log(mongoose)
//     // console.log("manish")
//     //  var data = await  Model.find(function(err, data){
//     //      if(err) {
//     //          console.log(err)
//     //      } else{
//     //          console.log(data)  
//     //      }
//     //  })
//     // var data = await Model.findById(ObjectId(req.params.id), function (err , user){
//     //     if (err) {
//     //         return next(err);
//     //     }
//     //     res.send(user)
//     // })


// })


app.put('/update/:id', async (req, res) => {
    var data = await Model.findByIdAndUpdate(ObjectId(req.params.id), {
        $set: req.body
    }, function (err , user){
        if (err) {
            return next(err);
        }
        res.send('update successfully')
    })
})


app.delete('/delete/:id',async(req, res)=>{
    var data = await Model.findByIdAndRemove(ObjectId(req.params.id), function (err , user){
        if (err) {
            return next(err);
        }
        res.send('delete successfully')
    })
})





var port = 3000;
app.listen(port, () => {
    console.log(`server started with ${port}`)
})