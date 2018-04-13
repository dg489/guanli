<template>
	<div class="medicine">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>药柜查看</span>
				<el-button style="float: right; padding: 3px 0" type="text" @click='isfalse'>取消</el-button>
			</div>
			<p>柜号：</p>
			<p class="dugNumber">
				{{msg.date}}
			</p>
			<p>柜名称:</p>
			<p class="dugNumber">{{msg.name}}</p>
			<p>位置:</p>
			<p class="dugNumber">{{msg.address}}</p>
			<div class="dugmedicine">
				 <el-table
			      :data="dugmsg"
			      style="width: 100%">
			      <el-table-column
			        prop="date"
			        label="日期"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="name"
			        label="姓名"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="address"
			        label="地址">
			      </el-table-column>
			    </el-table>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		props: {
			msg: {
				type:Object
			}
		},
		data() {
			return {
				dugmsg: [],
				isfalse: false
			}
		},
		mounted() {
				this.dugmsg.push(this.msg)
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
	.dugNumber
		font-size: 14px
		background:#EBEEF5
		padding: 5px 0
		margin: 5px 0
		box-shadow: 2px 2px 2px #E4E7ED
</style>