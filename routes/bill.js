var express = require('express');
var router = express.Router();
const path = require('path');
const fs= require('fs');
const ejs = require('ejs');

let cheerio = require('cheerio');
let request = require('request');

 

var url = 'http://relationalstocks.com/instshow.php?op=summary&id=22';

var title = new Array(),
  company1 = new Array(),
  ticker1 = new Array(),
  value1 = new Array(),
  share1 = new Array(),
  per1 = new Array()

var rank = 10; 


request(url, function(error, response, html){
    if (!error) {
      let $ = cheerio.load(html);
   
    for (var i = 0; i < rank; i++) {
        $('thead tr td:nth-child(1) a').each(function(){
          var company1_info = $(this);
          var company1_info_text = company1_info.text();
          company1[i] = company1_info_text;
          i++
        })};
        
        
        for (var i = 0; i < rank; i++) {
        $('thead tr td:nth-child(2) a').each(function(){
                var ticker1_info = $(this);
                var ticker1_info_text = ticker1_info.text();
                ticker1[i] = ticker1_info_text;
               i++
          
        })}
        for (var i = 0; i < rank; i++) {
            $('thead tr td:nth-child(3)').each(function(){
                    var value1_info = $(this);
                    var value1_info_text = value1_info.text();
                    value1[i] = value1_info_text;
                   i++
              
            })}
        for (var i = 0; i < rank; i++) {
        $('thead tr td:nth-child(4)').each(function(){
                var share1_info = $(this);
                var share1_info_text = share1_info.text();
                share1[i] = share1_info_text;
               i++
          
        })}    
        for (var i = 0; i < rank; i++) {
            $('thead tr td:nth-child(5)').each(function(){
                    var per1_info = $(this);
                    var per1_info_text = per1_info.text();
                    per1[i] = per1_info_text;
                   i++
              
            })}
   
      
// console.log(company1);
// console.log(ticker1);
// console.log(value1);
// console.log(share1);
// console.log(per1);  
}});

/* GET home page. */
router.get('/', function(req, res, next) {
    const arr1 = new Array();
    arr1.push(company1)
    arr1.push(ticker1)
    arr1.push(value1)
    arr1.push(share1)
    arr1.push(per1)
    console.log('arr',arr1)
    console.log('arr[0][0]',arr1[0][0])
    fs.readFile(path.dirname(__dirname)+'/views/bill.ejs','utf-8',(err,data)=>{
        res.send(ejs.render(data,{
            arra:arr1,
            logined : req.session.userid
            
        }));
    });


});

module.exports = router;