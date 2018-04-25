import Vue from 'vue'
import Router from 'vue-router'
const login = r => require.ensure([], () => (require('@/components/login')),'login')
const drugcontrol = r => require.ensure([], () => (require('@/components/drugcontrol')),'drugcontrol')
const drug = r => require.ensure([], () => (require('@/page/drug/drugstock/drug')),'drug')
const drugask = r => require.ensure([], () => (require('@/page/drug/drugask/drugask')),'drug')
const drugpull = r => require.ensure([], () => (require('@/page/drug/drugpull/drugpull')),'drug')
const drugadd = r => require.ensure([], () => (require('@/page/drug/adddrug/drugadd')),'drug')
const drugadmin = r => require.ensure([], () => (require('@/page/SystemAdmin/drugadmin/drugadmin')),'drugadmin')
const cabinetadmin = r => require.ensure([], () => (require('@/page/SystemAdmin/cabinetadmin/cabinet')),'cabinetadmin')
const user = r => require.ensure([], () => (require('@/page/SystemAdmin/userControl/userControl')),'user')
const SystemControl = r => require.ensure([], () => (require('@/page/SystemAdmin/SystemItem/SystemControl')),'SystemControl')
const prowconfig = r => require.ensure([], () => (require('@/page/SystemAdmin/powerconfig/prowerconfig')),'prowconfig')
const srole = r => require.ensure([], () => (require('@/page/SystemAdmin/Srole/SroleControl')),'srole')
const videoquery = r => require.ensure([], () => (require('@/page/demand/video/videoquery')),'video')
const operationquery = r => require.ensure([], () => (require('@/page/demand/operation/operation')),'operationquery')
const rule = r => require.ensure([], () => (require('@/page/demand/rule/Rule')),'rule')
const msg = r => require.ensure([], () => (require('@/page/message/surgery/msg')),'msg')

Vue.use(Router)

 const routers =  new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
    	path: '/drugcontrol',
    	name: 'drugcontrol',
    	component: drugcontrol,
    	meta: {
    		login: true
    	},
    	children: [
    	{
    		path: '/drugcontrol/drug',
    		name: 'drug',
    		component: drug,
	    	meta: {
	    		login: true
	    	},
    	},
    	{
    		path: '/drugcontrol/drugask',
    		name: 'drugask',
    		component: drugask,
	    	meta: {
	    		login: true
	    	},
    	},
    	{
    		path: '/drugcontrol/drugpull',
    		name: 'drugpull',
    		component: drugpull,
	    	meta: {
	    		login: true
	    	},
    	},
    	{
    		path: '/drugcontrol/drugadd',
    		name: 'drugadd',
    		component: drugadd,
	    	meta: {
	    		login: true
	    	},
    	},    	
    	{
    		path: '/drugcontrol/drugadmin/',
    		name: 'drugadmin',
    		component: drugadmin,
	    	meta: {
	    		login: true
	    	},
    	},
    	{
    		path: '/drugcontrol/cabinetadmin/',
    		name: 'cabinetadmin',
    		component: cabinetadmin,
	    	meta: {
	    		login: true
	    	},
    	},
    	{
    		path: '/drugcontrol/user/',
    		name: 'user',
    		component: user,
	    	meta: {
	    		login: true
	    	},
    	},
    	{
    		path: '/drugcontrol/SystemControl/',
    		name: 'SystemControl',
    		component: SystemControl,
	    	meta: {
	    		login: true
	    	},    		
    	},
    	{
    		path: '/drugcontrol/prowerconfig/',
    		name: 'prowconfig',
    		component: prowconfig,
	    	meta: {
	    		login: true
	    	},        		
    	},
    	{
    		path: '/drugcontrol/srole/',
    		name: 'srole',
    		component: srole,
	    	meta: {
	    		login: true
	    	},        		
    	},
    	{
    		path: '/drugcontrol/query/',
    		name: 'videoquery',
    		component: videoquery,
	    	meta: {
	    		login: true
	    	},       		
    	},
    	{
     		path: '/drugcontrol/operationquery/',
    		name: 'operationquery',
    		component: operationquery,
	    	meta: {
	    		login: true
	    	},	
    	},
    	{
     		path: '/drugcontrol/Rule/',
    		name: 'rule',
    		component: rule,
	    	meta: {
	    		login: true
	    	},	
    	},
    	{
     		path: '/drugcontrol/Msg/',
    		name: 'msg',
    		component: msg,
	    	meta: {
	    		login: true
	    	},	
    	}	
    	]
    }
  ]
})
//routers.beforeEach((to, from, next) => {
//if (to.matched.some(record => record.meta.login)) {
//  // this route requires auth, check if logged in
//  // if not, redirect to login page.
//  console.log(to)
//  console.log(from)
//  console.log(next)
////  if (!auth.loggedIn()) {
////    next({
////      path: '/login',
////      query: { redirect: to.fullPath }
////    })
////  } else {
////    next()
////  }
//} else {
//  next() // 确保一定要调用 next()
//}
//})
export default routers