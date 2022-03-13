const { urlencoded } = require('express');
const express = require('express');
const app = express();
const mongoose =require('mongoose')
const emp =require('./routing/emp');
// const { MongoClient } = require('mongodb')
const dept = require('./routing/dept')

const multer = require('multer');
var path = require('path');

var fs = require('fs');
const  _fileName = 'myPhoto';
var dir = path.join(__dirname, _fileName)

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

//////////
// const uri = "mongodb+srv://ccc:ccc@cluster0.5bqva.mongodb.net/MYSHOP?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   const connection = client.connection;
//   connection.on('connected' , () =>{ console.log('connected done')} )
//   connection.on('error' ,() =>{ console.log('there is an errir')}  )

// });
// mongoose.connect('mongodb+srv://alhussein:alhussein@cluster0.5bqva.mongodb.net/ddd?retryWrites=true&w=majority',
// {
//     useNewUrlParser: true, useUnifiedTopology: true 
// });

// const connection = mongoose.connection;
// connection.on('connected' , () =>{ console.log('connected done')} )
// connection.on('error' ,() =>{ console.log('there is an errir')}  )
////////





const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , _fileName)
    },
    filename : (req , file , cb) => {
        cb(null , file.fieldname+"_"+Date.now()+".png")
    }
})


const fileFilter = (req , file , cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null , true)
    }else
    {cb(null , false)}
}
const uploads = multer({
    storage : storage,
    fileFilter : fileFilter,
})

mongoose.connect('mongodb://localhost/myCompany');
// mongodb+srv://alhussein:<password>@cluster0.5bqva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.use([urlencoded({extended:true}),express.json()]);
// app.use(express.json())
app.post('/emp' , uploads.single('image'))
app.use('/'+_fileName,express.static(_fileName))
app.use('/emp' , emp);
app.post('/dept/:did' , uploads.single('image') )
app.use('/dept' , dept)



app.listen(3000);
// app.listen(3000, function () {
//     console.log(dir);
// });
module.exports = app;