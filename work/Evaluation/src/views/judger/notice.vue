<template>
    <div v-html="message">
        {{message}}
    </div>
</template>

<script>
    import api from '@/service/api'

    // 通知
    export default {
        name: "notice",
        data: function () {
            return {
                message: '<span class="text-danger">This is red</span>'
            }
        },
        async created() {
            try {
                this.message = await api.data.jug.notice()
            } catch (e) {
                console.debug(e)
            }
        }
    }
</script>

<style scoped>

</style>
