<template>
    <div class="h-100">
            <iframe :src="src"
                    v-if="subject.pdf"
                    style="width: 100%; height: 90vh" name="ifd"
                    onload="this.height=ifd.document.body.scrollHeight">
            </iframe>
        <span v-else>文章还未上传</span>
    </div>
</template>

<script>
    import api from '@/service/api'
    import conf from '@/config'

    // 展示文章
    export default {
        name: "articles",
        props: [
            'cid'
        ],
        data: function () {
            return {
                subject: {}
            }
        },
        computed: {
            src() {
                return conf.PDFJS_PATH +
                    window.encodeURIComponent(conf.SERVER_PATH + "/data/app/download_pdf?cid=" + this.cid)
            }
        },
        async created() {
            try {
                this.subject = (await api.data.app.subject({cid: this.cid})).data
            } catch (e) {
                // TODO: 提示错误
                console.debug(e)
            }
        }
    }
</script>

<style scoped>

</style>
