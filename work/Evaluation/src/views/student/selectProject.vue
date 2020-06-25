<template>
    <div class="row d-flex justify-content-center align-middle ml-0 mr-0" style="margin-top: 30vh">
        <div class="input-group p-5 col-12 col-md-6 col-xl-4">
            <div class="input-group-prepend">
                <label class="input-group-text">选择项目类别</label>
            </div>
            <select class="custom-select" @change="change" v-model="pid">
                <option v-for="item in projectList" :value="item.pid">{{item.name}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    import api from '@/service/api'

    // 选择项目
    export default {
        name: "selectProject",
        data() {
            return {
                projectList: [],
                pid: null
            }
        },
        async created() {
            const t = (new Date().getTime()) / 1000
            try {
                this.projectList = (await api.data.app.list_prj()).data.filter((v) => v.start < t && v.end > t)
            } catch (e) {
                console.debug(e)
            }
        },
        methods: {
            async change() {
                this.$store.commit('change_state', {
                    proid: this.pid,
                    proName: this.projectList.reduce((pre, cur) => pre || (cur.pid === this.pid && cur.name), '')
                })
                this.$router.push('/student/')
            }
        }
    }
</script>

<style scoped>

</style>
