<template>
		<div class="selected">
			<span style="line-height: 40px">查询条件：</span>
				<el-select v-model="search_selet" filterable placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>			
				<div class="selectinput">
					<el-input :disabled='buttondiss' placeholder="请输入内容" v-model="search_input"  clearable>
					</el-input>
				</div>
				<el-button type="primary" @click='Searcheven' icon="el-icon-search">搜索</el-button>
				<div class="pull">
					<el-button type="success" icon="el-icon-circle-plus" @click='dialog'>新增</el-button>
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
			}
		},
		data() {
			return {
				search_input: '',
				search_selet: 0,
				restaurts: [],
				options:  [
				{
					value: 0,
					label: '全部'
				},
				{
					value:  1,
					label: '药柜编号'
				}, {
					value: 2,
					label: '药品编号'
				}, {
					value: 3,
					label: '药品名称'
				}],
				deleatdrug_all: '',
			}
		},
		mounted() {
		},
		methods: {
			//搜索结果返回
			Searcheven() {
				this.$axios({
					method: "post",
					url: Uurl.PostUurl.cabinet,
					data: {
						search_input: this.search_input,
						search_selet: this.search_selet
						}
				}).then(rep => {
					this.restaurts = rep
					this.$emit('searchcount', this.restaurts)
				}).catch(rep =>{})
			},
			dialog() {
				this.bus.$emit('dialogshow',true)
			}
		},
		computed: {
			buttondiss() {
				if(this.search_selet === 0) {
					return true
				} else {
					return false
				}
			}
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