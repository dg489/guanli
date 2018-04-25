<template>
	<div class="Proweradd">
		<el-dialog title="新增" :visible.sync="dialogVi_prower" width="50%" :before-close="addClose">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<h1>新增角色权限</h1>
				</div>
				<el-form :model="prowerForm" ref="prowerForm">
						<el-form-item  class="prower_item" label='角色名称'>
							<el-select v-model="prowerForm.region" filterable placeholder="请选择" @change='selectchange'>
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>		
						</el-form-item>
						<p>权限配置:</p>
						<el-form-item >
							<el-tree
							  :data="data2"
							  show-checkbox
							  node-key="id"
							  ref="tree"
							  highlight-current
							  :props="defaultProps">
							</el-tree>
						</el-form-item>
						<el-form-item class='bottom_top'>
							<el-button type="success" @click='amend_Prower'  round>保存</el-button>
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
				prm_tree: '',
				prm_status : '',
				region: 0
				},
				id: '',
				dialogVi_prower: false,
				drugAmendval: {},
				options:[{
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
				}],
				defaultProps: {
					children: 'childrens',
					label: 'label'
				},
				data2: [{
					id: 1,
					label: '后台登录',
				},{
					id:2,
					label: '系统管理'
				},
				{
					id:3,
					label:'药柜登录',
					childrens: [{
						id:22,
						label:'药柜1号'
					},
					{
						id:223,
						label:'药柜2号'
					},
					{
						id:44,
						label:'药柜3号'
					}
					]
				},
				{
					id: 4,
					label: '药品管理'
				},
				{
					id:5,
					label:'药柜加药',
					childrens: [{
						id:1,
						label:'药柜1号'
					},
					{
						id:22,
						label:'药柜2号'
					},
					{
						id:55,
						label:'药柜3号'
					}
					]
					
				}
				]
			}
		},
		methods: {
			amend_Prower() {
				var arr = this.$refs.tree.getCheckedKeys() //获取节点数组
				this.$axios({
							method: "post",
							url: Uurl.PostUurl,
							data: {

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
								this.$message({
					            type: 'error',
					            message: '提交数据失败!'
					          })	
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
		     	 this.$refs.tree.setCheckedKeys([])
		     },
		     getstatus() {
		     return	this.$axios(Uurl.PostUurl)
		     },
		     getall() {
		     return	this.$axios(Uurl.PostUurl)
		     },
			getShow() {
				this.bus.$on('seet_prower', (id) => {
					this.dialogVi_prower = id
				})
//				this.$axios.all([this.getall(),this.getstatus()]).then(this.$axios.spread((acct,perms) =>{
//					
//				})).catch()
//				
//				this.$axios({ //获取所有的身份
//							method: "get",
//							url: Uurl.PostUurl,
//							 responseType:'json'
//						}).then(rep => {
//								if (rep.status === 200) {
//								this.options = rep.data.data.data
//								}
//							}
//				).catch(res => {
//								this.$message({
//					            type: 'error',
//					            message: '获取数据失败!'
//					          })	
//				})
				
			},
			selectchange() {
				this.$refs.tree.setCheckedNodes([
					{id:1},
					{id:2},
					{id:22},
					{id:44}
				])
			}
		 },
			created() {
			this.getShow()
		}
}
</script>

<style lang="stylus">
	.bottom_top
		margin-top: 14px
</style>