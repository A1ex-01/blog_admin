/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 这里不使用icon，需要在./src/layouts/BasicLayout.ts中配置
 * @doc https://umijs.org/docs/guides/routes
 */

export default [
  // 默认展示主页的导航链接
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        path: 'version',
        name: '版本信息',
        hideInMenu: true,
        component: '@/pages/Version',
      },
      {
        path: '/',
        name: '工作台',
        // access: 'canReadWorkplace',
        routes: [
          {
            path: '/',
            name: '首页',
            component: '@/pages/Home',
            access: 'canReadWorkplace',
          },
          {
            path: 'census',
            name: '统计看板',
            component: '@/pages/Census',
            access: 'canReadDashboard',
          },
          {
            path: 'notify',
            hideInMenu: true,
            name: '全部通知',
            component: '@/pages/Notify',
          },
        ],
      },
      {
        path: '__dynamic',
        hideInMenu: true,
        component: '@/pages/__dynamic',
      },

      {
        path: '/',
        name: 'FA项目',
        // access: 'canReadDealFlow',
        routes: [
          {
            path: 'deal-flow',
            name: 'Deal Flow',
            component: '@/pages/DealFlow',
            access: 'canReadDealFlow',
          },
          {
            path: 'project-dynamic',
            name: '项目动态',
            component: '@/pages/ProjectDynamic',
            access: 'canReadDealFlow',
          },
          {
            path: 'project-recommend',
            name: '多项目路演',
            component: '@/pages/ProjectRecommend',
            access: 'canReadProjectRecommend',
          },
        ],
      },
      {
        path: '/Investor',
        name: '投资人库',
        component: '@/layouts/InvestorLayout',
        routes: [
          {
            path: 'institutions',
            name: '投资机构',
            access: 'canReadInstitutions',
            component: '@/pages/Institutions',
          },
          {
            path: 'investor',
            name: '投资人',
            access: 'canReadInvestor',
            component: '@/pages/Investor',
          },
          {
            path: 'dynamic',
            name: '投资人动态',
            component: '@/pages/InvestorDynamic',
          },
        ],
      },
      {
        path: '/company',
        name: '公司',
        routes: [
          {
            path: 'company',
            name: '公司列表',
            component: '@/pages/Company',
          },
          {
            path: 'competitor-search',
            name: '竞品搜索',
            component: '@/pages/CompetitorSearch',
            access: 'canReadCompanyCompeteSearch',
          },
        ],
      },
      // 项目内页
      {
        path: '/project-detail/:uuid',
        hideInMenu: true,
        // component: '@/layouts/BasicLayout',
        name: '项目详情',
        routes: [
          {
            path: '',
            name: '项目详情',
            component: '@/layouts/ProjectDetailLayout',
            routes: [
              {
                // ⚠️path默认使用-分割，注意规范
                path: 'financing-info',
                name: '融资信息',
                // ⚠️组件默认大驼峰，注意规范
                component: '@/pages/ProjectDetail/FinancingInfo',
              },
              {
                path: 'investor-progress',
                name: '投资人进度',
                component: '@/pages/ProjectDetail/InvestorProgress',
              },
              {
                path: 'foreign-financing-info',
                name: '融资信息',
                component: '@/pages/ProjectDetail/ForeignFinancingInfo',
              },
              // {
              //   path: 'foreign-investor-progress',
              //   name: '投资人进度',
              //   component: '@/pages/ProjectDetail/ForeignInvestorProgress',
              // },

              {
                path: 'project-dynamics',
                name: '项目动态',
                component: '@/pages/ProjectDetail/ProjectDynamics',
              },
              {
                path: 'project-files',
                name: '项目文件',
                component: '@/pages/ProjectDetail/ProjectFiles',
              },
              {
                path: 'project-delivery',
                name: '项目交割',
                component: '@/pages/ProjectDetail/ProjectDelivery',
              },
              {
                path: 'project-set-up',
                name: '项目交割',
                component: '@/pages/ProjectDetail/ProjectSetUp',
              },
              {
                path: 'project-calendar',
                name: '项目日历',
                component: '@/pages/ProjectDetail/ProjectCalendar',
              },
              {
                path: 'project-report',
                name: '项目简报',
                component: '@/pages/ProjectDetail/ProjectReport',
              },
            ],
          },
        ],
      },
      // 公司主页
      {
        path: '/company-detail',
        hideInMenu: true,
        // component: '@/layouts/BasicLayout',
        name: '公司详情',
        routes: [
          {
            path: ':company_id',
            name: '公司详情详情',
            component: '@/pages/Company/Detail',
            routes: [
              {
                path: '',
                redirect: 'company-info',
              },
              {
                path: 'company-info',
                name: '公司详情',
                component: '@/pages/Company/Detail/CompanyDetail',
              },
              {
                path: 'cap-table',
                name: 'Cap table',
                component: '@/pages/Company/Detail/CapTable',
              },
            ],
          },
        ],
      },
      // 投资人主页
      {
        path: '/investor-detail',
        hideInMenu: true,
        // component: '@/layouts/BasicLayout',
        name: '投资人详情',
        routes: [
          {
            path: ':LP_id',
            name: '投资人详情',
            component: '@/pages/Investor/Detail',
          },
        ],
      },
      // 投资机构主页
      {
        path: '/institution-detail/:uuid',
        hideInMenu: true,
        // component: '@/layouts/BasicLayout',
        name: '投资机构详情',
        routes: [
          {
            path: '',
            name: '投资机构详情',
            component: '@/layouts/InstitutionsDetailLayout',
            routes: [
              {
                path: 'institutional-details',
                name: '机构详情',
                component: '@/pages/Institutions/Detail/InstitutionalDetails',
              },
              {
                path: 'interaction-records',
                name: '交互记录',
                component: '@/pages/Institutions/Detail/InteractionRecords',
              },

              {
                path: 'transaction-records',
                name: '交易记录',
                component: '@/pages/Institutions/Detail/TransactionRecords',
              },
              {
                path: 'institutional-files',
                name: '机构附件',
                component: '@/pages/Institutions/Detail/InstitutionalFiles',
              },
            ],
          },
        ],
      },
      {
        path: '/calendar',
        name: '日历',
        routes: [
          {
            path: '/calendar',
            name: '我的日历',
            component: '@/pages/Calendar',
            access: 'canReadCalendar',
          },
        ],
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        routes: [
          {
            path: 'bi',
            name: '项目BI',
            component: '@/pages/BI',
            access: 'canReadDashboardProjectBi',
          },
          {
            path: 'statistics',
            name: '年度统计',
            component: '@/pages/Statistics',
            access: 'canReadDashboardYearlyStatistics',
          },
        ],
      },
      {
        path: '/user',
        hideInMenu: true,
        component: '@/pages/User',
        name: '个人设置',
        routes: [
          {
            path: '',
            redirect: 'base',
          },
          {
            path: 'base',
            name: '账号设置',
            component: '@/pages/User/components/AccountSettings',
          },
          {
            path: 'binding',
            name: '账号绑定',
            component: '@/pages/User/components/AccountBinding',
          },
        ],
      },

      // Update:此处额外添加路由权限，进行权限控制
      {
        path: '/Investor/institutions',
        name: '投资机构',
        hideInMenu: true,
        access: 'canReadInstitutions',
        component: '@/pages/Institutions',
      },
      {
        path: '/Investor/investor',
        name: '投资人',
        hideInMenu: true,
        access: 'canReadInvestor',
        component: '@/pages/Investor',
      },
      {
        path: '/dashboard/bi',
        name: '项目BI',
        hideInMenu: true,
        component: '@/pages/BI',
        access: 'canReadDashboardProjectBi',
      },
      {
        path: '/dashboard/statistics',
        name: '年度统计',
        hideInMenu: true,
        component: '@/pages/Statistics',
        access: 'canReadDashboardYearlyStatistics',
      },
      {
        path: '/company/competitor-search',
        name: '竞品搜索',
        hideInMenu: true,
        component: '@/pages/CompetitorSearch',
        access: 'canReadCompanyCompeteSearch',
      },
    ],
  },

  // 后台管理
  {
    path: '/admin',
    name: '管理后台',
    component: '@/layouts/AdminLayout',
    access: 'canReadAdmin',
    routes: [
      {
        path: 'general',
        name: '一般配置',
        access: 'canReadAdminSystem',
        routes: [
          {
            path: 'system',
            name: '系统信息',
            component: '@/pages/admin/System',
            access: 'canReadAdminSystem',
          },
          {
            path: 'other-config',
            name: '其他配置',
            component: '@/pages/admin/OtherConfig',
            access: 'canReadAdminOther',
          },
        ],
      },
      {
        path: 'users',
        name: '用户与权限',
        routes: [
          {
            path: 'list',
            name: '账号管理',
            component: '@/pages/admin/users/StaffList',
            access: 'canReadAdminUser',
          },
          {
            path: 'roles',
            name: '角色与权限',
            component: '@/pages/admin/users/Roles',
            access: 'canReadAdminRole',
          },
          {
            path: 'co-operation-accounts',
            name: '外部授权账号',
            component: '@/pages/admin/users/CoOperationAccounts',
            access: 'canReadAdminUser',
          },
        ],
      },
      {
        path: 'email-manage',
        name: '邮件配置',
        routes: [
          {
            path: 'email',
            name: '邮件服务器',
            component: '@/pages/admin/EmailManage/Email',
            access: 'canReadAdminUser',
          },
        ],
      },
      {
        path: 'tags-manage',
        name: '标签管理',
        routes: [
          {
            path: 'region',
            name: '返投地区',
            component: '@/pages/admin/TagsManage/Region',
            access: 'canReadAdminArea',
          },
          {
            path: 'industry',
            name: '行业标签',
            component: '@/pages/admin/TagsManage/Industry',
            access: 'canReadAdminScope',
          },
          {
            path: 'hot-spot',
            name: '热点标签',
            component: '@/pages/admin/TagsManage/HotSpot',
            access: 'canReadAdminTag',
          },
        ],
      },
      // Update:此处额外添加路由权限，进行权限控制
      {
        path: '/admin/general/system',
        name: '系统信息',
        hideInMenu: true,
        access: 'canReadAdminSystem',
        component: '@/pages/Institutions',
      },
      {
        path: '/admin/users/list',
        hideInMenu: true,
        name: '账号管理',
        component: '@/pages/admin/users/StaffList',
        access: 'canReadAdminUser',
      },
      {
        path: '/admin/users/roles',
        hideInMenu: true,
        name: '角色与权限',
        component: '@/pages/admin/users/Roles',
        access: 'canReadAdminRole',
      },
      {
        hideInMenu: true,
        path: '/admin/general/other-config',
        name: '其他配置',
        component: '@/pages/admin/OtherConfig',
        access: 'canReadAdminOther',
      },
      {
        path: '/admin/email-manage/email',
        hideInMenu: true,
        name: '邮件配置',
        component: '@/pages/admin/users/Roles',
        access: 'canReadAdminUser',
      },
      {
        path: '/admin/tags-manage/region',
        hideInMenu: true,
        name: '返投地区',
        component: '@/pages/admin/users/Roles',
        access: 'canReadAdminArea',
      },
      {
        path: '/admin/tags-manage/industry',
        hideInMenu: true,
        name: '行业标签',
        component: '@/pages/admin/users/Roles',
        access: 'canReadAdminScope',
      },
      {
        path: '/admin/tags-manage/hot-spot',
        hideInMenu: true,
        name: '热点标签',
        component: '@/pages/admin/users/Roles',
        access: 'canReadAdminTag',
      },
    ],
  },

  // 登录
  {
    path: '/login',
    hideInMenu: true,
    layout: false,
    component: '@/pages/Login',
  },

  // 鉴权
  {
    path: '/oauth',
    component: '@/layouts/BlankLayout',
    routes: [
      {
        path: 'wechat/login-callback',
        name: '微信登录',
        component: '@/pages/oauth/WechatLogin',
      },
    ],
  },
  {
    path: '/co-operation/login',
    name: '合作方登录',
    component: '@/pages/co-operation/Login',
    // access: 'canReadAdmin',
    // redirect: '/admin/general/system',
  },
  {
    path: '/co-operation',
    name: '管理后台',
    component: '@/layouts/CoOperationLayout',
    wrappers: ['@/wrappers/auth'],
    // access: 'canReadAdmin',
    // redirect: '/admin/general/system',
    routes: [
      {
        path: '',
        redirect: 'list',
      },

      {
        path: 'list',
        name: '项目列表',
        // component: '@/pages/co-operation/List',
        routes: [
          {
            path: '',
            component: '@/pages/co-operation/List',
          },
          {
            path: ':uuid',
            name: '项目详情',
            component: '@/layouts/CoProjectDetailLayout',
            routes: [
              {
                path: '',
                redirect: 'foreign-financing-info',
              },
              {
                path: 'foreign-financing-info',
                name: '融资信息',
                component: '@/pages/CoProjectDetail/ForeignFinancingInfo',
              },
              {
                path: 'foreign-investor-progress',
                name: '投资人进度',
                component: '@/pages/CoProjectDetail/ForeignInvestorProgress',
              },
            ],
          },
        ],
      },
      {
        path: 'admin',
        name: '个人中心',
        component: '@/pages/co-operation/admin/User',
        routes: [
          {
            path: '',
            redirect: 'base',
          },
          {
            path: 'base',
            name: '个人信息',
            component:
              '@/pages/co-operation/admin/User/components/AccountSettings',
          },
          {
            path: 'safe',
            name: '安全设置',
            component:
              '@/pages/co-operation/admin/User/components/SafeSettings',
          },
          {
            path: 'binding',
            name: '账号绑定',
            component:
              '@/pages/co-operation/admin/User/components/AccountBinding',
          },
        ],
      },
    ],
  },
  {
    path: '/external',
    component: '@/layouts/BlankLayout',
    routes: [
      {
        path: 'project-recommendation/:uuid',
        name: '项目推荐',
        component: '@/pages/external/ProjectRecommendation',
      },
      {
        path: 'to-public/project-recommendation/:uuid',
        name: '公开项目推荐',
        component: '@/pages/external/toPublic/ProjectRecommendation',
      },
      {
        path: 'mixin/project-recommendation/:uuid',
        name: '公开项目推荐',
        component: '@/pages/external/mixin/ProjectRecommendation',
      },
      {
        path: 'mixin/pre/project-recommendation/:uuid',
        name: '预览项目推荐',
        component: '@/pages/external/mixin/pre/ProjectRecommendation',
      },
    ],
  },
  // pdf预览
  {
    path: '/pdf/:uuid',
    hideInMenu: true,
    layout: false,
    component: '@/pages/PdfPreview',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
  {
    path: '/releases',
    hideInMenu: true,
    layout: false,
    component: '@/layouts/ReleasesLayout',
    routes: [
      {
        path: '',
        component: '@/pages/Releases',
      },
    ],
  },
];
