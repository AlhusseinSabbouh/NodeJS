const mongoose = require('mongoose');


const emp = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name :String,
    sal : Number,
    image : String,
    department : {type:mongoose.Schema.Types.ObjectId , ref : 'Dept'}



});


module.exports = mongoose.model('Emp' , emp);