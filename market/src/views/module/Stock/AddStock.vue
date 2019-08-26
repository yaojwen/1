<template>
  <div class="addstock">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h3>商品入库</h3>
      </div>
      <!-- 表单内容 -->
      <el-form :model="stock" status-icon :rules="rules" ref="stock" label-width="100px">
        <el-form-item label="商品条码" prop="GoodsBarCode">
          <el-input type="text" v-model="stock.GoodsBarCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="GoodsName">
          <el-input type="text" v-model="stock.GoodsName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="进价" prop="PurchasePrice">
          <el-input v-model="stock.PurchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="GoodsNum">
          <el-input v-model="stock.GoodsNum"></el-input>
        </el-form-item>
        <el-form-item label="所属分类" prop="classify">
          <el-select
            v-model="stock.classify"
            placeholder="== 选择分类 =="
            size="small"
          >
            <el-option label="烟酒类" value="烟酒类"></el-option>
            <el-option label="零食类" value="零食类"></el-option>
            <el-option label="饮料类" value="饮料类"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="stockAdd()">保存</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>

import { stockAdd } from "@/api/apis.js";

export default {
  data() {
    return {
      stock: {
        GoodsBarCode: "",
        GoodsName: "",
        classify: "",
        PurchasePrice: "",
        GoodsNum: "",
      },
            rules: {
        GoodsBarCode: [
          { required: true, message: "请输入商品条形码", trigger: "blur" }
        ],
        GoodsName: [
          { required: true, message: "请输入商品名称", trigger: "change" }
        ],
        classify: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ],
        PurchasePrice: [
          { required: true, message: "请输入商品进价(数字)", trigger: "blur" }
        ],
        GoodsNum: [
          { required: true, message: "请输入入库数量(数字)", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
     stockAdd() {
      // 缓存全局this
      const _this = this;

      stockAdd(this.stock).then(data => {
        if (data.success) {
          // 添加成功
          // 提示成功,自动跳转到入库列表
          _this.$message({
            message: data.message,
            type: "success",
            duration: 500, // 500ms自动挂壁
            onClose() {
              _this.$router.push("/home/InventoryManage"); // 跳转到入库列表
            }
          })
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
.addstock {
  width: 700px;
}
.addstock .el-card {
  background: transparent;
  border: 0;
}
.addstock .el-card .el-card__header {
  border-bottom: 0;
}
.addstock .el-card .el-card__header h3 {
  color: lightblue;
  font-size: 16px;
}
.addstock .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
}
.addstock input {
  width: 400px;
}
.addstock .el-card label {
  color: #fff;
}
</style>