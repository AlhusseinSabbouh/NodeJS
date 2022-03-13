const Dept = require("../model/dept");
const Emp = require("../model/emp")
const fs = require("fs");
const mongoose = require("mongoose");


module.exports = {

    insertDepartment : async (req , res) => {
        try{
            const result = await new Dept({
                _id : mongoose.Types.ObjectId(),
                name: req.body.name,
                // emp : req.body.emp,
                // image : req.file.path
                
            }).save();
            

            res.json({ msg : req.body.name});



        }catch(e){
            res.json({ msg : 'error'})

        }


    },

    getAllDepartment : async(req , res) => {
        try{

            const result = await Dept.find().populate('emp');
            res.json(result.map(result => {
                return {
                    _id : result._id,
                    name : result.name,
                    emp : result.emp,
            
                }
            })
            )
            
        }catch(e){
            res.json({msg : "error"})
        }
    
    },


    insertEmployee : async (req , res) => {
        try{

            const employee = await new Emp({
                name : req.body.name,
                _id : mongoose.Types.ObjectId(),
                sal : req.body.sal,
                department : req.params.did,
                image : req.file.path
            }).save()
            const dept = await Dept.findById(req.params.did);
            dept.emp.push(employee._id);
            await dept.save();

            res.json({
                msg : "inserted"
            })


        }catch(e){
            res.json({
                msg : e.message
            })
        }
    }

}