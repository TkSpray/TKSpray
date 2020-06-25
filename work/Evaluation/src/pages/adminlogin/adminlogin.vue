<template>
  <div>
    <el-container class="maincon">
      <el-header style="margin-bottom:20px;background-color:#00838F">
        <el-row :gutter="20"
                class="mainhead">
          <el-col :span="12"
                  class="head1">
            <div class="logowrapper">
              <img src="../../assets/uestc.png"
                   class="logo">
              <span class="tohome">
                <router-link to="/adminindex">通用项目评审管理系统</router-link>
              </span>
            </div>
          </el-col>
          <el-col :span="12"
                  class="head2"><span>欢迎您,{{admin}}<br></span><span class="quit"
                  @click="logout">退出</span></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <el-menu :default-active="this.$route.path"
                   router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>评审材料审核</span>
              </template>
              <el-menu-item index="/adminindex/examining">待审核材料</el-menu-item>
              <el-menu-item index="/adminindex/examined">已审核材料</el-menu-item>
              <el-menu-item index="/adminindex/evaluate">待评审材料</el-menu-item>
              <el-menu-item index="/adminindex/scoretable">打分表审核</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>内容管理</span>
              </template>
              <el-menu-item index="/adminindex/contentmanager">评审材料上传</el-menu-item>
              <el-menu-item index="/adminindex/score">打分表设置</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/adminindex/adminmanager">管理员用户管理</el-menu-item>
              <el-menu-item index="/adminindex/usermanager">评审人员用户管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="/admin">
              <i class="el-icon-document-copy"></i>
              <span>切换项目</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="maintheme">
            <h2>{{title}}</h2>
          </div>
          <router-view :key="key"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pid: 0,
      admin: '',
      title: '',
    }
  },
  methods: {
    getlist () {
      this.$axios({
        method: 'post',
        url: 'data/adm/query_content',
        data: {
          pid: this.pid
        }
      }).then((res) => {
        if (res.data.status === 0) {
          let templist = []
          templist = res.data.data
          this.$store.dispatch('changelist', templist)
        }
      })
    },
    getevalist () {
      this.$axios({
        method: 'post',
        url: 'data/adm/query_user',
      }).then((res) => {
        if (res.data.status === 0) {
          let templist = []
          templist = res.data.data
          this.$store.dispatch('changeevalist', templist)
        }
      })
    },
    getuser () {
      this.$axios({
        method: 'post',
        url: 'user/id',
      }).then((res) => {
        if (res.data.status === 0) {
          this.admin = res.data.username
        } else if (res.data.status === -10) {
          this.$message.error('登录已失效，请重新登录')
        }
      })
    },
    async logout () {
      document.cookie = ''
      this.$store.commit('change_state', {
        logined: false,
        type: 0
      })
      try {
        await api.user.logout()
      } catch (e) {
      }
      this.$router.push('/login')
    },
    gettitle () {
      for (let i = 0; i < this.pros.length; i++) {
        if (this.pid === this.pros[i].pid) {
          this.title = this.pros[i].name
        }
      }
    }
  },
  computed: {
    key () {
      return this.$route.path + Math.random();
    },
    list () {
      return this.$store.getters.getlist
    },
    pros () {
      return this.$store.getters.getpro
    }
  },
  created () {
    this.pid = this.$store.getters.getpid
    this.getuser()
    this.getlist()
    this.getevalist()
    this.$store.dispatch('groups')
    this.gettitle()
  },
  mounted () {
    document.getElementsByTagName('html')[0].style.height = ''
    document.body.style.height = ""
  }
}
</script>

<style>
.tohome a {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.4rem;
}
.tohome {
  margin-left: 10px;
}
.mainhead {
  color: #ffffff;
}
.head1 {
  height: 60px;
}
.head1 span {
  text-align: center;
  line-height: 60px;
}
.head2 {
  text-align: right;
  height: 60px;
}
.head2 span {
  line-height: 30px;
}
.maincon h2 {
  text-align: center;
  margin-top: -20px;
  margin-bottom: 10px;
}
.maintheme h2 {
  font-weight: 400;
}
.quit:hover {
  cursor: pointer;
}
.logo {
  width: 40px;
  height: 40px;
}
.logowrapper {
  display: flex;
  align-items: center;
}
</style>
