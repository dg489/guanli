<template>
	<div class="check">
		<el-dialog
  		title="分配"
  		:visible.sync="dialogCount"
  		width="50%"
 	 :before-close="drugClose">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<div style="display: flex;">
				<span style="flex: 1;line-height: 40px;">分配详情</span>
				</div>
			</div>
			<p>药品编号：</p>
			<p class="not_getdug">
				{{msg.d__number}}
			</p>
			<p>药品名称:</p>
			<p class="not_getdug">
				{{msg.d_name}}
			</p>
			<p>属性:</p>
			<p class="not_getdug">
				{{msg.d_attribute}}
			</p>
			<div class="dugmedicine">
			<p>药品分配:</p>				
				 <el-table
			      :data="dugmsg"
			      style="width: 100%">
			      <el-table-column
			        prop="c_name"
			        label="柜名称">
			      </el-table-column>
			      <el-table-column
			        prop="c_opsition"
			        label="位置">
			      </el-table-column>
			      <el-table-column
			        prop="count"
			        label="缺药量">
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
				dialogCount: false
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
		          	this.dialogCount = false
		          })
		          .catch(_ => {
		          });
			},
			getdata() {
				this.dugmsg = this.msg
				this.bus.$on('notGetCount', (show) =>{
					this.dialogCount = show
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