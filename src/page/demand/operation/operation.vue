<template>
	<div class="drugpull_count">
				<div class="admin_serch">
					<span style="line-height: 40px">查询条件：</span>
					<el-select v-model="search_selet" filterable placeholder="请选择" class="el-select-cd">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<div class=" pull" style="width: 227px;">
						<el-input placeholder="请输入内容" v-model="search_input" clearable>
						</el-input>
					</div>
					<div class="pull">
						<el-button type="primary" round icon="el-icon-search" @click='Searcheven'>查看</el-button>
					</div>
					<div class="pull">
						<el-button type="danger" round icon="el-icon-delete" @click='delete_pull'>删除</el-button>
					</div>
				</div>
				<p style="margin-bottom: 4px;">操作列表：</p>
				<el-table :data="tableData" 
					:row-key='getrowkey' style="width: 100%" height='500' 
					@selection-change="drugSelectionChange" 
					@select-all='drugSelectionChange' 
					highlight-current-row
					border>
					<el-table-column type="selection" width="55" prop='id' :reserve-selection = true>
					</el-table-column>
					<el-table-column prop="dnumber" label="序号" type='index' width='50'>
					</el-table-column>
					<el-table-column prop="user_name" label="用户名">
					</el-table-column>
					<el-table-column prop="time" label="时间">
					</el-table-column>
					<el-table-column prop="opsition" label="地点">
					</el-table-column>
					<el-table-column prop="events" label="事件">
					</el-table-column>	
					<el-table-column fixed="right" label="操作" >
						<template slot-scope="scope">
							<el-button icon="el-icon-view" @click="CheckClick(scope.row)" type="primary" size="small">查看详情</el-button>
						</template>
					</el-table-column>					
				</el-table>				
				<el-pagination @current-change='current_change' background layout="prev, pager, next" :total="totalmax">
				</el-pagination>
				<checkpoera :msg = 'status_index' ></checkpoera>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	import checkpoera from './checkoper'
	export default {
	data() {
		return {
			totalmax: 0, //默认数据总数
			currentPage: 1, //默认开始页
			search_selet: 0,//搜索下拉框
			search_input: '',
			status_index: {},
			tableData: [{
				user_name: '张三',
				time: '2017-1-7',
				opsition: '华昇',
				events: '处方加药'
			},
			{
				user_name: '张三',
				time: '2017-1-7',
				opsition: '华昇',
				events: '处方取药'
			},
			{
				user_name: '张三',
				time: '2017-1-7',
				opsition: '华昇',
				events: '余液回收'
			}],
			getrowkey(row) {
				return row.id
			},			
			status_vul: [],
			deleatdrug: [], //删除功能的变量
			options: [{
					value: 0,
					label: '药柜名'
				},{
					value: 1,
					label: '用户名'
				}, {
					value: 2,
					label: '时间段'
				},
				{
					value: 3,
					label: '事件'
				}
			],			
		}
	},
	components: {
		checkpoera
	},
	methods: {
		Searcheven() { //搜索
			this.$axios({
				method: "post",
				url: Uurl.PostUurl.applylook,
				data: {
					search_input: this.search_input,
					search_selet: this.search_selet
				}
			}).then(rep => {
				console.log(rep)
				if(rep.status === 200) {
					this.tableData = JSON.parse(rep.data.data)
					this.total = this.tableData.length
					this.totalmax = this.tableData.length
				}
			})
		},
		delete_pull() { //批量删除
			this.tableData = this.tableData.filter(ele => this.deleatdrug.indexOf(ele.status) == -1)				
			 this.$refs.multipleTable.clearSelection()
//				if(this.deleatdrug.length === 0) {
//					this.$message({
//						message: '请选择要删除的记录',
//						type: 'warning'
//					})
//				} else {
//					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
//						confirmButtonText: '确定',
//						cancelButtonText: '取消',
//						type: 'warning'
//					}).then(() => {
//						this.$axios({
//							method: "post",
//							url: Uurl.PostUurl.deleteurl,
//							data: {
//								delete_val: this.deleatdrug
//							},
//						}).then(rep => {
//							if(rep.status === 200) {
//								this.$message({
//									type: 'success',
//									message: '删除成功!'
//								})
//							}
//						}).catch(rep => {
//							this.$message.error('操作失败')
//						})
//					}).catch(() => {
//						this.$message({
//							type: 'info',
//							message: '已取消删除'
//						})
//					})
//				}
		},
		drugSelectionChange(val) {
				this.deleatdrug = val.map(ele => {
					return ele.status
				})
		},
		current_change(currentPage) { //分页改变时触发，传当前页数
			this.currentPage = currentPage
		},
		CheckClick(i) { //编辑当前页
			this.bus.$emit('showopera', true)
			this.status_index = i
		}
	},
}
</script>

<style lang="stylus" scoped="scoped">
	.admin_serch
		display: flex 
		margin-bottom: 15px 
		.el-select-cd 
			margin-right: 10px 
		.pull 
			margin-right: 10px 
</style>