var express = require('express');
var router = express.Router();

var connection = require('../db/mysqlConn.js');
var secretKey = 'itsource';


// 引入JWT
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  // 根据指定的视图和数据模块,处理生产一个结果视图并返回
  res.render('index', { title: 'Market123' });
});

router.post('/checkLogin', function(req, resp) {
  // 1. 准备
  const {name,password} = req.body;
  // 2. 执行
  const sql =  `SELECT * FROM t_user WHERE name='${name}' AND password='${password}'`;
  connection.query(sql,(err, result)=>{
    if(err) throw err;
    if(result.length===1){
      // 获取用户
      let userList = result[0];
      // user =  Object.assign({},user);
      // sign方法,创建一个token
      const tokenId = jwt.sign({
        id:userList.id, // 修改密码需要id                      
        name:userList.name, // 首页需要用户名     
        role:userList.role   // 用户角色
                   
      },secretKey)

      // 3. 结果
      resp.send({
        success:true,
        message:'登录成功!',
        token : tokenId
      })
    }else{
      // 3. 结果
      resp.send({
        success:false,
        message:'用户名或密码错误!'
      })
    }
  })
});

// 根据令牌,获取当前登录用户信息
router.post('/getCurrentUsername',(req,resp)=>{
  // 1 准备:获取参数
  const tokenId = req.body.token;
  // 2 执行:从内存拿出需要的用户信息
  try {
    jwt.verify(tokenId,secretKey,(err,userList)=>{
      if(err) throw err;
      // 3 结果
      resp.send({
        success:true,
        // message:''
        name : userList.name
      })
    })
  } catch (error) {
    resp.send({
      success:false,
      message:'登录信息已失效,请重新登录!'
    })
  }
})


// 根据令牌,获取当前登录用户的角色信息
router.post('/getCurrentUserRole',(req,resp)=>{
  // 1 准备:获取参数
  const tokenId = req.body.token;
  // 2 执行:从内存拿出需要的用户信息
  try {
    jwt.verify(tokenId,secretKey,(err,user)=>{
      // if(err) throw err;
      // 3 结果
      resp.send({
        success:true,
        // message:''
        role : user.role
      })
    })
  } catch (error) {
    resp.send({
      success:false,
      message:'登录信息已失效,请重新登录!'
    })
  }
})

module.exports = router;
