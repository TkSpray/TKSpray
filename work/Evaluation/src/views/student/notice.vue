<template>
    <div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">
                    选择项目&nbsp;
                    <i class="fas fa-project-diagram"></i>
                </span>
            </div>
            <select class="custom-select" v-model="selectedPID" @change="downloadZIP">
                <option v-for="item in projectList" :value="item.pid">{{item.name}}</option>
            </select>
        </div>
        <a :href="filePath" download="附件" style="display: none" id="download"></a>
    </div>
</template>

<script>
    // 通知

    import api from '@/service/api'
    import conf from '@/config'

    export default {
        name: "notice",
        data: function () {
            return {
                selectedPID: null,
                projectList: []
            }
        },
        async created() {
            try {
                const t = (new Date().getTime()) / 1000
                this.projectList = (await api.data.app.list_prj()).data.filter(v => v.start < t && v.end > t)
            } catch (e) {
                // TODO: 错误提示
                console.debug(e)
            }
        },
        methods: {
            async downloadZIP() {
                let b = new Blob();
                document.getElementById('download').href = conf.SERVER_PATH + "/data/app/notice?pid=" + this.selectedPID
                document.getElementById('download').click()
            }
        },
        computed: {
            filePath() {
                return conf.SERVER_PATH + "/data/app/notice?pid=" + this.selectedPID
            }
        }
    }
</script>

<style scoped>

</style>
