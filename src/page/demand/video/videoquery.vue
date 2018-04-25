<template>
	<div class="drugpull_count">
				<div class="admin_serch">
					<span style="line-height: 40px">查询条件：</span>
					<el-select v-model="search_selet" filterable placeholder="请选择" class="el-select-cd">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<div class=" pull" style="width: 227px;">
						<el-input placeholder="请输入内容" v-model="search_input" clearable>
						</el-input>
					</div>
					<div class="pull">
						<el-button type="primary" round icon="el-icon-search" @click='Searcheven'>查看</el-button>
					</div>
					<div class="pull">
						<el-button type="danger" round icon="el-icon-delete" @click='delete_pull'>删除</el-button>
					</div>
				</div>
				<p style="margin-bottom: 4px;">领药申请单：</p>
				<el-pagination @current-change='current_change' background layout="prev, pager, next" :total="totalmax">
				</el-pagination>
				      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
      >
      </video-player>
	</div>
</template>

<script>
	import Uurl from '@/common/js/getapi'
	import { videoPlayer } from 'vue-video-player';
	export default {
	data() {
		return {
			totalmax: 0, //默认数据总数
			pagesize: 10, //每一页的数据
			currentPage: 1, //默认开始页
			search_selet: 1,//搜索下拉框
			status_selet: 0,//领药状态下拉框
			search_input: '',
			status_index: {},
			status_vul: [],
			options: [{
					value: 0,
					label: '申请人'
				},
				{
					value: 1,
					label: '领药人'
				}, {
					value: 2,
					label: '加药人'
				},
 				{
					value: 3,
					label: '审批状态'
				}			
			],
			Alldrug: [],
			deleatdrug: [],
			      playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "application/x-mpegURL",
          src: "video.m3u8" //你的m3u8地址（必填）
        }],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
//        controlBar: {
//          timeDivider: true,
//          durationDisplay: true,
//          remainingTimeDisplay: false,
//          fullscreenToggle: true  //全屏按钮
//        }
      }
		}
	},
	components: {
	},
	methods: {
		Searcheven() { //搜索
			console.log(1)
			this.$axios({
				method: "post",
				url: Uurl.PostUurl.applylook,
				data: {
					search_input: this.search_input,
					search_selet: this.search_selet
				}
			}).then(rep => {
				console.log(rep)
				if(rep.status === 200) {
					this.tableData = JSON.parse(rep.data.data)
					this.total = this.tableData.length
					this.totalmax = this.tableData.length
				}
			})
		},
		delete_pull() { //批量删除
			this.tableData = this.tableData.filter(ele => this.deleatdrug.indexOf(ele.status) == -1)				
			 this.$refs.multipleTable.clearSelection()
//				if(this.deleatdrug.length === 0) {
//					this.$message({
//						message: '请选择要删除的记录',
//						type: 'warning'
//					})
//				} else {
//					this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
//						confirmButtonText: '确定',
//						cancelButtonText: '取消',
//						type: 'warning'
//					}).then(() => {
//						this.$axios({
//							method: "post",
//							url: Uurl.PostUurl.deleteurl,
//							data: {
//								delete_val: this.deleatdrug
//							},
//						}).then(rep => {
//							if(rep.status === 200) {
//								this.$message({
//									type: 'success',
//									message: '删除成功!'
//								})
//							}
//						}).catch(rep => {
//							this.$message.error('操作失败')
//						})
//					}).catch(() => {
//						this.$message({
//							type: 'info',
//							message: '已取消删除'
//						})
//					})
//				}
		},
		drugSelectionChange(val) {
				this.deleatdrug = val.map(ele => {
					return ele.status
				})
		},
		current_change(currentPage) { //分页改变时触发，传当前页数
			this.currentPage = currentPage
		},
		CheckClick(i) { //编辑当前页
			this.$axios({
				method: "post",
				url: Uurl.PostUurl.applylookinfo,
				data: {
					record_id: i.record_id
			}
			}).then(rep => {
				if(rep.status === 200) {
					this.status_vul = rep.data.drug_list
				switch(i.record_status) {
					case 1:
						this.status_index = i
						this.bus.$emit('notPass', true)
						break
					case 2:
						this.status_index = i
						this.bus.$emit('notGet', true)
						break
					case 3:
						this.status_index = i
						this.bus.$emit('notConfirm', true)
						console.log(this.status_vul)
						break
					case 4:
						this.status_index = i
						this.bus.$emit('confirm', true)
						break
					}
				}
			})
			

		}
	},
	computed: {
		selectShow () {
			if(this.search_selet === 3) {
				return true
			} else {
				return false
			}
			
		}
	}
}</script>

<style lang="stylus" scoped="scoped">
	.admin_serch
		display: flex 
		margin-bottom: 15px 
		.el-select-cd 
			margin-right: 10px 
		.pull 
			margin-right: 10px 
</style>