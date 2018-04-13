<template>
	<div class="seeting_drug">
		<el-table :data="tableData.slice((currentPage-1)*pagesize,pagesize*currentPage)" style="width: 100%" height='400' highlight-current-row  border>
			<el-table-column prop="dnumber" label="柜号" width="180">
			</el-table-column>
			<el-table-column prop="names" label="柜名称" width="180">
			</el-table-column>
			<el-table-column prop="location_dd" label="位置" >
			</el-table-column>
			<el-table-column prop="location_ip" label="IP"width='240'>
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
	import seeting from './Seetingdrug'
	export default {
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
			this.$axios({
				methods: 'get',
				url: 'https://www.easy-mock.com/mock/5acadfcb6c11675e15295842/example/',
				response: 'json'
			}).then(res => {
				this.drugall = res.data.data.data
			}).catch()				
			this.$axios({
				method: 'get',
				url: 'https://www.easy-mock.com/mock/5acadfcb6c11675e15295842/example/drugadmin' ,
				responseType:'json'
			}).then(rep => {
			this.tableData =	rep.data.data.data
			this.totalset = this.tableData.length
			console.log(this.drug_All)
			}).catch(rep => {
			})
		},
		methods: {
			SeetingClick(i) {
				this.drugseet_index = i
				this.bus.$emit('drug_seet', true)				
			},
			currentset_change(i) {
				this.currentPage = i
			}
		},
		components: {
			seeting
		}
	}
</script>

<style>

</style>