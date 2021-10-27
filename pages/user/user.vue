<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<view>
			<u-navbar
			back-icon-color="#fff" 
			:background="background" 
			title="个人中心"
			:is-back="false" 
			title-bold	
			></u-navbar>
		</view>
		 <!-- 个人用户信息 -->
		<view>
			<view class="info">
				<view class="pic">
					<u-avatar @click="preview(1)" size="large" :src="userInfo.avator" mode="circle" ></u-avatar>
				</view>
				<view @click="login()" v-if="userInfo.token == null" class="user">请登录</view>
				<view v-else @click="userDetail(userInfo.openid)" class="user" >
					{{userInfo.nickname}}
				</view>
			
				<view>
					<u-icon size="35rpx" name="arrow-right" class="right"></u-icon>
				</view>
			</view>
		</view>
		<!-- 其他部分 -->
		<view>
			<view class="renzheng"  @click="auth(userInfo.openid)">
				<view class="image-content">
				                    <image style="width: 50rpx; height: 50rpx; background-color: #eeeeee;" mode="aspectFit" src="https://tse2-mm.cn.bing.net/th/id/OIP-C.erfN5tHcyMygj3deWc3trgAAAA?w=176&h=180&c=7&o=5&dpr=1.12&pid=1.7" ></image>
				</view>
				<view class="text">实名认证</view>
			</view>
			<view class="second">
				<u-cell-group>
						<u-cell-item :arrow="false" @click="mess(1)" icon="bell-fill" title="消息通知">
								<u-badge :is-dot="false" type="error" :count="mesNum"></u-badge>
						</u-cell-item>
						<u-cell-item @click="serviceCenter()" icon="server-fill" title="客服中心" >
						</u-cell-item>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					background: "#5bbdfe",
				},
				mesNum:10
					
			}
		},
		methods: {
			//微信登录
			login() {
				// uni.authorize({
				// 	scope:"scope.userInfo",
				// 	success(){
						uni.getUserProfile({
							desc: "用户登录，填充用户基本信息",
							lang:"zh_CN",
							success: res =>{
								console.log(res);
								this.user = res.userInfo;
								uni.login({
									scopes: "auth_user",
									success: res1 => {
										console.log(res);
										this.$store.dispatch("login",[res1.code,res.userInfo]);
									},
									fail: res => {
										console.log(res);
									}
								})
							},
							fail: res =>{
								console.log(res);
							}
						});
					// },
					// fail(res) {
					// 	console.log(res);
					// 	uni.showToast({
					// 		title: "授权失败",icon:"error"
					// 	});
					// 	uni.getSetting({
					// 		success(res) {
					// 			console.log(res);
					// 		}
					// 	})
					// }
				// })
				
			},
			preview(url) {
				uni.previewImage({
					urls: [url],
					longPressActions: {
						itemList: ['保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			//进入用户详情
			userDetail(id) {
				if(id !=null) {
					uni.navigateTo({
					    url: '../userDetail/userDetail?id=' + id
					});
				}else {
					uni.showToast({
						title: "请先登录",icon:"error"
					});
				}
			},
			//进入实名认证
			auth(id) {
				uni.navigateTo({
					url: '/pages/auth/auth?id=' + id
				})
			},
			//进入客服中心
			serviceCenter() {
				uni.navigateTo({
					url: '/pages/contact/contact'
				})
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		height: 1240rpx;
		background: #eee;
	}
	.second {
		margin-top: 20rpx;
		background: #fff;
	}
	
	.mess {
		display: flex;
		margin-top: 20rpx;
		padding: 20rpx 10rpx 10rpx 100rpx;
		height: 70rpx;
		width: 100%;
	}
	.pub {
		display: flex;
		margin-top: 20rpx;
		padding: 20rpx 0 0 100rpx;
		height: 70rpx;
		width: 100%;
	}
	.icon {
		height: 20rpx;
		width: 30rpx;
	}
	
	.content{
		height: 92.5vh;
		background: #eee;
	}
	.box{
		background-color: red;
	}
	.info {
		background: #fff;
		height: auto;
		width: 100%;
		padding: 30rpx 0rpx 30rpx 20rpx;
		display: flex;
		// flex-direction: row;
		// flex-wrap: wrap;
		.pic {
			line-height: 30rpx;
			width: 20%;
		}
		.user {
			font-size: 30rpx;
			margin-left: 5rpx;
			line-height: 130rpx;
		}
		.right {
			float: right;
			margin-left: 280rpx;
			width: 20%;
			line-height: 100rpx;
			height: 100%;
		}
	}
	.renzheng {
		display: flex;
		margin-top: 20rpx;
		background: #fff;
		padding: 20rpx 0 10rpx 25rpx;
	}
	.text {
		padding-left: 10rpx;
	}
</style>
