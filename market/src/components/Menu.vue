<template>
  <el-aside width="220px">
    <div class="title">
      <h1>华联超市管理系统</h1>
      <div class="user">
        <span class="user-info">
          <img src="../assets/images/icon_head.png" alt />
          <span class="username">{{name}}</span>
          <el-button size="mini" type="danger" @click="logout">注销</el-button>
        </span>
      </div>
      <p style="font-size:14px">管理首页 丨 退出系统</p>
    </div>

    <!-- 
        default-active="2"  默认选中的菜单项,值为菜单的index属性值
        @open="handleOpen"  菜单打开时的事件监听
        @close="handleClose"菜单关闭时的事件监听
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"

    -->
    <div class="menu">
      <el-menu
        :default-active="$route.fullPath"
        class="el-menu-vertical-demo"
        unique-opened
        router
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu :index="menu.index" v-for="menu in filterTree" :key="menu.index">
          <!-- 菜单名称 -->
          <template slot="title">
            <i :class="menu.cls"></i>
            <span>{{menu.title}}</span>
          </template>

          <!-- 子集菜单项目 -->
          <el-menu-item :index="item.index" v-for="item in menu.children" :key="item.index">
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
import { getLoginUsername,getLoginUserRole } from "@/api/apis";

export default {
  data() {
    return {
      name : '',
      // 动态菜单创建
      treelist: [
        {
          index: "1",
          cls: "el-icon-s-cooperation",
          title: "商品管理",
          roles:[1,2], // 超级管理员
          children: [
            { index: "/home/product", name: "商品管理" },
            { index: "/home/addProduct", name: "添加管理" }
          ]
        },
        {
          index: "2",
          cls: "el-icon-s-goods",
          title: "账号管理",
          roles:[1], // 超级管理员
          children: [
            { index: "/home/user", name: "账号管理" },
            { index: "/home/changePassword", name: "修改密码" },
            { index: "/home/addUser", name: "增加账号" }
          ]
        },
        {
          index: "3",
          cls: "el-icon-circle-plus",
          title: "进货管理",
          roles:[1,2], // 超级管理员,普通员工
          children: [
            { index: "/home/InventoryManage", name: "库存管理" },
            { index: "/home/AddStock", name: "添加库存" }
          ]
        },
        {
          index: "4",
          cls: "el-icon-remove",
          title: "出货管理",
          roles:[1,2], // 超级管理员,普通员工
          children: [
            { index: "/home/clear", name: "销售列表" },
            { index: "/home/clearout", name: "商品出库" },
            { index: "/home/clearback", name: "商品退货" }
          ]
        },
        {
          index: "5",
          cls: "el-icon-s-data",
          title: "统计管理",
          roles:[1], // 超级管理员          
          children: [
            { index: "/home/SellTotal", name: "销售统计" },
            { index: "/home/StockTotal", name: "进货统计" }
          ]
        },
        {
          index: "6",
          cls: "el-icon-s-custom",
          title: "会员管理",
          roles:[1], // 超级管理员
          children: [
            { index: "/home/vip", name: "账号管理" },
            { index: "/home/vipadd", name: "添加账号" }
          ]
        }
      ],

      currentRole:2
    };
  },
  methods: {
    // 注销
    logout() {
      // 把路由切换到登录页面
      // this.$router.push('/login')
      this.$router.replace("/login"); // 注销完毕后,对登录权限进行验证
      localStorage.removeItem('token');
    }
  },
    // 生命周期页面加载完毕
  mounted(){
    // 获取token
    const token = localStorage.getItem('token')
    const _this = this;

    getLoginUsername(token)
          .then((result)=>{
            // 成功
            if(result.success){
              _this.name = result.name
            }else{
              // 失败提示,跳转登录
            }
          })

    getLoginUserRole(token)
      .then(rusult=>{
        if(rusult.success){
          // alert('用户角色:'+rusult.role);
          // 把当前登录的用户角色缓存到本地
          // setTimeout(()=>{
           _this.currentRole = rusult.role
        // },3000)
      }
    })
  },
  computed:{
     filterTree(){
      const _this = this;
      // 需求: 提供过滤的数组的N种方式
      //  array.forEach() // 循环显示
      //  array.map()     // 循环处理
      //  array.filter()  // 循环过滤

      return this.treelist.filter(function(tree){
          // 根据用户当角色过滤对应的菜单
          return tree.roles.includes(_this.currentRole)
      }) // 2-->6
    }
  }
};
</script>

<style lang="less" scoped>
.el-aside h1 {font-size: 20px;text-align: center;margin: 30px 0;}
.el-aside .title {color: #fff;}
.el-aside .title p {text-align: right;margin-right: 10px;margin-bottom: 20px;}
.el-aside {height: 100%;border-right: 1px solid #e6e6e6;}
.el-menu {border-right: 0;}
.user{text-align: right;display: flex;justify-content: space-around;margin-left: 50px;}
.user-info {display: flex;align-items: center;img {width: 30px;}.username {color: orangered;margin: 0 5px;}}
</style>