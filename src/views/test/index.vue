<template>
  <div class="test-container">
    <div v-for="(item, index) in questionList" :key="index">
      <div v-if="num === index">
        <h4>{{ index + 1 }}、{{ item.question }}</h4>
        <p class="mar10">答：{{ item.answer }}</p>
        <br />
        <el-radio-group v-model="allRadio[index]" @change="rideoChange">
          <el-radio-button label="0">0分</el-radio-button>
          <el-radio-button label="1">1分</el-radio-button>
          <el-radio-button label="2">2分</el-radio-button>
          <el-radio-button label="3">3分</el-radio-button>
          <el-radio-button label="4">4分</el-radio-button>
        </el-radio-group>
        <br />
        <!-- --------------------- -->
        <el-row>
          <el-col :span="3"
          ><el-button class="mar10" @click="prex" :disabled="preDisabled"
          >上一题</el-button
          ></el-col
          >
          <el-col :span="6"
          ><el-button class="mar10" @click="next" :disabled="nextDisabled"
          >下一题</el-button
          ></el-col
          >
          <el-col :span="12"
          ><el-button type="primary" class="mar10" @click="goSubmit"
          >提交打分任务</el-button
          ></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "index",

  mounted() {
    console.log(this.$route.meta)
  },
  data() {
    return {
      questionList: [
        {
          id: "1",
          name: "one",
          question: "问题1111111?",
          answer: "防弹少年框架的积分换深刻领会是客家话"
        },
        {
          id: "2",
          name: "two",
          question: "问题222222222?",
          answer: "分类开始动画佛丹斯科了解封惹急人都是会计发发多少咯科技和?"
        },
        {
          id: "3",
          name: "three",
          question: "问题333333333?",
          answer: "的数据库和 非打死不回复欧水回复而交话费渡水复渡水附近的时刻?"
        },
        {
          id: "4",
          name: "fore",
          question: "问题4444?",
          answer: "客家话的发生了空间是客家话?"
        }
      ],
      preDisabled: true, //上禁用按钮
      nextDisabled: false, //下禁用按钮
      num: 0, //第几题
      allRadio: [], //每题的选项
      answerList: [], //所有题的答案或分数
    }
  },
  methods: {
    rideoChange(val) {
      console.log(val);
      this.answerList.push(val);
      // console.log(this.allRadio); // ["4", empty, "2"]
      // console.log(this.answerList); // ["4", "2"]
    }
    ,
    next() {
      this.preDisabled = false;
      if (this.num < this.questionList.length - 1) {
        this.num += 1;
      }
    }
    ,
    prex() {
      if (this.num === 0) {
        this.num = 0;
      } else {
        this.num -= 1;
      }
    }
    ,
    goSubmit() {
      this.submitDialog = true;
    }
    ,
  }
  ,
  watch: {
    //第一题和最后一题禁用按钮
    num(now, old) {
      if (now == this.questionList.length - 1) {
        this.nextDisabled = true;
      } else {
        this.nextDisabled = false;
      }
      if (now < 1) {
        this.preDisabled = true;
      }
    }
  }
}

</script>

<style scoped>
.test-container {
  float: right;
  width: 970px;
  height: 200px;
}
</style>
