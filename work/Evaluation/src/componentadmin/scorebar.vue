<template>
  <div style="width:90%;margin:0 auto">
    <div class="smallhead">
      <span style="line-height:40px;font-size:1.3rem">打分表审核</span>
      <el-button @click="downseveral">下载所选打分表</el-button>
    </div>
    <el-table :data="tabledata.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              class="showtable"
              border
              @selection-change="handleSelectionChange"
              :row-class-name="tableRowClassName">
      <el-table-column type="selection"
                       :selectable='checkboxInit'>
      </el-table-column>
      <el-table-column label="序号"
                       align="center"
                       width="80"
                       type="index"
                       :index="indexMethod"></el-table-column>
      <el-table-column prop='u'
                       label="用户名"
                       align="center"></el-table-column>
      <el-table-column prop='stat'
                       label="提交状态"
                       align="center"
                       width="180"></el-table-column>
      <el-table-column label="操作"
                       align="center"
                       width="130">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="downsingle(scope.$index, scope.row)"
                     v-if="scope.row.stat ==='已提交'">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="total, prev, pager, next, jumper"
                   :page-size="pagesize"
                   :current-page="currentPage"
                   :total="tabledata.length"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   class="onedown">
    </el-pagination>
  </div>
</template>
<script>
import qs from 'qs'
import { stringify } from 'querystring';
export default {
  data () {
    return {
      currentPage: 1,
      pagesize: 10,
      multipleSelection: [],
      downloadsco: [],
      pid: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val;
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
    indexMethod (index) {
      return (index + 1) + (this.currentPage - 1) * (this.pagesize)
    },
    checkboxInit (row, index) {
      if (row.stat !== '已提交')
        return 0;
      else
        return 1;
    },
    downsingle (index, row) {
      this.$axios({
        method: 'get',
        url: 'data/adm/download_table',
        params: {
          u: row.u
        },
        responseType: 'blob'
      }).then((res) => {
        const content = res.data
        let fileName = decodeURI(res.headers['content-disposition'].split(';')[1].split('\'')[2]) || row.u
        let index1 = fileName.lastIndexOf(".");
        let index2 = fileName.length;
        let type = fileName.substring(index1, index2 - 1);
        fileName = fileName.substring(1).split('.')[0] + type
        // console.log(type)
        const blob = new Blob([content], { type: 'application/octet-stream; charset=utf-8' })
        if ('download' in document.createElement('a')) {
          const link = document.createElement('a')
          link.download = fileName
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        } else {
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.stat === '未提交') {
        return 'warning-row';
      } else if (row.stat === '已提交') {
        return 'success-row';
      }
      return '';
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    downseveral () {
      let users = []
      for (let a = 0; a < this.multipleSelection.length; a++) {
        users.push(this.multipleSelection[a].u)
      }
      // qs.stringify({ user: users }, { arrayFormat: 'repeat' })
      this.$axios({
        method: 'get',
        url: 'data/adm/download_tables',
        params: { user: users },
        responseType: 'blob',
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }).then((res) => {
        const content = res.data
        const blobs = new Blob([content], { type: 'application.zip' })
        const fileName = '打分表.zip'
        if ('download' in document.createElement('a')) {
          const link = document.createElement('a')
          link.download = fileName
          link.style.display = 'none'
          link.href = URL.createObjectURL(blobs)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        } else {
          navigator.msSaveBlob(blobs, fileName)
        }
      })
    },
  },
  computed: {
    tabledata () {
      return this.$store.getters.getevalist
    }
  },
  created () {
    this.pid = this.$store.getters.getpid
  },
}
</script>
<style>
.smallhead {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.cell label {
  margin: 0;
  margin-left: 6px;
}
.onedown {
  margin: 10px 0 20px 0;
}
</style>