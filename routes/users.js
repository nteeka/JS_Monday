// var express = require('express');
// var router = express.Router();
// const users = [
//   {
//     id : 1,
//     name : "khang"
//   },
//   {
//     id : 2,
//     name : "khang2"
//   }
// ]





// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send(users);
//   //send = write + end
// });

// router.get('/:id', function(req, res, next) {  //get by id
//   var user = users.find(user=>user.id == req.params.id);
//   if(user!=undefined)
//     res.send(200,{
//       success:true,
//       data:user
//   });
//   else
//     res.send(404,{
//       success:false,
//       data:"Khong co user"
//   });
  
// });

// router.post('/add', function(req, res, next) {  //create
//   // res.render('index', { title: 'Express' });
//   console.log(req.body);
//   const newUser={
//     id:req.body.id,
//     name:req.body.name
//   };
//   users.push(newUser);
//   res.send(200,{
//     success:true,
//     data: newUser
// });

// });

// router.put('/edit/:id', function(req, res, next) {  //edit by id
//   var user = users.find(user => user.id == req.params.id);
//   if (user) {
//     user.name = req.body.name;
//     res.send(200,"edit thanh cong");
//   } else {
//     res.send("Khong ton tai");
//   }
// });

// router.delete('/delete/:id', function(req, res, next) {  //delete by id
//   // var user = user.find(user=>user.id == req.params.id); c1
//   // var index = users.indexOf(user);c1
//   var ids = users.map(user=>user.id);
//   var index = ids.indexOf(parseInt(req.params.id));
//   if(index>-1)
//   {
//     users.slice(index,1);
//     res.send(200,"delete thanh cong");
//   }
//   else
//   {
//     res.send("Khong ton tai");
//   }
// });
// module.exports = router;



var express = require('express');
const { model } = require('mongoose');
const { use } = require('.');
var router = express.Router();
var responseData = require('../helper/responseData');
var modelUser = require('../models/user')
var validate = require('../validates/user')
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');



router.get('/', async function (req, res, next) {
  console.log(req.query);
  var usersAll = await modelUser.getall(req.query);
  responseData.responseReturn(res, 200, true, usersAll);
});
router.get('/:id', async function (req, res, next) {// get by ID
  try {
    var user = await modelUser.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
router.post('/add',validate.validator(),
  async function (req, res, next) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
      responseData.responseReturn(res, 400, false, errors.array().map(error=>error.msg));
      return;
    }
  var user = await modelUser.getByName(req.body.userName);
  if (user) {
    responseData.responseReturn(res, 404, false, "user da ton tai");
  } else {
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = await modelUser.createUser({
      
      userName: req.body.userName,
      email: req.body.email,
      password: newPassword,
      role:req.body.role
    })
    responseData.responseReturn(res, 200, true, newUser);
  }
});
router.put('/edit/:id', async function (req, res, next) {
  try {
    var user = await modelUser.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, user);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});
router.delete('/delete/:id', function (req, res, next) {//delete by Id
  try {
    var user = modelUser.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay user");
  }
});

module.exports = router;
