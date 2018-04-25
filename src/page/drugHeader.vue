<template>
	<div class="header">
		<el-row>
			<el-col :span="12">
				<div class="grid-content bg-purple">
					<p class="title">智能药品柜终端系统</p>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple-light">
					<ul class="cont-right" >
							<li :class="{'msg':istrue}"  @click="GoMsg">
						<el-badge :value="12"    >
								<i class="icon-xinxi-copy"></i>
						</el-badge>
								
							</li>
						<li>
							<span class="sign-msg">
								<i class="icon-icontouxiang"></i>
								<span class="name">张三</span>
							</span>							
						</li>
						<li>
							<span class="exit">
								<i class="icon-tuichu"></i>
								<span class="exit-title">退出</span>
							</span>							
						</li>
					</ul>
				</div>
			</el-col>			
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				istrue: false
			}
		},
		methods: {
			GoMsg() {
				this.istrue = !this.istrue
				this.$router.push({path:'/drugcontrol/Msg/'})
			}
		}
	}
</script>
<style lang="stylus" scoped="scoped">
@import "../common/stylus/mixin.styl"
	.el-row
		height: 45px
		background: #363636
		.bg-purple
			margin-left: 15px
			line-height: 45px
			color: #fff		
		.cont-right
			float: right	
			line-height: 45px
			color: #fff		
			.msg
				box-shadow: 0px 0px 15px #000 inset
			.icon-xinxi-copy
				font-size: 25px
				padding: 6px
				vertical-align: middle
		.cont-right > li
			float: left
			border-right: 1px solid #606266
			padding:0 15px
			cursor: pointer
		.cont-right > li:last-child
			border: none
			margin-right: 0
		.cont-right > li:hover
			box-shadow: 0px 0px 15px #000 inset

</style>