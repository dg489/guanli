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
					<ul class="cont-right">
						<li>
							<i class="icon-xinxi-copy"></i>
						</li>
						<li>
							<span class="sign-msg">
								<i class="icon-icontouxiang"></i>
								<span class="name">邓兴志</span>
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
	export default {}
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
			.icon-xinxi-copy
				font-size: 25px
				vertical-align: middle
		.cont-right > li
			float: left
			border-right: 1px solid #606266
			margin-right: 15px
			padding-right: 15px
			cursor: pointer
		.cont-right > li:last-child
			border: none
			margin-right: 0
</style>