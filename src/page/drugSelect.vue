<template>
		<div class="selected">
			<span style="line-height: 40px">查询条件：</span>
				<el-select v-model="search_selet" filterable placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>			
				<div class="selectinput">
					<el-input placeholder="请输入内容" v-model="search_input"  clearable>
					</el-input>
				</div>
				<el-button type="primary" @click='Searcheven' icon="el-icon-search">搜索</el-button>
				<div class="pull" v-show="pullshow">
					<el-button type="warning" round>领药申请</el-button>
				</div>
				<div class="pull" v-show="newAdd">
					<el-button type="success" icon="el-icon-circle-plus" @click='dialog'>新增</el-button>
				</div>
				<div class="pull" v-show="Alter">
					<el-button type="info" icon="el-icon-edit">修改</el-button>
				</div>
				<div class="pull">
					<el-button type="danger" icon="el-icon-delete" @click = 'deleat_all'>删除</el-button>
				</div>
		</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	export default {
		props: {
			deleatdrugAll: {
				type: Array
			},
			fordrug: {
				type: Object
			},
//			控制领药申请按钮是否显示
			pullshow: {
				type: Boolean   
			},
//			控制新增按钮是否显示
			newAdd: {
				type: Boolean
			},
			//删除
			deleted: {
				type: Boolean
			},
			//修改
			Alter: {
				type: Boolean
			}
		},
		data() {
			return {
				search_input: '',
				search_selet: '',
				restaurts: [],
				options: [],
				deleatdrug_all: '',
				Searchurl: '',
				
			}
		},
		mounted() {
			this.getdrugdata()
		},
		methods: {
			//搜索结果返回
			Searcheven() {
				this.$axios({
					method: "post",
					url: Uurl.PostUurl.Searchurl,
					data: {
								search_input: this.search_input, search_selet: this.search_selet
							},
				}).then(rep => {
					if(rep.status === 200) {
						this.restaurts = rep.data.data
						if(this.$route.params.attri == 1) {
							this.$emit('searchcount', this.restaurts)
						}
					}
				})
			},
			//删除结果
			deleat_all() {
				console.log(this.deleatdrugAll)
				 
			},
			getdrugdata() {
			this.options = this.$route.params.dataobj
			},
			dialog() {
				this.bus.$emit('dialogshow',true)
			}
		},
		watch:{
				'$route' : 'getdrugdata'
			}
	}
</script>

<style lang="stylus">
	.selected
		display: flex
		.selectinput
			flex: 0 0 200px
			margin: 0 10px
		.pull
			margin: 0 10px
</style>