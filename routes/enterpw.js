var express = require('express');
var router = express.Router();
var session = require('./session');
router.use(session)

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('enterpw',{
        logined:req.session.userid
     });
});

router.post('/', function(req, res, next) {
    console.log(req.session.userpw == req.body.password)
    if(req.session.userpw == req.body.password){
        // res.render('enter_info',{
        //     logined:req.session.userid
        //  })
        res.redirect('/enter_info');
    }else{
        res.send('<script>alert("비밀번호가 일치하지않습니다.");history.back()</script>')
    }
    
})


module.exports = router;