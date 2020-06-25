<template>
    <div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-phone"></i>
              </span>
            </div>
            <input type="text"
                   class="form-control"
                   placeholder="手机号"
                   v-model="username"/>
        </div>
        <div class="d-flex">
            <div class="input-group mb-3 w-50">
                <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-envelope"></i>
              </span>
                </div>
                <input type="number"
                       class="form-control"
                       placeholder="验证码"
                       v-model="token"/>
            </div>
            <button class="btn btn-outline-dark mb-3 ml-3 w-50" @click="forget" :disabled="sended">
                {{sended?'已发送':'发送'}}
                <span v-if="sended">，{{count}}秒</span>
                <i class="fas fa-plane-departure" v-if="!sended"></i>
            </button>
        </div>
        <div class="input-group mb-3" v-if="changePassword">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <input type="password"
                   class="form-control"
                   placeholder="新密码"
                   v-model="password"/>
        </div>
        <div class="input-group mb-3" v-if="changePassword">
            <div class="input-group-prepend">
              <span class="input-group-text">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <input type="password"
                   class="form-control"
                   placeholder="再次输入密码"
                   v-model="passwordAgain"/>
        </div>
        <p class="text-danger" v-if="$store.state.loginMsg">{{$store.state.loginMsg}}</p>
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
        name: "sms",
        data: function () {
            return {
                username: '',
                password: '',
                passwordAgain: '',
                token: '',
                sended: false,
                sendTime: 0,
                count: 0
            }
        },
        props: [
            'change-password'
        ],
        methods: {
            async login() {
                if (this.changePassword && (this.password !== this.passwordAgain)) {
                    this.$store.commit('change_state', {loginMsg: "密码不一致"})
                    return
                }
                try {
                    let data = {
                        u: this.username,
                        token: this.token
                    }
                    if (this.changePassword) {
                        data['password'] = this.password
                    }

                    await api.user.one_time_login(data)
                    console.debug(`[Login] Success!`)
                    // 登录成功
                    const id = await api.user.id()
                    this.$store.commit('change_state', {
                        logined: true,
                        type: id.type,
                        typeText: 'student'
                    })
                    this.$router.push('/student/project')
                } catch (e) {
                    // TODO:提示错误
                    console.debug(e)
                    this.$store.commit('change_state', {loginMsg: "错误"})
                }
            },
            async forget() {
                if (this.username.length === 11) {
                    try {
                        await api.user.sms({u: this.username})
                        this.$store.commit('change_state', {loginMsg: ""})
                        this.sended = true
                        this.sendTime = Date.parse(new Date()) / 1000
                        this.countDown()
                        setTimeout(() => {
                            this.sended = false
                        }, 30000)
                    } catch (e) {
                        console.debug(e)
                        if (e.status === -30) {
                            this.$store.commit('change_state', {loginMsg: "该手机号尚未注册，请先注册"})
                        } else {
                            this.$store.commit('change_state', {loginMsg: "错误"})
                        }
                    }
                } else {
                    this.$store.commit('change_state', {loginMsg: "请输入11位手机号"})
                }
            },
            /**
             * 倒计时
             */
            countDown() {
                const t = Date.parse(new Date()) / 1000
                this.count = this.sendTime + 30 - t
                if (this.count >= 0)
                    setTimeout(this.countDown, 1000)
            }
        }
    }
</script>

<style scoped>

</style>
