<template>
	<div class="srole_xiugai">
		<el-dialog
  		title="修改"
  		:visible.sync="dialogsrole"
  		width="50%"
 	 :before-close="xiugaiClose">
  <el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>修改角色</h1>
			</div>
				<el-form :model="srole"  ref="srole">
						<el-form-item >
							<span>角色号:</span>
							<el-input placeholder="请填写权限号" prop='srole_number' v-model="srole.srole_number" clearable>
							</el-input>
						</el-form-item>
						<el-form-item >
							<span>角色名称:</span>
							<el-input placeholder="请输入权限名称" prop='srole_name' v-model="srole.srole_name" clearable>
							</el-input>
						</el-form-item>
						<el-form-item >
							<p>角色描述:</p>
							<el-input placeholder="描述" prop='srole_remark' v-model="srole.srole_remark" clearable>
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
				srole: {
				srole_name : '',
				srole_number: '',
				srole_note: '',
				srole_remark: ''
				},
				id: '',
				dialogsrole: false,
				drugAmendval: {},
			}
		},
		methods: {
			amend_drug() {
				this.$axios({
							method: "post",
							url: Uurl.PostUurl,
							data: {
								srole_name : this.srole.srole_name,
								srole_number : this.srole.srole_number,
								srole_note : this.srole.srole_note,
								srole_remark: this.srole.srole_remark,
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
		     	this.$refs.srole.resetFields()
		     	this.dialogsrole = false
		     },
			drugAmendget() {
				this.srole_name = this.drugAmendval.srole_name
				this.srole_number = this.drugAmendval.srole_number
				this.srole_note = this.drugAmendval.srole_note
				this.ip = this.drugAmendval.ip
				this.srole_remark = this.drugAmendval.srole_remark
			}
		 },
			mounted() {
			this.bus.$on('xiugai_srole', (id) => {
				this.dialogsrole = id
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