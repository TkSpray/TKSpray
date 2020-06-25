<template>
  <div style="width:90%;margin:0 auto">
    <el-dialog title="新增评分项"
               :visible.sync="dialogVisible"
               width="30%">
      <div style="width:80%;margin:0 auto">
        <span class="scorehead">评分项</span>
        <el-input v-model="name"
                  placeholder="示例:基础工作"
                  style="margin-bottom:10px"></el-input>
        <span class="scorehead">分数</span>
        <el-input v-model="max"
                  placeholder="示例:20"
                  style="margin-bottom:10px"></el-input>
        <span class="scorehead">评分内容</span>
        <el-input v-model="comment"
                  type="textarea"
                  :rows="3"
                  placeholder="如有需要，在此添加对评分项的具体说明，如无也可不填"></el-input>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="creatscore">确 定</el-button>
      </span>
    </el-dialog>
    <div class="scoreway">
      <span style="line-height:40px;font-size:1.3rem">评分表设置</span>
      <el-button @click="opendia">添加评分项</el-button>
    </div>
    <div class="addadmin">
    </div>
    <div style="margin-bottom:40px">
      <el-table :data="tabledata"
                class="showtable"
                border>
        <el-table-column label="序号"
                         type="index"
                         align="center"
                         width="80"></el-table-column>
        <el-table-column label="评分项"
                         prop="name"
                         align="center"></el-table-column>
        <el-table-column label="分数"
                         prop="max"
                         align="center"
                         width="160"></el-table-column>
        <el-table-column label="评分内容"
                         prop="comment"
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="200">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       @click="revisesco(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="deletesco(scope.$index, scope.row)">删除</el-button>
          </template></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      name: '',
      max: '',
      comment: '',
      pid: 0,
      reviseflag: 0,
      tabledata: [],
      qid: 0
    }
  },
  methods: {
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    opendia () {
      this.dialogVisible = true
      this.name = ''
      this.max = ''
      this.comment = ''
      this.reviseflag = 0
    },
    getscos () {
      this.$axios({
        method: 'post',
        url: 'data/adm/query_question',
        data: {
          pid: parseInt(this.pid),
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.tabledata = res.data.data
        }
      })
    },
    creatscore () {
      if (this.name && this.max) {
        if (this.reviseflag == 1) {
          this.deletesco(0, this.qid)
        }
        this.$axios({
          method: 'post',
          url: 'data/adm/add_question',
          data: {
            pid: parseInt(this.pid),
            name: this.name,
            comment: this.comment,
            max: parseInt(this.max)
          }
        }).then((res) => {
          if (res.data.status === 0) {
            this.$message({
              message: ['添加评分项成功', '修改成功'][this.reviseflag],
              type: 'success'
            })
            this.getscos()
            this.dialogVisible = false
            this.reviseflag = 0
          }
          else {
            this.$message.error(['添加失败', '修改失败'][this.reviseflag])
          }
        })
      }
      else {
        this.$message({
          message: '请将信息填写完整',
          type: 'error'
        })
      }
    },
    revisesco (index, row) {
      this.name = row.name
      this.max = row.max
      this.comment = row.comment
      this.dialogVisible = true
      this.qid = row.qid
      this.reviseflag = 1
    },
    deletesco (index, row) {
      this.$axios({
        method: 'post',
        url: 'data/adm/del_question',
        data: {
          qid: row.qid || this.qid
        }
      }).then((res) => {
        if (res.data.status === 0) {
          if (this.reviseflag == 0) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
          this.getscos()
          this.dialogVisible = false
        }
        else {
          this.$message.error('删除失败')
        }
      })
    }
  },
  created () {
    this.pid = this.$store.getters.getpid
    this.getscos()
  }
}
</script>
<style scoped>
.scoreway {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.switch span {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  line-height: 1;
}
.scorehead {
  display: inline-block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
}
</style>