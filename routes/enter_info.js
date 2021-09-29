const express = require('express');
const router = express.Router();
const session = require('./session');
const client = require('./mysql');

router.use(session)

/* GET home page. */
router.get('/', function(req, res, next) {
    client.query('select * from userinfo where id = ?',[req.session.userid],(err,result)=>{
        console.log(req.session.userid,',',result)
        res.render('enter_info',{
            logined : req.session.userid,
            userinfo :result[0]
        });
    })
});

router.post('/',function(req,res,next){
    let name = req.body.name;
    let birth = req.body.birth;
    let email = req.body.email;
    let password = req.body.password;
    
    client.query('update userinfo set name=?, email=?, birth=?, password=? where id=?',[name, birth, email, password, req.session.userid], () =>{
        res.send('<script>alert("변경이 완료되었습니다."); location.href="index"; </script>');
    })
})


module.exports = router;