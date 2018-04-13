<template>
  <div class="drug-Control">
		<el-container style='height: 100%;'>
		  <el-header style='height: 45px;'>
  	<drugHeader></drugHeader>
		  </el-header>
		  <el-container>
		    <el-aside width='20%'>
	  	<menuLeft></menuLeft>
		    </el-aside>
		    <el-main>
		    	<keep-alive>
		    		<router-view></router-view>
					</keep-alive>
		    </el-main>
		  </el-container>
		</el-container>  	
  </div>
</template>

<script>
import drugHeader from '@/page/drugHeader'
import menuLeft from '@/page/menuleft'
export default {
  name: 'drugControl',
  data () {
    return {
    }
  },
  components: {
  	drugHeader,
  	menuLeft
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.drug-Control
	height: 100%
	.el-header
		padding: 0
</style>
