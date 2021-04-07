/*
 * @Author: your name
 * @Date: 2021-03-28 23:33:10
 * @LastEditTime: 2021-03-29 01:07:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /water_contains/routes/user.js
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({ code: 200 })
});
router.post('/register', function (req, res, next) {
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
        dbo.collection("userInfo").find({ username: req.body.username }).toArray(function (err, result) {
            if (err) throw err;
            console.log(result.length);
            if (result.length == 0) {

                dbo.collection("userInfo").insertOne(req.body, function (err, res) {
                    if (err) throw err;
                    console.log("文档插入成功");
                });
            } else {
                isRegister = true;
                console.log(isRegister) //true
            }
            db.close();
            if (isRegister) {
                res.send({ code: 200, register: true });
            } else {
                res.send({ code: 200, register: false })
            }
        });

    });
    

});

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