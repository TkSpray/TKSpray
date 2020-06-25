// pannel 状态

export default {
    state: {
        list: [],

    },
    mutations:{
        /**
         * 万金油使用法
         * @param state
         * @param payload
         */
        change_state(state, payload) {
            for (let key in payload) {
                state[key] = payload[key]
            }
        }
    },
    actions: {
        async init({commit, state}) {
            // 从服务器同步内容
        }
    }
}
