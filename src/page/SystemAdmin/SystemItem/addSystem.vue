<template>
	<div class="Systemadd">
		<el-dialog title="新增" :visible.sync="dialogVi_user" width="50%" :before-close="addClose">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<h1>新增参数信息</h1>
				</div>
				<el-form :model="systemForm"  ref="systemForm">
						<el-form-item  prop='number_val'>
							<span>参数编号:</span>
							<el-input placeholder="请填写参数编号" v-model="systemForm.number_val" clearable>
							</el-input>
						</el-form-item>
						<el-form-item  prop='name_val'>
							<span>参数名称:</span>
							<el-input placeholder="请输入参数名称" v-model="systemForm.name_val" clearable>
							</el-input>
						</el-form-item>
						<el-form-item  prop='system_describe'>
							<p>参数描述:</p>
							<el-input placeholder="参数描述" v-model="systemForm.system_describe" clearable>
							</el-input>
						</el-form-item>
						<el-form-item  prop='system_val'>
							<p>参数值:</p>
							<el-input placeholder="参数的值" v-model="systemForm.system_val" clearable>
							</el-input>
						</el-form-item>						
					<el-form-item class='bottom_margintop'>
						<el-button type="success" @click='amend_drug' round>保存</el-button>
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
				systemForm: {
				number_val : '',
				name_val: '',
				system_describe: '',
				system_val: '',
				},
				id: '',
				dialogVi_user: false,
				drugAmendval: {},
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
				this.$refs.systemForm.resetFields()
		     },
			drugAmendget() {
				this.number_val = this.drugAmendval.cnumber
				this.name_val = this.drugAmendval.name
				this.opsition_val = this.drugAmendval.opsition
				this.ip = this.drugAmendval.ip
				this.id = this.drugAmendval.id
			},
			getShow() {
				this.bus.$on('addSystem_show', (id) => {
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
		}
}
</script>

<style lang="stylus">
	.bottom_margintop
		margin-top: 14px
</style>