/*
 * @Author: your name
 * @Date: 2021-03-28 23:33:10
 * @LastEditTime: 2021-04-10 04:53:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /water_contains/routes/user.js
 */
var express = require('express');
var router = express.Router();
var axios = require("axios");
const { json } = require('express');
var url = require('url');
const { ObjectId } = require('bson');

/* GET home page. */
router.get('/', function (req, res, next) {
    //尝试对应的百度云的只能问答
    res.send({ code: 200 })
});

router.get('/getOne_Orderinfo',function(req,res,next){
    var parseObj = url.parse(req.url, true);
    console.log(parseObj.query.id + '_dddddd');
    var MongoClient = require('mongodb').MongoClient;
    var _url = "mongodb://121.4.18.254:27017/";
    MongoClient.connect(_url, function (err, db) {
        if (err) {
            console.log(err)
        }
        if (err) throw err;
        var dbo = db.db("water");
        // var myobj = { name: "lizhitao", url: "www.runoob" };
        // console.log(req.body)
        dbo.collection("orderInfo").find({_id:ObjectId(parseObj.query.id)}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result.length);
            res.send(result);
            db.close();
        });
    }); 
    // res.send({code:200})
});
router.post('/add', function (req, res, next) {
    console.log(req.body);
    //进行数据的插入等，建议先进行对应等库等安装 axios
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://121.4.18.254:27017/";
    var isRegister = false;
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err)
        }
        if (err) throw err;

        var dbo = db.db("water");
        // var myobj = { name: "lizhitao", url: "www.runoob" };
        console.log(req.body)
        dbo.collection("orderInfo").insertOne(req.body,function(err,res){
            if (err) throw err;
            console.log("插入成功");
            db.close();
        })
        // dbo.collection("userInfo").find({ username: req.body.username }).toArray(function (err, result) {
        //     if (err) throw err;
        //     console.log(result.length);
        //     if (result.length == 0) {

        //         dbo.collection("userInfo").insertOne(req.body, function (err, res) {
        //             if (err) throw err;
        //             console.log("文档插入成功");
        //         });
        //     } else {
        //         isRegister = true;
        //         console.log(isRegister) //true
        //     }
        //     db.close();
        //     if (isRegister) {
        //         res.send({ code: 200, register: true });
        //     } else {
        //         res.send({ code: 200, register: false })
        //     }
        // });

    });
});




router.get('/OrderList',function(req,res,next){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://121.4.18.254:27017/";
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err)
        }
        if (err) throw err;
        var dbo = db.db("water");
        // var myobj = { name: "lizhitao", url: "www.runoob" };
        // console.log(req.body)
        dbo.collection("orderInfo").find(req.body).toArray(function (err, result) {
            if (err) throw err;
            console.log(result.length);
            res.send(result);
            db.close();
        });
    }); 
})
router.get('/OrderList_onepep',function(req,res,next){
    // console.log(req.body)
    var parseObj = url.parse(req.url, true);
    // console.log(parseObj.query.id + '_dddddd');
    var MongoClient = require('mongodb').MongoClient;
    var _url = "mongodb://121.4.18.254:27017/";
    MongoClient.connect(_url, function (err, db) {
        if (err) {
            console.log(err)  
        }
        if (err) throw err;
        var dbo = db.db("water");
        // var myobj = { name: "lizhitao", url: "www.runoob" };
        // console.log(req.body)
        dbo.collection("orderInfo").find({off_pep:parseObj.query.id}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result.length);
            res.send(result);
            db.close();
        });
    }); 
})
router.post('/login', function (req, res, next) {
    console.log(req.body);
    //进行数据的插入等，建议先进行对应等库等安装 axios
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://121.4.18.254:27017/";
    var isRegister = true;
    var userInfo = {}
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err)
        }
        if (err) throw err;
        var dbo = db.db("water");
        // var myobj = { name: "lizhitao", url: "www.runoob" };
        console.log(req.body)
        dbo.collection("userInfo").find(req.body).toArray(function (err, result) {
            if (err) throw err;
            console.log(result.length);
            if (result.length != 0) {
                userInfo = result[0];
            } else {
                isRegister = false;
            }
            db.close();
            if (!isRegister) {
                res.send({ code: 200, login: false,});
            } else {
                res.send({ code: 200, login: true,userInfo})
            }
        });

    });
    

});
module.exports = router;