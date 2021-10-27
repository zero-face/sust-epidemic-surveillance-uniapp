<template>
	<view class="context">
		<view >
			<view class="item">
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
					<text>醋酸钠是dsafdsafdsafdsafdsafdsafdsafdsafdsfasdf</text>
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
						<u-icon @click="agree(id)" label="10" style="margin-left: 380rpx;" :name="name" size=50></u-icon>
						<u-icon @click="comment" style="margin-left: 50rpx;" name="../../static/评论.png" size=45></u-icon>
					</view>
				</view>
				<u-line color="#b5b5b5" />
				<view>
					<view v-if="false" style="text-align: center;margin-top: 20rpx;">还没有评论哦，赶紧抢占沙发吧！</view>
					<view v-else>
						<view>
							<view class="comment-header">
								<view style="margin: 10rpx 10rpx 8rpx 10rpx;">
									<u-avatar :src="avctor" bg-color="#55ffff" mode="circle" size="50"></u-avatar>
								</view>
								<view class="comment-name">
									<text style="font-size: 20rpx;">Zero</text>
								</view>
							</view>
							<view class="comment-text">
								<text>这条说说发的好fdgdfsgdfagds大多数大范德萨梵蒂冈大幅度范德萨发达的风格的飒飒大师傅fdgdsgdfsgredgrejiodfajidfoasdfasdjdfla放大是范德萨 ffdlkgaf</text>
								</br>
							</view>
							<view style="margin: 10rpx 20rpx 0rpx 60rpx; font-size: 18rpx;">
								<text style="margin-right: 35rpx;">今天19:53 </text>
								<text @click="reply(id)">回复</text>
							</view>
						</view>
						
					</view>
				</view>
				<view class="comment">
					<textarea style="width: 70%; height: 38rpx; background-color: #dadada; width: 100%; padding-left: 10rpx; border: 1rpx solid #b5b5b5; border-radius: 5%;"  @blur="bindTextAreaBlur" :focus="focus" auto-blur placeholder="留下你的精彩评论吧" auto-height />
					<view @click="submit" style="background: #5bbdfe; width: 30%; height: 38rpx; float: right; margin-left: 20rpx; text-align: center;">提交</view>
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
			submit() {
				//发起请求获取评论
			},
			reply(id) {
				//回复父id是id的评论
			}
		}
	}
</script>

<style lang="scss">
	.context{
		width: 100%;
		height: 1240rpx;
		background: #e0ffe3;
	}
	.item {
		width: 100%;
		padding-bottom:1mm;
		margin: 10rpx 0 5rpx 0;
		background: #e0ffe3;
		.header {
			display: flex;
			margin-bottom: 4rpx;
			 background-image: linear-gradient(to bottom , #5bbdfe, #e0ffe3);
			.header-text {
				margin: 8rpx 0 0 15rpx;
			}
		}
		.item-context{
			margin: 0rpx 10rpx 10rpx 10rpx;
		}
		.comment {
			width: 100%;
			padding: 15rpx 20rpx 10rpx 20rpx;
			position: fixed;
			bottom: 0rpx;
			display: flex;
			background: #fff;
		}
		.context-detail {
			margin: 0 0 10rpx 10rpx;
			display: flex;
		}
		.comment-header {
			display: flex;
		}
		.comment-name {
			margin: 8rpx 0 0 15rpx;
		}
		.comment-text {
			width: 90%;
			// background: red;
			padding-bottom: 1mm;
			margin: 0rpx 20rpx 0rpx 60rpx;
		}
	}
</style>
