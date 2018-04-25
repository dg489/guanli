<template>
	<div class="ask_control">
				<div class="admin_serch">
					<span style="line-height: 40px">查询条件：</span>
					<el-select v-model="search_selet" filterable placeholder="请选择" class="el-select-cd">
						<el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<div class=" pull">
						<el-input placeholder="请输入内容" v-model="search_input" clearable>
						</el-input>
					</div>
					<div class="pull">
						<el-button type="primary" round icon="el-icon-search" @click='Searcheven'>查询</el-button>
					</div>
					<div class="pull">
						<el-button type="success" round icon="el-icon-circle-plus" @click='dialog_ask'>领药申请</el-button>
					</div>
				</div>
				<el-table
					ref="multipleTable"
					:data="tableData" 
					:row-key='getrowkey'
					highlight-current-row
					border
					@selection-change = 'SelectionChange'
					@select-all='SelectionChange' 
					>
					<el-table-column type="selection" width="55" :reserve-selection = true>
					</el-table-column>
					<el-table-column prop="d_number" label="药品编号" width="100">
					</el-table-column>
					<el-table-column prop="d_name" label="药品名称">
					</el-table-column>
					<el-table-column prop="d_attribute" label="属性">
					</el-table-column>
					<el-table-column prop="max_count" label="最大存放量">
					</el-table-column>
					<el-table-column prop="shortage_count" label="缺药量">
					</el-table-column>					
				</el-table>		
				<el-pagination 
					@current-change='current_change' 
					background 
					layout="prev, pager, next" 
					:total="totalmax">
				</el-pagination>
	<div class="askadd">
		<el-dialog title="申请" :visible.sync="dialogVi_ask" width="50%" :before-close="addClose">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<h1>领药申请单</h1>
				</div>
				<el-form :model="askForm">
						<el-form-item>
							<div class="el-form-content">
								<span>申请人:</span>
								<el-select v-model="askForm.search_ask" clearable placeholder="请选择" class="el-select-cd">
									<el-option v-for="item in list_options" :key="item.user_id" :label="item.user_name" :value="item.user_id">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
						<el-form-item  >
							<div class="el-form-content">
								<span>领药人:</span>
								<el-select v-model="askForm.search_pull" clearable placeholder="请选择" class="el-select-cd">
									<el-option v-for="item in list_options" :key="item.user_id" :label="item.user_name" :value="item.user_id">
									</el-option>
								</el-select>							
							</div>
						</el-form-item>
						<el-form-item>
							<div class="el-form-content">
								<span>加药人:</span>
								<el-select v-model="askForm.search_add" clearable placeholder="请选择" class="el-select-cd">
									<el-option v-for="item in list_options" :key="item.user_id" :label="item.user_name" :value="item.user_id">
									</el-option>
								</el-select>
							</div>
						</el-form-item>
				</el-form>
							<p>药品清单:</p>
							<el-table ref="listTable" :data="tableDatalist" highlight-current-row border>
								<el-table-column prop="d_number" label="药品编号" width="180">
								</el-table-column>
								<el-table-column prop="d_name" label="药品名称">
								</el-table-column>
								<el-table-column prop="d_attribute" label="属性">
								</el-table-column>		
								<el-table-column prop="shortage_count" label="申请量">
								</el-table-column>									
							</el-table>							
					<div class='bottom_margintop'>
						<el-button type="success" @click='amend_drug' round>申请</el-button>
						<el-button type="warning" @click="_clearval" round>取消</el-button>
					</div>
			</el-card>
		</el-dialog>
	</div>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	export default {
	data() {
		return {
			totalmax: 0, //默认数据总数
			pagesize: 5, //每一页的数据
			currentPage: 1, //默认开始页
			search_selet: 0,
			search_input: '',
			dialogVi_ask: false,
			getrowkey(row) {
				return row.id
			},
			askForm: {
			search_ask:1,
			search_pull:1,
			search_add:1,
				},	
			value: [],
			tableDatalist: [],
			options: [{
					value: 0,
					label: '药柜编号'
				},
				{
					value: 1,
					label: '药品编号'
				},
				{
					value: 2,
					label: '药品名称'
				}
			],
			tableData: [],
			list_options: [
				]			
		}
	},
	methods: {
		Searcheven() { //搜索
			this.$axios({
				method: "post",
				url: Uurl.PostUurl.drugask,
				data: {
					search_input: this.search_input,
					search_selet: this.search_selet
				}
			}).then(rep => {
				if(rep.status === 200) {
					this.$refs.multipleTable.clearSelection()
					this.tableData = JSON.parse(rep.data.data)
					this.totalmax = this.tableData.length
				}
			})
		},
		dialog_ask() { //申请页
			this.dialogVi_ask = true
			this.tableDatalist  = this.value
		},
		SelectionChange(val) {//选中添加
		this.value = JSON.parse(JSON.stringify(val));//拷贝数组,注意这行的拷贝方法
			},
		current_change(currentPage) { //分页改变时触发，传当前页数
			this.currentPage = currentPage
		},
		amend_drug() {
			let val = []
			let drug_list = {}
			let post_list ={}
			
			for(let o in this.tableDatalist) {
				drug_list = {
					d_id  : this.tableDatalist[o].d_id,
					shortage_count: this.tableDatalist[o].shortage_count
				}
				val.push(drug_list)
				post_list = val
			}
			this.$axios({
				method: 'post',
				url: Uurl.PostUurl.applysubmit,
				data: {
					searchs_ask: this.askForm.search_ask,
					searchs_pull: this.askForm.search_pull,
					searchs_add: this.askForm.search_add,					
					drug_list: post_list
				}
			}).then(rep =>{
				console.log(rep)
			this.dialogVi_ask = false
				
			}).catch()
		},
		_clearval() {
			this.dialogVi_ask = false
		},
		addClose(done) {
		    this.$confirm('确认关闭？')
		          .then(_ => {
					this._clearval()
		            done();
		          }).catch(_ => {});
		},
		getuser() {
			this.$axios({
				method: 'get',
				url: Uurl.PostUurl.getuser,
				responseType: 'json'
			}).then(rep => {
				this.list_options = JSON.parse(rep.data.data)
			}).catch(_ => {
				console.log(_)
			})
		}
	},
	created() {
		this.getuser()
	},
	mounted() {
		this.getuser()
		
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
	.bottom_margintop
		margin-top: 10px
</style>