// 1. 准备
    // 引入axios模块
    import axios from 'axios';

    // 创建axios工程化实例
    const axiosInstance = axios.create({
                            // 配置项名称 : 配置项值
                            // 定义axios的全局请求地址
                            // baseURL:'http://172.16.7.131:666' 
                            baseURL:'http://192.168.1.104:666' 
    })

// 2. 执行
    // 定义并导出接口地址

        // 1 用户登录
        export const login = (user) => {
            return axiosInstance
                .post('/checkLogin', user)
                .then((resp) => {
                    return resp.data // 直接返回数据对象
                })
        }


        // 2 获取登录用户名
        export const getLoginUsername = (token) => {
            return axiosInstance
                .post('/getCurrentUsername', {
                    // 用户身份令牌
                    token // token:token
                })
                .then((resp) => {
                    return resp.data // 直接返回数据对象
                })
        }

        
        // 3 获取登录用户角色
        export const getLoginUserRole = (token) => {
            return axiosInstance
                .post('/getCurrentUserRole', {
                    // 用户身份令牌
                    token // token:token
                })
                .then((resp) => {
                    return resp.data // 直接返回数据对象
                })
        }

        // 4 用户密码修改接口
        export const changePassword = (data) => {
            return axiosInstance
                .post('/user/changePwd', data)
                .then(({ data }) => {
                    return data // 直接返回数据对象
                })
        }

        
        // 5 用户列表接口
        export const listUser = (searchObj) => {
            return axiosInstance
                .post('/user/listUser',searchObj)
                .then(({ data }) => {
                    return data // 直接返回数据对象
                })
        }


        // 6 用户添加接口
        export const accountAdd = (newUser)=>{
            return axiosInstance
                    .post('/user/accountAdd', newUser)
                    .then(({data})=>{
                        return data // 直接返回数据对象
                    })
        }


        // 7 删除用户数据
        export const accountDelete=(id)=>{
            return axiosInstance.get("/user/deletedata",{
                params:{
                    id
                }
                }).then(({data})=>{
                return data // 直接返回数据对象
            })
        }

        // 8 用户修改接口
        export const updateUser = (data) => {
            return axiosInstance
                .post('/user/updateUser', data)
                .then(({ data }) => {
                    return data // 直接返回数据对象
                })
        }
        

        // 9 用户分页
        export const getAccountDataByPage=(currentPage,pageSize)=>{
            return  axiosInstance.get("/user/getdatabypage", {
                params:{
                    currentPage,
                    pageSize
                }
            })
        }


        // 10 批量删除用户
        export const batchDelete=(IdArr)=>{
            return axiosInstance.get("/user/batchdel" , {params:{IdArr}})
        }


// ---------------------------------------------------------------------------------------
     

        // 1 商品列表
        export const getProductList = (searchObj) => {
            return axiosInstance
                .post('/product/getProductList',searchObj)
                .then(({ data }) => {
                    return data // 直接返回数据对象
                })
        }
        

        // 2 删除商品数据
        export const productDelete=(id)=>{
            return axiosInstance.get("/product/deletedata",{
                params:{
                    id
                }
                }).then(({data})=>{
                return data // 直接返回数据对象
            })
        }
        

        // 3 商品修改接口
        export const updateProduct = (data) => {
            return axiosInstance
                .post('/product/updateProduct', data)
                .then(({ data }) => {
                    return data // 直接返回数据对象
                })
        }


        // 4 商品添加
        export const productAdd = (newSproduct)=>{
            return axiosInstance
                    .post('/product/producttAdd',newSproduct)
                    .then((resp)=>{
                        return resp.data // 直接返回数据对象
                    })
        }


        // 5 用户分页
        export const getProductDataByPage=(currentPage,pageSize)=>{
            return  axiosInstance.get("/product/getdatabypage", {
                params:{
                    currentPage,
                    pageSize
                }
            })
        }


        // 6 批量删除用户
        export const batchDeleteProduct=(IdArr)=>{
            return axiosInstance.get("/product/batchdel" , {params:{IdArr}})
        }


// ---------------------------------------------------------------------------------------

        // 1 入库列表
        export const stockList = (searchObj) => {
            return axiosInstance
                .post('/reports/stockList',searchObj)
                .then(({ data }) => {
                    return data // 直接返回数据对象
                })
        }
                


        // 2 入库添加
        export const stockAdd = (newStock)=>{
            return axiosInstance
                    .post('/reports/stockAdd',newStock)
                    .then((resp)=>{
                        return resp.data // 直接返回数据对象
                    })
        }


        // 3 删除入库数据
        export const StockDelete=(id)=>{
            return axiosInstance.get("/reports/StockDelete",{
                params:{
                    id
                }
                }).then(({data})=>{
                return data // 直接返回数据对象
            })
        }
        

        // 4 入库修改接口
        export const updateStock = (data) => {
            return axiosInstance
                .post('/reports/updateStock', data)
                .then(({ data }) => {
                    return data // 直接返回数据对象
                })
        }


        // 5 入库分页
        export const getStockDataByPage=(currentPage,pageSize)=>{
            return  axiosInstance.get("/reports/getdatabypage", {
                params:{
                    currentPage,
                    pageSize
                }
            })
        }


        // 6 批量删除入库
        export const batchDeleteStock=(IdArr)=>{
            return axiosInstance.get("/reports/batchdel" , {params:{IdArr}})
        }


// ---------------------------------------------------------------------------------------


        // 1 会员添加
        export const vipAdd = (newVip)=>{
            return axiosInstance
                    .post('/vip/vipAdd',newVip)
                    .then((resp)=>{
                        return resp.data // 直接返回数据对象
                    })
        }



        // 2 会员列表
        export const getVipList = (searchObj) => {
            return axiosInstance
                .post('/vip/getVipList',searchObj)
                .then(({ data }) => {
                    return data // 直接返回数据对象
                })
        }
        

        // 3 删除商品数据
        export const vipDelete=(id)=>{
            return axiosInstance.get("/vip/deletedata",{
                params:{
                    id
                }
                }).then(({data})=>{
                return data // 直接返回数据对象
            })
        }
        

        // 4 会员修改接口
        export const updateVip = (data) => {
            return axiosInstance
                .post('/vip/updateVip', data)
                .then(({ data }) => {
                    return data // 直接返回数据对象
                })
        }


        // 5 会员分页
        export const getVipDataByPage=(currentPage,pageSize)=>{
            return  axiosInstance.get("/vip/getdatabypage", {
                params:{
                    currentPage,
                    pageSize
                }
            })
        }


        // 6 批量删除会员
        export const batchDeleteVip=(IdArr)=>{
            return axiosInstance.get("/vip/batchdel" , {params:{IdArr}})
        }
