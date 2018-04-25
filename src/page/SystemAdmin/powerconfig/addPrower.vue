<template>
	<div class="Proweradd">
		<el-dialog title="新增" :visible.sync="dialogVi_prower" width="50%" :before-close="addClose">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<h1>新增权限信息</h1>
				</div>
				<el-form :model="prowerForm" status-icon ref="prowerForm">
						<el-form-item class="User_item">
							<span>权限号:</span>
							<el-input placeholder="请填写权限号" v-model="prowerForm.prm_number" clearable>
							</el-input>
						</el-form-item>
						<el-form-item class="User_item">
							<span>权限名称:</span>
							<el-input placeholder="请输入权限名称" v-model="prowerForm.prm_name" clearable>
							</el-input>
						</el-form-item>
						<el-form-item class="User_item">
							<p>权限描述描述:</p>
							<el-input placeholder="描述" v-model="prowerForm.prm_remark" clearable>
							</el-input>
						</el-form-item>
						<el-form-item class="elbottom_last">
							<p>备注:</p>
							<el-input placeholder="备注" v-model="prowerForm.prm_note" clearable>
							</el-input>
						</el-form-item>						
					<el-form-item>
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
				prowerForm: {
				prm_name : '',
				prm_number: '',
				prm_note: '',
				prm_remark: ''
				},
				id: '',
				dialogVi_prower: false,
				drugAmendval: {}
			}
		},
		methods: {
			amend_drug() {
				this.$axios({
							method: "post",
							url: Uurl.PostUurl,
							data: {
								prm_name : this.prowerForm.prm_name,
								prm_number : this.prowerForm.prm_number,
								prm_note : this.prowerForm.prm_note,
								prm_remark: this.prm_remark,
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
		     	this.dialogVi_prower = false
				this.$refs.prowerForm.resetFields()
		     },
			drugAmendget() {
				this.prm_number = this.drugAmendval.prm_number
				this.prm_name = this.drugAmendval.prm_name
				this.prm_note = this.drugAmendval.prm_note
				this.prm_remark = this.drugAmendval.prm_remark
				this.id = this.drugAmendval.id
			},
			getShow() {
				this.bus.$on('prower_show', (id) => {
					this.dialogVi_prower = id
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
			if (this.prowerForm.prm_remark == '' || this.prowerForm.prm_number =='' || this.prowerForm.user_name == '' ||this.prowerForm.user_note == '') {
				return true
			} else {
				false
			}
		}
	}
}
</script>

<style lang="stylus">
	.el-form-item
		margin:0
	.elbottom_last
		margin-bottom: 22px
</style>