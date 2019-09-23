import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('/page/index.vue')
const Login = () => import('/page/Login/login.vue')
const register = () => import('/page/Login/register.vue')
const forgetpwd = () => import('/page/Login/forgetpwd.vue')
const Home = () => import('/page/Home/home.vue')
const taskUser = () => import('/page/Home/taskUser.vue')
const Help = () => import('/page/Home/help.vue')
const download = () => import('/page/Home/download.vue')
const Gene = () => import('/page/Home/gene.vue')
const Drug = () => import('/page/Home/drug.vue')
const Authority = () => import('/page/Home/authority.vue')
const ClinicalNotes = () => import('/page/Home/clinicalNotes.vue')
const ClinicalTrials = () => import('/page/Home/clinicalTrials.vue')
const DrugGenePair = () => import('/page/Home/drugGenePair.vue')
const DrugLabels = () => import('/page/Home/drugLabels.vue')
const Patent = () => import('/page/Home/patent.vue')
const order = () => import('/page/Order/order.vue')
const user = () => import('/page/User/user.vue')
const information = () => import('/page/User/children/information.vue')
const taskhall = () => import('/page/Taskhall/taskhall.vue')
const QueryAllResult = () => import('/page/Search/queryAllResult.vue')
const SearchContent = () => import('/page/Search/searchContent.vue') // 基因
const SearchDruGenePair = () => import('/page/Search/searchDruGenePair.vue') // 药物基因对
const SearchDrug = () => import('/page/Search/searchDrug.vue') // 药物
const RefreshSearch = () => import('/page/Refresh/refreshsearch.vue')
const RefreshGoods = () => import('/page/Refresh/refreshgoods.vue')

Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    component: Index,
    name: 'index',
    redirect: '/home',
    children: [{
        path: 'home',
        component: Home
      },
      {
        path: '/refreshgoods',
        name: 'refreshgoods',
        component: RefreshGoods
      }
      ]
  },
  {
    path: '/download',
    name: 'download',
    component: download
  },
  {
    path: '/help',
    name: 'help',
    component: Help
  },
  {
    path: '/taskUser',
    name: 'taskUser',
    component: taskUser
  },
  {
    path: '/authority',
    name: 'authority',
    component: Authority
  },
  {
    path: '/gene',
    name: 'gene',
    component: Gene
  },
  {
    path: '/clinicalNotes',
    name: 'clinicalNotes',
    component: ClinicalNotes
  }, {
      path: '/clinicalTrials',
      name: 'clinicalTrials',
      component: ClinicalTrials
    }, {
      path: '/drugGenePair',
      name: 'drugGenePair',
      component: DrugGenePair
    }, {
      path: '/drugLabels',
      name: 'drugLabels',
      component: DrugLabels
    }, {
      path: '/patent',
      name: 'patent',
      component: Patent
    },
  {
    path: '/drug',
    name: 'drug',
    component: Drug
  },
  {
    path: '/searchDruGenePair',
    name: 'searchDruGenePair',
    component: SearchDruGenePair
  }, {
      path: '/searchDrug',
      name: 'searchDrug',
      component: SearchDrug
    },
  {
    path: '/searchContent',
    name: 'searchContent',
    component: SearchContent
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/forgetpwd',
    name: 'forgetpwd',
    component: forgetpwd
  },
  {
    path: '/refreshsearch',
    name: 'refreshsearch',
    component: RefreshSearch
  },
  {
    path: '/order',
    name: 'order',
    component: order,
    children: [{
        path: '/queryAllResult',
        name: 'queryAllResult',
        component: QueryAllResult
      }]
  },
  {
    path: '/user',
    name: 'user',
    component: user,
    redirect: '/user/information',
    children: [{
        path: 'information',
        name: '用户资料',
        component: information
      }]
  },
  {
    path: '/taskhall',
    name: 'taskhall',
    component: taskhall
  },
    // {
    //   path: '/getajax',
    //   name: 'getajax',
    //   component: getajax
    // },
  {
    path: '*',
    redirect: '/home'
  }
  ]
})
