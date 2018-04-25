<template>
	<div class="login-page">
		<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>药品柜管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary"  @keyup.enter= "submitForm('loginForm')" @click.enter="submitForm('loginForm')" class="submit_btn" :disabled="buttondis">登陆</el-button>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
	</div>
</template>

<script>
import axios from 'axios'
	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted() {
			this.showLogin = true
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						axios({
							method: "post",
							url: '/Drug_shelf/user/login',
							data: {
								user_name: this.loginForm.username, user_password: this.loginForm.password
							},
						}).then(rep => {
							console.log(rep)
							if(rep.data.success) {
								this.$router.push('/drugControl')
							} else {
								this.$notify.error({
								title:'错误',
								message: rep.data.msg,
								offset: 500
							})								
							}
						}).catch(rep =>{

						})
						}
					}
				)
			}
		},
		computed: {
			buttondis() {
				if(this.loginForm.username == '' || this.loginForm.password == '') {
					return  true
				} else {
					return false
				}
			}
		}
	}
</script>

<style lang="stylus" scoped="scoped">
	.form_contianer
		position: absolute
		top: 50%
		left: 50%
		margin-top: -105px
		margin-left: -160px
		width: 320px
		height: 210px
		padding: 25px
		border-radius: 5px
		text-align: center
		background: #fff
		.el-form-item
			margin-bottom: 20px
		.submit_btn
			width: 100%
			font-size: 16px
		.manage_tip
			position: absolute
			width: 100%
			top: -100px
			left: 0
			p
				font-size: 34px
				color: #fff
</style>