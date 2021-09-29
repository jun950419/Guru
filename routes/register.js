const express = require('express');
const router = express.Router();
const client = require('./mysql');

client.query('use jun950419');


router.get('/', function(req, res, next) {
  res.render('register');
 
});
router.get('/regi_info', function(req, res, next) {
  
  res.render('regi_info');
});
router.post('/regi_info/sign', function(req, res, next) {
  const body=req.body;
  if(body.password != body.password2){
    res.send('<script>alert("비밀번호가 다릅니다.");history.back();</script>')
  }else{
    client.query('insert into userinfo (name,id,birth,email,password) values (?,?,?,?,?)',
    [body.name, body.id, body.birth, body.email,body.password],()=>{
      console.log('[body.name, body.id, body.userbirth, body.email,body.password]',[body.name, body.id, body.birth, body.email,body.password])
      console.log('회원가입 성공...?')  
      res.redirect('/');
    })
  }
});
router.post('/regi_info/findId',(req,res)=>{
  client.query('select * from userinfo where id =?',[req.body.data],(err,result)=>{
    console.log(result)
    console.log('resu===>',result)
    if(result==''){
      res.send({result:true})
    }else{
      res.send({result:false})
    }
  })
})
module.exports = router;


