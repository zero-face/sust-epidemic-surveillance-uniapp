<template>
	<view class="context">
		<view>
			<u-navbar :background="background" title="交流区" title-color="white" :is-back="false"></u-navbar>
		</view>
		<!-- 顶部图片 -->
		<view>
			<view>
				<u-image width="100%" height="300rpx" :src="src" mode="scaleToFill"></u-image>
			</view>
		</view>
		<view >
			<view class="item" @click="detail(id)">
				<view class="header">
					<view style="margin: 10rpx 10rpx 8rpx 10rpx;">
						<u-avatar :src="avctor" bg-color="#55ffff" mode="circle" size="70"></u-avatar>
					</view>
					<view class="header-text">
						<text>Zero</text></br>
						<text style="font-size: 25rpx;">2020年4月8日 19:04</text>
					</view>
				</view>
				<view class="item-context">
					<text>醋酸钠是</text>
					<text>醋酸钠是</text>
					<text>醋酸钠是</text></br>	<text>醋酸钠是</text>
					<text>醋酸钠是</text>
					<text>醋酸钠是</text></br>	<text>醋酸钠是</text>
					<text>醋酸钠是</text>
					<text>醋酸钠是</text></br>	<text>醋酸钠是</text>
					<text>醋酸钠是</text>
					<text>醋酸钠是</text></br>	<text>醋酸钠是</text>
					<text>醋酸钠是</text>
					<text>醋酸钠是</text></br>
				</view>
				<view class="context-detail">
					<view>
						<text style="float: left;">浏览量 300</text>
					</view>
					<view style="float: right;">
						<u-icon @click="agree(id)" style="margin-left: 380rpx;" :name="name" size=50></u-icon>
						<u-icon @click="comment" style="margin-left: 50rpx;" name="../../static/评论.png" size=45></u-icon>
					</view>
				</view>
				<view class="context-detail">
					<text>100条评论回复</text>
				</view>
				<view class="comment">
					<textarea style="height: 38rpx; background: #eee; width: 100%; padding-left: 10rpx;"  @blur="bindTextAreaBlur" :focus="focus" auto-blur placeholder="留下你的精彩评论吧" auto-height />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus: false,
				name: "thumb-up",
				background: {
					backgroundColor: '#5bbdfe',
				},
				src: "../../static/c_header.png",
				nav: ["首页","发表"],
				index: 0,
				avctor: "https://tse4-mm.cn.bing.net/th/id/OIP-C.SNqZz32EmYnvptPs_asrGgHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.12&pid=1.7",
				
			}
		},
		methods: {
			agree(id) {
				this.name = "thumb-up-fill";
			},
			comment() {
				this.focus = true;
			},
			detail(id) {
				uni.navigateTo({
					url:'/pages/comDetail/comDetail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.context{
		width: 100%;
		height: 1240rpx;
		background: #eee;
	}
	.item {
		width: 100%;
		padding-bottom:1mm;
		margin: 10rpx 0 5rpx 0;
		background: #fff;
		.header {
			display: flex;
			margin-bottom: 4rpx;
			 background-image: linear-gradient(to bottom , #5bbdfe, #fff);
			.header-text {
				margin: 8rpx 0 0 15rpx;
			}
		}
		.item-context{
			margin: 0rpx 10rpx 10rpx 10rpx;
		}
		.comment {
			margin: 1rpx 10rpx 10rpx 10rpx;
		}
		.context-detail {
			margin: 0 0 10rpx 10rpx;
			display: flex;
		}
	}
</style>
