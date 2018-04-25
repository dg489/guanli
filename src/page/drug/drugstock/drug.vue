<template>
	<div>
		<div style="margin-bottom: 10px;">
			<drugSelect @searchcount='selectcount'></drugSelect>
		</div>
		<div class="drugCount" v-show="cmaitshow">
		<el-table :data="drugdata.slice((currentPage-1)*pagesize,currentPage*pagesize)" height="350" border 
				highlight-current-row 
				style="width: 100%">
				<el-table-column prop="cnumber" label="柜号" width="100">
				</el-table-column>
				<el-table-column prop="c_name" label="柜名称" width="180">
				</el-table-column>
				<el-table-column prop="opsition" label="位置">
				</el-table-column>
				<el-table-column prop="in_lib_count" label="在库" width="100">
				</el-table-column>
				<el-table-column prop="shorget_count" label="缺药" width="100">
				</el-table-column>
				<el-table-column prop="name" label="操作" width="100">
					<template slot-scope="scope">
			        	 <el-button icon="el-icon-view" type="primary" size='small' @click="handleClick(scope.row)" round>查看</el-button>
     				</template>
				</el-table-column>
			</el-table>
			<el-pagination
					  @current-change='currentset_change'
					  background
					  layout="prev, pager, next"
					  :total="totalset">
			</el-pagination>
		</div>
			<div class="drugCount" v-show="drugshow">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>药品查看</span>
		  </div>
			<p>药品编号：</p>
			<p class="dugNumber">
				{{drug_msg.dnumber}}
			</p>
			<p>药品名称:</p>
			<p class="dugNumber">
				{{drug_msg.names}}
			</p>
			<p>属性:</p>
			<p class="dugNumber">
				{{drug_msg.attribute}}
			</p>
			<p style="margin-bottom: 6px;">药品库存:</p>
				 <el-table
			      :data="duglistmsg"
				  highlight-current-row 
				  border
				  height= '400'
			      style="width: 100%">
			      <el-table-column
			        prop="dc_number"
			        label="柜号"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="dc_name"
			        label="柜名称"
			        width="180">
			      </el-table-column>
			      <el-table-column
			        prop="c_opsition"
			        label="位置">
			      </el-table-column>
			      <el-table-column
			        prop="in_lib_count"
			        label="在库" 
			        width='180'>
			      </el-table-column>
			      <el-table-column
			        prop="shorget_count"
			        label="缺药"
			        width='180'>
			      </el-table-column>
			    </el-table>			
		</el-card>
		</div>
			<medicine :msg='medicineMsg' :druglist='lists'></medicine>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	import drugSelect from './drugSelect'
	import medicine from './medicineChest'
	export default {
		data() {
			return {
				drugdata: [],
				duglistmsg:[],
				medicineMsg: {},
				totalset: 0, //默认数据总数
				pagesize: 10, //每一页的数据
				currentPage: 1, //默认开始页	
				cmaitshow: false,
				drugshow: false,
				drug_msg: {},
				lists: []
			}
		},
		components: {
			drugSelect,
			medicine
		},
		methods: {
			handleClick(msg) {
				this.medicineMsg = msg
				this.$axios({
					method: 'post',
					url: Uurl.PostUurl.qurdlistBycid,					
					data: {
						c_id: msg.id
					}
				}).then(rep =>{
					this.lists = JSON.parse(rep.data.data)
				}).catch()
				this.bus.$emit('showdrpage',true)
			  },
			selectcount(sel) {
				if(sel.data.str) {
					this.drugshow = false
					this.cmaitshow = true
					this.drugdata = JSON.parse(sel.data.data)
					this.totalset = this.drugdata.length
				} else {
					this.cmaitshow = false
					this.drugshow = true
					this.duglistmsg = sel.data.clist
					this.drug_msg = sel.data
				}
				if(sel.data == '') {
					this.$notify({
					  title: '警告',
					  message: '查询信息并不存在',
					  type: 'warning'
					})
					this.drugshow = false
					this.cmaitshow = false
				}
			},
			currentset_change(i) {
				this.currentPage = i	
			}
		}
	}
</script>

<style lang="stylus">
	.dugNumber
		font-size: 14px
		background:#EBEEF5
		padding: 10px 
		margin: 5px 0
		box-shadow: 2px 2px 2px #E4E7ED		
</style>
