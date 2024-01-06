var express = require('express');
var router = express.Router();
var responseData = require('../helper/responseData');
var modelDepartment = require('../models/department')


router.get('/', async function (req, res, next) {
  console.log(req.query);
  var departmentsAll = await modelDepartment.getall(req.query);
  responseData.responseReturn(res, 200, true, departmentsAll);
});
router.get('/:id', async function (req, res, next) {// get by ID
  try {
    var department = await modelDepartment.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, department);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay department");
  }
});
//** */
router.post('/add',async function (req, res, next) {
  var department = await modelDepartment.getByName(req.body.name);
  if (department) {
    responseData.responseReturn(res, 404, false, "department da ton tai");
  } else {
    const newDepartment = await modelDepartment.createDepartment({   
      name: req.body.name,
    })
    responseData.responseReturn(res, 200, true, newDepartment);
  }
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    var department = await modelDepartment.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, department);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay department");
  }
});
router.delete('/delete/:id', function (req, res, next) {//delete by Id
  try {
    var department = modelDepartment.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong department");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay department");
  }
});

module.exports = router;
