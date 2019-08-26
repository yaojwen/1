<template>
  <div class="vipaccount-manage" style="width:98%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3>会员管理</h3>
      </div>
      <div class="text item">
        <!-- 表单 -->
        <el-form :inline="true" :model="searchForm">
          <el-form-item>
            <el-select style="width:150px"
              v-model="searchForm.AccountGroup"
              placeholder="== 选择分类 =="
              size="small"
            >
              <el-option label="全部分类" value=""></el-option>
              <el-option label="黄金会员" value="黄金会员"></el-option>
              <el-option label="白银会员" value="白银会员"></el-option>
              <el-option label="普通会员" value="普通会员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-input
              style="width:200px"
              v-model="searchForm.searchKey"
              placeholder="(会员名称，卡号)"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="doSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table
          ref="VipaccountManageData"
          :data="VipaccountManageData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="VipCardNum" label="会员卡卡号"></el-table-column>

          <el-table-column prop="RealName" label="会员姓名"></el-table-column>

          <el-table-column prop="AccountGroup" label="会员等级"></el-table-column>

          <!-- <el-table-column prop="Status" label="会员状态"></el-table-column> -->

          <el-table-column prop="PhoneNum" label="手机号码"></el-table-column>

          <!-- <el-table-column prop="TelNum" label="座机号码"></el-table-column> -->

          <el-table-column prop="EmailAddress" label="邮箱地址"></el-table-column>
          <el-table-column label="操作" width='180px'>
            <template slot-scope="scope">
              <el-button size="mini"  @click="handleEdit(scope.row)">
                <i class="el-icon-edit"></i>编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top:20px"
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
          <el-button type="primary" size="mini" @click="deselect">取消选中</el-button>
        </div>
        <!-- 模态框 -->
        <el-dialog title="编辑会员信息" :visible.sync="dialogFormVisible" width="450px">
          <el-form :model="editForm" :rules="rules" ref="editForm">
            <el-form-item label="会员卡卡号" label-width="120px" prop="VipCardNum">
              <el-input v-model="editForm.VipCardNum" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>

            <el-form-item label="会员名称" label-width="120px" prop="RealName">
              <el-input v-model="editForm.RealName" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>

            <el-form-item label="会员等级" label-width="120px" prop="AccountGroup">
              <el-select v-model="editForm.AccountGroup" placeholder="请选择会员等级">
                <el-option label="黄金会员" value="黄金会员"></el-option>
                <el-option label="白银会员" value="白银会员"></el-option>
                <el-option label="普通会员" value="普通会员"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="手机号码" label-width="120px" prop="PhoneNum">
              <el-input v-model="editForm.PhoneNum" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>

            <el-form-item label="座机号码" label-width="120px" prop="TelNum">
              <el-input v-model="editForm.TelNum" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>

            <el-form-item label="邮箱地址" label-width="120px" prop="EmailAddress">
              <el-input v-model="editForm.EmailAddress" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateVip">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>

import { getVipList,vipDelete,updateVip,getVipDataByPage,batchDeleteVip} from "@/api/apis.js";


export default {
  data() {

    return {
      searchForm: {
        searchKey: "",
        AccountGroup:""
      },
      VipaccountManageData: [],
      currentPage: 1, //当前页
      pageSize: 3, //每页数据条数
      total: 10, //数据总条数
      visible: false,
      editForm: {
        VipCardNum: "",
        RealName: "",
        AccountGroup: "",
        PhoneNum: "",
        TelNum: "",
        EmailAddress: ""
      },
      editId: "",
      rules: {
        VipCardNum: [
          { required: true, message: "请输入会员卡卡号", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ],
        RealName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        AccountGroup: [
          { required: true, message: "请选择会员组", trigger: "change" }
        ],
        Status: [
          { required: true, message: "请选择会员状态", trigger: "change" }
        ],
      },
      dialogFormVisible: false,
      IdArr: []
    };
  },
  methods: {

    //渲染页面
    getVipList(){
      // 发送请求加载数据
      getVipList().then(data => {
      // 把结果更新到数据对象,由双向绑定完成页面更新
      this.VipaccountManageData = data;
      });
    },

    //查询会员
    doSearch(){
      const _this= this;
      getVipList(this.searchForm)
            .then(data =>{
                _this.VipaccountManageData = data;
            })
    },

    //删除
    handleDelete(id) {
      //提示会员 是否进行此操作
      this.$confirm("此操作将永久删除该会员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //成功
          vipDelete( id )
            .then(res => {
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
                this.getVipList();
              } 
              else if (code === 1) {
                //失败
                this.$message.error(reason);
              }
            })
        })
        .catch(() => {
        });
    },

    //修改信息、再渲染
    updateVip() {
      const _this = this;

      updateVip(this.editForm).then(result => {
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
              _this.getVipList();
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

    // 分页
    ajaxgetListVip() {
      getVipDataByPage(this.currentPage, this.pageSize).then(res => {
        this.VipaccountManageData = res.data.data;
        this.total = res.data.total;
      });
    },

    handleSizeChange(pageSize) {
      //每页条数
      this.pageSize = pageSize;
      //调用显示当前页数据函数
      this.ajaxgetListVip();
    },
    handleCurrentChange(NewcurrentPage) {
      //当前页
      this.currentPage = NewcurrentPage;
      //调用显示当前页数据函数
      this.ajaxgetListVip();
    },

    SelectionChange(data) {
      //当选择项发生变化时会触发该事件 -- 批量删除
      this.IdArr = data.map(v => v.id); //取出所有数据的id们
    },

    batchdel() {
      //批量删除
      //如果会员没有选中 -- 就不用发送请求
      const _this=this;
      if (!_this.IdArr.length) {
        _this.$message.error("请选中需要批量删除的数据！！！");
        return;
      }
      //优化会员体验 -- 警示框
      _this.$confirm("此操作将批量删除选中数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送ajax
          batchDeleteVip({ IdArr: _this.IdArr })
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
      this.$refs.VipaccountManageData.clearSelection();
    },
  },
  //页面加载时候调用一次渲染
  mounted() {
    this.ajaxgetListVip(this.currentPage);
  }
};
</script>

<style lang="less">
.vipaccount-manage {
  .el-card {
    background: transparent;
    padding-bottom: 20px;
    border: 0;
    h3 {
    font-size: 16px;
    }
    label{color:#fff}
  }
}
.vipaccount-manage .el-card .el-card__header {
  padding: 12px 20px;
  background: transparent;
  border-bottom: 0;
}
.vipaccount-manage .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
  border:0;

}
.vipaccount-manage .el-card .el-card__header h3 {
  color: lightblue;
}
.vipaccount-manage .el-table .el-table__row,.vipaccount-manage .el-table td,.vipaccount-manage .el-table th, .el-table tr {
  background: transparent !important;
  border:0;
  color: #fff;
}
.vipaccount-manage .el-table td{width: 80px !important;}
.vipaccount-manage .el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #212e3e !important;
}
.vipaccount-manage .el-table::before{
  height: 0;
}
.vipaccount-manage table{width: 1000px;background-color:transparent;}
.vipaccount-manage .el-table div.cell{text-align: center;}
.vipaccount-manage .el-pagination__total{color:#fff;}

.vipaccount-manage .el-pagination button:disabled,.vipaccount-manage .el-pagination .btn-next, .el-pagination .btn-prev,.vipaccount-manage .el-pager li,.vipaccount-manage .el-table{background:transparent;}
.vipaccount-manage .el-form-item__content{color:#fff}
.vipaccount-manage .el-dialog label{color:#666}
</style>