//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },

  {
    //登录成功以后展示数据的路由
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },

    redirect: '/home',

    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/calendar',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/word',
        component: () => import('@/views/word/EnglishWord.vue'),
        meta: {
          title: '背单词',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/user',
        component: () => import('@/views/user/User.vue'),
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/user/add',
        component: () => import('@/views/user/AddUser.vue'),
        meta: {
          title: '新增用户',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/user/detail/:id',
        component: () => import('@/views/user/DetailUser.vue'),
        meta: {
          title: '用户详情',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/user/update/:id',
        component: () => import('@/views/user/UpdateUser.vue'),
        meta: {
          title: '修改用户',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
      {
        path: '/note',
        // component: () => import('@/views/note/Note.vue'),
        component: () => import('@/views/note/InfiniteScrollTop.vue'),
        meta: {
          title: '笔记本',
          hidden: false,
          icon: 'HomeFilled',
        },
      },

    ],
  },

  {
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },

]

//任意路由
export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}
