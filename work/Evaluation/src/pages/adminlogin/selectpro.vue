<template>
  <div>
    <el-dialog title="选择项目"
               :visible.sync="dialogVisible"
               width="40%"
               :show-close="false"
               :close-on-click-modal="false">
      <div class="diabody">
        <el-select v-model="value"
                   placeholder="请选择"
                   style="marigin:0 auto">
          <el-option v-for="(item,index) in groups"
                     :value="item.pid"
                     :label="item.name"
                     :key="index"
                     class="margin-left:40px;"></el-option>
        </el-select>
        <el-button type="primary"
                   @click="prodialog=true">创建新项目</el-button>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="turnto">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="创建新项目"
               :visible.sync="prodialog"
               width="40%">
      <el-form :model="newpro">
        <el-form-item label="项目名称: "
                      class="form">
          <el-input v-model="newpro.name"
                    class="new-pro-inp"
                    auto-complete="off"
                    placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="发布时间: ">
          <el-date-picker v-model="newpro.starttime"
                          type="datetime"
                          placeholder="选择发布时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间: ">
          <el-date-picker v-model="newpro.deadline"
                          type="datetime"
                          placeholder="选择截止时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否允许只打总分: "
                      class="iftotal">
          <el-switch v-model="newpro.iftotal"
                     active-text="是"
                     inactive-text="否">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="createpro">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { type } from 'os'
export default {
  data () {
    return {
      value: '',
      dialogVisible: true,
      prodialog: false,
      newpro: {
        name: '',
        starttime: '',
        deadline: '',
        total_only: false
      }
    }
  },
  methods: {
    turnto () {
      if (this.value === '') {
        this.$message({
          message: '请选择项目',
          type: 'error'
        })
        return
      } else {
        this.dialogVisible = false
        this.$store.dispatch('changepid', parseInt(this.value))
        this.$router.push({
          path: '/adminindex',
        })
      }
    },
    createpro () {
      if (this.newpro.name && this.newpro.starttime && this.newpro.deadline) {
        this.$axios({
          method: 'post',
          url: 'data/adm/new_prj',
          data: {
            name: this.newpro.name,
            start: this.timetounix(this.newpro.starttime),
            end: this.timetounix(this.newpro.deadline),
            total_only: this.newpro.total_only
          }
        }).then((res) => {
          if (res.data.status === 0) {
            this.prodialog = false
            this.$message({
              message: '创建项目成功',
              type: 'success'
            })
            this.$store.dispatch('pros')
          }
          else {
            this.$message.error('创建失败')
          }
        })
      } else {
        this.$message.error('请将信息填写完整')
      }
    },
    timetounix (showtime) {
      let date = new Date(showtime)
      date = date.getTime()
      return date / 1000
    },
  },
  computed: {
    groups () {
      return this.$store.getters.getpro
    },
  },
  created () {
    this.$store.dispatch('pros')
  }
}
</script>
<style>
.new-pro-inp {
  width: 60%;
  margin: 10px auto;
}
.form label {
  line-height: 60px;
}
.iftotal label {
  line-height: 42px;
}
.diabody {
  display: flex;
  justify-content: space-between;
  max-width: 330px;
}
</style>
