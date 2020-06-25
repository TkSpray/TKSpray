<template>
    <form onsubmit="return false" autocomplete="off" class="m-3 pl-md-5 pr-md-5">
        <div class="input-group mb-3">
            <div class="input-group-prepend w-25">
                <span class="input-group-text w-100 justify-content-center">
                    原密码&nbsp;
                    <i class="fas fa-key"></i>
                </span>
            </div>
            <input type="password" class="form-control" v-model="originPassword"/>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend w-25">
                <span class="input-group-text w-100 justify-content-center">
                    新密码&nbsp;
                    <i class="fas fa-key"></i>
                </span>
            </div>
            <input type="password" class="form-control" v-model="newPassword"/>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend w-25">
                <span class="input-group-text w-100 justify-content-center">
                    再次输入&nbsp;
                    <i class="fas fa-key"></i>
                </span>
            </div>
            <input type="password" class="form-control" v-model="againPassword"/>
        </div>
        <div class="row justify-content-center">
            <button type="submit" class="btn btn-outline-dark" @click="submit">
                提交
                <i class="fas fa-check"></i>
            </button>
        </div>
    </form>
</template>

<script>
    import api from '@/service/api'

    // 修改密码
    export default {
        name: "password",
        data: function () {
            return {
                originPassword: '',
                newPassword: '',
                againPassword: ''
            }
        },
        methods: {
            async submit() {
                if (this.newPassword !== this.againPassword) {
                    // TODO: 提示密码不匹配
                    return
                }
                try {
                    await api.user.reset_password({
                        op: this.originPassword, p: this.newPassword
                    })
                } catch (e) {
                    // TODO: 提示错误
                    console.debug(e)
                }
            }
        }
    }
</script>

<style scoped>

</style>
