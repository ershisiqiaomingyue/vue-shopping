<template>
    <!-- header -->
    <div>
    </div>
    <!-- footer -->
</template>
<script>
export default {
  layout: "empty",
  data() {
    return {
    }
  },
  mounted() {
    let token = this.$route.query.token
    let nickName = this.$route.query.nickName
    // 调用父vue方法
    window.parent['loginCallback'](nickName, token)
  }
}
</script>
