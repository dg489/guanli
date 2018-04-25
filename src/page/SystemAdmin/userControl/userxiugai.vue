<template>
	<div class="User_xiugai">
		<el-dialog
  		title="提示"
  		:visible.sync="dialogVi"
  		width="50%"
 	 :before-close="xiugaiClose">
  <el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>修改用户信息</h1>
			</div>
			<div class="User_xg">
				<div class="User_item">
				<span>工号:</span>
					<el-input
					  placeholder="请输入内容"
					  v-model="number_val"
					  clearable>
					</el-input>
				</div>
				<div class="User_item">
				<span>姓名:</span>
					<el-input
					  placeholder="请输入内容"
					  v-model="name_val"
					  clearable>
					</el-input>
			</div>
		</div>
		<div class="User_xg">
			<div class="User_item">
				<p>登录账号:</p>
					<el-input
					  placeholder="请输入内容"
					  v-model="user_val"
					  clearable>
					</el-input>
			</div>
			<div class="User_item">
			<p>登录密码:</p>
				<el-input
				  type="password"	
				  placeholder="请输入内容"
				  v-model="user_password"
				  clearable>
				</el-input>
			</div>			
		</div>
			<p>联系电话:</p>
			<p>
				<el-input
				  placeholder="请输入内容"
				  v-model="user_phone"
				  clearable>
				</el-input>
			</p>
			<p>备注:</p>
			<p>
				<el-input
				  placeholder="请输入内容"
				  v-model="uer_beizhu"
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
				uer_beizhu: '',
				user_phone: '',
				user_val: '',
				user_password: '',
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
			this.bus.$on('User_amendevn', (id) => {
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
	.User_xg
		display: flex
		.User_item
			flex: 1
			margin-right: 10px
		.User_item:last-child
			margin-right: 0
</style>