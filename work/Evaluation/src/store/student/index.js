import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/service/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /**
     * 是否登录
     */
    logined: false,
    username: null,
    uid: 0,
    tel: 0,
    /**
     * 跳转地址
     */
    jumped_url: '',
    /**
     * 左侧的路径
     */
    path_left: [
      {
        name: '列表',
        to: '/pannel/list'
      }
    ]
  },
  mutations: {
    /**
     * 存储用于跳转的URL
     * @param state
     */
    store_url(state) {
      state.jumped_url = this.$route.fullPath
    },
    /**
     * 万金油使用法
     * @param state
     * @param payload
     */
    change_state(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    }
  },
  actions: {
    async init({ commit, state }) {
      if (state.logined) {
        return
      }
      if (document.cookie) {
        const res = await api.user.id()
        if (!res) {
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
          console.debug('[Init]', {
            logined: true,
            type: res.type,
            uid: res.uid,
            tel: res.tel
          })
        }
      }
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
