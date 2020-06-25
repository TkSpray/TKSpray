<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <i class="fas fa-user"></i>
        </span>
      </div>
      <input type="text"
             class="form-control"
             name="username"
             placeholder="手机号/用户名"
             v-model="username" />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <i class="fas fa-key"></i>
        </span>
      </div>
      <input type="password"
             class="form-control"
             name="password"
             placeholder="密码"
             v-model="password" />
    </div>
    <p class="text-danger"
       v-if="$store.state.loginMsg">{{$store.state.loginMsg}}</p>
    <div class="d-flex justify-content-center">
      <button class="btn btn-outline-dark mb-3 w-100"
              type="submit"
              @click="login">
        登录
        <i class="fas fa-sign-in-alt"></i>
      </button>
    </div>
  </div>
</template>

<script>
import api from '@/service/api'

export default {
  name: "passwordLogin",
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        await api.user.login({ u: this.username, p: this.password })
        console.debug(`[Login] Success!`)
        // 登录成功
        const id = await api.user.id()
        this.$store.commit('change_state', {
          logined: true,
          type: id.type,
          typeText: ['', 'student', 'judger', 'admin'][id.type]
        })
        this.$store.commit('change_state', { loginMsg: "" })
        if (id.type === 1) {
          this.$router.push('/student/project')
        } else {
          this.$router.push('/' + this.$store.state.typeText + '/')
        }
      } catch (e) {
        // TODO:提示错误
        console.debug(e)
        this.$store.commit('change_state', { loginMsg: "错误" })
      }
    }
  }
}
</script>

<style scoped>
</style>
