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
				</div>
			</div>
			<p>申请人：</p>
			<p class="not_getdug">
				{{msg.application_user_name}}
			</p>
			<p>领药人:</p>
			<p class="not_getdug">
				{{msg.bring_user_name}}
			</p>
			<p>加药人:</p>
			<p class="not_getdug">
				{{msg.dosing_user_name}}
			</p>
			<p>申请时间:</p>
			<p class="not_getdug">
			{{msg.stat_data}}
			</p>			
			<div class="dugmedicine">
			<p>药品清单:</p>				
				 <el-table
			      :data="dugmsg"
			      style="width: 100%">
			      <el-table-column
			        prop="date"
			        label="药品编号"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="name"
			        label="药品名称"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="address"
			        label="属性">
			      </el-table-column>
			      <el-table-column
			        prop="address"
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
			},
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
		mounted() {
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
				this.dugmsg.push(this.msg)
				this.bus.$on('notGet', (show) =>{
					this.dialogmedicine = show
				})
			}
		},
		watch: {
			msg(curval,oldval) {
				this.dugmsg = []
				this.dugmsg.push(curval)
			}
		}
	}
</script>

<style lang="stylus">
	.not_getdug
		font-size: 14px
		background:#EBEEF5
		padding: 6px
		margin: 5px 0
		box-shadow: 2px 2px 2px #E4E7ED
</style>