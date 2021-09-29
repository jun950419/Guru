const express = require('express');
const router = express.Router();

const client = require('./mysql');
const session = require('./session');

router.use(session);



// 페이징
router.get('/:num',(req,res,next)=>{
    let page=req.params.num;
    console.log('err')
    if(req.session.userid == undefined){
        res.send('<script>alert("로그인이 필요합니다.");location.href="/login";</script>')
    }else{
            client.query('select * from board order by idx desc', (error, result) => {
            console.log('res == > ',result)
            res.render('boardlist', { 
                data: result,
                page:page,
                leng:result.length-1,
                page_num:10,
                logined :req.session.userid,
                username:req.session.userid,
            });
                });
    }
})



module.exports = router;








