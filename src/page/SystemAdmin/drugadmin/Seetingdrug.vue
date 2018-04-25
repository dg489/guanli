<template>
	<div class="seeting_drug">
		<el-dialog title="配药" :visible.sync="dialogVisible" width="50%" :before-close="outClose">
			<el-card class="box-card">
			<div slot="header" class="clearfix">
				<div style="display: flex;">
					<div style="flex: 1;">
						药柜配药
					</div>
						<el-button type="success" @click='amend_drug'  round>选择药物</el-button>
				</div>				
			</div>
			<p>柜号:</p>
			<p class="medicine_seet">
				{{drugseet.cnumber}}
			</p>
			<p>药品名称:</p>
			<p class="medicine_seet">
				{{drugseet.name}}
			</p>
			<p>位置:</p>
			<p class="medicine_seet">
				{{drugseet.opsition}}
			</p>
			</el-card>
			<el-card class="box-card" style='margin-top: 20px;'>
				<el-table ref="listTable" :data="tableData" style="width: 100%" height='300' highlight-current-row border>
					<el-table-column prop="dnumber" label="药品编号" width="180">
					</el-table-column>
					<el-table-column prop="names" label="药品名称">
					</el-table-column>
					<el-table-column fixed="right" label="最大配药数量" width="150">
						<template slot-scope="scope">
							<el-input placeholder="最大配药数量" v-model='scope.row.inputs'  clearable>
							</el-input>
						</template>						
					</el-table-column>
				</el-table>
				<div style="display: flex; margin-top: 15px;">
					<div style="flex: 1;">
						<el-button type="success" @click='post_seetdrug'  round>完成配药</el-button>
					</div>
					<el-button type="warning" @click="_doneseeting" round>取消</el-button>
				</div>
			</el-card>
			<el-dialog :before-close="handleClose" width="50%" title="药品清单"  :visible.sync="innerVisible" append-to-body >
				<div style="display: flex; margin-bottom:15px">
					<div style="flex: 1;">
						<el-button type="warning" @click="_donelist" round>取消</el-button>
					</div>
					<el-button type="success" @click='select_druglist' round>确定</el-button>
				</div>
				<el-table ref='multipleTable' :data="tableAllData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
					height='400' 
					highlight-current-row
					:row-key='getrowkey'
					border
					@selection-change = 'SelectionChange'
					@select-all='SelectionChange' 
					>
					<el-table-column type="selection" width="55" :reserve-selection = true>
					</el-table-column>
					<el-table-column prop="dnumber" label="药品编号" width="100">
					</el-table-column>
					<el-table-column prop="names" label="药品名称">
					</el-table-column>
					<el-table-column prop="names" label="属性">
					</el-table-column>
					<el-table-column prop="names" label="描述">
					</el-table-column>
				</el-table>
				<el-pagination @current-change='current_change' background layout="prev, pager, next" :total="totalall">
				</el-pagination>
			</el-dialog>
		</el-dialog>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	export default {
		props: {
			drugseet: {
				type: Object
			},
			drugall_list: {
				type: Array
			}
		},
		data() {
			return {
				dialogVisible: false,
				innerVisible: false,
				totalall: 0, //默认数据总数
				pagesize: 10, //每一页的数据
				currentPage: 1, //默认开始页				
				tableData: [],//展示的药品列表
				tableAllData: [],//所有的药品列表
				tablist: [], //选中的药品列表
				getrowkey(row) {
					return row.id
				},
				inputs: ''
			}
		},
		methods: {
			amend_drug() {
				this.innerVisible = true
																					
			},
			handleClose(done) {
		       this.$confirm('确认关闭？')
		         .then(_ => {
		          done();
		         })
		         .catch(_ => {})
		    },
		    outClose(done) {
		    	 this.$confirm('确认关闭？')
		         .then(_ => {
		         	 this.$refs.multipleTable.clearSelection()
		          done();
		         })
		         .catch(_ => {})
		    },
		     select_druglist() { //完成关闭
		     	this.$confirm('确认完成？')
		          .then(_ => {
		          	this.tableData = this.tablist
		          	this.innerVisible = false
		          })
		          .catch(_ => {})
		     },
		     current_change(currentPage) { //修改页码
				this.currentPage = currentPage
				
		     },
		     _donelist() { //药品列表页关闭
		     	this.$confirm('确认关闭？')
		          .then(_ => {
		          	this.innerVisible = false
		          })
		          .catch(_ => {})
		     },
		     _doneseeting() {//药品配置页关闭
		     	this.$confirm('确认关闭？')
		          .then(_ => {
		         	 this.$refs.multipleTable.clearSelection()
		          	this.dialogVisible = false
		          })
		          .catch(_ => {
		          	
		          })
		     },
			SelectionChange(val) {//选中添加
				this.tablist = val
			},
		 	post_seetdrug() {
		 		let val = []
		 		let list = {}
		 		let post_list = {}
		 		for(let o in this.tableData) {
		 			list = {
		 				c_id: this.drugseet.id,
		 				d_id: this.tableData[o].id,
		 				max_count: this.tableData[o].inputs
		 			}
		 			val.push(list)
					post_list  = val
		 		}
				this.$axios({
					method: "post",
					url: Uurl.PostUurl.seetcabinet,
					data: post_list = {
						post_list
					}
				}).then(rep => {
					console.log(rep)
					if(rep.status === 200) {
					for(let v in this.tableData) {
		 				this.tableData[v].inputs = ''
					}
				this.$message({
					        type: 'success',
					        message: '成功!'
				})					
				this.dialogVisible = false
					}
				}).catch( rep => {
				this.$message({
					        type: 'warning',
					        message: '后台服务器故障，请检查!'
				})					
				}
				)
		 	},
		 	getlist() {
				this.tableAllData = this.drugall_list
				this.totalall = this.tableAllData.length
		 	}
		},
		mounted() { //配置页出现
			this.bus.$on('drug_seet', (id) => {
				this.dialogVisible = id
			})
			this.getlist()
		},
		watch: {
			drugall_list(news, olds) {
				this.tableAllData = news
			}
		}
}
</script>

<style lang="stylus">
	.medicine_seet
		font-size: 14px
		background:#EBEEF5
		padding: 5px
		margin: 5px 0
		box-shadow: 2px 2px 2px #E4E7ED
</style>