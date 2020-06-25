import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '@/service/api'

import pannel from './modules/pannel'

Vue.use(Vuex)

// 初始化数据

export default new Vuex.Store({
  state: {
    /**
     * 是否登录
     */
    logined: false,
    /**
     * 是否尝试初始化
     */
    inited: false,
    /**
     * 用户类型
     * 0.未确定
     * 1.申请人
     * 2.审核人
     * 3.管理员
     */
    type: 0,
    typeText: 'student',
    username: null,
    /**
     * 登录面板的提示
     */
    loginMsg: '',
    // 项目pid
    proid: 0,
    // 项目名称
    proName: '',
    // 项目列表
    pro: [],
    // 材料列表
    list: [],
    // 评审员列表
    evalist: [],
    groups: []
  },
  getters: {
    getlist(state) {
      const templist = state.list.slice()
      for (let i = 0; i < templist.length; i++) {
        if (templist[i].status === 0) {
          Vue.set(templist[i], 'status', '待审核')
        } else if (templist[i].status === 1) {
          Vue.set(templist[i], 'status', '已通过')
        } else if (templist[i].status === 2) {
          Vue.set(templist[i], 'status', '未通过')
        }
      }
      return templist
    },
    getpid(state) {
      return state.proid
    },
    getpro(state) {
      return state.pro
    },
    getevalist(state) {
      var tempevalist = state.evalist.filter(value => value.pid === state.proid)
      for (let i = 0; i < tempevalist.length; i++) {
        if (tempevalist[i].stat === true) {
          Vue.set(tempevalist[i], 'stat', '已提交')
        } else if (tempevalist[i].stat === false) {
          Vue.set(tempevalist[i], 'stat', '未提交')
        }
      }
      return tempevalist
    },
    getgroups(state) {
      return state.groups
    }
  },
  mutations: {
    /**
     * 万金油使用法
     * @param state
     * @param payload
     */
    reset(state) {
      state = {}
      console.log(state)
    },
    change_state(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    },
    change_list(state, thelist) {
      state.list = thelist
    },
    change_pid(state, pid) {
      state.proid = pid
    },
    change_pro(state, pro) {
      state.pro = pro
    },
    change_evalist(state, evalist) {
      state.evalist = evalist
    },
    change_groups(state, groups) {
      state.groups = groups
    }
  },
  actions: {
    resetstate(context) {
      context.commit('reset')
    },
    list(context) {
      axios({
        method: 'post',
        url: 'data/adm/query_content',
        data: {
          pid: context.state.proid
        }
      }).then((res) => {
        if (res.data.status === 0) {
          context.commit('change_list', res.data.data)
        }
      })
    },
    eva(context) {
      axios({
        method: 'post',
        url: 'data/adm/query_user'
      }).then((res) => {
        if (res.data.status === 0) {
          context.commit('change_evalist', res.data.data)
        }
      })
    },
    pros(context) {
      axios({
        method: 'post',
        url: 'data/adm/list'
      }).then((res) => {
        if (res.data.status === 0) {
          context.commit('change_pro', res.data.data)
        }
      })
    },
    groups(context) {
      axios({
        method: 'post',
        url: 'data/adm/list_groups',
        data: {
          pid: context.state.proid
        }
      }).then((res) => {
        if (res.data.status === 0) {
          context.commit('change_groups', res.data.data)
        }
      })
    },
    changelist(context, thelist) {
      context.commit('change_list', thelist)
    },
    changepid(context, pid) {
      context.commit('change_pid', pid)
    },
    changepro(context, pro) {
      context.commit('change_pro', pro)
    },
    changeevalist(context, evalist) {
      context.commit('change_evalist', evalist)
    },
    changegroups(context, groups) {
      context.commit('change_groups', groups)
    },
    async init({
      commit,
      state
    }) {
      // 从后端拉取数据，初始化
      if (state.logined) {
        return
      }

      const res = await api.user.id()
      if (!res) {
        // 没有得到数据，未登录
        commit('change_state', {
          logined: false,
          type: 0
        })
      } else {
        commit('change_state', {
          logined: true,
          type: res.type,
          uid: res.uid,
          tel: res.tel
        })

        console.debug('[Init] User:', {
          logined: true,
          type: res.type,
          uid: res.uid,
          tel: res.tel
        })

        if (res.type === 1) {
          const contentList = (await api.data.app.list()).data
          const projectList = (await api.data.app.list_prj()).data
          commit('change_state', {
            contentList: contentList,
            projectList: projectList
          })
        } else if (res.type === 2) {
          const contentList = (await api.data.jug.list()).data
          commit('change_state', {
            contentList
          })
        } else if (res.type === 3) {
          const projectList = (await api.data.adm.list()).data
          commit('change_state', {
            projectList
          })
        }
      }
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})