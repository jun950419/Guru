const express = require('express');
const client = require('./mysql');
const router = express.Router();
const session = require('./session');



router.use(session);

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req,res,next){
  console.log('로그인 post')
  client.query(
    "select * from userinfo where id=? and password=?",
    [req.body.id, req.body.password ],(err,result)=>{
      console.log('result==>',[req.body.id, req.body.password ])
      if(result==''){
        res.send('<script>alert("존재하지않는 아이디입니다");history.back()</script>')
      }else{
          req.session.logined =true;
          req.session.userid = req.body.id;
          req.session.userpw = req.body.password;
          req.session.save();
         res.redirect('/');
      }
    }
  )
})

module.exports = router;