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
  var productsAll = await modelProduct.getall(req.query);
  responseData.responseReturn(res, 200, true, productsAll);
});
router.get('/:id', async function (req, res, next) {// get by ID
  try {
    var product = await modelProduct.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay san pham");
  }
});
router.post('/add',async function (req, res, next) {
  var product = await modelProduct.getByName(req.body.name);
  if (product) {
    responseData.responseReturn(res, 404, false, "da ton tai");
  }
  try {
    const newProduct = await modelProduct.createProduct({
      
      name: req.body.name,
      price: req.body.price,
      order:req.body.order,
      categoryId: req.body.categoryId,
    });
    
    const savedProduct = await newProduct.save();
    const category = await modelCategory.getOne(req.body.categoryId);
        if (category) {
            category.products.push(savedProduct._id);
            await category.save();
        }
    res.status(201).json(savedProduct);
  }catch (err) {
    res.status(400).json({ message: err.message });
}
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    const product = await modelProduct.getOne(req.params.id);
    if (product == null) {
        return res.status(404).json({ message: 'Cannot find product' });
    }
    product.name = req.body.name;
    product.order = req.body.order;
    product.price = req.body.price;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});
router.delete('/delete/:id', async function (req, res, next) {
  try {
    const product = await modelProduct.getOne(req.params.id);
    if (product==null) {
      responseData.responseReturn(res, 404, false, "Product not found");
      return;
    }
    product.isDelete = true;
    await product.save();
    responseData.responseReturn(res, 200, true, "Product deleted successfully");
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Error deleting product");
  }
});

module.exports = router;