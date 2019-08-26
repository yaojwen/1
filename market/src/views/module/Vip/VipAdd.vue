<template>
  <div class="vipaccount-add" style="width:95%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3 style="color: lightblue;">会员用户添加</h3>
      </div>
      <div class="text item">
        <el-form
          :model="VipAccountAddForm"
          :rules="rules"
          ref="VipAccountAddForm"
          label-width="100px"
          size="small"
        >
          <div class="leftandright clearfix">
            <div class="left">
              <!-- 真实姓名 -->
              <el-form-item label="真实姓名" prop="RealName" style="width:350px">
                <el-input v-model="VipAccountAddForm.RealName"></el-input>
              </el-form-item>
              <!-- 会员卡卡号 -->
              <el-form-item label="会员卡卡号" prop="VipCardNum" style="width:350px">
                <el-input v-model="VipAccountAddForm.VipCardNum"></el-input>
              </el-form-item>
              <!-- 用户组 -->
              <el-form-item label="用户组" prop="AccountGroup" style="width:250px">
                <el-select v-model="VipAccountAddForm.AccountGroup" placeholder="普通会员">
                  <el-option label="黄金会员" value="黄金会员"></el-option>
                  <el-option label="白银会员" value="白银会员"></el-option>
                  <el-option label="普通会员" value="普通会员"></el-option>
                </el-select>
              </el-form-item>
              <!-- 身份证号 -->
              <el-form-item label="身份证号" prop="IpNum" style="width:350px">
                <el-input v-model="VipAccountAddForm.IpNum"></el-input>
              </el-form-item>

              <!-- 用户状态 -->
              <el-form-item label="用户状态" prop="Status">
                <el-radio-group v-model="VipAccountAddForm.Status">
                  <el-radio label="启用">启用</el-radio>
                  <el-radio label="禁用">禁用</el-radio>
                </el-radio-group>
              </el-form-item>

              <!-- 手机号码 -->
              <el-form-item label="手机号码" prop="PhoneNum" style="width:350px">
                <el-input v-model="VipAccountAddForm.PhoneNum"></el-input>
              </el-form-item>
            </div>
            <div class="right" id="right">
              <!-- 座机号码 -->
              <el-form-item label="座机号码" prop="TelNum" style="width:350px">
                <el-input v-model="VipAccountAddForm.TelNum"></el-input>
              </el-form-item>

              <!-- 邮箱地址 -->
              <el-form-item label="邮箱地址" prop="EmailAddress" style="width:350px">
                <el-input v-model="VipAccountAddForm.EmailAddress"></el-input>
              </el-form-item>
              <!-- 地区选择 -->
              <el-form-item label="地区选择">
                <el-col :span="4">
                  <el-form-item prop="ProvinceGroup">
                    <el-select
                      v-model="VipAccountAddForm.ProvinceGroup"
                      placeholder="请选择省份"
                      style="width:150px"
                    >
                      <el-option label="四川省" value="四川省"></el-option>
                      <el-option label="云南省" value="云南省"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-form-item prop="CityGroup">
                    <el-select
                      v-model="VipAccountAddForm.CityGroup"
                      placeholder="请选择城市"
                      style="width:150px"
                    >
                      <el-option label="成都" value="成都"></el-option>
                      <el-option label="绵阳" value="绵阳"></el-option>
                      <el-option label="丽江" value="丽江"></el-option>
                      <el-option label="大理" value="大理"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>

              <!-- 详细地址 -->
              <el-form-item label="详细地址" prop="Address" style="width:350px">
                <el-input v-model="VipAccountAddForm.Address"></el-input>
              </el-form-item>

              <!-- 邮政编码 -->
              <el-form-item label="邮政编码" prop="PostalCode" style="width:350px">
                <el-input v-model="VipAccountAddForm.PostalCode"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="vipAdd()">添加用户</el-button>
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>

import { vipAdd } from "@/api/apis.js";

export default {
  data() {
    return {
      VipAccountAddForm: {
        RealName: "", //真实姓名
        VipCardNum: "", //会员卡号
        AccountGroup: "", //用户组
        IpNum: "", //身份证号
        Status: "", //状态
        PhoneNum: "", //手机号码
        TelNum: "", //座机号码
        EmailAddress: "", //邮箱地址
        ProvinceGroup: "", //省份
        CityGroup: "", //城市
        Address: "", //地址
        PostalCode: "" //邮政编码
      },
      rules: {
        RealName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        VipCardNum: [
          { required: true, message: "请输入会员卡卡号", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ],
        AccountGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ],
        IpNum: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        Status: [
          { required: true, message: "请选择用户状态", trigger: "change" }
        ],
        PhoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ],
        TelNum: [{ required: true, message: "请输入座机号", trigger: "blur" }],
        EmailAddress: [
          { required: true, message: "请输入邮箱", trigger: "blur" }
        ],
        ProvinceGroup: [
          { required: true, message: "请选择省份组", trigger: "change" }
        ],
        CityGroup: [
          { required: true, message: "请选择城市组", trigger: "change" }
        ],
        Address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 8, max: 20, message: "长度在 8 到 20 个字符", trigger: "blur" }
        ],
        PostalCode: [
          { required: true, message: "请输入邮政编码", trigger: "blur" },
          { min: 6, max: 7, message: "长度在 6 到 7 个数字", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm() {
      this.$refs.VipAccountAddForm.resetFields();
    },
    vipAdd() {
      // 缓存全局this
      const _this = this;

      vipAdd(this.VipAccountAddForm).then(data => {
        if (data.success) {
          // 添加成功
          // 提示成功,自动跳转到用户列表
          _this.$message({
            message: data.message,
            type: "success",
            duration: 500, // 500ms自动挂壁
            onClose() {
              _this.$router.push("/home/Vip"); // 跳转到用户列表
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
.vipaccount-add {
  .el-card {
    background: transparent;
    padding-bottom: 20px;
    border: 0;
    label{color:#fff;}
    .el-form {
      display: flex;
      flex-direction: row;
     
      input{
        height: 36px;
        
      }
      .el-form-item{
        height: 36px;
      }
      textarea{
        height: 40px;
      }
    }
    .el-card__header {
      padding: 12px 20px;
      background: transparent;
      border: 0;
      h3 {
        font-size: 16px;
      }
    }
  }
}
.vipaccount-add .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
}
.vipaccount-add .leftandright .left {float: left; }
.vipaccount-add .leftandright .right {float:right;width: 600px;padding-left: 30px}
.vipaccount-add .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
}
</style>