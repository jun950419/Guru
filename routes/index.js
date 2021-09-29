const express = require("express");
const router = express.Router();
const path = require('path');
const fs=require('fs');
const ejs = require('ejs');
const client = require('./mysql');
const session = require('./session');

router.use(session);
let cheerio = require("cheerio");
let request = require("request");

var url = "http://www.relationalstocks.com/";

var title = new Array(),
  nowprice = new Array(),
  updownrate = new Array(),
  tomorrowrate = new Array();

var rank = 10; 

request(url, function (error, response, html) {
  if (!error) {
    let $ = cheerio.load(html);

    // 메인 좌측 
    for (var i = 0; i < rank; i++) {
      $("div.dispbox div.boxbody table tbody tr td a").each(function () {
        var title_info = $(this);
        var title_info_text = title_info.text();
        title[i] = title_info_text;
        i++;
      });
    }
    
    for (var i = 0; i < rank; i++) {
      $("div.dispbox div.boxbody table tbody tr td nobr img").each(function () {
        var tomorrowrate_info = $(this);
        var tomorrowrate_info_text = tomorrowrate_info.attr("src");
        tomorrowrate[i] = tomorrowrate_info_text;
        i++;
      });
    }
    for (var i = 0; i < rank; i++) {
      $("div.dispbox div.boxbody table tbody tr td nobr font").each(
        function () {
          var updownrate_info = $(this);
          var updownrate_info_text = updownrate_info.text();
          updownrate[i] = updownrate_info_text;
          i++;
        }
      );
    }

    // console.log(title);
    // console.log(tomorrowrate);
    // console.log("updownrate", updownrate);
  }
});

// news
var url1 = 'https://search.naver.com/search.naver?where=news&query=%ED%95%B4%EC%99%B8%EC%A6%9D%EC%8B%9C&sm=tab_srt&sort=1&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so%3Add%2Cp%3Aall%2Ca%3Aall&mynews=0&refresh_start=0&related=0';
var title1 = new Array(),
  image1 = new Array(),
  titles = new Array(),
  subtitle = new Array(),
  date = new Array(),
  image2 = new Array()

const rank1 = 2;  


request(url1, function(error, response, html){
    if (!error) {
      let $ = cheerio.load(html);
   
         // 메인 뉴스
    for (var i = 0; i < rank1; i++) {
        $('ul.list_news li.bx div.news_wrap div.news_area a.news_tit ').each(function(){
          var image1_info = $(this);
          var image1_info_text = image1_info.attr("href");
          image1[i] = image1_info_text;
          i++
        })};
        
        for (var i = 0; i < rank1; i++) {
            $('ul.list_news li.bx div.news_wrap div.news_area a.news_tit').each(function(){
              var titles_info = $(this);
              var titles_info_text = titles_info.text();
              titles[i] = titles_info_text;
              i++
                
            })}
            for (var i = 0; i < rank1; i++) {
                $('ul.list_news li.bx div.news_wrap div.news_area div.dsc_wrap a').each(function(){
                    var subtitle_info = $(this);
                    var subtitle_info_text = subtitle_info.text();
                    subtitle[i] = subtitle_info_text;
                    i++
                    
                })}
                
                for (var i = 0; i < rank1; i++) {
                $('ul.list_news li.bx div.news_wrap div.news_area div.news_info div.info_group').each(function(){
                        var date_info = $(this);
                        var date_info_text = date_info.text();
                        date[i] = date_info_text;
                       i++
                  
                })}
                for (var i = 0; i < rank1; i++) {
                  $(`ul.list_news li:nth-child(${i}) div.news_wrap a.dsc_thumb img `).each(function(){
                    
                      var image_info = $(this);
                      console.log(image_info.attr('src'));
                      i++
                  
                  })};      

   
// console.log(image1);      
// console.log(titles);
// console.log(subtitle);
// console.log(date);

}});
// const arr = new Array();
// arr.push(image1)
// arr.push(titles)
// arr.push(subtitle)
// arr.push(date)



/* GET home page. */
router.get("/", function (req, res, next) {
  const arr = new Array();
  arr.push(title)
  arr.push(tomorrowrate)
  arr.push(updownrate)
  
  const arr1 = new Array();

  for(i=0; i<10; i++){
    arr1.push([image1[i],titles[i],subtitle[i],date[i],image2[i]]);
    // console.log(arr1);
    // console.log(image1[i],titles[i],subtitle[i],date[i]);
  }
  // arr1.push(image1)
  // arr1.push(titles)
  // arr1.push(subtitle)
  // arr1.push(date)
  // console.log(arr1)

  // console.log('index')
  // console.log(req.session)

  

  fs.readFile(path.dirname(__dirname)+'/views/index.ejs','utf-8',(err,data)=>{
    res.send(ejs.render(data,{
      arr:arr,
      logined:req.session.logined,
      username:req.session.userid,
      arr1:arr1
    }))
  });
});
    
router.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err) console.error('err',err);
    res.send('<script>alert ("로그아웃 되었습니다."); location.href="/"; </script>');
  });
});
router.get('/logout',(req,res)=>{
  console.log('로그아웃 성공');
  req.session.destroy(function(err){
      res.redirect('/');
  });
});







module.exports = router;

