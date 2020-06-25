<template>
    <iframe :src="src"
            style="width: 100%; height: 90vh" name="ifd">
    </iframe>
</template>

<script>
    // FIXME:检测文章是否上传
    import api from '@/service/api'
    import conf from '@/config'

    // 展示文章
    export default {
        name: "articles",
        props: [
            'cid'
        ],
        computed: {
            src() {
                return conf.PDFJS_PATH +
                    window.encodeURIComponent(conf.SERVER_PATH + "/data/jug/download_pdf?cid=" + this.cid)
            }
        }
    }
</script>

<style scoped>

</style>
