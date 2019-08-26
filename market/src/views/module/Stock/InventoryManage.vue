<template>
  <div class="inventory-manage" style="width:95%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>库存管理</h3>
      </div>
      <div class="text item">
        <!-- 表单 -->
        <el-form :inline="true" :model="searchForm">
          <el-form-item>
            <el-select
              style="width:150px"
              v-model="searchForm.classify"
              placeholder="== 选择分类 =="
              size="small"
            >
              <el-option label="全部分类" value></el-option>
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="零食类" value="零食类"></el-option>
              <el-option label="饮料类" value="饮料类"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-input
              style="width:200px"
              v-model="searchForm.searchKey"
              placeholder="(商品名称，条形码)"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="doSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
          :data="InventorytableData"
          stripe
          style="width: 100%"
          ref="InventorytableData"
          tooltip-effect="dark"
          
        ><!-- @selection-change="handleSelectionChange" -->
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="GoodsBarCode" label="商品条形码"></el-table-column>
          <el-table-column prop="GoodsName" label="商品名称"></el-table-column>

          <el-table-column prop="classify" label="商品分类"></el-table-column>
          <el-table-column prop="PurchasePrice" label="进价(元)"></el-table-column>
          <el-table-column prop="GoodsNum" label="商品数量"></el-table-column>
          <el-table-column prop="inputTime" label="添加时间" :formatter="renderInputTime"></el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">
                <i class="el-icon-edit"></i>编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDeleteStock(scope.row.id)">
                <i class="el-icon-delete"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top:20px;background:transparent"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>

        <!-- 按钮 -->
        <div style="margin-top:20px">
          <el-button type="danger" size="mini" @click="batchdel">批量删除</el-button>
          <el-button type="primary" size="mini" @click="deselect">取消选择</el-button>
        </div>

        <!-- 修改弹窗 -->
        <el-dialog title="修改" :visible.sync="dialogFormVisible">
          <el-form :model="editForm">
            <!-- 产品名 -->
            <el-form-item label="产品名">
              <el-input v-model="editForm.GoodsName" auto-complete="off"></el-input>
            </el-form-item>
            <!-- 数量 -->
            <el-form-item label="数量">
              <el-input v-model="editForm.GoodsNum" auto-complete="off"></el-input>
            </el-form-item>
            <!-- 市场价 -->
            <el-form-item label="市场价">
              <el-input v-model="editForm.PurchasePrice" auto-complete="off"></el-input>
            </el-form-item>
            <!-- 条形码 -->
            <el-form-item label="条形码">
              <el-input v-model="editForm.GoodsBarCode" auto-complete="off" disabled></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateStock">更 新</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
import { stockList, updateStock, StockDelete,getStockDataByPage,batchDeleteStock } from "@/api/apis.js";
import moment from "moment";

export default {
  data() {
    return {
      searchForm: {
        classify: "",
        searchKey: ""
      },
      // dialog对话框的默认显示状态
      dialogFormVisible: false,
      editId: "",
      IdArr: [], //选中数据的id

      // 分页
      InventorytableData: [],
      currentPage: 1, //当前页
      pageSize: 5, //每页数据条数
      total: 10, //总数据条数
      visible: false,
      editForm: {
        GoodsName: "",
        GoodsNum: "",
        PurchasePrice: "",
        GoodsBarCode: ""
      },

      // dialog对话框的默认显示状态
      dialogFormVisible: false,

    };
  },
  methods: {
    //渲染页面
    stockList() {
      // 发送请求加载数据
      stockList().then(data => {
        // 把结果更新到数据对象,由双向绑定完成页面更新
        this.InventorytableData = data;
      });
    },

    // 渲染时间
    renderInputTime(r, col, val) {
      // moment函数参数需要处理的时间对象
      // format时间处理格式
      return moment(val).format("Y-MM-DD");
    },

    //查询商品
    doSearch() {
      const _this = this;
      stockList(this.searchForm).then(data => {
        _this.InventorytableData = data;
      });
    },

    //删除
    handleDeleteStock(id) {
      //提示用户 是否进行此操作
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //成功
          StockDelete(id).then(res => {
            //接收响应数据
            let { code, reason } = res;
            //判断
            if (code === 0) {
              //成功
              this.$message({
                type: "success",
                message: reason
              });
              //重新刷新页面 -- 再次请求数据
              this.stockList();
            } else if (code === 1) {
              //失败
              this.$message.error(reason);
            }
          });
        })
        .catch(() => {});
    },

    //修改信息、再渲染
    updateStock() {
      const _this = this;

      updateStock(this.editForm).then(result => {
        if (result.success) {
          this.$message({
            // 修改成功
            type: "success",
            message: result.message,
            duration: 500,
            onClose() {
              // 先隐藏对话框
              _this.dialogFormVisible = false;
              // 刷新页面
              _this.stockList();
            }
          });
        } else {
          this.$message({
            // 修改失败
            type: "error",
            message: result.message
          });
        }
      });
    },

    handleEdit(row) {
      // 显示对话框
      this.dialogFormVisible = true;
      // 手动把行数据,更新form对象上即可
      this.editForm = row;
    },

     // 分页
    ajaxgetListStock() {
      getStockDataByPage(this.currentPage, this.pageSize).then(res => {
        this.InventorytableData = res.data.data;
        this.total = res.data.total;
      });
    },

    handleSizeChange(pageSize) {
      //每页条数
      this.pageSize = pageSize;
      //调用显示当前页数据函数
      this.ajaxgetListStock();
    },
    handleCurrentChange(NewcurrentPage) {
      //当前页
      this.currentPage = NewcurrentPage;
      //调用显示当前页数据函数
      this.ajaxgetListStock();
    },

    SelectionChange(data) {
      //当选择项发生变化时会触发该事件 -- 批量删除
      this.IdArr = data.map(v => v.id); //取出所有数据的id们
    },
   
    // 批量删除
    batchdel() {
      //批量删除
      //如果用户没有选中 -- 就不用发送请求
      const _this=this;
      if (!_this.IdArr.length) {
        _this.$message.error("请选中需要批量删除的数据！！！");
        return;
      }
      //优化用户体验 -- 警示框
      _this.$confirm("此操作将批量删除选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送ajax
          batchDeleteStock({ IdArr: _this.IdArr })
            .then(res => {
              //接收响应参数
              let { code, reason } = res;
              //判断
              if (code === 0) {
                //删除成功
                _this.$message({
                  type: "success",
                  message: reason
                });
                //刷新网页数据
                _this.ajaxgetList();
              } else if (code === 1) {
                //删除失败
                _this.$message.error(reason);
              }
            })
            .catch(err => {
              alert(err)
            });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 取消删除
    deselect(){//取消选择
      this.$refs.InventorytableData.clearSelection();
    },   
  },

  mounted() {
    //页面加载渲染一次
  this.ajaxgetListStock(this.currentPage);
  }
};
</script>

<style lang="less">
.inventory-manage {
  .el-card {
    background: transparent;
    padding-bottom: 20px;
    border: 0;
    h3 {
      font-size: 16px;
    }
    label {
      color: rgb(121, 117, 117);
    }
  }
}
.inventory-manage .el-card .el-card__header {
  padding: 12px 20px;
  background: transparent;
  border-bottom: 0;
}
.inventory-manage .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
  border: 0;
}
.inventory-manage .el-card .el-card__header h3 {
  color: lightblue;
}
.inventory-manage .el-table .el-table__row,
.inventory-manage .el-table td,
.inventory-manage .el-table th,
.el-table tr {
  background: transparent !important;
  border: 0;
  color: #fff;
}
.inventory-manage .el-table td {
  width: 80px !important;
}
.inventory-manage .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #212e3e !important;
}
.inventory-manage .el-table::before {
  height: 0;
}
.inventory-manage table {
  width: 1000px;
  background-color: transparent;
}
.inventory-manage .el-table div.cell {
  text-align: center;
}
.inventory-manage .el-pagination__total {
  color: #fff;
}

.inventory-manage .el-pagination button:disabled,
.inventory-manage .el-pagination .btn-next,
.el-pagination .btn-prev,
.inventory-manage .el-pager li {
  background: transparent;
}
.inventory-manage .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
</style>