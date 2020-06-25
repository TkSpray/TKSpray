<template>
  <div style="width:90%;margin:0 auto">
    <el-tabs type="card">
      <el-tab-pane label="分组概览">
        <div style="margin-bottom:40px"
             v-for="(item,index) in eachgro">
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
            <el-table-column label="材料名称"
                             prop="name"
                             align="center"></el-table-column>
            <el-table-column prop='applicant'
                             label="申请人"
                             align="center"></el-table-column>
            <el-table-column label="操作"
                             align="center"
                             width="180">
              <template slot-scope="scope">
                <el-button size="mini"
                           type="danger"
                           @click="outgroup(scope.$index, scope.row)">移出分组</el-button>
              </template></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分组操作">
        <span>待分组材料</span>
        <div class="showcheck">

          <el-checkbox-group v-model="cheopt"
                             @change="cha">
            <el-checkbox v-for="(item,index) in nogroup"
                         :label="item.name"
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
                   @click="addctogro">添加到此分组</el-button>
        <el-button class="pad"
                   type="danger"
                   @click="deletgro">删除此分组</el-button>
        <el-button class="pad"
                   type="primary"
                   @click="creategro">新建分组</el-button>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
export default {
  data () {
    return {
      cheopt: [],
      selectgroup: '',
      delpro: '',
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
    cha () {
      console.log(this.cheopt)
    },
    outgroup (index, row) {
      this.$axios({
        method: 'post',
        url: 'data/adm/mod_content_group',
        data: {
          gid: row.gid,
          cid: row.cid
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$message({
            message: '移除材料成功',
            type: 'success'
          })
          this.$store.dispatch('list')
          this.$store.dispatch('groups')
          this.formatgro()
        } else if (res.data.status === -10) {
          this.$message.error('登录已失效，请重新登录')
        }
        else {
          this.$message.error('移除失败，请检查网络连接')
        }
      })
    },
    creategro () {
      this.$axios({
        method: 'post',
        url: 'data/adm/new_group',
        data: {
          pid: this.pid
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$message({
            message: '创建分组成功',
            type: 'success'
          })
          this.$store.dispatch('list')
          this.$store.dispatch('groups')
          this.formatgro()
        } else if (res.data.status === -10) {
          this.$message.error('登录已失效，请重新登录')
        }
        else {
          this.$message.error('创建失败，请检查网络连接')
        }
      })
    },

    addctogro () {
      let flag = 0
      for (let i = 0; i < this.cheopt.length; i++) {
        let id = this.nogroup.find(item => item.name == this.cheopt[i]).cid
        this.$axios({
          method: 'post',
          url: 'data/adm/mod_content',
          data: {
            gid: parseInt(this.selectgroup),
            cid: id
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
            this.$message.error('分组失败,请检查网络连接')
          }
          this.$store.dispatch('list')
          this.$store.dispatch('groups')
          this.formatgro()
        })
      }
      this.selectgroup = '',
        this.cheopt = []
    },
    deletgro () {
      this.$axios({
        method: 'post',
        url: 'data/adm/del_group',
        data: {
          gid: parseInt(this.selectgroup),
        }
      }).then((res) => {
        if (res.data.status === 0) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else if (res.data.status === -10) {
          this.$message.error('登录已失效，请重新登录')
        }
        else {
          this.$message.error('删除失败，请检查网络连接')
        }
        this.$store.dispatch('list')
        this.$store.dispatch('groups')
        this.formatgro()
      })
      this.selectgroup = '',
        this.cheopt = []
    }
  },
  computed: {
    groups () {
      return this.$store.getters.getgroups
    },
    list () {
      return this.$store.getters.getlist
    },
    eachgro () {
      let tempgro = []
      for (let i = 0; i < this.groups.length; i++) {
        this.$set(tempgro, i, [])
        for (let a = 0; a < this.groups[i].content.length; a++) {
          let cname = ''
          let cappli = ''
          let cstatue = ''
          for (let b = 0; b < this.list.length; b++) {
            if (this.groups[i].content[a] == this.list[b].cid) {
              cname = this.list[b].name
              cappli = this.list[b].applicant
              cstatue = this.list[b].status
              break
            }
          }
          tempgro[i].push({ gid: this.groups[i].gid, cid: this.groups[i].content[a], name: cname, applicant: cappli, status: cstatue })
        }
      }
      return tempgro
    },
    havegro () {
      let tempgro = []
      for (let i = 0; i < this.groups.length; i++) {
        this.$set(tempgro, i, [])
        for (let a = 0; a < this.groups[i].content.length; a++) {
          tempgro[i].push(this.groups[i].content[a])
        }
      }
      return tempgro
    },
    nogroup () {
      let templist = []
      templist = this.list.filter((l1) =>
        this.havegro.findIndex((l2) => l1.cid == l2) == -1
      )
      return templist.filter((temp) =>
        temp.status === '已通过'
      )
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
</style>