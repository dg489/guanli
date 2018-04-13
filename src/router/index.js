import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import drugcontrol from '@/components/drugControl'
import drug from '@/page/drug'
import drugadmin from '@/page/drugadmin'

Vue.use(Router)

export default new Router({
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
    	children: [
    	{
    		path: '/drugcontrol/drug',
    		name: 'drug',
    		component: drug
    	},
    	{
    		path: '/drugcontrol/drugpull',
    		name: 'drugpull',
    		component: drug
    	},
    	{
    		path: '/drugcontrol/drugadmin/',
    		name: 'drugadmin',
    		component: drugadmin
    	}
    	]
    }
  ]
})
