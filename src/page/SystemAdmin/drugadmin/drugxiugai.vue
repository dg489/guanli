<template>
	<div class="drug_xiugai">
		<el-dialog
  		title="提示"
  		:visible.sync="dialogVisible"
  		width="50%"
 	 :before-close="handleClose">
  <el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>修改药品</h1>
			</div>
			<p>药品编号:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="number_val"
				  clearable>
				</el-input>
			</p>
			<p>药品名称:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="name_val"
				  clearable>
				</el-input>
			</p>
			<p>药品描述:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="describe_val"
				  clearable>
				</el-input>
			</p>
			<p>属性:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="attr_val"
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
			drugAmend: {
				type: Object
			}
		},
		data() {
			return {
				number_val : '',
				name_val: '',
				describe_val: '',
				attr_val: '',
				d_id: '',
				dialogVisible: false,
				drugAmendval: {},
			}
		},
		methods: {
			amend_drug() {
				this.$axios({
							method: "post",
							url: Uurl.PostUurl.update,
							data: {
								drug_num : this.number_val,
								drug_name : this.name_val,
								drug_descr : this.describe_val,
								drug_attr : this.attr_val,
								d_id: this.drugAmendval.id
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
						)
			},
			 handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
					this._clearval()
		            done();
		          })
		          .catch(_ => {});
		     },
		     _clearval() {
		     	this.dialogVisible = false
				this.number_val = ''
				this.name_val = ''
				this.describe_val = ''
				this.attr_val = ''
		     },
			drugAmendget() {
				this.number_val = this.drugAmendval.dnumber
				this.name_val = this.drugAmendval.names
				this.describe_val = this.drugAmendval.efficacy
				this.attr_val = this.drugAmendval.attribute
				this.d_id = this.drugAmendval.id
			}
		 },
			mounted() {
			this.bus.$on('drug_amendevn', (id) => {
				this.dialogVisible = id
			})
			this.drugAmendget()
		},
		watch: {
			drugAmend(curval,oldval) {
				this.drugAmendval = curval
				this.number_val = this.drugAmendval.dnumber
				this.name_val = this.drugAmendval.names
				this.describe_val = this.drugAmendval.efficacy
				this.attr_val = this.drugAmendval.attribute
				this.d_id = this.drugAmendval.id
			}
		}
}
</script>

<style lang="stylus">
</style>