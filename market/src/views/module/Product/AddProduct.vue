<template>
  <div class="addproduct" style="width:90%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3 style="color: lightblue;">商品添加</h3>
      </div>
      <div class="text item">
        <el-form
          :model="productAddTable"
          status-icon
          :rules="rules"
          ref="productAddTable"
          label-width="100px"
          style="width:100%"
        >
          <div class="left">
            <el-form-item label="所属分类" prop="category">
              <el-select
                v-model="productAddTable.category"
                placeholder="== 选择分类 =="
                size="small"
              >
                <el-option label="烟酒类" value="烟酒类"></el-option>
                <el-option label="零食类" value="零食类"></el-option>
                <el-option label="饮料类" value="饮料类"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品条形码" prop="barCode">
              <el-input
                type="text"
                v-model="productAddTable.barCode"
                style="width:200px;margin-right:20px"
                size="small"
                readonly="readonly"
              ></el-input>
              <el-button size="small" type="success" @click="SetBarCode(100000000,999999999)">生成条形码</el-button>
            </el-form-item>

            <el-form-item label="商品名称" prop="name">
              <el-input
                type="text"
                v-model="productAddTable.name"
                style="width:240px"
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item label="商品进价" prop="stockPrice">
              <el-input
                type="text"
                v-model="productAddTable.stockPrice"
                style="width:180px"
                size="small"
                @blur="countPrice"
              ></el-input>
              <span style="margin-left:10px">元</span>
            </el-form-item>

            <el-form-item label="商品售价" prop="salePrice">
              <el-input
                type="text"
                v-model="productAddTable.salePrice"
                style="width:180px"
                size="small"
              ></el-input>
              <span style="margin-left:10px">元</span>
            </el-form-item>

            <el-form-item label="市场价" prop="marketPrice">
              <el-input
                type="text"
                v-model="productAddTable.marketPrice"
                style="width:180px"
                size="small"
              ></el-input>
              <span style="margin-left:10px">元</span>
              <!-- <p>默认市场价为售价的1.2倍</p> -->
            </el-form-item>
          </div>
          <div class="right">
            <el-form-item label="入库数量" prop="stockCount">
              <el-input
                type="text"
                v-model="productAddTable.stockCount"
                style="width:180px"
                size="small"
              ></el-input>
             <!--  <p>计重商品单位为千克</p> -->
            </el-form-item>

            <el-form-item label="商品重量" prop="commodityWeight">
              <el-input
                type="text"
                v-model="productAddTable.commodityWeight"
                style="width:180px"
                size="small"
                placeholder="单位：克"
              ></el-input>
            </el-form-item>

            <el-form-item label="商品单位" prop="commodityUnit">
              <el-input
                type="text"
                v-model="productAddTable.commodityUnit"
                style="width:180px"
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item label="会员优惠">
              <el-radio v-model="productAddTable.vipDiscount" label="享受" value='1'>享受</el-radio>
              <el-radio v-model="productAddTable.vipDiscount" label="不享受" value='2'>不享受</el-radio>
            </el-form-item>

            <el-form-item label="是否促销">
              <el-radio v-model="productAddTable.promotion" label="促销" value='1'>促销</el-radio>
              <el-radio v-model="productAddTable.promotion" label="不促销" value='2'>不促销</el-radio>
            </el-form-item>

            <el-form-item label="活动形式" prop="goodsDesc">
              <el-input type="textarea" v-model="productAddTable.goodsDesc"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="productAdd()">添加</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>

import { productAdd } from "@/api/apis.js";
export default {
  data() {
    return {
      productAddTable: {
        category: "", //分类
        barCode: "", //商品条形码
        name: "", //商品名称
        salePrice: "", //商品售价
        marketPrice: "", //市场价
        stockPrice: "", //商品进价
        stockCount: "", //入库数量
        commodityWeight: "", //商品重量
        commodityUnit: "", //商品单位
        vipDiscount: "", //会员优惠
        promotion: "", //是否促销
        goodsDesc: "" //商品简介
      },
      rules: {
        category: [
          { required: true, message: "请选择商品所属分类", trigger: "change" }
        ],
        barCode: [
          { required: true, message: "请输入商品条形码", trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        salePrice: [
          { required: true, message: "请输入商品售价(数字)", trigger: "blur" }
        ],
        marketPrice: [
          { required: true, message: "请输入商品市场价(数字)", trigger: "blur" }
        ],
        stockPrice: [
          { required: true, message: "请输入商品进价(数字)", trigger: "blur" }
        ],
        stockCount: [
          { required: true, message: "请输入商品数量(数字)", trigger: "blur" }
        ],
        commodityWeight: [
          { required: true, message: "请输入商品重量(数字)", trigger: "blur" }
        ],
        commodityUnit: [
          { required: true, message: "请输入商品单位", trigger: "blur" }
        ],
        goodsDesc: [
          { required: true, message: "请输入商品简介", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
     productAdd() {
      // 缓存全局this
      const _this = this;

      productAdd(this.productAddTable).then(data => {
        if (data.success) {
          // 添加成功
          // 提示成功,自动跳转到用户列表
          _this.$message({
            message: data.message,
            type: "success",
            duration: 500, // 500ms自动挂壁
            onClose() {
              _this.$router.push("/home/product"); // 跳转到用户列表
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

    SetBarCode(min, max) {
      //生成商品条形码
      let ranNum = Math.floor(Math.random() * (max - min + 1) + min);
      this.productAddTable.barCode = ranNum;
    },
    countPrice() {
      //计算价格
      this.productAddTable.salePrice = parseFloat(
        (this.productAddTable.stockPrice * 1.5).toFixed(2)
      );
      this.productAddTable.marketPrice = parseFloat(
        (this.productAddTable.stockPrice * 2).toFixed(2)
      );
    }
  }
};
</script>

<style lang="less" >
.addproduct {
  .el-card {
    background: transparent;
    padding-bottom: 20px;
    border: 0;
    label{color:#fff;}
    span{color:#fff;}
    .el-form {
      display: flex;
      flex-direction: row;
      .left {
        width: 48%;
      }
      .right {
        width: 48%;
      }
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
.addproduct .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
}
</style>