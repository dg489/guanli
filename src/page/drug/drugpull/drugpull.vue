<template>
	<div class="drugpull_count">
				<div class="admin_serch">
					<span style="line-height: 40px">查询条件：</span>
					<el-select v-model="search_selet" filterable placeholder="请选择" class="el-select-cd">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<div class="pull" v-if="selectShow">
					<el-select v-model="status_selet" filterable placeholder="请选择" class="el-select-cd">
						<el-option v-for="item in options_list" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>						
					</div>
					<div class=" pull" v-else style="width: 227px;">
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
				<p style="margin-bottom: 4px;">领药申请单：</p>
				<el-table :data="tableData.slice((currentPage-1)*pagesize,pagesize*currentPage)" 
					:row-key='getrowkey' 
					@selection-change="drugSelectionChange" 
					@select-all='drugSelectionChange' 
					highlight-current-row
					ref="multipleTable"
					border>
					<el-table-column type="selection" width="55" prop='id' :reserve-selection = true>
					</el-table-column>
					<el-table-column prop="dnumber" label="序号" type='index'>
					</el-table-column>
					<el-table-column prop="application_user_name" label="申请人" >
					</el-table-column>
					<el-table-column prop="bring_user_name" label="领药人">
					</el-table-column>
					<el-table-column prop="dosing_user_name" label="加药人">
					</el-table-column>
					<el-table-column prop="status" label="领药状态">
					</el-table-column>	
					<el-table-column fixed="right" label="操作" width='130'>
						<template slot-scope="scope">
							<el-button icon="el-icon-view" @click="CheckClick(scope.row)" type="primary" size="small">查看详情</el-button>
						</template>
					</el-table-column>					
				</el-table>
				<el-pagination @current-change='current_change' background layout="prev, pager, next" :total="totalmax">
				</el-pagination>
				<notpass :msg='status_index' :msg_vul = 'status_vul'></notpass>
				<notget :msg='status_index' :msg_vul = 'status_vul'></notget>
				<notconfirm :msg='status_index' :msg_vul = 'status_vul'></notconfirm>
				<confirm :msg='status_index' :msg_vul = 'status_vul'></confirm>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	import notpass from './notPass'
	import notget from './notGet'
	import notconfirm from './notConfirm'
	import confirm from './Confirm'
	export default {
	data() {
		return {
			totalmax: 0, //默认数据总数
			pagesize: 10, //每一页的数据
			currentPage: 1, //默认开始页
			search_selet: 1,//搜索下拉框
			status_selet: 0,//领药状态下拉框
			search_input: '',
			status_index: {},
			status_vul: [],
			getrowkey(row) {
				return row.id
			},
			options_list: [{
					value: 0,
					label: '申请待审批'				
			},
			{
					value: 1,
					label: '审批待领药'				
			},
			{
					value: 2,
					label: '领药未确认'				
			},
			{
					value: 3,
					label: '已确认领药'				
			}			
			],
			options: [{
					value: 0,
					label: '申请人'
				},
				{
					value: 1,
					label: '领药人'
				}, {
					value: 2,
					label: '加药人'
				},
 				{
					value: 3,
					label: '审批状态'
				}			
			],
			tableData: [		
			{
				application_user_name: '胖虎',
				bring_user_name: '小夫',
				dosing_user_name: '大雄',
				record_status: '申请待审批',
				stat_data: '2018-5-5',
				status: 1
			},
			{
				application_user_name: '足球小姜',
				bring_user_name: '神龙逗士',
				dosing_user_name: '膜法少女',
				record_status: '审批待领药',
				stat_data: '2016-5-5',
				status: 2
			},
			{
				application_user_name: '中华小当家',
				bring_user_name: '死神柯南',
				dosing_user_name: '围棋少年',
				record_status: '领药未确认',
				stat_data: '2014-11-3',
				status: 3
			},
			{
				application_user_name: '通灵王',
				bring_user_name: '丁丁历险记',
				dosing_user_name: '哈姆太郎',
				record_status: '已确认领药',
				stat_data: '2018-7-5',
				status: 4
			}			
			],
			Alldrug: [],
			deleatdrug: []
		}
	},
	components: {
		notpass,
		notget,
		notconfirm,
		confirm
	},
	methods: {
		Searcheven() { //搜索
			console.log(1)
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
			this.$axios({
				method: "post",
				url: Uurl.PostUurl.applylookinfo,
				data: {
					record_id: i.record_id
			}
			}).then(rep => {
				if(rep.status === 200) {
					this.status_vul = rep.data.drug_list
				switch(i.record_status) {
					case 1:
						this.status_index = i
						this.bus.$emit('notPass', true)
						break
					case 2:
						this.status_index = i
						this.bus.$emit('notGet', true)
						break
					case 3:
						this.status_index = i
						this.bus.$emit('notConfirm', true)
						console.log(this.status_vul)
						break
					case 4:
						this.status_index = i
						this.bus.$emit('confirm', true)
						break
					}
				}
			})
			

		}
	},
	computed: {
		selectShow () {
			if(this.search_selet === 3) {
				return true
			} else {
				return false
			}
			
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