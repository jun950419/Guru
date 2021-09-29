const express = require('express');
const router = express.Router();

const client = require('./mysql');
const session = require('./session');




router.post('/insert/:idx',(req,res)=>{
    console.log('성공',req.params.idx)
    let user =req.session.userid
    if(user==undefined){
        res.send('<script>alert("로그인 필수입니다.");location.href="/login";</script>')
    }else{
        client.query('insert into comment (id,reply,idx) values (?,?,?)',[user,req.body.reply,req.params.idx],()=>{
            res.redirect('/boardview/'+req.params.idx);
        })
    }
})

//게시판 삭제
router.get('/delete/:idx',(req,res)=>{
    console.log('삭제 진행');
    client.query('delete from board where idx=?',[req.params.idx],(err,data)=>{
        console.log(err);
        console.log('data ==>',data);
        res.redirect('/boardlist/1');
    });
});



router.get('/:idx',function(req,res,next)
{
var idx = req.params.idx;
    var sql = "select idx, id, title, content, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board where idx=?";
    client.query(sql,[idx], function(err,row)
    {   
        console.log('row==.',row)
        client.query('select * from comment where idx=?',[idx],(err,comment)=>{
            if(err) console.error(err);
            res.render('boardview', {
                title:"글 상세",
                data:row[0],
                logined : req.session.userid,
                comment:comment
            });
        })
    });
});



module.exports = router;