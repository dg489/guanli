<template>
	<div class="User_add">
		<el-dialog title="新增" :visible.sync="dialogVi_user" width="50%" :before-close="addClose">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<h1>新增用户信息</h1>
				</div>
				<el-form :model="userForm" :rules="rules2" status-icon ref="userForm">
					<div class="User_add">
						<el-form-item class="User_item" label='工号' prop="number_val">
							<el-input placeholder="请填写工号" v-model="userForm.number_val" clearable>
							</el-input>
						</el-form-item>
						<el-form-item label='姓名' class="User_item" prop='name_val'>
							<el-input placeholder="请输入姓名" v-model="userForm.name_val" clearable>
							</el-input>
						</el-form-item>
					</div>
					<div class="User_add">
						<el-form-item label='登录账号' class="User_item" prop='user_val'>
							<el-input placeholder="请输入账号" v-model="userForm.user_val" clearable>
							</el-input>
						</el-form-item>
						<el-form-item label='登录密码' class="User_item" prop='user_password'>
							<el-input type="password" placeholder="请输入密码" v-model="userForm.user_password" clearable>
							</el-input>
						</el-form-item>
					</div>
					<el-form-item label='联系电话' prop = 'user_phone'>
						<el-input placeholder="请输入手机号码" v-model="userForm.user_phone" clearable>
						</el-input>
					</el-form-item>
					<el-form-item prop = 'user_phone' label = '权限身份选择'>
					<el-select v-model="userForm.region" filterable placeholder="请选择" class="el-select-cd">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					  </el-form-item>
					</el-form-item>					
					<el-form-item>
						<p>备注:</p>
						<el-input placeholder="请输入备注内容" v-model="userForm.uer_beizhu" clearable>
						</el-input>
					</el-form-item>
					<el-form-item class='bottom_top'>
						<el-button type="success" @click='amend_drug' :disabled="bottons" round>保存</el-button>
						<el-button type="warning" @click="_clearval" round>取消</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</el-dialog>
	</div>
</template>
<script>
	import Uurl from '@/common/js/getapi'
	export default {
		data() {
			return {
				userForm: {
				number_val : '',
				name_val: '',
				uer_beizhu: '',
				user_phone: '',
				user_val: '',
				user_password: '',
				region : 0
				},
				id: '',
				dialogVi_user: false,
				drugAmendval: {},
				rules2: {
					number_val : [
						{required: true, message:'请输入工号',trigger:'blur'}
					],
					name_val: [
						{required: true, message:'请输入姓名',trigger:'blur'}
					],
					user_val: [
						{required: true, message:'请输入账号',trigger:'blur'}
					],
					user_password: [
						{required: true, message:'请输入密码',trigger:'blur'}
					],
					user_phone: [
						{required: true, message:'请输入11位手机密码',trigger:'blur'},
						{min:11, max:11,message:'11位手机号码'}
					]
				},
				options: [{
					value: 0,
					label: '普通护士'
				},
				{
					value: 1,
					label: '护士长'
				},
				{
					value: 2,
					label: '超管'
				}]
			}
		},
		methods: {
			amend_drug() {
				this.$axios({
							method: "post",
							url: Uurl.PostUurl,
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
			 addClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
					this._clearval()
		            done();
		          })
		          .catch(_ => {});
		     },
		     _clearval() {
		     	this.dialogVi_user = false
				this.$refs.userForm.resetFields()
		     },
			drugAmendget() {
				this.number_val = this.drugAmendval.cnumber
				this.name_val = this.drugAmendval.name
				this.opsition_val = this.drugAmendval.opsition
				this.ip = this.drugAmendval.ip
				this.id = this.drugAmendval.id
			},
			getShow() {
				this.bus.$on('addUser_show', (id) => {
					this.dialogVi_user = id
				})				
			}
		 },
			mounted() {
			this.getShow()
			this.drugAmendget()
		},
		watch: {
			cabamend(curval,oldval) {
				this.drugAmendval = curval
				this.drugAmendget()
			}
		},
	computed: {
		bottons() {
			if (this.userForm.number_val == '' || this.userForm.name_val =='' || this.userForm.user_val == '' ||this.userForm.user_password == '') {
				return true
			} else {
				false
			}
		}
	}
}
</script>

<style lang="stylus">
	.User_add
		display: flex
		.User_item
			flex: 1
			margin-right: 10px
		.User_item:last-child
			margin-right: 0
		.bottom_top
			margin-top: 14px
</style>