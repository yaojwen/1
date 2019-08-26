var express = require('express');
var router = express.Router();

var connection = require('../db/mysqlConn');

// 引入jwt
var jwt = require('jsonwebtoken');
var secretKey = 'itsource';

// SQL拼装函数
function getSql(role, searchKey){
    // 1.准备
    let sql = 'SELECT id,name,role,inputTime,email FROM t_user';
    // 是否是第一个条件的标志
    let first=true;
  
    // 2.执行判断
    if(role){
      if(first){ // 第一个条件
        sql+= ` WHERE role=${role}`
      }else{// 不是第一个条件
        sql+= ` AND role=${role}`
      }
  
      first=false
    }
    if(searchKey){
        if(first){ // 第一个条件
          sql+= ` WHERE name like '${searchKey}%' or email like '${searchKey}%'`
        }else{// 不是第一个条件
          sql+= ` AND name like '${searchKey}%' or email like '${searchKey}%'`
        }
    
        first=false
      }
  
    // 3.结果
    return sql;
  }
  
  //渲染列表
router.post('/listUser', function (req, resp) {
    // 1. 准备
    const {role, searchKey}=req.body;
    // 2. 执行
    // 1) 准备SQL
    // const sql = `SELECT id,username,role,inputTime,email FROM t_user WHERE role=${role} AND username='${searchKey}'`
    // resp.send(getSql(role, searchKey));
    // 2) 执行SQL
    connection.query(getSql(role, searchKey), function (error, data) {
      if (error) throw error;
      // 3. 结果
      resp.send(data);
    })
});

// 用户添加
router.post('/accountAdd', (req, resp) => {
    // 1、接受请求参数
    const { name, password, role } = req.body;

    // 2、处理请求
    // 2.1 用户添加第一步：  验证用户名是否重复
    const sql = `SELECT * FROM t_user WHERE name='${name}'`
    connection.query(sql, (err, result) => {
        // 判断结果
        if (err) throw err;
        
        // 判断
       if(result.length>0){  //出现重复
        resp.send({
            success:false,
           message:"用户名已重复,请重新输入"
        })
        } else { // 新用户名可用
            // 2.2 用户添加第二步：  用户的添加
            const addSql = `INSERT INTO t_user(name,password,role) VALUES('${name}','${password}',${role})`
			console.log(addSql);
            connection.query(addSql, (err, result) => {
                if (err) throw err;

                // 3、 响应结果
                // 判断是否成功添加了1条数据
                if (result.affectedRows === 1) {
                    resp.send({
                        success: true,
                        message: '用户添加成功！'
                    })
                } else {
                    resp.send({
                        success: false,
                        message: '用户添加失败，请联系管理员！'
                    })
                }
            })
        }
    })
})


// 删除用户数据
router.get("/deletedata",(req,res) => {

    //接收参数
    let {id} = req.query;

    //准备sql
    let sqlStr = `delete from t_user where id='${id}'`;
    //执行sql
    connection.query(sqlStr , (err,data) => {
         if(err) throw err;

         if(data.affectedRows ===1 ){
              res.send({code:0,reason:"删除用户成功"})
         }else{
              res.send({code:1,reason:"删除用户失败"})
         }

    }) 

})


// 修改用户
router.post('/updateUser',(req, resp) => {
    const { id,email,role } = req.body;
  
    const sql =`UPDATE t_user SET role=${role}, email='${email}' WHERE id=${id}`
    connection.query(sql,(err,result)=>{
      if(err) throw err;
  
      if(result.affectedRows===1){ // 影响1行,代表成功修改
        resp.send({
          success:true,
          message:'用户修改成功!'
        })
      }else{
        resp.send({
          success:false,
          message:'用户修改失败!'
        })
      }
    })
  })


// 修改密码
router.post('/changePwd', (req, resp) => {
  const { token, password, newPassword } = req.body;

  try {
    // 通过token获取用户ID
    jwt.verify(token, secretKey, (err, userList) => {
      // 获取登录用户ID
      const userId = userList.id;

      // SQL
      const sql = `UPDATE t_user SET password=${newPassword} WHERE id=${userId} AND password=${password}`;
      connection.query(sql,(err,result)=>{
        // 密码修改成功,必须是影响1条
        if(result.affectedRows===1){
          resp.send({
            success:true,
            message : '密码修改成功!'
          })
        }else{
          resp.send({
            success:false,
            message : '原密码输入错误!'
          })
        }
       
      });
    })
  } catch (e) {
    resp.send({
      success:false,
      message : '用户登录已失效!'
    })
  }
})


//用户分页
router.get("/getdatabypage" , (req,resp) => {
    
  //接收请求参数
  let {pageSize,currentPage} = req.query;
  let start=(currentPage-1)*pageSize;
  const sql=`SELECT *FROM t_user LIMIT ${start},${pageSize}`
  
  connection.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.length>0){
      const countSql='SELECT COUNT(id) total FROM t_user'
      connection.query(countSql,(err,countResult)=>{
        resp.send({
          data:result,
          total:countResult[0].total
        })
      }) 
    }else{
      resp.send([])
    }
  })
})


//删除选中的用户数据
router.get("/batchdel" , (req,res) => {

  //接收请求参数
  let {IdArr} = req.query; //IdArr是个数组
  
  //准备sql
  let sqlStr = `DELETE FROM t_user WHERE id IN (${IdArr})`;

  //执行sql
  connection.query(sqlStr , (err,data) => {
    if(err) throw err;
    // res.send(sqlStr)
    if(data.affectedRows ===1 ){
         res.send({code:0,reason:"删除用户成功"})
    }else{
         res.send({code:1,reason:"删除用户失败"})
    }

}) 
})













module.exports = router;
