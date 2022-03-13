const Emp = require("../model/emp")
const fs = require("fs");
const mongoose = require("mongoose");



module.exports = {

    getAllEmp : async (req , res)=> {
        try{
        const result = await Emp.find();
        res.json(result.map(
                (res,index) => {
                    return {
                        url : "http://localhost:3000/emp/" + res._id,
                        // id = res._id,
                        name : res.name,
                        sal : res.sal,
                        image : "http://localhost:3000/"+ res.image,
                        id : res._id
                        
                    }
                }
            ))
        }
        catch(e) {
            res.json({msg : "error"})
        }
    
    },
    getEmpById : async (req,res)=>{
        try{
        const result = await Emp.findById(req.params.id)
        res.json({
            url : "http://localhost:3000/emp/" + result._id,
            name : result.name,
            sal : result.sal,
            image : "http://localhost:3000/"+ result.image

        })}
        catch(e) {
            res.json({msg : "not found"})
        }
    
    },
    insertEmpWithPhoto :  async (req , res) => {
        try{
        const result =  await new Emp({
                _id : mongoose.Types.ObjectId(),
                name : req.body.name,
                sal : req.body.sal,
                image : req.file.path
        })
        .save()
        res.json({ msg : "emp is created",
        name : result.name,
         id: result._id,
         image : "http://localhost:3000/"+result.image,
        url: "http://localhost:3000/emp/"+result._id,})
    }
        catch(err){
            res.json({msg : err.message})
        };
    
    },
    updateEmp : async (req,res) =>{

        try{
       const result = await Emp.updateOne({_id : req.params.id} , {
           $set : {
                 name : req.body.name,
                 sal : req.body.sal,
    
                 }})
          
        res.json(result)  
        }
        catch(e) {res.json({e:e.message})};
    
    },
    deleteEmpById :  async (req,res) =>{
        try{

        const result = await Emp.findById(req.params.id);
        try{
        fs.unlinkSync("./"+result.image);
        }catch(e){}
        await result.deleteOne({_id : req.params.id} );
        res.json({mes : "deleted"});
        }catch(error){
            res.json({msg : error.message})
        }
    
    
    },
    deletePhotoById : async (req,res) =>{

        try{
       const result = await Emp.findById(req.params.id)
       fs.unlinkSync("./"+result.image);
       res.json({mes : "deleted"});
         }catch(error){
        res.json({msg : "error"})
         }
    },


}