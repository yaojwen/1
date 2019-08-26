/*
	商品模块路由
*/ 
var express = require('express');
var router = express.Router();


// 引入数据库连接模块
const connection = require('../db/mysqlConn')



// SQL拼装函数
function getSql(classify, searchKey){
	// 1.准备
	let sql = 'SELECT id,GoodsBarCode,GoodsName,PurchasePrice,classify,GoodsNum,inputTime FROM t_stock';
	// 是否是第一个条件的标志
	let first=true;
  
	// 2.执行判断
	if(classify){
	  if(first){ // 第一个条件
		sql+= ` WHERE classify='${classify}'`
	  }else{// 不是第一个条件
		sql+= ` AND classify='${classify}'`
	  }
  
	  first=false
	}
	if(searchKey){
		if(first){ // 第一个条件
		  sql+= ` WHERE GoodsName like '${searchKey}%' or GoodsBarCode like '${searchKey}%'`
		}else{// 不是第一个条件
		  sql+= ` AND GoodsName like '${searchKey}%' or GoodsBarCode like '${searchKey}%'`
		}
	
		first=false
	  }
  
	// 3.结果
	return sql;
}
  
//渲染列表
router.post('/stockList', function (req, resp) {
	// 1. 准备
	const {classify, searchKey}=req.body;
	// 2. 执行
	// 1) 准备SQL
	// const sql = `SELECT id,username,role,inputTime,email FROM t_user WHERE role=${role} AND username='${searchKey}'`
	// resp.send(getSql(role, searchKey));
	// 2) 执行SQL
	connection.query(getSql(classify, searchKey), function (error, data) {
	  if (error) throw error;
	  // 3. 结果
	  resp.send(data);
	})
  
});

// 删除数据
router.get("/StockDelete",(req,res) => {

    //接收参数
    let {id} = req.query;

    //准备sql
    let sqlStr = `delete from t_stock where id='${id}'`;
    //执行sql
    connection.query(sqlStr , (err,data) => {
         if(err) throw err;

         if(data.affectedRows ===1 ){
              res.send({code:0,reason:"删除成功"})
         }else{
              res.send({code:1,reason:"删除失败"})
         }

    }) 

})


// 更新数据
router.post('/updateStock',(req, resp) => {
  const { id,GoodsBarCode,GoodsName,PurchasePrice,GoodsNum } = req.body;
	const sql =`UPDATE t_stock SET GoodsBarCode='${GoodsBarCode}',GoodsNum=${GoodsNum}, GoodsName='${GoodsName}',  PurchasePrice=${PurchasePrice} WHERE id=${id}`
    connection.query(sql,(err,result)=>{
      if(err) throw err;
  
      if(result.affectedRows===1){ // 影响1行,代表成功修改
        resp.send({
          success:true,
          message:'修改成功!'
        })
      }else{
        resp.send({
          success:false,
          message:'修改失败!'
        })
      }
    })
})


//入库分页
router.get("/getdatabypage" , (req,resp) => {
    
	//接收请求参数
	let {pageSize,currentPage} = req.query;
	let start=(currentPage-1)*pageSize;
	const sql=`SELECT *FROM t_stock LIMIT ${start},${pageSize}`
	
	connection.query(sql,(err,result)=>{
	  if(err) throw err;
	  if(result.length>0){
		const countSql='SELECT COUNT(id) total FROM t_stock'
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
  
  
// 批量删除入库数据
router.get("/batchdel" , (req,res) => {
  
	//接收请求参数
	let {IdArr} = req.query; //IdArr是个数组
	
	//准备sql
	let sqlStr = `DELETE FROM t_stock WHERE id IN (${IdArr})`;
  
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
  


// 入库添加
router.post('/stockAdd', (req, resp) => {
    // 1、接受请求参数
    const { GoodsBarCode,GoodsName,classify, PurchasePrice, GoodsNum } = req.body;

    // 2、处理请求
    // 2.1 用户添加第一步：  验证用户名是否重复
    const sql = `SELECT * FROM t_stock WHERE GoodsName='${GoodsName}'`
    connection.query(sql, (err, result) => {
        // 判断结果
        if (err) throw err;
        
        // 判断
       if(result.length>0){  //出现重复
        resp.send({
            success:false,
           message:"商品已重复,请重新输入"
        })
        } else { // 新用户名可用
            // 2.2 用户添加第二步：  用户的添加
            const addSql = `INSERT INTO t_stock(GoodsBarCode,GoodsName,classify,PurchasePrice,GoodsNum) VALUES('${GoodsBarCode}','${GoodsName}','${classify}',${PurchasePrice},${GoodsNum})`
			console.log(addSql);
            connection.query(addSql, (err, result) => {
                if (err) throw err;

                // 3、 响应结果
                // 判断是否成功添加了1条数据
                if (result.affectedRows === 1) {
                    resp.send({
                        success: true,
                        message: '已成功入库！'
                    })
                } else {
                    resp.send({
                        success: false,
                        message: '入库失败，请联系管理员！'
                    })
                }
            })
        }
    })
})

module.exports = router;