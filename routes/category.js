var express = require('express');
const { model } = require('mongoose');
const { use } = require('.');
var router = express.Router();
var responseData = require('../helper/responseData');
var modelProduct = require('../models/product')
var modelCategory = require('../models/category')
var validate = require('../validates/product')
const {validationResult} = require('express-validator');


router.get('/', async function (req, res, next) {
  console.log(req.query);
  var categoriesAll = await modelCategory.getAll(req.query);
  responseData.responseReturn(res, 200, true, categoriesAll);
});
router.get('/getListProduct/:id', async function (req, res, next) {
  console.log(req.query);
  var categoriesAll = await modelCategory.getProductsByCategory(req.params.id);
  responseData.responseReturn(res, 200, true, categoriesAll);
});
router.get('/:id', async function (req, res, next) {// get by ID
  try {
    var categories = await modelCategory.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, categories);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay");
  }
});
router.post('/add',async function (req, res, next) {
  var categories = await modelCategory.getByName(req.body.name);
  if (categories) {
    responseData.responseReturn(res, 404, false, "da ton tai");
  }
  try {
    const newCate = await modelCategory.createCategory({
      name: req.body.name,
      order:req.body.order,
      products: req.body.products,
    })
    const savedCate = await newCate.save();
    res.status(201).json(savedCate);
  }catch (err) {
    res.status(400).json({ message: err.message });
}
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    const cate = await modelCategory.getOne(req.params.id);
    if (cate == null) {
        return res.status(404).json({ message: 'Cannot find' });
    }
    cate.name = req.body.name;
    cate.order = req.body.order;
    const updatedCate = await cate.save();
    res.json(updatedCate);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});
router.delete('/delete/:id', async function (req, res, next) {
  try {
    const cate = await modelCategory.getOne(req.params.id);
    if (cate==null) {
      responseData.responseReturn(res, 404, false, "not found");
      return;
    }
    cate.isDelete = true;
    await cate.save();
    responseData.responseReturn(res, 200, true, "deleted successfully");
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Error deleting");
  }
});

module.exports = router;