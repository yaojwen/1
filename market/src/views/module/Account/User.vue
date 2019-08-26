<template>
  <div class="user" style="width:95%;">
    <el-card class="box-card" style='height:600px'>
      <div slot="header" class="clearfix">
        <h3>用户管理</h3>
      </div>

      <div class="text item">
        <!-- 搜索表单 -->
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="关键字">
            <el-input v-model="searchForm.searchKey" placeholder="关键字"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model.number="searchForm.role" placeholder="权限">
              <el-option label="---请选择---" value></el-option>
              <el-option label="超级管理员" :value="1"></el-option>
              <el-option label="普通员工" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSearch">查询</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table
          ref="tableData"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 95%;background:transparent;height: 350px;overflow-y: scroll;"
          @selection-change="SelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="role" label="用户组" :formatter="renderRole"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="inputTime" label="日期" :formatter="renderInputTime"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">
                <i class="el-icon-edit"></i>编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

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
      </div>
    </el-card>

    <!-- 修改弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <!-- 用户名 -->
        <el-form-item label="用户名">
          <el-input v-model="editForm.name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item label="角色">
          <el-select v-model.number="editForm.role" placeholder="请选择角色">
            <el-option label="超级管理员" :value="1"></el-option>
            <el-option label="普通员工" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 直接解构api接口对象中的需要的api方法
import {
  listUser,
  accountDelete,
  updateUser,
  getAccountDataByPage,
  batchDelete
} from "@/api/apis.js";

import moment from "moment";

export default {
  data() {
    return {
      tableData: [
        {
          name: "张洋",
          email: "zy@qq.com",
          role: 1,
          inputTime: "2019-08-15"
        },
        {
          name: "李秋帅",
          email: "lqs@qq.com",
          role: 2,
          inputTime: "2019-08-14"
        },
        {
          name: "王烽",
          email: "wf@qq.com",
          role: 2,
          inputTime: "2019-08-13"
        }
      ],

      // dialog对话框的默认显示状态
      dialogFormVisible: false,

      // 修改的弹出框属性
      editForm: {
        id: "",
        name: "",
        email: "",
        role: ""
      },

      // 搜索框属性
      searchForm: {
        searchKey: "",
        role: ""
      },

      editId: "",
      IdArr: [], //选中数据的id

      // 分页
      InventorytableData: [],
      currentPage: 1, //当前页
      pageSize: 5, //每页数据条数
      total: 10, //总数据条数
      visible: false
    };
  },
  // 方法
  methods: {
    // 列格式化函数
    // row    : 行数据对象
    // column : elementUI列组件对象
    // cellValue : 当前列的值
    // index : 索引
    renderRole(row, column, cellValue) {
      // 判断role的值为1,即管理员
      if (cellValue === 1) {
        return "超级管理员";
      } else {
        // 判断role的值为2,即管理员
        return "普通员工";
      }
    },

    //删除
    handleDelete(id) {
      //提示用户 是否进行此操作
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //成功
          accountDelete(id).then(res => {
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
              // this.listUser();
              this.ajaxgetList(this.currentPage);
            } else if (code === 1) {
              //失败
              this.$message.error(reason);
            }
          });
        })
        .catch(() => {});
    },

    // 渲染录入时间(解决时间戳的渲染)
    renderInputTime(r, col, val) {
      // moment函数参数需要处理的时间对象
      // format时间处理格式
      return moment(val).format("Y-MM-DD");
    },

    //渲染页面
    listUser() {
      // 发送请求加载数据
      listUser().then(data => {
        // 把结果更新到数据对象,由双向绑定完成页面更新
        this.tableData = data;
      });
    },

    //修改信息、再渲染
    updateUser() {
      const _this = this;

      updateUser(this.editForm).then(result => {
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
              _this.listUser();
            }
          });
        } else {
          this.$message({
            // 删除失败
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

    //查询用户
    doSearch() {
      const _this = this;
      listUser(this.searchForm).then(data => {
        // _this.ajaxgetList(1);
        _this.tableData = data;
      });
    },

    // 分页
    ajaxgetList() {
      getAccountDataByPage(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },

    handleSizeChange(pageSize) {
      //每页条数
      this.pageSize = pageSize;
      //调用显示当前页数据函数
      this.ajaxgetList();
    },
    handleCurrentChange(NewcurrentPage) {
      //当前页
      this.currentPage = NewcurrentPage;
      //调用显示当前页数据函数
      this.ajaxgetList();
    },

    SelectionChange(data) {
      //当选择项发生变化时会触发该事件 -- 批量删除
      this.IdArr = data.map(v => v.id); //取出所有数据的id们
    },

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
          batchDelete({ IdArr: _this.IdArr })
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

    deselect(){//取消选择
      this.$refs.tableData.clearSelection();
    },
  },

  //页面加载时候调用一次渲染
  mounted() {
    this.ajaxgetList(this.currentPage);
  }
};
</script>
<style lang="less">
.user {
  .el-card {
    background: transparent;
    padding-bottom: 20px;
    border: 0;
    h3 {
      font-size: 16px;
    }
    label {
      color: #fff;
    }
  }
}
.user .el-card .el-card__header {
  padding: 12px 20px;
  background: transparent;
  border-bottom: 0;
}
.user .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
  border: 0;
}
.user .el-card .el-card__header h3 {
  color: lightblue;
}
.user .el-card td,
.user .el-card tr,
.user .el-card th {
  background: transparent;
  border: 0;
  color: #fff;
}
.user .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #212e3e !important;
}
.user .el-table::before {
  height: 0;
}
.user .el-pagination button:disabled,
.user .el-pagination .btn-next,
.el-pagination .btn-prev,
.user .el-pager li {
  background: transparent;
}
.user .el-pagination .el-pagination__total,
.user .el-pagination__jump {
  color: #fff;
}
</style>