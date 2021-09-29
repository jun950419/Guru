const express = require('express');
const router = express.Router();

const client = require('./mysql');
const session = require('./session');


router.use(session);

router.get('/:idx', function(req,res,next){
    console.log('수정')
    client.query('select * from board where idx=?',[req.params.idx],(err,data)=>{
        res.render('boardupdate',{
            data : data[0],
            logined : req.session.id,
        })
    })
    
});





router.post('/:idx', function(req,res,next){
    var id = req.session.userid;
    var title = req.body.title;
    var content = req.body.content;
    var datas = [id,title,content];
    const body = req.body;

    client.query('update board set title=?, content=? where idx=?',
    [body.title, body.content, req.params.idx],(err,data)=>{
        console.log(err);
        console.log('data ==>',data);
        res.redirect('/boardview/'+req.params.idx);
    })
})




function back(){
    history.back();
}


module.exports = router;