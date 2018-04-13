<template>
	<div class="cabinet_xiugai">
		<el-dialog
  		title="提示"
  		:visible.sync="dialogVi"
  		width="50%"
 	 :before-close="xiugaiClose">
  <el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>修改柜</h1>
			</div>
			<p>柜编号:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="number_val"
				  clearable>
				</el-input>
			</p>
			<p>新增柜名称:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="name_val"
				  clearable>
				</el-input>
			</p>
			<p>位置描述:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="opsition_val"
				  clearable>
				</el-input>
			</p>
			<p>IP:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="ip"
				  clearable>
				</el-input>
			</p>

			<div style="position:relative;left: 50%;">
				<el-button type="success" @click='amend_drug' round>保存</el-button>
				<el-button type="warning" @click="_clearval" round>取消</el-button>
			</div>
		</el-card>
		</el-dialog>
	</div>
	
</template>

<script>
	import Uurl from '@/common/js/getapi'
	export default {
		props: {
			cabamend: {
				type: Object
			}
		},
		data() {
			return {
				number_val : '',
				name_val: '',
				opsition_val: '',
				ip: '',
				id: '',
				dialogVi: false,
				drugAmendval: {},
			}
		},
		methods: {
			amend_drug() {
				this.$axios({
							method: "post",
							url: Uurl.PostUurl.updcabinet,
							data: {
								number_val : this.number_val,
								name_val : this.name_val,
								opsition : this.opsition_val,
								c_ip: this.ip,
								id: this.drugAmendval.id
							},
						}).then(rep => {
								if (rep.status === 200) {
							this.$message({
					            type: 'success',
					            message: '修改成功!'
					          })									
									this._clearval()
								}
							}
				).catch(res => {
					
				})
			},
			 xiugaiClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
					this._clearval()
		            done();
		          })
		          .catch(_ => {});
		     },
		     _clearval() {
		     	this.dialogVi = false
				this.number_val = ''
				this.name_val = ''
				this.describe_val = ''
				this.attr_val = ''
		     },
			drugAmendget() {
				this.number_val = this.drugAmendval.cnumber
				this.name_val = this.drugAmendval.name
				this.opsition_val = this.drugAmendval.opsition
				this.ip = this.drugAmendval.ip
				this.id = this.drugAmendval.id
			}
		 },
			mounted() {
			this.bus.$on('cabinet_amendevn', (id) => {
				this.dialogVi = id
			})
			this.drugAmendget()
		},
		watch: {
			cabamend(curval,oldval) {
				this.drugAmendval = curval
				this.drugAmendget()
			}
		}
}
</script>

<style lang="stylus">
.medicine_admin
	margin-top: 20px
	.medicine_input
		margin: 5px 0
</style>