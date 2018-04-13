<template>
			<div class="menu-count">
				<el-menu default-active="1" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span >药品管理</span>
						</template>
						<el-menu-item-group disabled>
							<el-menu-item index="1-1" @click="drugfor" > 药品库存</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<el-menu-item index="1-2" @click="drugfor">药品申请</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<el-menu-item index="1-3" @click='drugpull'>药品领药</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<el-menu-item index="1-4" @click="drugpull">药品加药</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-search"></i>
							<span>查询管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="2-1">查询监控</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<el-menu-item index="2-2">操作查询</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<el-menu-item index="2-3">违规查询</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-document"></i>
							<span slot="title">系统管理</span>
						</template>

						<el-menu-item-group>
							<el-menu-item index="3-1">用户管理</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<el-menu-item index="3-2">权限管理</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<el-menu-item index="3-3">指纹管理</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
							<el-menu-item index="3-4">药柜管理</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group>
						<router-link to="/drugcontrol/drugadmin/" style="color:#fff">
							<el-menu-item index="3-5">药品管理</el-menu-item>
						</router-link>
						</el-menu-item-group>
						<el-menu-item-group>
							<el-menu-item index="3-6">系统参数</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</div>
</template>

<script>
//	药品管理界面的搜索
	const ATTRI = 1 
	export default {
		methods: {
      		linkedrug() {
	        this.$router.push({path:'/drugcontrol/drug'})
      		},
      		drugfor() {
	        this.$router.push(
	        	{path:'/drugcontrol/drug/',
	        	 name:'drug',
	        	 params:{
	        		name: 'drug',
	        		dataobj: this.drugfordata,
	        	}
	        })
      		},
      		drugpull() {
	        this.$router.push(
	        	{path:'/drugcontrol/drugpull/',
	        	 name:'drugpull',
	        	 params:{
	        		name: 'drugpull',
	        		dataobj: this.drugpulldata
	        	}
	        })      			
      		},
      		Alldrugpull() {
      		this.$router.push(
	        	{path:'/drugcontrol/drugadmin/',
	        	 name:'drugadmin',
	        	 params:{
	        		name: 'drugadmin',
	        		attri: ATTRI
	        	}
	        })
      		}
   	},
		data() {
			return {
				drugfordata: [{
					value:  1,
					label: '药柜编号'
				}, {
					value: 2,
					label: '药品编号'
				}, {
					value: 3,
					label: '药品名称'
				}],
				drugpulldata: [{
					value: 1,
					label: '申请人'
				}, {
					value: 2,
					label: '未审批'
				}, {
					value: 3,
					label: '已审批'
				}, {
					value: 4,
					label: '领药人'
				}, {
					value: 5,
					label: '加药人'
				}
				],
			}
		}	
}
</script>

<style lang="stylus" scoped="scoped">
.menu-count
	width: 100%
	height: 100%
	background-color: #545c64
	.el-menu
		border: none
</style>