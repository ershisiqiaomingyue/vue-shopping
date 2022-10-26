<template>
  <div>
    <el-upload
      ref="upload"
      action="string"
      :file-list="fileList"
      :limit="maxCount"
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :http-request="handleUpload"
      list-type="picture-card"
      multiple
      :auto-upload="false"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
      <img :src="dialogImageUrl" alt="" width="100%">
    </el-dialog>

    <el-button  plain @click="submitUpload" style="margin-top: 10px">确认上传</el-button>
  </div>
</template>
<script>
export default {
  name: 'multiUpload',
  props: {
    imgList:Array
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: null,
      uploadUrl: 'http://localhost/api/oss/file/uploadFiles',
      maxCount:6,
      uploadList:[]
    }
  },
  computed: {
    fileList() {
      let fileList = []
      if (this.imgList !== null ) {
        for (let i = 0; i < this.imgList.length; i++) {
          fileList.push({ url: this.imgList[i] })
        }
      }
      return fileList
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.uploadList = fileList
    },
    handleChange(file,fileList){
      this.uploadList = fileList
    },
    handlePreview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    handleExceed(files, fileList) {
      this.$message({
        message: '最多只能上传' + this.maxCount + '张图片',
        type: 'warning',
        duration: 1000
      })
    },
    handleUpload(){
      let formData = new FormData()
      this.uploadList.forEach(item=>{
        formData.append('files',item.raw)
      })
      this.$api.reqUploadImgList(formData)
        .then(res=>{
          if (res.code === 200) {
            this.$message.success('上传成功！')
            console.log('即将将数据发送给父组件',res)
            //将url传回父组件
            let imgList = Object.assign(res.data)
            console.log(imgList)
            this.$bus.$emit('addImgList',imgList)
          }else {
            this.$message.error(res.msg)
          }
        }).catch(err=>{
          this.$message.warning(err)
      })
    },
    submitUpload(){
      this.$refs.upload.submit()
    }
  }
}
</script>
<style>

</style>


