/*
 * @Author: your name
 * @Date: 2021-04-09 01:23:25
 * @LastEditTime: 2021-04-09 15:09:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /water_contains/routes/image.js
 */

const path=require("path");          //导入path模块
const multer=require("multer");     //导入multer模块
const fs=require('fs');   //导入文件操作模块
var express = require('express');
var router = express.Router();
//设置临时目录 存放上传的图片
const upload=multer({dest:"tmp/"});

// 接受客户端上传的图片
router.post("/upload",upload.single("file"),(req,res)=>{
    let imgFile=req.file;//获取图片上传的资源
    var tmp=imgFile.path;//获取临时资源
    let ext=path.extname(imgFile.originalname);//利用path模块获取 用户上传图片的 后缀名
    let newName=""+(new Date().getTime())+Math.round(Math.random()*10000)+ext;  //给用户上传的图片重新命名 防止重名
    let newPath="../public/images/"+newName; //给图片设置存放目录  提前给当前文件夹下建立一个   images文件夹  ！！！！
    let fileData=fs.readFileSync(tmp);//将上传到服务器上的临时资源 读取到 一个变量里面
    fs.writeFileSync(path.join(__dirname,newPath),fileData);//重新书写图片文件  写入到指定的文件夹下
    let newURl = 'http://192.168.43.89:8000/public/images/' + newName;
    res.send({"mess":"上传图片成功",'url':newURl});//上传成功之后  给客户端响应
})

module.exports = router;

