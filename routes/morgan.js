var express = require('express');
var router = express.Router();
const path = require('path');
const fs= require('fs');
const ejs = require('ejs');

let cheerio = require('cheerio');
let request = require('request');

 

var url = 'http://relationalstocks.com/instshow.php?op=summary&id=2307';

var title = new Array(),
  company = new Array(),
  ticker = new Array(),
  value = new Array(),
  share = new Array(),
  per = new Array()

var rank = 10;  

request(url, function(error, response, html){
    if (!error) {
      let $ = cheerio.load(html);
   
    for (var i = 0; i < rank; i++) {
        $('thead tr td:nth-child(1) a').each(function(){
          var company_info = $(this);
          var company_info_text = company_info.text();
          company[i] = company_info_text;
          i++
        })};
        
        
        for (var i = 0; i < rank; i++) {
        $('thead tr td:nth-child(2) a').each(function(){
                var ticker_info = $(this);
                var ticker_info_text = ticker_info.text();
                ticker[i] = ticker_info_text;
               i++
          
        })}
        for (var i = 0; i < rank; i++) {
            $('thead tr td:nth-child(3)').each(function(){
                    var value_info = $(this);
                    var value_info_text = value_info.text();
                    value[i] = value_info_text;
                   i++
              
            })}
        for (var i = 0; i < rank; i++) {
        $('thead tr td:nth-child(4)').each(function(){
                var share_info = $(this);
                var share_info_text = share_info.text();
                share[i] = share_info_text;
               i++
          
        })}    
        for (var i = 0; i < rank; i++) {
            $('thead tr td:nth-child(5)').each(function(){
                    var per_info = $(this);
                    var per_info_text = per_info.text();
                    per[i] = per_info_text;
                   i++
              
            })}
   
      
// console.log(company);
// console.log(ticker);
// console.log(value);
// console.log(share);
// console.log(per);  
}});

/* GET home page. */
router.get('/', function(req, res, next) {
    const arr1 = new Array();
    arr1.push(company)
    arr1.push(ticker)
    arr1.push(value)
    arr1.push(share)
    arr1.push(per)
    console.log('arr',arr1)
    console.log('arr[0][0]',arr1[0][0])
    fs.readFile(path.dirname(__dirname)+'/views/morgan.ejs','utf-8',(err,data)=>{
        res.send(ejs.render(data,{
            arra:arr1,
            logined : req.session.userid
            
        }));
    });


});

module.exports = router;