<template>
	<div class="Srole_control">
				<div class="admin_serch">
					<span style="line-height: 40px">查询条件：</span>
					<el-select v-model="search_selet" filterable placeholder="请选择" class="el-select-cd">
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
						<el-button type="success" round icon="el-icon-circle-plus" @click='dialog_srole'>新增</el-button>
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
					<el-table-column prop="cnumber" label="角色编号" width="150">
					</el-table-column>
					<el-table-column prop="name" label="角色名称" width="150">
					</el-table-column>
					<el-table-column prop="opsition" label="角色描述">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width="100">
						<template slot-scope="scope">
							<el-button icon="el-icon-edit" @click="amendClick(scope.row)" type="primary" size="small">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @current-change='current_change' background layout="prev, pager, next" :total="totalmax">
				</el-pagination>
				<add_Srole></add_Srole>
				<srolexiugai></srolexiugai>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	import add_Srole from './addSrole'
	import srolexiugai from './Srolexiugai'
	export default {
	data() {
		return {
			totalmax: 0, //默认数据总数
			pagesize: 10, //每一页的数据
			currentPage: 1, //默认开始页
			search_selet: 0,
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
					label: '角色名'
				},
				{
					value: 2,
					label: '角色编号'
				}
			],
			tableData: [],
			tableDa: [],
			deleatdrug: [],
			cabamend_index: {}
		}
	},
	created()	{
		this.$axios({
			method: 'get',
			url: 'https://www.easy-mock.com/mock/5acadfcb6c11675e15295842/example/drugadmin',
			responseType: 'json'
		}).then(res => {
			this.tableData = res.data.data.data
			this.totalmax = this.tableData.length

		}).catch()
	},
	components: {
		 add_Srole,
		 srolexiugai
	},
	methods: {
		Searcheven() { //搜索
			this.$axios({
				method: "post",
				url: Uurl.PostUurl.cabinet,
				data: {
					search_input: this.search_input,
					search_selet: this.search_selet
				}
			}).then(rep => {
				if(rep.status === 200) {
					this.tableData = JSON.parse(rep.data.data)
					this.total = this.tableData.length

				}
			})
		},
		dialog_srole() { //新增页
			this.bus.$emit('addsrole_show', true)
		},
		deleat_all() { //批量删除
			if(this.deleatdrug.length === 0) {
				this.$message({
					message: '请选择要删除的员工',
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
						url: Uurl.PostUurl,
						data: {
							delete_val: this.deleatdrug
						},
					}).then(rep => {
						if(rep.status === 200) {
							this.tableData = this.tableData.filter(ele => this.deleatdrug.indexOf(ele.id) == -1)				
							this.totalmax = this.tableData.length							
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
			this.cabamend_index = i
			this.bus.$emit('xiugai_srole', true)
		}
	}
}</script>

<style lang="stylus" scoped="scoped">
	.admin_serch
		display: flex 
		margin-bottom: 15px 
		.el-select-cd 
			margin-right: 10px 
		.pull 
			margin-right: 10px 
</style>