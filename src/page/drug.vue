<template>
	<div>
		<div style="margin: 0 auto;">
			<drugSelect @searchcount='selectcount'></drugSelect>
		</div>
		<div class="drugCount" style="margin-top: 15px;">
			<el-table :data="drugdata" height="350" border style="width: 100%">
				<el-table-column prop="date" label="柜号" width="100">
				</el-table-column>
				<el-table-column prop="name" label="柜名称" width="180">
				</el-table-column>
				<el-table-column prop="address" label="位置">
				</el-table-column>
				<el-table-column prop="is" label="在库" width="100">
				</el-table-column>
				<el-table-column prop="no" label="缺药" width="100">
				</el-table-column>
				<el-table-column prop="name" label="操作" width="100">
					<template slot-scope="scope">
			        	<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
			        	<el-button type="text" size="small">编辑</el-button>
     				</template>
				</el-table-column>
			</el-table>
			<el-pagination
					  background
					  layout="prev, pager, next"
					  :total="5">
			</el-pagination>
		</div>
		<div v-show="isShow">
			<medicine :msg='medicineMsg'></medicine>
		</div>
	</div>
</template>

<script>
	import drugSelect from './drugSelect'
	import medicine from './medicineChest'
	export default {
		data() {
			return {
				drugdata: [],
				medicineMsg: {},
				isShow: false
			}
		},
		components: {
			drugSelect,
			medicine
		},
		methods: {
			handleClick(msg) {
				this.medicineMsg = msg
				if (!this.isShow) {
					this.isShow = true
				}
			  },
			selectcount(sel) {
			this.drugdata = sel
			},
		}
	}
</script>

<style>

</style>
