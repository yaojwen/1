<template>
  <div class="adduser">
    <el-card class="box-card" style="background:transparent;border:0;width:700px">
      <!-- 标题 -->
      <div slot="header" class="clearfix" style="border:0;">
        <h3>添加用户</h3>
      </div>
      <el-form
        :model="adduser"
        :rules="rules"
        ref="addUserForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width:700px;background:transparent;"
      >
        <el-form-item label="用户名" prop="name" style="width:500px">
          <el-input type="text" v-model="adduser.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width:500px">
          <el-input type="password" v-model="adduser.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" style="width:500px">
          <el-input type="password" v-model="adduser.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="adduser.role" placeholder="请选择用户角色" >
            <el-option label="--请选择--" value></el-option>
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="普通员工" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="accountAdd">添加</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// 引入api接口
import { accountAdd } from "@/api/apis.js";
export default {
  data() {
    // 缓存全局this
    const _this = this;

    // 自定义验证函数
    // rule 验证规则对象,可以拿到验证函数
    // value输入框的值(验证的核心数据)
    // callback 结果回调函数
    const validatePass = function(rule, value, callback) {
      // 正则规则
      let reg = /^[a-zA-z0-9]+$/;

      if (value === "") {
        callback(new Error("密码不能为空!"));
      } else if (value && value.length <= 3) {
        callback(new Error("密码必须不少于3位!"));
      } else if (!reg.test(value)) {
        callback(new Error("密码必须为字母或数字!"));
      } else {
        callback(); // 成功放行
      }
    };

    const validateCheckPass = function(rule, value, callback) {
      // 正则规则
      // let reg = /^[a-zA-z0-9]+$/;

      if (value === "") {
        callback(new Error("密码不能为空!"));
      } else if (value !== _this.adduser.password) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback(); // 成功放行
      }
    };

    return {
      adduser: {
        name: "",
        password: "",
        checkPass: "",
        role: ""
      },
      rules: {
        // 属性名  :  验证规则集合
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetLogin() {
      // 调用form组件的resetFields方法
      this.$refs.addUserForm.resetFields();
    },
    accountAdd() {
      // 缓存全局this
      const _this = this;

      accountAdd(this.adduser).then(data => {
        if (data.success) {
          // 添加成功
          // 提示成功,自动跳转到用户列表
          _this.$message({
            message: data.message,
            type: "success",
            duration: 500, // 500ms自动挂壁
            onClose() {
              _this.$router.push("/home/user"); // 跳转到用户列表
            }
          });
        } else {
          // 提示错误
          _this.$message({
            message: data.message,
            type: "error"
          });
        }
      });
    },

  }
};
</script>
<style lang="less">
.adduser .el-card .el-card__header {
  border-bottom: 0;
}
.adduser .el-card .el-card__header h3 {
  color: lightblue;
  font-size: 16px;
}
.adduser .el-card.is-always-shadow,
input {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
}
.adduser .el-card label {
  color: #fff;
}
</style>