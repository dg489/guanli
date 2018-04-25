<template>
	<div class="drugpull_count">
				<div class="drug_serch">
					<span style="line-height: 40px">查询条件：</span>
					<el-select v-model="search_selet" filterable placeholder="请选择" class="el-select-cd">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<div class="pull" v-if="selectShow" >
						<el-select v-model="search_status" filterable placeholder="请选择" class="el-select-cd">
							<el-option v-for="item in options_list" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>						
					</div>
					<div class=" pull" v-else style='width: 227px;'>
						<el-input placeholder="请输入内容" v-model="search_input" clearable>
						</el-input>
					</div>
					<div class="pull">
						<el-button type="primary" round icon="el-icon-search" @click='Searcheven'>搜索</el-button>
					</div>
					<div class="pull">
						<el-button type="danger" round icon="el-icon-delete" @click='delete_pull'>删除</el-button>
					</div>
				</div>
				<p style="margin-bottom: 4px;">领药申请单：</p>
				<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
					:row-key='getrowkey' style="width: 100%" height='500' 
					@selection-change="drugSelectionChange" 
					@select-all='drugSelectionChange' 
					highlight-current-row
					border>
					<el-table-column type="selection" width="55" prop='id' :reserve-selection = true>
					</el-table-column>
					<el-table-column prop="dnumber" label="序号" type='index'>
					</el-table-column>
					<el-table-column prop="application_user_name" label="申请人" width="150">
					</el-table-column>
					<el-table-column prop="bring_user_name" label="领药人">
					</el-table-column>
					<el-table-column prop="dosing_user_name" label="加药人">
					</el-table-column>
					<el-table-column prop="status" label="加药状态">
					</el-table-column>	
					<el-table-column fixed="right" label="操作" >
						<template slot-scope="scope">
							<el-button icon="el-icon-view" @click="CheckClick(scope.row)" type="primary" size="small">查看详情</el-button>
						</template>
					</el-table-column>					
				</el-table>
				<el-pagination @current-change='current_change' background layout="prev, pager, next" :total="totalmax">
				</el-pagination>
				<waits :msg = 'status_index' :list_drug='status_vul'></waits>
				<ings :msg = 'status_index' :list_drug='status_vul'></ings>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	import waits from './waitdrug'
	import ings from './drugIng'
	export default {
	data() {
		return {
			totalmax: 0, //默认数据总数
			pagesize: 10, //每一页的数据
			currentPage: 1, //默认开始页
			search_selet: 0,//下拉框默认选项
			search_status: 1 ,//状态下拉框默认选项
			search_input: '',
			getrowkey(row) {
				return row.id
			},
			options: [{
					value: 0,
					label: '申请人'
				},{
					value: 1,
					label: '领药人'
				}, {
					value: 2,
					label: '加药人'
				},
				{
					value: 3,
					label: '加药状态'
				}
			],
			options_list: [{
				value: 1,
				label: '待加药'
			},
			{
				value: 2,
				label: '加药中'
			},
			{
				value: 3,
				label: '完成'
			}],
			tableData: [
			{dnumber: "01",
			application_user_name: '王大锤',
			bring_user_name: '小张',
			dosing_user_name: '小陈',
			status: '加药中',
			record_status: 2
			},
			{dnumber: "021",
			application_user_name: '王大锤',
			bring_user_name: '小张',
			dosing_user_name: '小陈',
			status: '待加药',
			record_status: 1
			},
			{dnumber: "031",
			application_user_name: '王大锤',
			bring_user_name: '小张',
			dosing_user_name: '小陈',
			status: '加药中',
			record_status: 2
			},
			{dnumber: "041",
			application_user_name: '王大锤',
			bring_user_name: '小张',
			dosing_user_name: '小陈',
			status: '完成',
			record_status: 3
			}
			],
			status_index: {},
			deleatdrug: [],
			status_vul: []
		}
	},
	components: {
		waits,
		ings
	},
	methods: {
		Searcheven() { //搜索
			this.$axios({
				method: "post",
				url: Uurl.PostUurl.addselect,
				data: {
					search_input: this.search_input,
					search_selet: this.search_selet
				}
			}).then(rep => {
				console.log(rep)
				if(rep.status === 200) {
					this.tableData = JSON.parse(rep.data.data)
					this.total = this.tableData.length
				}
			})
		},
		delete_pull() { //批量删除
				if(this.deleatdrug.length === 0) {
					this.$message({
						message: '请选择要删除的记录',
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
		drugSelectionChange(val) {
				this.deleatdrug = val.map(ele => {
					return ele.id
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
					console.log(rep)
					this.status_vul = rep.data.drug_list
				switch(i.add_info_status) {
					case 2:
						this.status_index = i
						this.bus.$emit('waits', true)
						break
					case 1:
						this.status_index = i
						console.log(this.status_index)
						this.bus.$emit('ings', true)
						break
					case 3:
						this.status_index = i
						this.bus.$emit('notConfirm', true)
						break
					}
				}
			})			
		}
	},
	computed: {
		selectShow() {
			if(this.search_selet === 3) {
				return true
			} else {
				return false
			}
			
		}
	}	
}</script>

<style lang="stylus" scoped="scoped">
	.drug_serch
		display: flex 
		margin-bottom: 15px 
		.el-select-cd 
			margin-right: 10px 
		.pull 
			margin-right: 10px 
</style>