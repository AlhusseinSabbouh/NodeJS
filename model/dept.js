const mongoose = require('mongoose');



const dept = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name :String,
    emp : [{type: mongoose.Schema.Types.ObjectId, ref : 'Emp'}],
    image: String

});




module.exports = mongoose.model('Dept' , dept);