<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="uploadUrl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-success="handleSuccess"
      :file-list="picture"
      :before-upload="handleBefore"
      list-type="picture-card"
      :limit="max">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/webp文件，且不超过1M!</div>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%"  :src="dialogImageUrl" alt="浏览图片" />
      </el-dialog>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'singleUpload',
  props: ['img'],
  data() {
    return {
      disabled:false,
      dialogVisible: false,
      dialogImageUrl:'',
      //上传图片的路径
      uploadUrl: 'http://localhost/api/oss/file/uploadFile',
      //用于接受上传的回调
      imgUrl: '',
      max:2
    }
  },
  computed:{
    picture() {
      let picture = []
      if (this.img === undefined) {
        return []
      }
      if (this.img !== null) {
        picture.push({url:this.img});
      }
      return picture
    }
  },
  methods: {
    //点击已上传文件时的钩子
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //文件移除时的钩子
    handleRemove(file,fileList){
      this.$message.success('删除照片成功！')
    },
    //文件上传前的校验
    handleBefore(file){
      const isImg = file.type.indexOf('image') >= 0;
      const size = file.size / 1024 / 1024 < 1;
      if (!isImg) {
        this.$message.error('上传的图片格式不是图片，请重新上传！')
      }
      if (!size) {
        this.$message.error('上传图片的大小超过限制，请重新上传！')
      }
      return isImg && size;
    },
    //文件上传成功时的钩子
    handleSuccess(res,file,fileList){
      this.picture.pop()
      this.picture.push({url:res.data})
      this.$message.success('上传成功！')
      //将url传回父组件
      this.$bus.$emit('updateImg',res.data)
    },
    //文件上传失败时的钩子
    handleError(){
      this.$message.error('上传图片失败！')
    },
  }
}
</script>
<style>

</style>


