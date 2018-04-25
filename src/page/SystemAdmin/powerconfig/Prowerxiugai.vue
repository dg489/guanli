<template>
	<div class="Prower_xiugai">
		<el-dialog
  		title="修改"
  		:visible.sync="dialogVi"
  		width="50%"
 	 :before-close="xiugaiClose">
  <el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>修改权限</h1>
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
						<el-button type="success" @click='amend_drug'  round>保存</el-button>
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
		props: {
			cabamend: {
				type: Object
			}
		},
		data() {
			return {
				prowerForm: {
				prm_name : '',
				prm_number: '',
				prm_note: '',
				prm_remark: ''
				},
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
								prm_name : this.prowerForm.prm_name,
								prm_number : this.prowerForm.prm_number,
								prm_note : this.prowerForm.prm_note,
								prm_remark: this.prowerForm.prm_remark,
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
				this.$refs.prowerForm.resetFields()
		     },
			drugAmendget() {
				this.prm_name = this.drugAmendval.cnumber
				this.prm_number = this.drugAmendval.name
				this.opsition_val = this.drugAmendval.opsition
				this.ip = this.drugAmendval.ip
				this.id = this.drugAmendval.id
			}
		 },
			mounted() {
			this.bus.$on('prower_amendevn', (id) => {
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