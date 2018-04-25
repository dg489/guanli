<template>
	<div class="System_xiugai">
		<el-dialog
  		title="修改"
  		:visible.sync="dialogVi"
  		width="50%"
 	 :before-close="xiugaiClose">
  <el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>修改权限</h1>
			</div>
				<el-form :model="systemForm"  ref="systemForm">
						<el-form-item >
							<span>权限号:</span>
							<el-input placeholder="请填写权限号" prop='system_number' v-model="systemForm.system_number" clearable>
							</el-input>
						</el-form-item>
						<el-form-item >
							<span>权限名称:</span>
							<el-input placeholder="请输入权限名称" prop='system_name' v-model="systemForm.system_name" clearable>
							</el-input>
						</el-form-item>
						<el-form-item >
							<p>权限描述描述:</p>
							<el-input placeholder="描述" prop='system_remark' v-model="systemForm.system_remark" clearable>
							</el-input>
						</el-form-item>
						<el-form-item >
							<p>备注:</p>
							<el-input placeholder="备注" prop='system_note' v-model="systemForm.system_note" clearable>
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
				systemForm: {
				system_name : '',
				system_number: '',
				system_note: '',
				system_remark: ''
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
							url: Uurl.PostUurl,
							data: {
								system_name : this.systemForm.system_name,
								system_number : this.systemForm.system_number,
								system_note : this.systemForm.system_note,
								system_remark: this.systemForm.system_remark,
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
		          })
		          .catch(_ => {});
		     },
		     _clearval() {
		     	this.$refs.systemForm.resetFields()
		     	this.dialogVi = false
		     },
			drugAmendget() {
				this.system_name = this.drugAmendval.system_name
				this.system_number = this.drugAmendval.system_number
				this.system_note = this.drugAmendval.system_note
				this.ip = this.drugAmendval.ip
				this.system_remark = this.drugAmendval.system_remark
			}
		 },
			mounted() {
			this.bus.$on('xiugai_System', (id) => {
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

</style>