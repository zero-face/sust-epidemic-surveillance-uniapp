<template>
	<view>
		<!-- 导航栏 -->
		<view>
			<u-navbar :background="background" title="今日新闻" title-color="white" :is-back="false"></u-navbar>
		</view>
		<view class="content">
			<!-- 顶部图片 -->
			<view class="header">
				<view>
					<u-image width="100%" height="300rpx" :src="src"></u-image>
				</view>
			</view>
			<view class="nav">
				<view :class="[{'active':index == 0},'item']" @click="getArticle(0)">{{nav[0]}}</view>
				<view :class="[{'active':index == 1},'item']" @click="getArticle(1)">{{nav[1]}}</view>
				<view :class="[{'active':index == 2},'item']" @click="getArticle(2)">{{nav[2]}}</view>
				<view :class="[{'active':index == 3},'item']" @click="getArticle(3)">{{nav[3]}}</view>
			</view>
			<!-- 轮播图 -->
			<scroll-view
			style="white-space: nowrap; height:800rpx" 
			scroll-y="true">
			<view>
				<u-swiper :list="list"></u-swiper>
			</view>
			<!-- 正文部分 -->
			<view class="context">
				
				<u-cell-group :title=nav[index]>
						<view v-for="(item,index) in titleList" :key="index">
							<u-cell-item @click="articleDetail(1)" style="height: 20rpx;" :title-style="titleStyle" icon-size="30" value="12.12" border-top icon="pushpin-fill" :arrow="false" :title=item></u-cell-item>
						</view>
				</u-cell-group>
				
			</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav: ["今日资讯","科大要闻","通知公告","防控知识"],
				list: [{
					image: ""
				}],
				background: {
					backgroundColor: '#10aeb5',
				},
				src: "../../static/header.png",
				index: 0,
				title: "陕西科技大学",
				subTitle: "2021.10.12",
				thumb: "https://www.baidu.com",
				titleStyle: {
					'font-size': '30rpx'
				},
				titleList: ["陕西科技大学迎来第一批新生返校","陕西科技大学发表有关疫情防控最新措施","3","4","5","6","7","8","9","10"]
			}
		},
		methods: {
			getArticle(index) {
				this.index = index;
				this.$store.dispatch("getArticle",index);
			},
			articleDetail(id) {
				uni.navigateTo({
					url:'/pages/ariticleDetail/ariticleDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.header {
		width: 100%;
		height: 300rpx;
	}
	.nav {
		width: 100%;
		height: 80rpx;
		color: white;
		background: #10aeb5;
		text-align: center;
		display: flex;
		line-height: 80rpx;
		.item {
			height: 70rpx;
			margin-left: 60rpx;
			text-align: center;
			// border-bottom: 3rpx solid #fff;
		}
		.active {
			border-bottom: 3rpx solid #fff;
		}
	}
</style>
