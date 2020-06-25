<template>
    <form onsubmit="return false" autocomplete="off" class="m-3 pl-md-5 pr-md-5">
        <div class="input-group mb-3">
            <div class="input-group-prepend w-25">
                <span class="input-group-text w-100 justify-content-center">
                    项目名称&nbsp;
                    <i class="fas fa-heading"></i>
                </span>
            </div>
            <input type="text" class="form-control" v-model="subjectName"/>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend w-25">
                <span class="input-group-text w-100 justify-content-center">
                    申请人&nbsp;
                    <i class="fas fa-user"></i>
                </span>
            </div>
            <input type="text" class="form-control" v-model="applicant"/>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend w-25">
                <span class="input-group-text w-100 justify-content-center">
                    PDF文件&nbsp;
                    <i class="fas fa-file-pdf"></i>
                </span>
            </div>
            <input type="file" class="form-control" id="pdf"/>
        </div>
        <div class="input-group">
            <div class="input-group-prepend w-25">
                <span class="input-group-text w-100 justify-content-center">
                    附件&nbsp;
                    <i class="fas fa-file-archive"></i>
                </span>
            </div>
            <input type="file" class="form-control" id="zip"/>
        </div>
        <span class="text-secondary">
            提示：如果不要求提交附件可不进行提交附件操作。
            <br />
            如果想覆盖之前上传的材料，请点击材料进入详情页，重新上传。
        </span>
        <div class="row justify-content-center flex-wrap">
            <button type="submit" class="btn btn-outline-dark" @click="submit">
                提交
                <i class="fas fa-check"></i>
            </button>
        </div>
        <p class="row text-danger" v-if="errorMsg">
            {{errorMsg}}
        </p>
    </form>
</template>

<script>
    // 新建课题
    import api from '@/service/api'

    export default {
        name: "newSubject",
        data: function () {
            return {
                subjectName: '',
                selectedPID: null,
                applicant: '',
                errorMsg: ''
            }
        },
        computed: {},
        async created() {

        },
        methods: {
            async submit() {
                console.debug("PID:" + this.selectedPID)
                let step = {}
                try {
                    // TODO: 成功提示
                    // 创建
                    step.created = false
                    const c = await api.data.app.new_app({
                        name: this.subjectName,
                        pid: this.$store.state.proid,
                        applicant: this.applicant
                    })
                    step.created = true
                    console.debug(c)
                    // 上传pdf
                    let data = new FormData()
                    if (document.getElementById('pdf').files[0]) {
                        step.pdf = false
                        data.append('cid', c.cid)
                        data.append('pdf', document.getElementById('pdf').files[0])
                        await api.data.app.upload_pdf(data)
                    }
                    step.pdf = true

                    //上传zip
                    if (document.getElementById('zip').files[0]) {
                        step.zip = false
                        data = new FormData()
                        data.append('cid', c.cid)
                        data.append('zip', document.getElementById('zip').files[0])
                        await api.data.app.upload_zip(data)
                    }
                    step.zip = true

                    this.$router.push('/student/' + c.cid)
                } catch (e) {
                    // TODO: 出错提示
                    console.debug(e)
                    if (step.created === false) {
                        this.$message({message: "无法新建项目，请重新登录或联系管理员", type: 'error'})
                    } else if (step.pdf === false) {
                        this.$message({message: "项目已新建，但是无法上传PDF。请到项目详情页尝试重新上传", type: 'error'})
                    } else if (step.zip === false) {
                        this.$message({message: "项目已新建，但是无法上传附件。请到项目详情页尝试重新上传", type: 'error'})
                    }
                }
            }
        }
    }
</script>

<style scoped>
    span {
        font-size: 14px;
    }
</style>
