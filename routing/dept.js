const express = require('express');

const router = express.Router();
const controller = require('../controller/dept');



router.post('/' , controller.insertDepartment);

router.get('/',controller.getAllDepartment);

router.post('/:did' , controller.insertEmployee)

module.exports = router;