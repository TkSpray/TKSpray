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
        <tr v-for="item in listShow" @click="$router.push('/student/'+item.cid)">
            <td>{{item.name}}</td>
            <td>{{item.applicant}}</td>
            <td>
                <span class="badge badge-pill"
                      :class="[item.status===0?'badge-dark':item.status===1?'badge-success':'badge-secondary']">
                    {{statText[item.status]}}
                </span>
            </td>
            <td>{{item.time}}</td>
            <td>
                <i class="fas" :class="[item.pdf?'fa-check text-success':'fa-minus text-danger']"></i>
            </td>
            <td>
                <i class="fas" :class="[item.zip?'fa-check text-success':'fa-minus text-danger']"></i>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import api from '@/service/api'

    // 展示课题列表
    export default {
        name: "list",
        data: function () {
            return {
                /**
                 * 状态名称
                 */
                statText: ['待审核', '已通过', '未通过'],
                /**
                 * 标题列表
                 */
                formHeaders: ['项目名称', '申请人', '信息初核状态', '申请日期', '文档', '附件'],
                /**
                 * 过滤关键词，来自input
                 */
                filterKey: [],
                /**
                 * input的placeholder
                 */
                placeholders: ['', '', '', '', '', 'y/n', 'y/n'],
                subjectList: [],
                projectList: [],
            }
        },
        async created() {
            try {
                this.projectList = (await api.data.app.list_prj()).data
                this.subjectList = (await api.data.app.list()).data
            } catch (e) {
                // TODO: 出错提示
                console.debug(e)
            }
        },
        computed: {
            /**
             * 课题列表
             */
            list() {
                return this.subjectList
            },
            listShow() {
                //筛选
                let pids = []
                if (this.filterKey[2]) {
                    // 查找项目名称，pid填充
                    pids = this.projectList.reduce((pre, cur) => {
                        if (cur.name.indexOf(this.filterKey[2]) !== -1)
                            pre.push(cur.pid)
                        return pre
                    }, [])
                    console.debug(pids)
                }
                return this.list.filter((item) => {
                    //过滤pid
                    if (this.$store.state.proid !== item.pid) {
                        return false
                    }
                    if (this.filterKey[0]) {
                        // 过滤ID
                        if (item.cid.toString().indexOf(this.filterKey[0]) === -1)
                            return false
                    }
                    if (this.filterKey[1]) {
                        // 过滤课题名称
                        if (item.name.toString().indexOf(this.filterKey[1]) === -1)
                            return false
                    }
                    if (this.filterKey[2]) {
                        // 过滤项目名称
                        if (pids.indexOf(item.pid) === -1)
                            return false
                    }
                    if (this.filterKey[3]) {
                        // 过滤申请人
                        if (item.applicant.indexOf(this.filterKey[3]) === -1)
                            return false
                    }
                    if (this.filterKey[4]) {
                        // 过滤状态
                        if (this.filterKey[4] === 'Rejected' && item.status !== -1) {
                            return false
                        } else if (this.filterKey[4] === 'Pending' && item.status !== 0) {
                            return false
                        } else if (this.filterKey[4] === 'Accepted' && item.status !== 1) {
                            return false
                        }
                    }
                    if (this.filterKey[5]) {
                        // 过滤申请日期
                        if (item.time.indexOf(this.filterKey[5]) === -1)
                            return false
                    }
                    if (this.filterKey[6]) {
                        // 过滤文档
                        if (this.filterKey[6] !== 'y' && this.filterKey[6] !== 'n')
                            return false
                        if (this.filterKey[6] === 'y' ^ item.pdf)
                            return false
                    }
                    if (this.filterKey[7]) {
                        // 过滤附件
                        if (this.filterKey[7] !== 'y' && this.filterKey[7] !== 'n')
                            return false
                        if (this.filterKey[7] === 'y' ^ item.zip)
                            return false
                    }
                    return true
                })
            },
            projectNameList() {
                return this.projectList.reduce((pre, cur) => {
                    pre[cur.pid] = cur.name
                    return pre
                }, [])
            }
        },
    }
</script>

<style scoped>

</style>
