<template>
  <div class="collect-container">
    <div class="collect-container content" v-if="collectList.length > 0">
      <el-table
          :data="collectList"
          style="width: 100%">
        <el-table-column type="expand" >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.productName }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.productId }}</span>
              </el-form-item>
              <el-form-item label="原价">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品剩余">
                <span>{{ props.row.totalStocks }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label="商品图片"
            width="200">
          <template slot-scope="scope">
            <img :src="scope.row.productPicture" style="width: 140px;"/>
          </template>
        </el-table-column>
        <el-table-column
            label="商品名称"
            width="150">
          <template slot-scope="scope">
            <router-link :to="`/details/productId=${scope.row.productId}`" style="color:#606266">{{scope.row.productName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
            label="描述"
            prop="productTitle" width="250"/>
        <el-table-column
            label="当前价格"
            width="150">
          <template slot-scope="scope">
            ￥{{scope.row.sellingPrice}}元
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="150">
          <template slot-scope="scope">
            <el-button-group>
              <el-button  size="mini" style="margin-right: 5px" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              <el-button  size="mini" >购买</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            background
            layout="total,prev, pager, next,jumper"
            :page-size="searchObj.pageSize"
            :current-page.sync="searchObj.currentPage"
            :total="total"
            @current-change="handleCurrentChange">
        </el-pagination>
      </div>

    </div>
    <div v-else class="collect-empty" >
      <div class="empty"/>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
import sideBar from "@/Layout/components/sideBar";

const defaultSearchObj = {
  pageSize:5,
  currentPage:1
}
export default {
  mounted() {
    this.$store.dispatch('getLike',this.searchObj)
        .then(res=>{
          this.total = res.data.total
        })
  },
  components:{
    sideBar,
  },
  data(){
    return{
      total:null,
      searchObj:Object.assign({},defaultSearchObj)
    }
  },
  computed: {
    ...mapState({
      collectList: state => state.collect.list || [],
    })
  },
  methods:{
    handleDelete(row){
      this.$api.reqDeleteCollect(row.productId)
          .then(res=>{
            if (res.code === 200) {
              this.notifySucceed('删除成功！');
              this.$store.dispatch('getLike',this.searchObj)
            }else {
              this.notifyError('删除失败！')
            }
          })
    },
    handleSizeChange(){
      this.$store.dispatch('getLike',this.searchObj)
    },
    handleCurrentChange(){
      this.$store.dispatch('getLike',this.searchObj)
    }
  }
};
</script>

<style>
.collect-container .demo-table-expand {
  font-size: 0;
}
.collect-container .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.collect-container .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<style scoped>
.collect-container{
  float: right;
  background-color: #F5F5F5;
}

.collect-container .content .pagination{
  margin-top: 10px;
  text-align: center;
}

.content {
  width: 970px;
  margin: 10px;
}
.content .goods-list {
  margin-left: -40px;
  overflow: hidden;
}

/* 收藏列表为空的时候显示的内容CSS */
.collect-empty {
  position: absolute;
  left: 230px;
  top:200px;
  width: 970px;
  margin: 0 auto;
}
.collect-empty .empty {
  height: 600px;
  background: url(../../assets/imgs/暂无收藏.png) no-repeat center;
  background-size: 500px;
  color: #b0b0b0;
  overflow: hidden;
}

/* 收藏列表为空的时候显示的内容CSS END */
</style>
