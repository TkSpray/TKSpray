<template>
    <div class="container-fluid pb-5 pl-0 pr-0 pt-5 d-flex justify-content-center align-items-center flex-wrap h-100"
         style="background-color: #87ccc8; min-height: 100vh">
        <div class="row justify-content-start align-items-center mr-0 ml-0 w-100 p-2"
             style="background-color: #00838f;position: absolute;top: 0">
            <img src="../../assets/uestc.png" class="logo">
            <span class="tohome align-middle">
                <router-link to="">通用项目评审管理系统</router-link>
            </span>
        </div>
        <div class="card rounded-0 border-0 mt-5 col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4"
             style="background-color: #87ccc8">
            <div class="card-header border-0 rounded-0" style="background-color: #b6e1df">
                <h6 class="card-title mb-0">

                </h6>
                <div class="d-flex flex-nowrap justify-content-between">
                    <div :class="{link:$route.path!=='/login','text-main':$route.path==='/login'}"
                         @click="$router.push('/login')">
                        快捷登录
                    </div>
                    <div :class="{link:$route.path!=='/login/password','text-main':$route.path==='/login/password'}"
                         @click="$router.push('/login/password')">
                        密码登录
                    </div>
                    <div :class="{link:$route.path!=='/login/registe','text-main':$route.path==='/login/registe'}"
                         @click="$router.push('/login/registe')">
                        注册账号
                    </div>
                </div>
            </div>
            <div class="card-body" style="background-color: #b6e1df">
                <form onsubmit="return false">
                    <router-view :change-password="changePassword"/>
                    <div class="form-check d-flex justify-content-between">
                        <div>
                            <input class="form-check-input"
                                   type="checkbox"
                                   v-model="remembered"/>
                            <label class="form-check-label link" @click="remembered = !remembered">
                                记住登录
                            </label>
                        </div>
                        <div v-if="$route.path==='/login'">
                            <input class="form-check-input"
                                   type="checkbox"
                                   v-model="changePassword"/>
                            <label class="form-check-label link" @click="changePassword = !changePassword">
                                修改密码
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row d-flex justify-content-center w-100 pb-3" style="background-color: #87ccc8">
            <img class="mt-4" src="../../assets/login.png">
        </div>
    </div>
</template>

<script>
    import api from '@/service/api'

    // 登录面板
    export default {
        name: "index",
        data: function () {
            return {
                username: '',
                password: '',
                remembered: true,
                sms: false,
                changePassword: false
            }
        },
        async created() {
            // 初始化
            if (this.$store.state.logined && this.$store.type) {
                // 已经登录，直接跳转
                this.$router.push('/' + this.$store.state.typeText)
            }
            try {
                // 没登录，但cookie可能有效
                const id = await api.user.id()
                console.debug(`[Login] Success`)
                this.$store.commit('change_state', {
                    logined: true,
                    type: id.type,
                    typeText: ['', 'student', 'judger', 'admin'][this.$store.state.type]
                })
                if (id.type === 1 && this.$store.state.proid === 0) {
                    this.$router.push('/student/project')
                } else {
                    this.$router.push('/' + this.$store.state.typeText)
                }
            } catch (e) {
                console.debug(e)
            }
        },
        methods: {
            login1() {
                this.$axios({
                    method: 'post',
                    url: 'user/login',
                    data: {
                        u: this.username,
                        p: this.password,
                        method: 'password'
                    }
                })
            },
            async login() {
                try {
                    if (this.method === 'password') {
                        await api.user.login({u: this.username, p: this.password})
                    } else if (this.method === 'sms') {
                        await api.user.one_time_login({u: this.username, token: this.password})
                    } else {
                        console.debug("Unknow error")
                        return
                    }
                    console.debug(`[Login] Success!`)
                    // 登录成功
                    const id = await api.user.id()
                    this.$store.commit('change_state', {
                        logined: true,
                        type: id.type,
                        typeText: ['', 'student', 'judger', 'admin'][id.type]
                    })
                    if (id.type === 1) {
                        this.$router.push('/student/project')
                    } else {
                        this.$router.push('/' + this.$store.state.typeText)
                    }
                } catch (e) {
                    // TODO:提示错误
                    console.debug(e)
                }
            },
            async forget() {
                if (this.username.length === 11) {
                    this.method = 'sms'
                    console.debug("SMS login")
                    try {
                        await api.user.sms({u: this.username})
                    } catch (e) {
                        console.debug(e)
                    }
                }
            },
            async registe() {
                if (this.username.length === 11) {
                    this.method = 'sms'
                    console.debug("SMS registe")
                    try {
                        await api.user.reg({u: this.username})
                    } catch (e) {
                        console.debug(e)
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .link:hover {
        cursor: pointer;
    }

    .logo {
        width: 40px;
        height: 40px;
    }

    .tohome {
        margin-left: 10px;
    }

    .tohome a {
        color: #ffffff;
        text-decoration: none;
        font-size: 1.4rem;
    }

    .text-main {
        color: #00838f;
    }

    img {
        width: 90%;
        height: 90%;
    }

    @media (min-width: 576px) {
        img {
            width: 90%;
            height: 90%;
        }
    }

    @media (min-width: 768px) {
        img {
            width: 65%;
            height: 65%;
        }
    }

    @media (min-width: 992px) {
        img {
            width: 50%;
            height: 50%;
        }
    }

    @media (min-width: 1200px) {
        img {
            width: 30%;
            height: 30%;
        }
    }
</style>
