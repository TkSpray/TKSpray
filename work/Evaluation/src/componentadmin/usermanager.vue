<template>
  <div style="width:90%;margin:0 auto">
    <el-tabs type="card">

      <el-tab-pane label="分组概览">
        <div class="addadmin">
        </div>
        <div style="margin-bottom:40px"
             v-for="(item,index) in evalist"
             :key="index">
          <el-table :data="item"
                    border>
            <el-table-column label="组别"
                             prop="gid"
                             align="center"
                             width="80"></el-table-column>
            <el-table-column label="序号"
                             type="index"
                             align="center"
                             width="80"></el-table-column>
            <el-table-column label="用户名"
                             prop="name"
                             align="center"></el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="250">
              <template slot-scope="scope">
                <el-button size="mini"
                           type="danger"
                           @click="deleteeva(scope.$index, scope.row)">删除账号</el-button>
                <el-button size="mini"
                           type="danger"
                           @click="outgroup(scope.$index, scope.row)">移出分组</el-button>
              </template></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="分组操作">
        <el-dialog title="添加评审人员"
                   :visible.sync="dialogVisible"
                   width="35%">
          <div style="width:80%;margin:0 auto">
            <el-input v-model="acc"
                      placeholder="用户名(非十一位数字,不超过20个字符)"
                      style="margin-bottom:20px"></el-input>
            <el-input v-model="passwo"
                      placeholder="密码"></el-input>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="createva">确 定</el-button>
          </span>
        </el-dialog>
        <span>评审人员</span>
        <div class="showcheck">
          <el-checkbox-group v-model="cheopt"
                             @change="cha">
            <el-checkbox v-for="(item,index) in alleva"
                         :label="item.u"
                         border></el-checkbox>
          </el-checkbox-group>
        </div>
        <el-select v-model="selectgroup"
                   placeholder="选择分组"
                   @change="cha"
                   class="pad">
          <el-option v-for="(item,index) in groups"
                     :label="item.gid"
                     :value="item.gid"
                     :key="item.gid"></el-option>
        </el-select>
        <el-button class="pad"
                   @click="addEvaTogro">添加到此分组</el-button>
        <el-button class="pad"
                   @click="dialogVisible = true"
                   type="primary">添加评审人员</el-button>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
export default {
  data () {
    return {
      selectgroup: '',
      dialogVisible: false,
      acc: '',
      passwo: '',
      pid: 0,
      cheopt: [],
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val;
    },
    handleCurrentChange (val) {
      this.currentPage = val;
    },
    cha () {
      console.log(this.cheopt)
      console.log(this.selectgroup)
    },
    deleteeva (index, row) {
      this.$confirm('将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'post',
          url: 'data/adm/del_user',
          data: {
            u: row.name
          }
        }).then((res) => {
          if (res.data.status === 0) {
            this.$message({
              message: '删除账号成功',
              type: 'success'
            })
            this.$store.dispatch('eva')
            this.$store.dispatch('list')
            this.$store.dispatch('groups')
          }
        })
      })

    },
    outgroup (index, row) {
      this.$axios({
        method: 'post',
        url: 'data/adm/mod_user_group',
        data: {
          gid: row.gid,
          u: row.name
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$store.dispatch('eva')
          this.$store.dispatch('list')
          this.$store.dispatch('groups')
        } else if (res.data.status === -10) {
          this.$message.error('登录已失效，请重新登录')
        } else {
          this.$message.error('移除失效，请检查网络连接')
        }
      })
    },
    createva () {
      this.$axios({
        method: 'post',
        url: 'data/adm/add_user',
        data: {
          u: this.acc,
          p: this.passwo
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$axios({
            method: 'post',
            url: 'data/adm/mod_user_project',
            data: {
              u: this.acc,
              pid: this.pid
            }
          }).then((res) => {
            this.dialogVisible = false
            this.$message({
              message: '创建账号成功',
              type: 'success'
            })
          })
          this.$store.dispatch('eva')
          this.$store.dispatch('list')
          this.$store.dispatch('groups')
        } else {
          this.$message.error('创建失败，请检查网络连接')
        }
      })
    },
    addEvaTogro () {
      let flag = 0
      if (this.cheopt.length != 0) {
        for (let i = 0; i < this.cheopt.length; i++) {
          this.$axios({
            method: 'post',
            url: 'data/adm/mod_user',
            data: {
              gid: parseInt(this.selectgroup),
              u: this.cheopt[i]
            }
          }).then((res) => {
            if (res.data.status === 0) {
              this.$message({
                message: '分组成功',
                type: 'success'
              })
            } else if (res.data.status === -10) {
              this.$message.error('登录已失效，请重新登录')
            }
            else {
              this.$message.error('分组失败，请检查网络连接')
            }
          })
        }
        this.$store.dispatch('eva')
        this.$store.dispatch('list')
        this.$store.dispatch('groups')
        this.selectgroup = '',
          this.cheopt = []
      } else {
        this.$message.error('请选择评审人员')
      }
    }
  },
  computed: {
    groups () {
      return this.$store.getters.getgroups
    },
    alleva () {
      return this.$store.getters.getevalist
    },
    evalist () {
      let templist = []
      for (let i = 0; i < this.groups.length; i++) {
        templist[i] = []
        for (let a = 0; a < this.groups[i].eva.length; a++) {
          templist[i].push({ gid: this.groups[i].gid, name: this.groups[i].eva[a] })
        }
      }
      return templist
    }
  },
  created () {
    this.pid = this.$store.getters.getpid
  }
}
</script>
<style scoped>
.opt {
  margin: 20px auto;
}
.mainopt {
  margin: 40px auto;
}
.showcheck {
  height: 200px;
  margin: 10px auto 40px 0;
  border: 1px solid rgb(230, 230, 230);
  box-sizing: border-box;
  padding: 20px;
}
.pad {
  margin-right: 40px;
}
.addadmin {
  display: flex;
  justify-content: flex-end;
  margin-top: -10px;
}
</style>