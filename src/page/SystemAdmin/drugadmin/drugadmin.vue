<template>
	<div class="drugadmin">
		<el-tabs>
			<el-tab-pane label="药品列表">
				<div class="admin_serch">
					<span style="line-height: 40px">查询条件：</span>
					<el-select v-model="search_select" filterable placeholder="请选择" class="el-select-cd">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<div class=" pull">
						<el-input placeholder="请输入内容" v-model="search_input" clearable>
						</el-input>
					</div>
					<div class="pull">
						<el-button type="primary" round icon="el-icon-search" @click='Searcheven'>搜索</el-button>
					</div>
					<div class="pull">
						<el-button type="success" round icon="el-icon-circle-plus" @click='dialog'>新增</el-button>
					</div>
					<div class="pull">
						<el-button type="danger" round icon="el-icon-delete" @click='deleat_all'>删除</el-button>
					</div>
				</div>
				<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
					:row-key='getrowkey' style="width: 100%" height='500' 
					@selection-change="handleSelectionChange" 
					@select-all='handleSelectionChange' 
					highlight-current-row  
					border>
					<el-table-column type="selection" width="55" prop='id' :reserve-selection = true>
					</el-table-column>
					<el-table-column prop="dnumber" label="药品编号" width="180">
					</el-table-column>
					<el-table-column prop="names" label="药品名称" width="180">
					</el-table-column>
					<el-table-column prop="attribute" label="属性" width='180'>
					</el-table-column>
					<el-table-column prop="efficacy" label="描述">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
							<el-button icon="el-icon-edit" @click="amendClick(scope.row)" type="primary" size="small">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @current-change='current_change' background layout="prev, pager, next" :total="totalmin">
				</el-pagination>
				<medicineAdmin></medicineAdmin>
				<drugxiugai :drugAmend='drugamend_index'></drugxiugai>
			</el-tab-pane>
			<el-tab-pane label="药品配置">
				<div class="admin_serch">
					<span style="line-height: 40px">查询条件：</span>
					<el-select v-model="search_select" filterable placeholder="请选择" class="el-select-cd">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<div class=" pull">
						<el-input placeholder="请输入内容" v-model="search_input" clearable>
						</el-input>
					</div>
					<div class="pull">
						<el-button type="primary" icon="el-icon-search" @click='Searchcabinet' round>搜索</el-button>
					</div>
				</div>
				<drugseeting :drug_All='drug_all'></drugseeting>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import medicineAdmin from './medicineadmin'
	import drugseeting from './drugseeting'
	import drugxiugai from './drugxiugai'
	import Uurl from '@/common/js/getapi'
	export default {
		data() {
			return {
				totalmin: 0, //默认数据总数
				pagesize: 10, //每一页的数据
				currentPage: 1, //默认开始页
				search_select: 0,
				search_input: '',
				getrowkey(row) {
					return row.id
				},
				options: [{
						value: 0,
						label: '全部'
					},
					{
						value: 1,
						label: '编号'
					},
					{
						value: 2,
						label: '名称'
					}
				],
				tableData: [],
				deleatdrug: [], //删除操作
				drugamend_index: {},//编辑分页
				drug_all: []
			}
},
		created() {
			this.$axios({
				method: 'get',
				url: 'https://www.easy-mock.com/mock/5acadfcb6c11675e15295842/example/drugadmin',
				responseType: 'json'
			}).then(res => {
				this.tableData = res.data.data.data
				this.totalmin = this.tableData.length
				
			}).catch()
		},
		components: {
			drugxiugai,
			drugseeting,
			medicineAdmin
		},
		methods: {
			Searcheven() { //搜索
				this.$axios({
					method: "post",
					url: Uurl.PostUurl.Searchurl,
					data: {
						search_input: this.search_input,
						search_selet: this.search_select
						}
				}).then(rep => {
					if(rep.status === 200) {
						this.tableData = JSON.parse(rep.data.data)
						this.total = this.tableData.length
						console.log(1)
					}
				})
			},
			Searchcabinet() { //药柜搜索
				this.$axios({
					method: "post",
					url: Uurl.PostUurl.querycabinetInfo,
					data: {
						search_input: this.search_input,
						search_selet: this.search_select
						}
				}).then(rep => {
					if(rep.status === 200) {
						this.drug_all = JSON.parse(rep.data.data)
					}
				}).catch(rep =>{
				})
			}
			,
			dialog() { //新增页
				this.bus.$emit('dialogshow', true)
			},
			drug_amend() { //修改页

			},
			deleat_all() { //批量删除
				if(this.deleatdrug.length === 0) {
					this.$message({
						message: '请选择要删除的药品',
						type: 'warning'
					})
				} else {
					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$axios({
							method: "post",
							url: Uurl.PostUurl.deleteurl,
							data: {
								delete_val: this.deleatdrug
							},
						}).then(rep => {
							if(rep.status === 200) {
						this.tableData = this.tableData.filter(ele => this.deleatdrug.indexOf(ele.id) == -1)				
								this.$message({
									type: 'success',
									message: '删除成功!'
								})
							}
						}).catch(rep => {
							this.$message.error('操作失败')
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
					})
				}
			},
			handleSelectionChange(val) { //批量删除
				this.deleatdrug = val.map(ele => {
					return ele.id
				})
			},
			current_change(currentPage) { //分页改变时触发，传当前页数
				this.currentPage = currentPage
			},
			amendClick(i) { //编辑当前页
				this.drugamend_index = i
				this.bus.$emit('drug_amendevn', true)
			}
		}
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