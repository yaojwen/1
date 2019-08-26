<template>
  <div class="login" @keyup.enter="doLogin">
    <!-- 容器 -->
    <el-card class="box-card">
      <!-- 标题  -->
      <div slot="header" class="clearfix">
        <h3>7 + 超市管理系统</h3>
      </div>
      <!-- 内容
        model       : 表单管理的数据对象名称
        status-icon : 是否开启校验结果
        rules	    : 表单验证规则
        ref         : 组件的通用属性,唯一标识,将来可以用this.$refs.名称获取
        label-width	: 表单域标签的宽度
      -->
      <el-form :model="userList" status-icon :rules="rules" ref="loginForm" label-width="80px">
        <!-- 
            label   :  标签名称
            prop    :  表单项的名称
        -->
        <el-form-item label="用户名" prop="userList">
          <el-input v-model="userList.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userList.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doLogin">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>

import { login } from "@/api/apis";

export default {
  data() {
    return {
      userList: {
        name: "admin", // 设置初始值
        password: "1231" // 设置初始值
      },
      // 验证规则对象
      rules: {
        //  prop属性名    :    验证规则集合
        name: [
          // 必填验证
          // required : 开启必填验证
          // message : '错误提示'
          // trigger : 自动触发的方式
          { required: true, message: "请输入登录用户名", trigger: "blur" },
          // 内容长度验证
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        password: [
          // 必填验证
          // required : 开启必填验证
          // message : '错误提示'
          // trigger : 自动触发的方式
          { required: true, message: "请输入登录密码", trigger: "blur" },
          // 内容长度验证
          {
            min: 3,
            max: 10,
            message: "密码长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  // 方法
  methods: {
    doLogin() {
      // 缓存this
      const _this = this; // vue对象

      // 对整个表单进行校验的方法
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 发送请求提交登录信息
          login(_this.userList)
              .then((result)=>{
                if(result.success){
                  this.$message({
                    message: "登录成功!",
                    type: "success",
                    duration: 500,
                    // 消息提示框的监听
                    onClose(){
                        // 把tokenId存在本地
                        localStorage.setItem('token',result.token)

                        // 路由跳转
                        // _this.$router.replace('/home')
                        _this.$router.replace('/home')
                    }
                  });
                }else{
                  this.$message({
                    message: result.message,
                    type: "error",
                   
                  });
                }
              })
        } else {
          this.$message({
            message: "登录失败!",
            type: "error",
            duration: 500,
          });
          return false;
        }
      });
    },
    resetForm() {
      // 调用form组件的resetFields方法
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>
<style lang="less">
.login {
  height: 100%;
  background: linear-gradient(to right, #355c7d,#6c5b7b,#c06c84);
  display: flex;
  justify-content: center;
  align-items: center;

  .el-card {
    width: 500px;
    background-color: transparent;
    border:0;
    color:#fff;
    .el-card__header{
      border:0;
      color:#fff;
    }
    label{ color:#fff;}
  }
}
.login .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
}


</style>