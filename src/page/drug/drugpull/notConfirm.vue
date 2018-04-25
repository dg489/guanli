<template>
	<div class="check">
		<el-dialog
  		title="审批情况"
  		:visible.sync="dialogmedicine"
  		width="50%"
 	 :before-close="drugClose">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<div style="display: flex;">
				<span style="flex: 1;line-height: 40px;">领药单 </span>
				<el-button  type="success" @click='Pass_urgent'>确认</el-button>
				<el-button  type="warning" @click='drugCloseline'>取消</el-button>
				</div>
			</div>
			<p>申请人：</p>
			<p class="dugNumber">
				{{msg.application_user_name}}
			</p>
			<p>领药人:</p>
			<p class="dugNumber">
				{{msg.bring_user_name}}
			</p>
			<p>加药人:</p>
			<p class="dugNumber">
				{{msg.dosing_user_name}}
			</p>
			<p>领药时间:</p>
			<p class="dugNumber">
				{{msg.time}}
			</p>			
			<div class="dugmedicine">
			<p>药品清单:</p>				
				 <el-table :data="dugmsg" max-height= '220'>
			      <el-table-column
			        prop="d__number"
			        label="药品编号"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="d_name"
			        label="药品名称"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="d_attribute"
			        label="属性">
			      </el-table-column>
			      <el-table-column
			        prop="count"
			        label="申请量">
			      </el-table-column>
			      <el-table-column
			        label="操作">			      
					<template slot-scope="scope">
						<el-button icon="el-icon-view" @click="CheckClick(scope.row)" type="primary" size="small">查看详情</el-button>
					</template>
				  </el-table-column>					      
			    </el-table>
			</div>
		</el-card>
	</el-dialog>
	<getCount :msg='msg_vuls'></getCount>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	import getCount from './notGetCount'
	export default {
		props: {
			msg: {
				type:Object
			},
			msg_vul: {
				type: Array
			}
		},
		components: {
			getCount
		},
		data() {
			return {
				dugmsg: [],
				dialogmedicine: false,
				msg_vuls: {}
			}
		},
		created() {
			this.getdata()
			console.log(this.dugmsg)
		},
		methods:{
			drugClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		          	done()
		          })
		          .catch(_ => {
		          });
			},
			drugCloseline() {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		          	this.dialogmedicine = false
		          })
		          .catch(_ => {
		          });
			},
			getdata() {
				this.dugmsg = this.msg_vul
				this.bus.$on('notConfirm', (show) =>{
					this.dialogmedicine = show
				})
			},
			Pass_urgent() {
				this.$axios({
					method: 'post',
					url: Uurl.PostUurl.applyconfig,
					data: {
						record_id: this.msg.record_id
					}
				}).then(rep => {
					console.log(rep)
				}).catch()
			this.msg.status = 1
			console.log(this.msg)
			},
			CheckClick (i) {
				this.bus.$emit('notGetCount',true)	
				console.log(i)
				this.msg_vuls = i
				this.$axios({
					method: 'post',
					url: Uurl.PostUurl.lookinfo,
					data: {
						record_id: this.msg.record_id,
						d_id : i.d_id
					}
				}).then(rep => {
					console.log(rep)
				})
			}
		},
		watch: {
			msg_vul(curval,oldval) {
				this.dugmsg = []
				this.dugmsg = curval 
			}
		}
	}
</script>

<style lang="stylus">
	.dugNumber
		font-size: 14px
		background:#EBEEF5
		padding: 5px 0
		margin: 5px 0
		box-shadow: 2px 2px 2px #E4E7ED
</style>