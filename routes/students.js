var express = require('express');
var router = express.Router();
const students = [
  {
    id : 1,
    name : "khang",
    avgScore : 10

  },
  {
    id : 2,
    name : "khang2",
    avgScore : 9
  }
  ,
  {
    id : 3,
    name : "khang3",
    avgScore : 8
  }
]




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(students);
  //send = write + end
});

router.get('/:id', function(req, res, next) {  //get by id
  var student = students.find(user=>user.id == req.params.id);
  if(student)
    res.send(200,{
      success:true,
      data:student
  });
  else
    res.send(404,{
      success:false,
      data:"Khong co student"
  });
  
});

router.post('/add', function(req, res, next) {  //create
  console.log(req.body);
  const newStudent={
    id:req.body.id,
    name:req.body.name,
    avgScore:req.body.avgScore
  };
  students.push(newStudent);
  res.send(200,{
    success:true,
    data: newStudent
});

});

router.put('/edit/:id', function(req, res, next) {  //edit by id
  var student = students.find(student => student.id == req.params.id);
  if (student) {
    student.name = req.body.name;
    student.avgScore = req.body.avgScore;
    res.send(200,"edit thanh cong");
  } else {
    res.send("Khong ton tai");
  }
});

router.delete('/delete/:id', function(req, res, next) {  //delete by id
  // var user = user.find(user=>user.id == req.params.id); c1
  // var index = users.indexOf(user);c1
  var student = students.map(user=>user.id).find(x=>x == req.params.id);
  if(student){
    students.pop(student);
    res.send("Deleted success");
    res.send(students);
  } else {
    res.send("Not found");
  }
});

function taoChuoiNgauNhien() {
    const doDaiChuoi = 16;
    const kiTu = '0123456789abcdefghijklmnopqrstuvwxyz';
    let chuoiNgauNhien = '';
  
    for (let i = 0; i < doDaiChuoi; i++) {
      const viTriNgauNhien = Math.floor(Math.random() * kiTu.length);
      chuoiNgauNhien += kiTu.charAt(viTriNgauNhien);
    }
  
    return chuoiNgauNhien;
  }
router.post('/addRandom', function(req, res, next) {  //create random
    console.log(req.body);
    const newStudent={
      id:taoChuoiNgauNhien(),
      name:req.body.name,
      avgScore:req.body.avgScore
    };
    students.push(newStudent);
    res.send(200,{
      success:true,
      data: newStudent
  });
  
  });
module.exports = router;
