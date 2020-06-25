<template>
  <div style="width:90%;margin:0 auto">
    <el-dialog title="修改评审状态"
               width="30%"
               :visible.sync="dialogVisible">
      <div style="width:80%;margin:0 auto">
        <el-radio label=1
                  v-model="optcon">通过</el-radio>
        <el-radio label=2
                  v-model="optcon">否决</el-radio>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="changestate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传文件须知"
               width="30%"
               :visible.sync="infoflag">
      <div style="width:80%;margin:0 auto">
        <span>关于导入材料的示范:<br>压缩包中的格式为：<br>申请人/课题名称/文件.pdf<br>如果有附件则附件为:<br>申请人/课题名称/文件.zip<br>请再三确认文件格式后上传'</span>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="infoflag = false">取 消</el-button>
        <el-button type="primary"
                   @click="uploadfile">确 定</el-button>
      </span>
    </el-dialog>
    <div style="overflow:hidden;min-width:450px">
      <el-row class="thrparts"
              type="flex"
              justify="space-between"
              v-if="$route.path=='/adminindex'">
        <el-col :span="7"
                class="shownum">
          <div>
            <router-link to="/adminindex/examining">{{wait}}</router-link>
            <span>待审核材料</span>
          </div>
        </el-col>
        <el-col :span="7"
                class="shownum">
          <div>
            <router-link to="/adminindex/examined">{{havedone}}</router-link><span>已审核材料</span>
          </div>
        </el-col>
        <el-col :span="7"
                class="shownum">
          <div>
            <router-link to="/adminindex/evaluate">{{evaluate}}</router-link><span>待评审材料</span>
          </div>
        </el-col>
      </el-row>
      <div class="smallhead"
           v-if="$route.path=='/adminindex'">
        <span style="line-height:40px;font-size:1.3rem">所有项目材料</span>
        <!-- <el-button size="medium"
                   @click="uploadfile">材料导入</el-button> -->

        <el-upload class="upload-demo"
                   :action='baseURLlast+"/data/adm/import"'
                   :with-credentials="true"
                   :show-file-list="false"
                   accept="application/zip,application/x-zip,application/x-zip-compressed"
                   :on-success="uploadSuccess"
                   :on-error="uploadError"
                   name="zip"
                   :data="filedata">
        </el-upload>
        <el-button size="medium"
                   @click="infoflag=true">材料导入</el-button>
      </div>
      <div class="smallhead"
           v-if="$route.path=='/adminindex/examined'">
        <span style="line-height:40px;font-size:1.3rem">已审核材料</span>
      </div>
      <div class="smallhead"
           v-if="$route.path=='/adminindex/examining'">
        <span style="line-height:40px;font-size:1.3rem">待审核材料</span>
      </div>
    </div>
    <el-table :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              class="showtable"
              :row-class-name="tableRowClassName"
              border
              :row-key="getrowkey">
      <el-table-column type="index"
                       :index="indexMethod"
                       label="序号"
                       align="center"
                       width="80"></el-table-column>
      <el-table-column prop='name'
                       label="材料"
                       align="center">
        <template slot-scope="scope">
          <a :class="scope.row.pdf?'ahref':'disabled'"
             :href="baseURL+ encodeURIComponent(baseURLlast+'/data/adm/download_pdf?cid='+scope.row.cid)"
             target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column prop='applicant'
                       label="申请人"
                       align="center"
                       width="140"></el-table-column>
      <el-table-column prop='time'
                       label="提交时间"
                       align="center"
                       width="180"></el-table-column>
      <el-table-column prop='status'
                       label="状态"
                       align="center"
                       width="100"></el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="180">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next, jumper"
                   :page-size="pagesize"
                   :current-page="currentPage"
                   :total="tabledata.length"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   style="margin-top:10px">
    </el-pagination>
  </div>
</template>

<script>
import { type } from 'os';
import conf from '../config.js'
export default {
  data () {
    return {
      optcon: 3,
      dialogVisible: false,
      currentPage: 1,
      pagesize: 10,
      cid: 0,
      pid: 0,
      list: [],
      baseURL: conf.PDFJS_PATH,
      baseURLlast: conf.SERVER_PATH,
      filedata: {
        pid: 0
      },
      infoflag: false
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val;
    },
    uploadfile () {
      this.infoflag = false
      document.getElementsByName('zip')[0].click()
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
    handleEdit (index, row) {
      this.dialogVisible = true
      this.cid = row.cid
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
    tableRowClassName ({ row, rowIndex }) {
      if (this.$route.path !== '/admin/evaluate') {
        if (row.status === '未通过') {
          return 'warning-row';
        } else if (row.status === '已通过') {
          return 'success-row';
        }
      }
      return '';
    },
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * (this.pagesize)
    },
    changestate () {
      this.dialogVisible = false
      console.log(this.optcon)
      if (this.optcon !== 0) {
        this.$axios({
          method: 'post',
          url: 'data/adm/review',
          data: {
            cid: this.cid,
            result: this.optcon
          }
        }).then((res) => {
          if (res.data.status === 0) {
            this.$store.dispatch('list')
          }
          else if (res.data.status === -10) {
            this.$message.error('登录已失效，请重新登录')
          }
        })
      }
    },
    openpdf (index, row) {
      console.log(row)
    },
    getrowkey (row) {
      return row.cid
    }
  },
  computed: {
    recivedata () {
      return this.$store.getters.getlist
    },
    wait () {
      let temp = 0
      for (let a = 0; a < this.recivedata.length; a++) {
        if (this.recivedata[a].status === '待审核') {
          temp++
        }
      }
      return temp
    },
    havedone () {
      let temp = 0
      for (let a = 0; a < this.recivedata.length; a++) {
        if (this.recivedata[a].status === '已通过' || this.recivedata[a].status === '未通过') {
          temp++
        }
      }
      return temp
    },
    evaluate () {
      let temp = 0
      for (let a = 0; a < this.recivedata.length; a++) {
        if (this.recivedata[a].status === '已通过') {
          temp++
        }
      }
      return temp
    },
    tabledata () {
      let templist = []
      if (this.$route.path === '/adminindex/examining') {
        templist = []
        for (let a = 0; a < this.recivedata.length; a++) {
          if (this.recivedata[a].status === '待审核') {
            templist.push(this.recivedata[a])
          }
        }
      } else if (this.$route.path === '/adminindex/examined') {
        templist = []
        for (let a = 0; a < this.recivedata.length; a++) {
          if (this.recivedata[a].status === '已通过' || this.recivedata[a].status === '未通过') {
            templist.push(this.recivedata[a])
          }
        }
      } else if (this.$route.path === '/adminindex/evaluate') {
        templist = []
        for (let a = 0; a < this.recivedata.length; a++) {
          if (this.recivedata[a].status === '已通过') {
            templist.push(this.recivedata[a])
          }
        }
      } else if (this.$route.path === '/adminindex') {
        templist = []
        templist = this.recivedata
      }
      return templist
    }
  },
  created () {
    this.pid = this.$store.getters.getpid
    this.filedata.pid = this.pid
  }
}
</script>
<style>
.disabled {
  color: #606266;
  cursor: pointer;
  pointer-events: none;
}
.ahref :hover {
  cursor: pointer;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.shownum a {
  color: rgba(0, 131, 143, 1) !important ;
  text-decoration: none;
}
.shownum a:hover {
  color: rgba(0, 131, 143, 1);
  cursor: pointer;
}
.thrparts {
  text-align: center;
}
.shownum {
  height: 120px;
  box-sizing: border-box;
  border: 1px solid rgb(235, 238, 245);
  border-radius: 5px;
  padding-top: 14px;
}
.shownum div {
  width: 80%;
  margin: 0 auto;
  text-align: left;
}
.shownum a {
  display: block;
  font-size: 2.5rem;
}
.smallhead {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 1rem 0;
}
</style>