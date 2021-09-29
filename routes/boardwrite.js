const express = require('express');
const router = express.Router();

const client = require('./mysql');
const session = require('./session');


router.use(session);

router.get('/', function(req,res,next){
    if(req.session.userid == undefined){
        res.send('<script>alert("로그인이 필요합니다.");location.href="/login";</script>')
    }else{
        res.render('boardwrite',{
            title : "게시판 글 쓰기",
            logined : req.session.userid
        });
    }
    
});
router.post('/', function(req,res,next){
    var id = req.session.userid;
    var title = req.body.title;
    var content = req.body.content;
    var datas = [id,title,content];
 

    var sql = "insert into board(id, title, content, regdate, modidate,hit) values(?,?,?,now(),now(),0)";
    client.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/boardlist/1');
    });
});

function back(){
    history.back();
}


module.exports = router;