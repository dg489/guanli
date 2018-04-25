<template>
	<div class="drugpull_count">
				<div>
					<ul style="display: flex;">
							<li v-for="item in items"  class='msg_icon'>
						<el-badge :value="item.a">
								<i :class="item.xinxi"></i>
								<p class="title">{{item.msg}}</p>
						</el-badge>
							</li>

					</ul>
				</div>
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
				<p style="margin-bottom: 4px;">通知列表：</p>
				<div>
					{{$store.state.count}}
				</div>
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
					<el-table-column prop="application_user_name" label="负责人" >
					</el-table-column>
					<el-table-column prop="bring_user_name" label="状态">
					</el-table-column>
					<el-table-column prop="dosing_user_name" label="通知时间">
					</el-table-column>
					<el-table-column fixed="right" label="操作" width='130'>
						<template slot-scope="scope">
							<el-button icon="el-icon-view" @click="CheckClick(scope.row)" type="primary" size="small">查看详情</el-button>
						</template>
					</el-table-column>					
				</el-table>
				<el-pagination @current-change='current_change' background layout="prev, pager, next" :total="totalmax">
				</el-pagination>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
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
			items: [
			{xinxi:"icon-xinxi-copy",
			a: 2,
			msg:'手术通知'},
			{xinxi:"icon-xinxi-copy",
			a:4,
			msg:'处方通知'},
			{xinxi:"icon-xinxi-copy",
			msg:'审批通知'},
			{xinxi:"icon-xinxi-copy",
			msg:'领药通知'},
			{xinxi:"icon-xinxi-copy",
			msg:'缺药通知'},
			{xinxi:"icon-xinxi-copy",
			msg:'异常通知'},
			],
			options: [{
					value: 0,
					label: '类型'
				},
				{
					value: 1,
					label: '状态'
				},			
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
	.msg_icon
		flex:1 
		margin-bottom: 20px
		text-align: center
		font-size: 50px
		color: #409EFF
		cursor: pointer
		.title
			font-size: 12px
			color: #000
		&.msg_icon:hover
			box-shadow: 0px 0px 15px #C0C4CC
	.admin_serch
		display: flex 
		margin-bottom: 15px 
		.el-select-cd 
			margin-right: 10px 
		.pull 
			margin-right: 10px 
</style>