<template>
  <div class="password-modify">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 头 -->
      <div slot="header" class="clearfix">
        <h3>密码修改</h3>
      </div>
      <!-- 身体 -->
      <div class="item">
        <!-- 账号添加表单 -->
        <el-form
          style="width: 316px"
          size="small"
          :model="changePwdForm"
          status-icon
          :rules="rules"
          ref="passwordModifyForm"
          label-width="100px"
        >
          <!-- 旧的密码 -->
          <el-form-item label="旧的密码" prop="oldPwd">
            <el-input type="text" v-model="changePwdForm.oldPwd" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 新的密码 -->
          <el-form-item label="新的密码" prop="newPassword">
            <el-input type="text" v-model="changePwdForm.newPassword" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 确认新密码 -->
          <el-form-item label="确认新密码" prop="confirmPwd">
            <el-input type="text" v-model="changePwdForm.confirmPwd" autocomplete="off"></el-input>
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm()">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
// 引入请求函数

import { changePassword } from "@/api/apis";

export default {
  data() {
    const pwdReg = function(value) {
      // 正则
      const reg = /^[A-Za-z0-9]+$/;
      return reg.test(value);
    };

    // rule: 当前验证字段（包含字段名和验证对象）
    // value 当前字段值
    // callback 结果回调，如果传入new Error(）对象，那么验证失败；反之验证成功
    const checkNewPwd = (rule, value, callback) => {
      if (value === "") {
        // 非空提示
        callback(new Error("新密码不能为空！"));
      } else if (!pwdReg(value)) {
        callback(new Error("新密码只能是字符和数字！"));
      } else {
        callback(); // 验证成功，放行
      }
    };

    const checkConfirmPwd = (rule, value, callback) => {
      if (value !== this.changePwdForm.newPassword) {
        callback(new Error("两次密码不一致！"));
      } else {
        // 再次验证新密码的内容合法
        this.$refs.passwordModifyForm.validateField("newPassword");
        callback(); // 验证成功，放行
      }
    };

    return {
      // 添加账号表单数据（和表单双向绑定）
      changePwdForm: {
        // id: '', // 账号
        oldPwd: "", // 旧密码
        newPassword: "", // 新密码
        confirmPwd: "" // 确认密码
      },
      // 验证规则
      rules: {
        oldPwd: [
          { required: true, message: "请输入原始密码", trigger: "blur" }
        ],
        newPassword: [{ validator: checkNewPwd, trigger: "blur" }],
        confirmPwd: [{ validator: checkConfirmPwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交
    submitForm() {
      const _this = this;

      changePassword({
        token: localStorage.getItem("token"),
        password: this.changePwdForm.oldPwd,
        newPassword: this.changePwdForm.newPassword
      }).then(result => {
        if (result.success) { // 修改密码成功
          this.$message({
            type: 'success',
            message: result.message,
            duration: 500,
            onClose() {
              _this.$router.push('/login');
            }
          });
        }else{ // 修改密码失败
          this.$message({
            type: 'error',
            message: result.message,
            duration: 500,
          });
        }
      });
    }
  }
};
</script>
<style lang="less">

.password-modify {
  .el-card {
    width: 700px;
    background: transparent;
    border: 1px solid #ccc;
    border:0;
    h3 {
      font-size: 16px;
    }
  }
}
.password-modify .el-card .el-card__header {
  padding: 12px 20px;
  background: transparent;
  border-bottom: 0;
}
.password-modify .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
}
.password-modify .el-card .el-card__header h3{
 color: lightblue;
}
.password-modify .el-card label{
  color: #fff;
}
</style>