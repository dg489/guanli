<template>
	<div class="check">
		<el-dialog
  		title="查看"
  		:visible.sync="dialogmedicine"
  		width="50%"
 	 :before-close="drugClose">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>药柜查看</span>
				<el-button style="float: right; padding: 3px 0" type="text" @click='drugCloseline'>取消</el-button>
			</div>
			<p>柜号：</p>
			<p class="dugNumber">
				{{msg.cnumber}}
			</p>
			<p>柜名称:</p>
			<p class="dugNumber">{{msg.c_name}}</p>
			<p>位置:</p>
			<p class="dugNumber">{{msg.opsition}}</p>
			<div class="dugmedicine">
			<p >药品库存:</p>				
				 <el-table
			      :data="dugmsg"
			      style="width: 100%">
			      <el-table-column
			        prop="d_number"
			        label="药品编号"
			        width="100">
			      </el-table-column>
			      <el-table-column
			        prop="d_name"
			        label="药品名称"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="in_lib_count"
			        label="在库"
			        width="100">
			      </el-table-column>
			      <el-table-column
			        prop="shorget_count"
			        label="缺药"
			        width="100">
			      </el-table-column>
			    </el-table>			    
			</div>
		</el-card>
	</el-dialog>
	</div>
</template>

<script>
	export default {
		props: {
			msg: {
				type:Object
			},
			druglist: {
				type: Array
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
				this.bus.$on('showdrpage', (show) =>{
					this.dialogmedicine = show
				})
				this.dugmsg = this.druglist
				console.log(this.dugmsg)
			}
		},
		watch: {
			druglist(curval,oldval) {
				this.dugmsg = curval
			}
		}
	}
</script>

<style lang="stylus" scoped="scoped">
	.dugNumber
		font-size: 14px
		background:#EBEEF5
		padding: 5px 0
		margin: 5px 0
		box-shadow: 2px 2px 2px #E4E7ED
</style>