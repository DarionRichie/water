/*
 * @Author: your name
 * @Date: 2021-03-25 01:35:30
 * @LastEditTime: 2021-03-25 01:55:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /water_contains/water_contains/routes/index.js
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create',function(req,res,next){
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://121.4.18.254:27017/";
 
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    
    console.log("数据库已创建!");
    db.close();
  });
});

module.exports = router;
