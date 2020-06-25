<template>
    <table class="table table-hover table-sm mb-0">
        <thead>
        <tr>
            <th scope="col" v-for="item in formHeaders">
                {{item}}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, idx) in listShow" @click="$router.push('/judger/'+item.cid)">
            <td>{{idx+1}}</td>
            <td>{{item.name}}</td>
            <td>
                <i class="fas" :class="[item.zip?'fa-check text-success':'fa-minus text-danger']"></i>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import api from '@/service/api'

    //主面板
    export default {
        name: "list",
        data: function () {
            return {
                /**
                 * 状态名称
                 */
                statText: ['Pending', 'Accepted', 'Rejected'],
                /**
                 * 标题列表
                 */
                formHeaders: ['序号', '项目名称', '附件'],
                /**
                 * 过滤关键词，来自input
                 */
                filterKey: [],
                /**
                 * input的placeholder
                 */
                placeholders: ['', '', '', '', 'y/n']
            }
        },
        async created() {
            try {
                const d = (await api.data.jug.list())
                this.$store.commit('change_state', {
                    proName: d.project,
                    list: d.data
                })
            } catch (e) {
                console.debug(e)
            }
        },
        computed: {
            /**
             * 课题列表过滤
             */
            listShow() {
                return this.$store.state.list.filter((item) => {
                    if (this.filterKey[0]) {
                        // 过滤课题名称
                        if (item.name.toString().indexOf(this.filterKey[1]) === -1)
                            return false
                    }
                    if (this.filterKey[1]) {
                        // 过滤申请人
                        if (item.applicant.indexOf(this.filterKey[2]) === -1)
                            return false
                    }
                    if (this.filterKey[2]) {
                        // 过滤申请日期
                        if (item.time.indexOf(this.filterKey[3]) === -1)
                            return false
                    }
                    if (this.filterKey[3]) {
                        // 过滤附件
                        if (this.filterKey[4] !== 'y' && this.filterKey[4] !== 'n')
                            return false
                        if (this.filterKey[4] === 'y' ^ item.zip)
                            return false
                    }
                    return true
                })
            }
        },
    }
</script>

<style scoped>

</style>
