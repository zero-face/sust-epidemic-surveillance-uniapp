<template>
	<view>
		<view>
			<u-cell-group title="基本信息" >
					<u-cell-item title="头像">
						<image style="width: 150rpx; height: 100rpx; background-color: #eeeeee;" mode="aspectFill" :src="userInfo.avator"></image>
					</u-cell-item>
					<u-cell-item  title="昵称" :value="userInfo.nickname"></u-cell-item>
					<u-cell-item  title="性别" :value="userInfo.sex"></u-cell-item>
					<u-cell-item  title="国家" :value="userInfo.country"></u-cell-item>
					<u-cell-item  title="省份" :value="userInfo.province"></u-cell-item>
					<u-cell-item  title="城市" :value="userInfo.city"></u-cell-item>
			</u-cell-group>
			<view v-if="userInfo.authed">
				<u-cell-group title="实名信息">
					<u-cell-item title="真实姓名" :value="userRealAuth.username"></u-cell-item>
					<u-cell-item title="学号" :value="userRealAuth.number"></u-cell-item>
					<u-cell-item title="身份证号" :value="userRealAuth.profileId"></u-cell-item>
					<u-cell-item title="电话" :value="userRealAuth.phone"></u-cell-item>
					<u-cell-item title="学院" :value="userRealAuth.collage"></u-cell-item>
					<u-cell-item title="班级" :value="userRealAuth.clazz"></u-cell-item>
					<u-cell-item title="职务" :value="userRealAuth.chage?'负责人':'无'"></u-cell-item>
				</u-cell-group>
			</view>
			<view v-else>
				<button type="primary" @click="auth(openid)">实名认证</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avctor:"https://tse4-mm.cn.bing.net/th/id/OIP-C.SNqZz32EmYnvptPs_asrGgHaLH?w=203&h=304&c=7&r=0&o=5&dpr=1.12&pid=1.7",
				openid: "",
				
			}
		},
		methods: {
			auth(id) {
				console.log(id);
				uni.redirectTo({
					url: '/pages/auth/auth?id=' + id
				})
			},
			checkStatus() {
				console.log("检查登录状态");
				let token = uni.getStorageSync('token');
				if(token == "") { //没有token
					uni.showToast({
						title:"请先登录",
						icon:"error"
					});
					setTimeout(function() {
						uni.navigateBack({
						});
					},1000);
				}
			},
			//直接根据token去拿用户信息（token过期自然拿不到信息）
			async getAuthInfo() {
				await this.$store.dispatch("getRealAuthInfo",this.openid);
			}
		},
		onLoad(e) {
			this.openid = e.id;
			this.checkStatus();
			this.getAuthInfo();
		},
		computed:{
			userInfo() {
				return this.$store.state.userInfo;
			},
			userRealAuth() {
				return this.$store.state.userRealAuth;
			},
		}
	}
</script>

<style>

</style>
