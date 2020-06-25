import { post } from '@/utils/request'
import { request } from '../utils/request'
import conf from '../config.js'
// import conf from '@/config'

const func_table = {
  user: [
    'login',
    'sms',
    'one_time_login',
    'id',
    'reset_password',
    'reg',
    'logout'
  ],
  // TODO: 添加路径
  data: {
    app: [
      'list',
      'subject',
      'list_prj',
      'notice',
      'standard',
      'new_app',
      'upload_pdf',
      'upload_zip'
      // download_xxx 使用GET触发下载，不在标准API中
    ],
    jug: [
      'notice',
      'standard',
      'list',
      'score',
      'upload_table',
      'query_score'
    ],
    adm: [
      'list',
      'new_prj',
      'mod_prj',
      'list_groups',
      'query_group',
      'new_group',
      'add_user',
      'query_content',
      'review',
      'mod_content',
      'notice',
      'mod_notice',
      'standard',
      'mod_standard',
      'add_question',
      'del_question',
      'query_question',
      'upload_table'
    ],
    root: [
      'add_adm'
    ]
  }
}

/**
 *
 * @param table
 * @param preTag
 */
function parseFunc (table, preTag = '') {
  if (Array.isArray(table)) {
    // in root
    const tableUrl = table.map((v) => {
      return preTag + '/' + v
    })
    // FIXME:没有必要使用正则
    return tableUrl.reduce((o, val) => {
      o[(/.*\/(.*?)$/.exec(val))[1]] = (param) => {
        return post(conf.SERVER_PATH + val, param)
      }
      return o
    }, {})
  }
  const ks = Object.keys(table)
  ks.map((v) => {
    table[v] = parseFunc(table[v], preTag + '/' + v)
  })
  return table
}

const table = parseFunc(func_table)

// 夹私货
table.data.app.upload_zip = (param) => {
  return request(conf.SERVER_PATH + '/data/app/upload_zip', 'POST', param, false)
}
table.data.app.upload_pdf = (param) => {
  return request(conf.SERVER_PATH + '/data/app/upload_pdf', 'POST', param, false)
}

table.data.app.upload_table = (param) => {
  return request(conf.SERVER_PATH + '/data/jug/upload_table', 'POST', param, false)
}

export default table
