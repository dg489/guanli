<template>
	<div class="check">
		<el-dialog
  		title="分配"
  		:visible.sync="dialogallot"
  		append-to-body
  		width="50%"
 	 :before-close="drugClose">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<div style="display: flex;">
				<span style="flex: 1;line-height: 40px;">领药单 </span>
				<el-button  type="warning" @click='drugCloseline'>取消</el-button>
				</div>
			</div>
			<p>药品编号：</p>
			<p class="_allot">
				{{msg.d_number}}
			</p>
			<p>药品名称:</p>
			<p class="_allot">
				{{msg.d_name}}
			</p>
			<p>属性:</p>
			<p class="_allot">
				{{msg.d_attribute}}
			</p>
			<p>药品分配:</p>				
				 <el-table
			      :data="dugmsg">
			      <el-table-column
			        prop="c_number"
			        label="药编号"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="c_name"
			        label="柜名称">
			      </el-table-column>
			      <el-table-column
			      	prop="c_opsitioon"
			        label="位置">
			      </el-table-column>
			      <el-table-column
			        prop="count"
			        label="加药量">
			      </el-table-column>
			      <el-table-column
			        prop="add_count"
			        label="已添加">
			      </el-table-column>			      
			    </el-table>
		</el-card>
	</el-dialog>
	</div>
</template>
<script>
	import Uurl from '@/common/js/getapi'
	export default {
		props: {
			list: {
				type:Array
			},
			msg: {
				type: Object
			}
		},
		data() {
			return {
				dugmsg: [],
				dialogallot: false
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
		          	this.dialogallot = false
		          })
		          .catch(_ => {
		          });
			},
			getdata() {
				this.dugmsg = this.list
				this.bus.$on('showallot', (show) =>{
					this.dialogallot = show
				})
			}
		},
		watch: {
			list(curval,oldval) {
				this.dugmsg = curval
			}
		}
	}
</script>

<style lang="stylus">
	._allot
		font-size: 14px
		background:#EBEEF5
		padding: 6px
		margin: 6px 0
		box-shadow: 2px 2px 2px #E4E7ED
</style>