赵大佬 15:24:43
<template>
		<div class="selected">
			<span style="line-height: 40px">查询条件：</span>
				<div class="pull">
					<el-button type="danger" icon="el-icon-delete" @click = 'deleat_all'>删除</el-button>
				</div>
		</div>
</template>
<script>
    export default{
        props: {
            deleteArray:{
                type:Array
            }
        },
        data() {
            return {

            }
        },
        methods:{
            deleat_all() {
                console.log(this.deleteArray)
            }
        }
    }
</script>


<style>

</style>


 <template>
 <div>
     <test :deleteArray="deleteArray"></test>
<el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
 </div>
    
  </template>

  <script>
  import test from './test.vue'
    export default {
        components: {
            test
        },
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            id:1
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            id:2
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
            id:3
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            id:4
          }],
          deleteArray:[]
        }
      },
      methods: {
          handleSelectionChange(val) {
              this.deleteArray = val.map(ele=>{return ele.id})
          }
      }
    }
  </script>
