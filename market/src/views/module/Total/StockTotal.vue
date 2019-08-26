<template>
    <div class="stock-total">
         <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>进货统计</h3>
                
            </div>
            <div class="text item">
                <el-form 
                 :inline="true" 
                 :model="StockTotalform" 
                 >
                     <el-form-item label="时间">
                        
                        <el-form-item>
                            <el-date-picker 
                            type="date" 
                            placeholder="选择日期" 
                            v-model="StockTotalform.date1" 
                            style="width: 200px"></el-date-picker>
                        </el-form-item>
                        
                        <el-form-item>&emsp;&emsp;</el-form-item>

                         <el-form-item>
                            <el-date-picker 
                            type="date" 
                            placeholder="选择日期" 
                            v-model="StockTotalform.date2" 
                            style="width: 200px"></el-date-picker>
                        </el-form-item>&emsp;
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
               </el-form>
               <div id="stockcharts" style="height:400px;"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
              StockTotalform:{
                  date1:"",
                  date2:""
              },
              
            }
        },
        mounted(){
             this.StockTotal();
        },
        methods : {
            onSubmit(){
      
            },
            StockTotal(){//echarts
                 // 基于准备好的dom，初始化echarts实例
                var myChart = this.$echarts.init(document.getElementById('stockcharts'));

                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '进货统计',
                        left:"center"
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        }
        
    }
</script>

<style lang="less">
.stock-total {
    width: 95%;
  .el-card {
    background: transparent;
    padding-bottom: 20px;
    border: 0;
    h3 {
      font-size: 16px;
    }
    label{ color:#fff}
  }
}
.stock-total .el-card .el-card__header {
  padding: 12px 20px;
  background: transparent;
  border-bottom: 0;
}
.stock-total .el-card.is-always-shadow {
  box-shadow: 0 0px 15px 10px rgba(0, 0, 0, 0.1);
}
.stock-total .el-card .el-card__header h3 {
  color: lightblue;
}
</style>