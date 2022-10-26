<template>
  <div class="test-container">
    我是测试页
    <ul>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
      <li>11111</li>
    </ul>
  </div>
</template>

<script>


export default {
  name: "index",

  mounted() {
    console.log(this.$route.meta)
  }
}
</script>

<style scoped>
.test-container{
  float: right;
}
</style>
