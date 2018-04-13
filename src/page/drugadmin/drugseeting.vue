<template>
	<div class="seeting_drug">
		<el-table :data="tableData.slice((currentPage-1)*pagesize,pagesize*currentPage)" style="width: 100%" height='400' highlight-current-row  border>
			<el-table-column prop="cnumber" label="柜号" width="180">
			</el-table-column>
			<el-table-column prop="name" label="柜名称" width="180">
			</el-table-column>
			<el-table-column prop="opsition" label="位置" >
			</el-table-column>
			<el-table-column prop="ip" label="IP"width='240'>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button icon="el-icon-setting" @click="SeetingClick(scope.row)" type="primary" size="small">配置</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @current-change='currentset_change' background layout="prev, pager, next" :total="totalset">
		</el-pagination>		
		<seeting :drugall_list='drugall' :drugseet='drugseet_index'></seeting>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	import seeting from './Seetingdrug'
	export default {
		props: {
			drug_All: {
				type: Array
			}
		},
		data() {
			return {
				tableData: [],
				totalset: 0, //默认数据总数
				pagesize: 10, //每一页的数据
				currentPage: 1, //默认开始页	
				drugseet_index: {},
				drugall: []
			}
		},
		created() {
			this.getData()
			this.$axios({
				methods: 'get',
				url: Uurl.PostUurl.queryallDrugInfo,
				response: 'json'
			}).then(res => {
				this.drugall = JSON.parse(res.data.data)
				console.log(this.drugall)
			}).catch()
		},
		mounted() {
			this.getData()
		},
		methods: {
			SeetingClick(i) {
				this.drugseet_index = i
				this.bus.$emit('drug_seet', true)				
			},
			currentset_change(i) {
				this.currentPage = i
			},
			getData() {
			this.tableData = this.drug_All
			this.totalset = this.tableData.length					
			}
		},
		components: {
			seeting
		}
	}
</script>

<style>

</style>