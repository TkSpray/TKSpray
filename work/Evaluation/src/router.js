import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/login',
    component: () => import('./views/login/index'),
    children: [{
      path: '/',
      component: () => import('./views/login/sms')
    },
    {
      path: 'password',
      component: () => import('./views/login/passwordLogin')
    },
    {
      path: 'registe',
      component: () => import('./views/login/registe')
    }
    ]
  },
  {
    path: '/student/project',
    meta: {
      title: '选择项目类别',
      subTitle: ''
    },
    components: {
      default: () => import('@/views/student/selectProject')
    }
  },
  {
    path: '/student',
    component: () => import('@/views/student/index'),
    children: [{
      // 展示课题列表
      path: '/',
      components: {
        default: () => import('@/views/student/main'),
        sub: () => import('@/views/student/subPannel')
      },
      meta: {
        title: '项目列表',
        subTitle: '导航'
      }
    },
    {
      // 新建课题
      path: 'new',
      meta: {
        title: '新建项目',
        subTitle: '导航'
      },
      components: {
        default: () => import('@/views/student/newSubject'),
        sub: () => import('@/views/student/subPannel')
      }
    },
    {
      // 查看通知
      path: 'notice',
      meta: {
        title: '通知',
        subTitle: '导航'
      },
      components: {
        default: () => import('@/views/student/notice'),
        sub: () => import('@/views/student/subPannel')
      }
    },
    {
      // 修改密码
      path: 'password',
      meta: {
        title: '修改密码',
        subTitle: '导航'
      },
      components: {
        default: () => import('@/views/student/password'),
        sub: () => import('@/views/student/subPannel')
      }
    },
    {
      // 展示文章
      path: ':cid',
      meta: {
        title: '文章',
        subTitle: '导航'
      },
      components: {
        default: () => import('@/views/student/articles'),
        sub: () => import('@/views/student/subPannel')
      },
      props: {
        default: true,
        sub: true
      }
    }
    ]
  },
  {
    path: '/judger',
    component: () => import('@/views/judger/index'),
    children: [{
      path: '/',
      meta: {
        title: '项目列表',
        subTitle: '导航',
        judgeable: false
      },
      components: {
        default: () => import('@/views/judger/main'),
        sub: () => import('@/views/judger/subPannel')
      }
    },
    {
      path: 'notice',
      meta: {
        title: '通知',
        subTitle: '导航',
        judgeable: false
      },
      components: {
        default: () => import('@/views/judger/notice'),
        sub: () => import('@/views/judger/subPannel')
      }
    },
    {
      // 展示文章
      path: ':cid',
      meta: {
        title: '文章',
        subTitle: '导航',
        judgeable: true
      },
      components: {
        default: () => import('@/views/judger/articles'),
        sub: () => import('@/views/judger/subPannel')
      },
      props: {
        default: true,
        sub: true
      }
    }
    ]
  },
  {
    path: '/admin',
    component: () => import('./pages/adminlogin/selectpro.vue')
  },
  {
    path: '/adminindex',
    component: () => import('./pages/adminlogin/adminlogin.vue'),
    meta: {
      keepAlive: false
    },
    children: [{
      path: '/',
      component: () => import('./componentadmin/mainshow.vue')
    },
    {
      path: 'examining',
      component: () => import('./componentadmin/mainshow.vue')
    },
    {
      path: 'examined',
      component: () => import('./componentadmin/mainshow.vue')
    },
    {
      path: 'evaluate',
      component: () => import('./componentadmin/evaluate.vue'),
      children: [{
        path: '/',
        component: () => import('./componentadmin/mainshow.vue')
      }, {
        path: 'divide',
        component: () => import('./componentadmin/divide.vue')
      }]
    },
    {
      path: 'scoretable',
      component: () => import('./componentadmin/scorebar.vue')
    },
    {
      path: 'contentmanager',
      component: () => import('./componentadmin/contentmanager.vue')
    },
    {
      path: 'score',
      component: () => import('./componentadmin/score.vue')
    },
    {
      path: 'usermanager',
      component: () => import('./componentadmin/usermanager.vue')
    },
    {
      path: 'adminmanager',
      component: () => import('./componentadmin/adminmanager.vue')
    }
    ]
  },
  {
    // 根目录，跳转决定
    path: '/',
    redirect: '/login'
  },
  {
    // TODO:404
    path: '*'
  }
  ]
})

export default router
