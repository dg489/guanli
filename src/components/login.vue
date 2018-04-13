<template>
  <div class="login-pages" >
  	<loginPage></loginPage>
 	</div>
</template>

<script>
import loginPage from '@/page/loginPage'
export default {
  name: 'login',
  data () {
    return {
    }
  },
  components: {
  	loginPage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.login-pages
	width: 100%
	height: 100%
	background: url('../common/img/3.jpg') no-repeat
	background-size: 100%
</style>
