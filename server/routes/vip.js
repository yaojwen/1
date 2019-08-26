/*
	会员模块路由
*/ 
var express = require('express');
var router = express.Router();

// 引入数据库连接模块
const connection = require('../db/mysqlConn')




// 用户添加
router.post('/vipAdd', (req, resp) => {
    // 1、接受请求参数
    const { VipCardNum, AccountGroup, RealName, IpNum, Status, PhoneNum, TelNum, EmailAddress, ProvinceGroup, CityGroup, Address, PostalCode} = req.body;

    // 2、处理请求
    // 2.1 用户添加第一步：  验证用户卡号是否重复
    const sql = `SELECT * FROM t_vip WHERE VipCardNum='${VipCardNum}'`
    connection.query(sql, (err, result) => {
        // 判断结果
        if (err) throw err;
        
        // 判断
       if(result.length>0){  //出现重复
        resp.send({
            success:false,
           message:"会员已重复,请重新输入"
        })
        } else { // 新用户卡号可用
            // 2.2 用户添加第二步：  用户的添加
            const addSql = `INSERT INTO t_vip(VipCardNum, AccountGroup, RealName, IpNum, Status, PhoneNum, TelNum, EmailAddress, ProvinceGroup, CityGroup, Address, PostalCode) VALUES('${VipCardNum}','${AccountGroup}','${RealName}','${IpNum}','${Status}','${PhoneNum}','${TelNum}','${EmailAddress}','${ProvinceGroup}','${CityGroup}','${Address}','${PostalCode}')`
			// console.log(addSql);
            connection.query(addSql, (err, result) => {
                if (err) throw err;

                // 3、 响应结果
                // 判断是否成功添加了1条数据
                if (result.affectedRows === 1) {
                    resp.send({
                        success: true,
                        message: '会员添加成功！'
                    })
                } else {
                    resp.send({
                        success: false,
                        message: '会员添加失败，请联系管理员！'
                    })
                }
            })
        }
    })
})


// SQL拼装函数
function getSql(AccountGroup, searchKey){
    // 1.准备
    let sql = 'SELECT id,RealName,VipCardNum,AccountGroup,IpNum,PhoneNum,TelNum,EmailAddress,ProvinceGroup,CityGroup FROM t_vip';
    let first=true;

        // 2.执行判断
    if(AccountGroup){
      if(first){ // 第一个条件
        sql+= ` WHERE AccountGroup='${AccountGroup}'`
      }else{// 不是第一个条件
        sql+= ` AND AccountGroup='${AccountGroup}'`
      }
  
      first=false
    }

    if(searchKey){
        if(first){ // 第一个条件
          sql+= ` WHERE RealName like '${searchKey}%' or VipCardNum like '${searchKey}%'`
        }else{// 不是第一个条件
          sql+= ` AND RealName like '${searchKey}%' or VipCardNum like '${searchKey}%'`
        }
        first=false
      }
  
    // 3.结果
    return sql;
  }
  
//渲染列表
router.post('/getVipList', function (req, resp) {
    // 1. 准备
    const {AccountGroup,searchKey}=req.body;
    // resp.send(getSql(category, searchKey));
    // 2) 执行SQL
    connection.query(getSql(AccountGroup,searchKey), function (error, data) {
      if (error) throw error;
      // 3. 结果
      resp.send(data);
    })
});


// 删除数据
router.get("/deletedata",(req,res) => {

    //接收参数
    let {id} = req.query;

    //准备sql
    let sqlStr = `delete from t_vip where id='${id}'`;
    //执行sql
    connection.query(sqlStr , (err,data) => {
         if(err) throw err;

         if(data.affectedRows ===1 ){
              res.send({code:0,reason:"删除会员成功"})
         }else{
              res.send({code:1,reason:"删除会员失败"})
         }

    }) 

})


// 更新用户
router.post('/updateVip',(req, resp) => {
  const { id,AccountGroup,PhoneNum,RealName,VipCardNum,TelNum,EmailAddress } = req.body;
	const sql =`UPDATE t_vip SET PhoneNum='${PhoneNum}', RealName='${RealName}', VipCardNum='${VipCardNum}', AccountGroup='${AccountGroup}', TelNum='${TelNum}', EmailAddress='${EmailAddress}' WHERE id=${id}`
    connection.query(sql,(err,result)=>{
      if(err) throw err;
  
      if(result.affectedRows===1){ // 影响1行,代表成功修改
        resp.send({
          success:true,
          message:'会员修改成功!'
        })
      }else{
        resp.send({
          success:false,
          message:'会员修改失败!'
        })
      }
    })
  })


  //用户分页
router.get("/getdatabypage" , (req,resp) => {
    
    //接收请求参数
    let {pageSize,currentPage} = req.query;
    let start=(currentPage-1)*pageSize;
    const sql=`SELECT *FROM t_vip LIMIT ${start},${pageSize}`
    
    connection.query(sql,(err,result)=>{
      if(err) throw err;
      if(result.length>0){
        const countSql='SELECT COUNT(id) total FROM t_vip'
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
    let sqlStr = `DELETE FROM t_vip WHERE id IN (${IdArr})`;
  
    //执行sql
    connection.query(sqlStr , (err,data) => {
      if(err) throw err;
      // res.send(sqlStr)
      if(data.affectedRows ===1 ){
           res.send({code:0,reason:"删除会员成功"})
      }else{
           res.send({code:1,reason:"删除会员失败"})
      }
  
  }) 
})
  
  

module.exports = router;