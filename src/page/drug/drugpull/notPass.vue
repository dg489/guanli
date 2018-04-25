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
				<span style="flex: 1;line-height: 40px;">申请单 </span>
				<el-button  type="success" @click='Pass_urgent'>催批</el-button>
				<el-button  type="warning" @click='drugCloseline'>取消</el-button>
				</div>
			</div>
			<p>申请人：</p>
			<p class="not_pass">
				{{msg.application_user_name}}
			</p>
			<p>领药人:</p>
			<p class="not_pass">
				{{msg.bring_user_name}}
			</p>
			<p>加药人:</p>
			<p class="not_pass">
				{{msg.dosing_user_name}}
			</p>
			<p>申请时间:</p>
			<p class="not_pass">
				{{msg.stat_data}}
			</p>			
			<div class="dugmedicine">
			<p>药品清单:</p>				
				 <el-table
			      :data="dugmsg"
			      style="width: 100%">
			      <el-table-column
			        prop="d_id"
			        label="药品编号"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="d_name"
			        label="药品名称"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="address"
			        label="属性">
			      </el-table-column>
			      <el-table-column
			        prop="count"
			        label="申请量">
			      </el-table-column>
			    </el-table>
			</div>
		</el-card>
	</el-dialog>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	export default {
		props: {
			msg: {
				type:Object
			}
		},
		data() {
			return {
				dugmsg: [],
				dialogmedicine: false
			}
		},
		created() {
			this.getdata()
			
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
				this.bus.$on('notPass', (show) =>{
					this.dialogmedicine = show
				})
			},
			Pass_urgent() {
//				this.$axios({
//					method: 'post',
//					url: Uurl.PostUurl,
//					data: {
//						
//					}
//				}).then().catch()
		},
		CheckClick(i) {
		}
		},
		watch: {
			msg_vul(curval,oldval) {
				this.dugmsg=curval
			}
		}
	}
</script>

<style lang="stylus">
	.not_pass
		font-size: 14px
		background:#EBEEF5
		padding: 6px
		margin: 5px 0
		box-shadow: 2px 2px 2px #E4E7ED
</style>