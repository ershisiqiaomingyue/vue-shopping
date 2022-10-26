<template>
  <div class="shoppingCart-container">
    <!-- 购物车主要内容区 -->
    <div v-if="shoppingCartList.length>0" class="content">
      <ul>
        <!-- 购物车表头 -->
        <li class="header">
          <div class="pro-check">
            <el-checkbox
                v-model="isAllCheck"
                @change="updateAllChecked">
              全选
            </el-checkbox>
          </div>
          <div class="pro-img"></div>
          <div class="pro-name">商品名称</div>
          <div class="pro-price">单价</div>
          <div class="pro-num">数量</div>
          <div class="pro-total">小计</div>
          <div class="pro-action">操作</div>
        </li>
        <!-- 购物车表头END -->

        <!-- 购物车列表 -->
        <li v-for="(item,index) in shoppingCartList" :key="index" class="product-list">
          <div class="pro-check">
            <el-checkbox
                :value="item.isChecked"
                @change="updateChecked(item,$event,index)"/>
          </div>
          <div class="pro-img">
            <router-link :to="{ path: '/details/productid', query: {productid:item.productId} }">
              <img :src="item.productPicture" alt/>
            </router-link>
          </div>
          <div class="pro-name">
            <router-link
                :to="{ path: '/details/productid', query: {productid:item.productId} }">
              {{ item.productName }}
            </router-link>
          </div>
          <div class="pro-price">￥{{ item.sellingPrice }}元</div>
          <div class="pro-num">
            <el-input-number
                :max="item.totalStocks"
                :min="1"
                :value="item.productNum"
                size="small"
                @change="handleChange($event,item.productId)"
            ></el-input-number>
          </div>

          <div class="pro-total pro-total-in">{{ item.sellingPrice * item.productNum }}元</div>
          <div class="pro-action">
            <el-button size="mini"  plain @click="deleteItem($event,item.id,item.productId)">删除</el-button>
          </div>
        </li>
        <!-- 购物车列表END -->
      </ul>

      <div style="height:20px;background-color: #f5f5f5"></div>
      <!-- 购物车底部导航条 -->
      <div class="cart-bar">
        <div class="cart-bar-left">
          <span>
            <router-link to="/goods">继续购物</router-link>
          </span>
          <span class="sep">|</span>
          <span class="cart-total">
            共
            <span class="cart-total-num">{{ getNum }}</span> 件商品，已选择
            <span class="cart-total-num">{{ getCheckNum }}</span> 件
          </span>
        </div>
        <div class="cart-bar-right">
          <span>
            <span class="total-price-title">合计：</span>
            <span class="total-price">{{ totalPrice }}元</span>
          </span>
          <router-link :to="getCheckNum > 0 ? '/confirmOrder' : ''">
            <div :class="getCheckNum > 0 ? 'btn-primary' : 'btn-primary-disabled'">去结算</div>
          </router-link>
        </div>
      </div>
      <!-- 购物车底部导航条END -->
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

    <!-- 购物车主要内容区END -->

    <!-- 购物车为空的时候显示的内容 -->
    <div v-else class="cart-empty">
      <div class="empty">
      </div>
    </div>
    <!-- 购物车为空的时候显示的内容END -->
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import sideBar from "@/Layout/components/sideBar";

let defaultSearchObj = {
  currentPage:1,
  pageSize:6
}

export default {
  data(){
    return{
      total:null,
      searchObj:Object.assign({},defaultSearchObj)
    }
  },
  mounted() {
    this.$bus.$on('getData', () => {
      this.getData(this.searchObj)
    })
    //this.getData(this.searchObj)
  },
  components: {
    sideBar
  },
  methods: {
    ...mapActions(['allChecked']),

    //获取数据
    async getData(val) {
      await this.$store.dispatch('getShoppingCartList',val)
          .then(res=>{
            this.total = res.data.total
          })
    },
    // 修改商品数量的时候调用该函数
    async handleChange(currentValue, productId) {
      // 向后端发起更新购物车的数据库信息请求
      await this.$store.dispatch('updateNum', {
        productId: productId,
        productNum: currentValue,
      }).then(() => {
        this.getData()
        this.notifySucceed("更新成功!")
      })
    },

    // 向后端发起删除购物车的数据库信息请求
    async deleteItem(a, b, productId) {
      this.$confirm('将从购物车中删除该商品，是否确定？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$store.dispatch('deleteShoppingCart', productId)
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg)
                this.getData();
              } else {
                this.notifyError(res.msg)
              }
            })
      })

    },
    //修改某个产品的勾选状态
    async updateChecked(item, event ,index) {
      let obj = {
        productId: item.productId,
        isChecked: event,
        index
      }
      try {
        //当前商品是否被勾选的属性值
        await this.$store.dispatch('updateCheckedById', obj).then(res => {
          this.notifySucceed(res.msg)
          this.getData()
        })
      } catch (e) {
        this.notifyError(e)
      }
    },

    //更新全选
    async updateAllChecked(event) {
      try {
        await this.$api.reqUpdateAllCheck({
          isChecked: event
        }).then(res => {
          if (res.code === 200) {
            this.notifySucceed(res.msg)
            this.getData();
          }
        })
      } catch (e) {
        this.notifyError(e)
      }
    },

    handleSizeChange(){
      this.getData(this.searchObj)
    },
    handleCurrentChange(){
      this.getData(this.searchObj)
    }
  },

  computed: {
    ...mapGetters(['getNum', 'totalPrice', 'getCheckNum', 'getIsAllCheck']),

    shoppingCartList() {
      return this.$store.state.shoppingCart.shoppingCartList || []
    },

    isAllCheck: {
      get() {
        return this.$store.getters.getIsAllCheck
      },
      set(val) {
        this.allChecked(val);
      }
    }
  }
}
</script>

<style>

.shoppingCart-container {
  float: right;
  background-color: #F5F5F5;
  padding: 10px 10px 0;
}

.shoppingCart-container .pagination{
  margin-top: 10px;
  text-align: center;
}

.shoppingCart-container .content>ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}

/* 购物车表头及CSS */
.shoppingCart-container .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}

.shoppingCart-container .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}

.shoppingCart-container .content ul .pro-check {
  float: left;
  height: 85px;
  width: 50px;
}

.shoppingCart-container .content ul .pro-check .el-checkbox {
  font-size: 16px;
  margin-left: 24px;
}

.shoppingCart-container .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
}

.shoppingCart-container .content ul .pro-img img {
  height: 80px;
  width: 80px;
}

.shoppingCart-container .content ul .pro-name {
  float: left;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.shoppingCart-container .content ul .pro-name a {
  color: #424242;
}

.shoppingCart-container .content ul .pro-name a:hover {
  color: #ff6700;
}

.shoppingCart-container .content ul .pro-price {
  float: left;
  width: 100px;
  padding-right: 18px;
  text-align: center;
}

.shoppingCart-container .content ul .pro-num {
  float: left;
  width: 150px;
  text-align: center;
}

.shoppingCart-container .content ul .pro-total {
  float: left;
  width: 150px;

  text-align: center;
}

.shoppingCart-container .content ul .pro-total-in {
  color: #ff6700;
}

.shoppingCart-container .content ul .pro-action {
  float: left;
  width: 80px;
  text-align: center;
}

.shoppingCart-container .content ul .pro-action i:hover {
  color: #ff6700;
}

/* 购物车表头及CSS END */

/* 购物车底部导航条CSS */
.shoppingCart-container .cart-bar {
  width: 970px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}

.shoppingCart-container .cart-bar .cart-bar-left {
  float: left;
}

.shoppingCart-container .cart-bar .cart-bar-left a {
  line-height: 50px;
  margin-left: 32px;
  color: #757575;
}

.shoppingCart-container.cart-bar .cart-bar-left a:hover {
  color: #ff6700;
}

.shoppingCart-container .cart-bar .cart-bar-left .sep {
  color: #eee;
  margin: 0 20px;
}

.shoppingCart-container .cart-bar .cart-bar-left .cart-total {
  color: #757575;
}

.shoppingCart-container .cart-bar .cart-bar-left .cart-total-num {
  color: #ff6700;
}

.shoppingCart-container .cart-bar .cart-bar-right {
  float: right;
}

.shoppingCart-container .cart-bar .cart-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}

.shoppingCart-container .cart-bar .cart-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}

.shoppingCart-container .cart-bar .cart-bar-right .btn-primary {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #ff6700;
  color: #fff;
}

.shoppingCart-container .cart-bar .cart-bar-right .btn-primary-disabled {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #e0e0e0;
  color: #b0b0b0;
}

.shoppingCart-container .cart-bar .cart-bar-right .btn-primary:hover {
  background-color: #f25807;
}


/* 购物车为空的时候显示的内容CSS */
.shoppingCart-container .cart-empty {
  position: absolute;
  left: 230px;
  top:200px;
  width: 970px;
  margin: 0 auto;
}

.shoppingCart-container .cart-empty .empty {
  height: 600px;
  background: url(../../assets/imgs/购物车空空如也.png) no-repeat center;
  background-size: 500px;
  color: #b0b0b0;
  overflow: hidden;
}

/* 购物车为空的时候显示的内容CSS END */
</style>
