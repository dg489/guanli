<template>
	<div class="addcabinet">
		<el-dialog
  		title="提示"
  		:visible.sync="dialogVisi"
  		width="50%"
  		:before-close="cabinetClose">
 		 <el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>新增柜</h1>
			</div>
			<p>柜编号:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="number_val"
				  clearable>
				</el-input>
			</p>
			<p>新增柜名称:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="name_val"
				  clearable>
				</el-input>
			</p>
			<p>位置描述:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="opsition_val"
				  clearable>
				</el-input>
			</p>
			<p>IP:</p>
			<p class="medicine_input">
				<el-input
				  placeholder="请输入内容"
				  v-model="ip"
				  clearable>
				</el-input>
			</p>
			<div style="margin-top: 15px;">
				<el-button type="success" @click='_newdcabinet' round>保存</el-button>
				<el-button type="warning" @click="_clearval" round>取消</el-button>
			</div>	
		</el-card>
		</el-dialog>
	</div>
	
</template>

<script>
	import Uurl from '@/common/js/getapi'
	export default {
		data() {
			return {
				number_val : '',
				name_val: '',
				opsition_val: '',
				ip: '',
				Alldrug: [],
				dialogVisi : false
			}
		},
		methods: {
			_newdcabinet() {
				this.$axios({
							method: "post",
							url: Uurl.PostUurl.addcabinet,
							data: {
								cabinet_num: this.number_val,
								cabinet_name: this.name_val,
								opsition_val: this.opsition_val,
								ip: this.ip
							},
						}).then(rep => {
							console.log(rep.data)
								if (rep.status === 200) {
									if(rep.data.success === true) {
									this.$message({
										type: 'success',
										message: '添加成功!'
									})										
										this._clearval()
									}
								}
							}
				).catch(res => {
					this.$message({
						type: 'error',
						message: '添加失败!'
					})	
					this._clearval()
					
				})
			},
		     _clearval() {
		     	this.dialogVisi = false
				this.number_val = ''
				this.name_val = ''
				this.opsition_val = ''
				this.ip = ''
		     },
 			 cabinetClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
					this._clearval()
		            done();
		          })
		          .catch(_ => {});
		     },   	
		},
		mounted() {
			this.bus.$on('addcabinetshow', (id) => {
				this.dialogVisi = id
			})
		}
	}
</script>

<style lang="stylus">
</style>