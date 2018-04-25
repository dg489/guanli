<template>
	<div class="check">
		<el-dialog :visible.sync="dialogmedicine" width="50%" :before-close="drugClose">
			<div class="drug_serch">
				<!--状态为加药中时显示-->
				<span style="line-height: 40px">查询条件：</span>
				<el-select v-model="search_ing" filterable placeholder="请选择" class="el-select-cd">
					<el-option v-for="item in options_ing" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<div class=" pull">
					<el-input placeholder="请输入内容" v-model="search_input" clearable>
					</el-input>
				</div>
				<div class="pull">
					<el-button type="primary" round icon="el-icon-search" @click='Searcheven_allot'>查看</el-button>
				</div>
			</div>
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span style="line-height: 40px;">加药单 </span>
				</div>
				<p>申请人：</p>
				<p class="dugNumber_wait">
					{{msg.application_user_name}}

				</p>
				<p>领药人:</p>
				<p class="dugNumber_wait">
					{{msg.bring_user_name}}
				</p>
				<p>加药人:</p>
				<p class="dugNumber_wait">
					{{msg.dosing_user_name}}
				</p>
				<p>领药时间:</p>
				<p class="dugNumber_wait">
					{{time}}
				</p>
				<div class="dugmedicine">
					<p>药品清单:</p>
					<div v-if="showpage">
						<el-table :data="drugmsg_list" style="width: 100%" max-height='500'>
							<el-table-column prop="d_number" label="药品编号">
							</el-table-column>
							<el-table-column prop="d_name" label="药品名称" >
							</el-table-column>
							<el-table-column prop="d_attribute" label="属性">
							</el-table-column>
							<el-table-column prop="count" label="申请量">
							</el-table-column>
							<el-table-column prop="add_count" label="加药量">
							</el-table-column>						
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button icon="el-icon-view" @click="CheckClick(scope.row)" type="primary" size="small">查看详情</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>	
					<div v-else>
						<el-table :data="cbamsg_list" style="width: 100%">
							<el-table-column prop="c_number" label="柜号">
							</el-table-column>
							<el-table-column prop="c_name" label="柜名称">
							</el-table-column>
							<el-table-column prop="c_opsition" label="位置">
							</el-table-column>
							<el-table-column prop="count" label="加药量">
							</el-table-column>
							<el-table-column prop="add_count" label="已添加">
							</el-table-column>
							<el-table-column prop="add_count" label="操作">
							<template slot-scope="scope">
								<el-button icon="el-icon-view" @click="DrugClick(scope.row)" type="primary" size="small">查看详情</el-button>
							</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-card>
			<allot :list='allot_data' :msg='drug_msg'></allot>
			<caballot :list='allot_data' :msg='drug_msg'></caballot>
		</el-dialog>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	import allot from './allot'
	import caballot from './caballot'
	export default {
		props: {
			msg: {
				type: Object
			},
			list_drug: {
				type: Array
			}
		},
		data() {
			return {
				drugmsg_list: [],
				dialogmedicine: false,
				showpage: true,
				search_ing: 0, 
				search_input: '',
				options_ing: [{
						value: 0,
						label: '药柜编号'
					},
					{
						value: 1,
						label: '药品名称'
					}
				],
				allot_data: [],
				cbamsg_list: [],
				drug_msg: {},
				time: ''
			}
		},
		created() {
			this.getdata()

		},
		components: {
			allot,
			caballot
		},
		methods: {
			drugClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done()
					})
					.catch(_ => {});
			},
			drugCloseline() {
				this.$confirm('确认关闭？')
					.then(_ => {
						this.dialogmedicine = false
					})
					.catch(_ => {});
			},
			getdata() {
				this.drugmsg_list = this.list_drug
				this.bus.$on('ings', (show) => {
					this.dialogmedicine = show
				})
			},
			Searcheven_allot() {
				this.$axios({
						method: "post",
						url: Uurl.PostUurl.querycab,
						data: {
							record_id: this.msg.record_id,
							search_ing: this.search_ing,
							search_input: this.search_input
						}
					})
					.then(res => {
						let _ing_val = JSON.parse(res.data.search_ing)
						if(_ing_val === 1) {
							this.showpage = true
							this.drugmsg_list = res.data.data
						} else {
							this.showpage = false
							this.cbamsg_list = res.data.data
						}
						
					})
					.catch()
			},
			CheckClick(i) {
				console.log(i)
				this.$axios({
						method: "post",
						url: Uurl.PostUurl.addRecord,
						data: {
							record_id: i.record_id,
							d_id: i.d_id
						}
					})
					.then(res => {
						this.bus.$emit('showallot', true)
						this.allot_data = JSON.parse(res.data.data)
						this.drug_msg = i
					})
					.catch(res => {
						
					})
			},
			DrugClick(i) {
				console.log(i)
				this.$axios({
						method: "post",
						url: Uurl.PostUurl.addRecord,
						data: {
							record_id: i.record_id,
							d_id: i.d_id
						}
					})
					.then(res => {
						this.bus.$emit('showcab', true)
						this.allot_data = JSON.parse(res.data.data)
						this.drug_msg = i
					})
					.catch()
			},			
			gettime() {
				const data = this.msg.medicine_time.time
				let val = new Date(data)
				this.time= this.$getime(val,'yyyy-MM-dd hh:mm:ss')
			}
		},
		watch: {
			list_drug(curval, oldval) {
				this.drugmsg_list = curval
				this.gettime()
			}
		},
		computed: {

		}
	}
</script>
<style lang="stylus">
	.drug_serch
		display: flex 
		margin-bottom: 15px 
		.el-select-cd 
			margin-right: 10px 
		.pull 
			margin-right: 10px 	
	.dugNumber_wait
		font-size: 14px
		background:#EBEEF5
		padding: 6px
		margin: 6px 0
		box-shadow: 2px 2px 2px #E4E7ED
</style>