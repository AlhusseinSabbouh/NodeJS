const { json } = require('express');
const express = require('express');
const router = express.Router();
const Emp = require('../model/emp');
const fs = require('fs')
const controller = require('../controller/emp')





router.get('/' , controller.getAllEmp);


router.get('/:id' , controller.getEmpById);

router.post('/' , controller.insertEmpWithPhoto);


router.put('/:id' , controller.updateEmp);

router.delete('/:id' , controller.deleteEmpById);

router.delete('/remove/:id' , controller.deletePhotoById);



module.exports = router;