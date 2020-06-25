<template>
  <div style="width:90%;margin:0 auto">

    <el-row>
      <el-col :span="24">
        <h3>申报人员材料</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-upload action="http://starstudio.uestc.edu.cn/kase/data/adm/upload_app"
                   :with-credentials="true"
                   :show-file-list="false"
                   :on-success="uploadSuccess"
                   :on-error="uploadError"
                   name="zip"
                   :data="filedata"
                   style="width:500px">
          <el-button size="medium">上传</el-button>
          <div slot="tip"
               class="el-upload__tip"
               style="display: inline;"> (仅支持单文件上传，多文件请打包成zip，再次上传覆盖已有文件)</div>
        </el-upload>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="24">
        <h3>评审人员材料</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-upload action="http://starstudio.uestc.edu.cn/kase/data/adm/upload_jug"
                   :with-credentials="true"
                   :show-file-list="false"
                   :on-success="uploadSuccess"
                   :on-error="uploadError"
                   name="zip"
                   :data="filedata"
                   style="width:500px">
          <el-button size="medium">上传</el-button>
          <div slot="tip"
               class="el-upload__tip"
               style="display: inline;"> (仅支持单文件上传，多文件请打包成zip，再次上传覆盖已有文件)</div>
        </el-upload>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="24">
        <h3>上传打分表</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-upload action="http://starstudio.uestc.edu.cn/kase/data/adm/upload_table"
                   :with-credentials="true"
                   :show-file-list="false"
                   :on-success="uploadSuccess"
                   :on-error="uploadError"
                   name="file"
                   :data="filedata"
                   style="width:500px">
          <el-button size="medium">上传</el-button>
          <div slot="tip"
               class="el-upload__tip"
               style="display: inline;"> (仅支持单文件上传，多文件请打包成zip，再次上传覆盖已有文件)</div>
        </el-upload>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="12">
        <h3>修改项目信息</h3>
      </el-col>
    </el-row>
    <el-row style="width:800px">
      <el-col :span="3"><span style="line-height:36px">项目主题</span></el-col>
      <el-col :span="
            8">
        <el-input v-model="theme"
                  placeholder="请输入标题"
                  size="medium"
                  style="width:90%"></el-input>
      </el-col>
      <el-col :span="4"><span style="line-height:36px">是否允许只打总分</span></el-col>
      <el-col :span="
            8">
        <el-switch v-model="iftotal"
                   active-text="是"
                   inactive-text="否">
        </el-switch>
      </el-col>
    </el-row>
    <el-row style="margin:20px 0;width:800px">
      <el-col :span="3"><span style="line-height:36px">发布时间</span></el-col>
      <el-col :span="8">
        <el-date-picker v-model="starttime"
                        type="datetime"
                        placeholder="选择发布时间">
        </el-date-picker>
      </el-col>
      <el-col :span="3"><span style="line-height:36px">截止时间</span></el-col>
      <el-col :span="8">
        <el-date-picker v-model="deadline"
                        type="datetime"
                        placeholder="选择截止时间">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row type="flex"
            style="margin-top:40px"
            justify="center">
      <el-button size="medium"
                 @click="revisepro">保存修改</el-button>
    </el-row>
    <!-- <el-row style="margin:20px 0;width:800px">
      <el-col :span="3"><span style="line-height:36px">标题</span></el-col>
      <el-col :span="8">
        <el-input v-model="headline"
                  placeholder="请输入标题"
                  size="medium"
                  style="width:90%"></el-input>
      </el-col>
    </el-row> -->

    <!-- <tinymce ref="editor"
             v-model="msg"
             :disabled="disabled"
             @onClick="onClick" />
    <el-row type="flex"
            justify="center">
      <el-col :span="4"
              style="margin:20px auto">
        <el-button style="width:100%">保存</el-button>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
import tinymce from './tinymce'
export default {
  components: {
    tinymce
  },
  data () {
    return {
      theme: '',
      headline: '',
      starttime: '',
      msg: '',
      disabled: false,
      deadline: '',
      pid: 0,
      filedata: {
        pid: 0
      },
      iftotal: false
    }
  },
  methods: {
    // 清空内容
    clear () {
      this.$refs.editor.clear()
    },
    uploadSuccess (res) {
      if (res.status == 0) {
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      } else if (res.status === -10) {
        this.$message.error('登录已失效，请重新登录')
      }
      else {
        this.$message.error('上传失败，请重新上传');
      }
    },
    uploadError () {
      this.$refs.upload.clearFiles();
      this.$message.error('上传失败，请重新上传');
    },
    getdeadline () {
      this.$axios({
        method: 'post',
        url: 'data/adm/query_prj',
        data: {
          pid: this.pid
        }
      }).then((res) => {
        this.name = res.data.data.name
        this.deadline = this.unixtotime(res.data.data.end)
        this.starttime = this.unixtotime(res.data.data.start)
      })
    },
    getinfo () {
      for (let i = 0; i < this.pros.length; i++) {
        if (this.pid === this.pros[i].pid) {
          this.theme = this.pros[i].name
          this.deadline = this.unixtotime(this.pros[i].end)
          this.starttime = this.unixtotime(this.pros[i].start)
          this.iftotal = this.pros[i].total_only
          console.log(this.iftotal)
          console.log(this.pros[i].total_only)
          console.log(this.unixtotime(this.pros[i].start))
          console.log(this.pros[i])
        }
      }
    },
    revisepro () {
      this.$axios({
        method: 'post',
        url: 'data/adm/mod_prj',
        data: {
          pid: this.pid,
          name: this.theme,
          start: this.timetounix(this.starttime),
          end: this.timetounix(this.deadline),
          total_only: this.iftotal
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getdeadline()
          this.query()
        } else if (res.data.status === -10) {
          this.$message.error('登录已失效，请重新登录')
        }
        else {
          this.$message.error('修改保存失败,请检查日期格式和网络')
        }
      })
    },
    query () {
      this.$axios({
        method: 'post',
        url: 'data/adm/query_question',
        data: {
          pid: this.pid,
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.iftotal = res.data.total_only
        }
      })
    },
    timetounix (showtime) {
      let date = new Date(showtime)
      if (date.getTime().toString().length == 13) {
        return date.getTime() / 1000
      } else {
        return date.getTime()
      }
    },
    unixtotime (unixtime) {
      let date = new Date(unixtime * 1000);
      let Y = date.getFullYear() + '/';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  computed: {
    pros () {
      return this.$store.getters.getpro
    }
  },
  created () {
    this.pid = this.$store.getters.getpid
    this.getdeadline()
    this.getinfo()
    this.filedata.pid = this.pid
    this.query()
  }
}
</script>
<style scoped>
.el-row h3 {
  font-weight: 400;
  font-size: 1.3rem;
}
div .el-switch {
  height: 36px;
}
</style>