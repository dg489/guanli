import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = { //存储全局变量的数据 data
	count : 20
}
const mutations = {//类似muthods
	add(state) {
		state.count ++
	},
	munus(state) {
		state.count --
	}
}
const getters = {//
	
}
const action = {
	
}

export default new Vuex.Store({
	state,
	mutations
})
