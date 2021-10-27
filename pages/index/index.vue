<template>
	<view class="content">
		<view>
			<!-- <u-popup v-model="shows" mode="bottom" border-radius="14" height="70%"> -->
						<view>
							<u-select v-model="shows" :list="allCity" mode="mutil-column-auto" value-name="id" label-name="name" @confirm="confirms"></u-select>
						</view>
			<!-- </u-popup> -->
		</view>
		<u-modal v-model="show" :title-style="{background:'#10aeb5',color:'white'}" title="数据说明" >
			<view>
				<u-parse :html="content"></u-parse>
			</view>
		</u-modal>
		<view class="data-show">
			<view class="data-title">
				<text>新型冠状病毒肺炎</text></br>
				<text style="font-size: 50rpx; font-family: 'Copperplate', Times, Fantasy;">疫情实时大数据</text>
			</view>
			<view class="data">
				
					<!-- <u-tabs-swiper class="nav" :bold="false" active-color="#10aeb5" inactive-color="#000000" ref="uTabs" :list="list" :is-scroll="false" bar-width=120 swiperWidth="750" :current="current" @change="tabschange"></u-tabs-swiper>
					<swiper :current="swiperCurrent" @change="getData" @transition="transition" @animationfinish="animationfinish">
						
						 <swiper-item class="swiper-item" v-for="(item,index) in list" :key="index">
							<view style="margin-top: 10rpx;">
								
								<text style="font-size: 26rpx; margin: 20rpx 0 0 10rpx;">数据更新至 {{now}}</text>						
								<text v-if="current!=2" style="font-size: 26rpx; float: right; padding-right: 30rpx">数据说明</text>
								<u-icon  v-if="current!=2" style=" float: right;padding-right: 6rpx;height: 40rpx;" @click="domesticDetail(0)" name="question-circle-fill" color="#d6d6d6" size="28"></u-icon>
								<button @click="shows=true" plain style="height: 60rpx; float: right; margin-right: 10rpx;" v-if="current==2" shape="circle" size="mini">切换地区 <u-icon name="arrow-down-fill" color="#d6d6d6" size="28"></u-icon></button>
								

								<scroll-view
									style="white-space: nowrap; height:300rpx" 
									scroll-y="true">
									数据部分
										<view class="data-detail">
											<view class="data-item">
												<text>现有确诊</text>
												<u-icon @click="domesticDetail(1)" name="question-circle-fill" color="#d6d6d6" size="28"></u-icon></br>
												<text style="color: #ff6a57;">{{epdemicData.existingDiagnosis}}</text>
											</view>
											
											<view v-if="current != 0" class="data-item">
												<text>无症状</text>
												<u-icon @click="domesticDetail(2)" name="question-circle-fill" color="#d6d6d6" size="28"></u-icon></br>
												<text style="color: #e9744e;">{{epdemicData.asymptomatic}}</text>
											</view>
											<view v-if="current != 0"  class="data-item">
												<text>现有疑似</text>
												</br>
												<text style="color: #f1a017;">{{epdemicData.suspected}}</text>
											</view>
											<view v-if="current != 0"  class="data-item">
												<text>现有重症</text>
												</br>
												<text style="color: #5454a3;">{{epdemicData.severe}}</text>
											</view>
											<view class="data-item">
												<text>累计确诊</text>
												</br>
												<text style="color: #e83132;">{{epdemicData.totalDiagnosis}}</text></br>
											</view>
											
											<view v-if="current != 0"  class="data-item">
												<text>镜外输入</text>
												</br>
												<text style="color: #476da0;">{{epdemicData.overseasInput}}</text></br>			
											</view>
											<view class="data-item">
												<text>累计治愈</text>
												</br>
												<text  style="color: #0d989d;">{{epdemicData.totalCure}}</text>
											</view>
											<view class="data-item">
												<text>累计死亡</text>
												</br>
												<text style="color: #4d5875;">{{epdemicData.totalDeath}}</text>
											</view>
										</view>
								</scroll-view>
							</view>
						</swiper-item>
						
					</swiper> -->
				<view class="context">
					<view class="statistics">
						<view class="icon"></view>
						<view class="national">全国疫情</view>
						<view class="time">统计时间：{{now}}</view>
					</view>
					<view class="data-detail">
						<view class="item">
							1234
							<view>确诊</view>
						</view>
						<view class="item">
							32423
							<view>疑似</view>
						</view>
						<view class="item">
							43523
							<view>死亡</view>
						</view>
						<view class="item">
							45254354
							<view>疑似</view>
						</view>
					</view>
				</view>
				<view class="map">
					<view class="nav">
						<view class="icon"></view>
						<view class="national">疫情地图</view>
					</view>
					<view class="maps">
						<view class="wrap">
									<mpvue-echarts id="main" ref="mapChart" :echarts="echarts" @onInit="renderMap" />
						</view>
						<view class="map-context">
							<view class="nav">
								<view class="item1">地区</view>
								<view class="item2">确诊</view>
								<view class="item3">新增</view>
								<view class="item4">死亡</view>
								<view class="item5">治愈</view>
							</view>
							<view class="city" v-for="(item,index) in list" :key="index">
								<view class="item1">重庆</view>
								<view class="item2">43214</view>
								<view class="item2">43124</view>
								<view class="item2">4123</view>
								<view class="item2">4321</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
				
		</view>
		<view class="func-show">
			<view class="context">
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import * as echarts from '@/echarts';
	import mpvueEcharts from '@/mpvue-echarts';
	import chinajson from '@/static/js/china.js';
	export default {
		data() {
			return {
				echarts,
				data: [{
						name: "南海诸岛",
						value: this.randomValue()
					},{
						name: '北京',
						value: this.randomValue()
					},{
						name: '天津',
						value: this.randomValue()
					},{
						name: '上海',
						value: this.randomValue()
					},{
						name: '重庆',
						value: this.randomValue()
					},{
						name: '河北',
						value: this.randomValue()
					},{
						name: '河南',
						value: this.randomValue()
					},{
						name: '云南',
						value: this.randomValue()
					},{
						name: '辽宁',
						value: this.randomValue()
					},{
						name: '黑龙江',
						value: this.randomValue()
					},{
						name: '湖南',
						value: this.randomValue()
					},{
						name: '安徽',
						value: this.randomValue()
					},{
						name: '山东',
						value: this.randomValue()
					},{
						name: '新疆',
						value: this.randomValue()
					},{
						name: '江苏',
						value: this.randomValue()
					},{
						name: '浙江',
						value: this.randomValue()
					},{
						name: '江西',
						value: this.randomValue()
					},{
						name: '湖北',
						value: this.randomValue()
					},{
						name: '广西',
						value: this.randomValue()
					},{
						name: '甘肃',
						value: this.randomValue()
					},{
						name: '山西',
						value: this.randomValue()
					},{
						name: '内蒙古',
						value: this.randomValue()
					},{
						name: '陕西',
						value: this.randomValue()
					},{
						name: '吉林',
						value: this.randomValue()
					},{
						name: '福建',
						value: this.randomValue()
					},{
						name: '贵州',
						value: this.randomValue()
					},{
						name: '广东',
						value: 20
					},{
						name: '青海',
						value: this.randomValue()
					},{
						name: '西藏',
						value: 0
					},{
						name: '四川',
						value: this.randomValue()
					},{
						name: '宁夏',
						value: this.randomValue()
					},{
						name: '海南',
						value: this.randomValue()
					},{
						name: '台湾',
						value: this.randomValue()
					},{
						name: '香港',
						value: this.randomValue()
					},{
						name: '澳门',
						value: this.randomValue()
					}
				],
				// components: {
				// 	mpvueEcharts
				// },
				shows: false,
				now: "2021",
				list: [{
					name:'全球疫情'
				}
				,{
					name: '国内疫情'
				},{
					name: ''
				},{
					name: '校园疫情'
				}],
				current: 0,
				swiperCurrent:0,
				show: false,
				content: "",
				
				
			}
		},
		onLoad() {
			this.$store.dispatch("gitCity");
			this.now = new Date().toLocaleDateString();
			//获取全球数据
			this.$store.dispatch("epdemicData","全球");
		},
		methods: {
			randomValue() {
				return Math.round(Math.random() * 25);
			},
			renderMap(e) {
				const that = this;
				var mydata = that.data;
				let {
					canvas,
					width,
					height
				} = e;
				width = width - 20;
				echarts.setCanvasCreator(() => canvas);
				const chart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				echarts.registerMap('china', chinaJson);
				canvas.setChart(chart)
				var optionMap = {
					title: {
						text: '门店分布图',
						x: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{b}:{c}家店'
					},
					//左侧小导航图标
					visualMap: {
						min: 0,
						max: 25,
						left: 'left',
						top: 'bottom',
						// orient:'horizontal',
						// text: ['高', '低'], //取值范围的文字
						inRange: {
							color: ['#fff8ed','#f2b95b'] //取值范围的颜色
						},
						show: true, //图注
						pieces: [ //自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
							{
								min: 0,
								max: 5,
								label: '0~5家'
							},
							{
								min: 5,
								max: 10,
								label: '5~10家'
							},
							{
								min: 10,
								max: 15,
								label: '10~15家'
							},
							{
								min: 15,
								max: 20,
								label: '15~20家'
							},
							{
								min: 20,
								max: 25,
								label: '20~25家'
							},
						],
						hoverLink: true,
						textStyle: {
							fontSize: 8
						},
					},
					geo: {
						map: 'china',
						roam: false, //不开启缩放和平移
						zoom: 1.2,//视角缩放比例
						label: {
							normal: {
								show: false,
								fontSize: 8,
								color: 'rgba(0, 0, 0, 0.5)' //文字颜色
							}
						},
						itemStyle: {
							normal: {
								borderColor: 'rgba(0, 0, 0, 0.2)' //省份边框颜色
							},
							emphasis: {
								areaColor: '#F3B329', //鼠标选择区域颜色
								shadowOffsetX: 0,
								shadowOffsetY: 0,
								shadowBlur: 20,
								borderWidth: 0,
								shadowColor: 'rgba(0, 0, 0, 0.2)' //选择后的边框阴影颜色
							}
						}
					},
					//配置属性
					series: [
						{
							type: 'map',
							geoIndex: 0,
							animation: false,
							data: mydata,
						}
					]
				};
				//初始化echarts实例
				chart.setOption(optionMap);
				this.$refs.mapChart.setChart(chart);
			},
			tabschange(index) {
				this.swiperCurrent = index;
				
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			},
			domesticDetail(index) {
				if(index == 0) {
					this.show = true;
					if(this.swiperCurrent != 2) {
						this.content = "<p>数据来自百度：新型冠状病毒肺炎疫情地图</p><p>详情请关注<a href='https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3#tab4'>实时更新:新型冠状病毒肺炎疫情地图</a></p>"
					} else {
						this.content = "<p>数据来源于学校数据统计，仅用于项目展示</p>";
					}
					
				}else if(index == 1) {
					this.show = true;
					this.content ="<p>现有确诊为存量数据。</p><p>计算方法为：现有确诊数=累计确诊数-累计治愈数-累计死亡数</p>"
				} else {
					this.show = true;
					this.content="<p>新冠病毒无症状感染者(以下简称无症状) 是指无相关临床症状，如发热、咳嗽、咽痛等可自我感知或临床识别的症状与体征，但呼吸道等标本新冠病毒病原学检测阳性者。</p><p>无症状数据取自国家卫健委每日最新公布的'无症状感染者数据'</p>";
				}
			},
			//获取数据（下标为2的地方获取城市数据）
			getData(e) {
				let index = e.detail.current;
				//获取指定模块的数据
				if(index == 0) {
					this.$store.dispatch("epdemicData","全球");
				}else if(index == 1) {
					this.$store.dispatch("epdemicData","中国");
				} else if(index == 2) {
					new Promise((resolve,reject)=> {
						this.$store.dispatch("gitCity");
					}).then(res=> {
						this.$store.dispatch("epdemicData",this.$store.state.city);
					})
					//拿取城市信息
					this.$store.dispatch("allCity");
				}
				
			},
			confirms(e) {
				if(e[0].value == 1) {///全球
					this.$store.dispatch("epdemicData",e[0].label);
					this.$store.state.city=e[0].label;
				} else {
					this.$store.dispatch("epdemicData",e[2].label);
					this.$store.state.city=e[2].label;
				}
			}
		},
		computed: {
			city() {
				this.list[2].name = this.$store.state.city + "疫情";
				return this.$store.state.city;
			},
			allCity() {
				return this.$store.state.allCity;
			},
			epdemicData() {
				return this.$store.state.epdemicData;
			}
		}
	}
</script>

<style lang="scss">
	
	.wrap {
			width: 100%;
			height: 600rpx;
			border: 1rpx solid #ddd;
	}
	.content{
		background: $global-background-color;
	}
	
	.data-show {
		width: 100%;
		
		min-height: 100vh;
		background-color: #10aeb5;
		.data-title {
			height: 20%;
			width: 100%;
			color: white;
			margin: 0rpx 0 10rpx 30rpx;
		}
		.data {
			.context {
				background: white;
				.statistics {
					width: 100%;
					height: 70rpx;
					display: flex;
					background: white;
					border-bottom: 1rpx solid #eee;
					padding: 0 20rpx 0 0rpx;
					.icon {
						width: 6rpx;
						background-color: #5555ff;
						margin-right: 20rpx;
					}
					.national {
						font-size: 40rpx;
						font-weight: bolder;
						line-height: 70rpx;
					}
					.time {
						font-size: #eee;
						font-size: 20rpx;
						line-height: 90rpx;
						margin-left: 30rpx;
					}
				}
				.data-detail {
					width: 100%;
					height: 150rpx;
					display: flex;
					background-color: white;
					margin:  0rpx 20rpx 30rpx 0;
					padding-left:15rpx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					.item {
						width: 23%;
						min-width: 22%;
						max-width: 20%;
						margin: auto;
						text-align: center;
						margin-right: 20rpx;
						line-height: 50rpx;
						background: #eee;
					}
				}
				
			}
			.map {
				.nav {
					height: 70rpx;
					display: flex;
					background: white;
					border-bottom: 1rpx solid #eee;
					padding: 0 20rpx 0 0rpx;
					.icon {
						width: 6rpx;
						background-color: #5555ff;
						margin-right: 20rpx;
					}
					.national {
						font-size: 40rpx;
						font-weight: bolder;
						line-height: 70rpx;
					}
				}
				.map-context {
					.nav {
						width: 100%;
						height: 50rpx;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						background-color: white;
						.item1 {
							color: white;
							width: 21%;
							text-align: center;
							line-height: 50rpx;
							background-color: blue;
						}
						.item2 {
							color: white;
							width: 18%;
							text-align: center;
							line-height: 50rpx;
							background-color: red;
						}
						.item3 {
							width: 18%;
							color: white;
							background-color: #ff007f;
							text-align: center;
							line-height: 50rpx;
						}
						.item4 {
							width: 18%;
							color: white;
							background-color: #d4d4d4;
							text-align: center;
							line-height: 50rpx;
						}
						.item5 {
							width: 18%;
							color: white;
							background-color: #61c390;
							text-align: center;
							line-height: 50rpx;
						}
					}
					.city {
						height: 50rpx;
						width: 98%;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						background-color: white;
						.item1 {
							width: 21%;
							text-align: center;
							line-height: 50rpx;
							background-color: #eee;
							margin-bottom: 4rpx;
						}
						.item2 {
							width: 18%;
							background-color: #eee;
							text-align: center;
							line-height: 50rpx;
							margin-bottom: 4rpx;
						}
					}
					
				}
				
			}
			padding: 30rpx 30rpx 1rpx 20rpx;
			border-radius: 3% 3% 0 0;
			margin: auto;
			width: 98%;
			min-height: 100vh;
			background: #eee;
			
			// .nav {
			// 	border-bottom: 1rpx solid #c8c8c8;
			// }
			// .data-detail {
			// 	margin-top: 30rpx;
			// 	text-align: center;
			// 	padding-bottom: 1mm;
			// 	display: flex;
			// 	flex-wrap: wrap;
			// 	justify-content: space-between;
			// }
			// .data-item {
			// 	width: 160rpx;
			// 	text-align: center;
			// 	font-size: 30rpx;
			// 	width: 25%;
			// 	min-width: 25%; // 加入这两个后每个item的宽度就生效了
			// 	max-width: 25%; // 加入这两个后每个item的宽度就生效了
			// 	height: 130rpx;
			// }
			// .city {
			// 	height: 56rpx;
			// 	width: 150rpx;
			// 	font-size: 28rpx; 
			// 	text-align: center;
			// 	line-height: 60rpx;
			// 	background: #e5feff;
			// 	float: right; 
			// 	margin-right: 20rpx;
			// 	border-radius: 102rpx;
			// }
			
		}
	}
	
</style>
