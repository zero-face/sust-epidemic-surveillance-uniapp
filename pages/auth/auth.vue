<template>
	<view>
		<view>
			<u-form :model="form" ref="uForm" :error-type="errorType">
			<u-cell-group >
				<u-form-item prop="name">
					<u-cell-item title="真实姓名" required>
						<input :disabled="use" :focus="use" v-model="form.name" type="text" :placeholder="userRealAuth.username"/>
					
					</u-cell-item>
				</u-form-item>
				<u-form-item prop="number">
					<u-cell-item title="学号" required>
						<input :disabled="use" v-model="form.number" type="text" :placeholder="userRealAuth.number"/>
					</u-cell-item>
				</u-form-item>
				<u-form-item prop="profile">
					<u-cell-item title="身份证号" required>
						<input :disabled="use" v-model="form.profile" type="text" :placeholder="userRealAuth.profileId"/>
					</u-cell-item>
				</u-form-item>
				
				<u-form-item prop="tel">
					<u-cell-item title="电话" required>
						<input :disabled="use" v-model="form.tel" type="text" :placeholder="userRealAuth.phone"/>
					</u-cell-item>
				</u-form-item>
				<u-form-item prop="collage">
					<u-cell-item title="班级学院" required>
						<input @click="show = true" :disabled="true" v-model="form.collage + form.clazz" type="text" :placeholder="userRealAuth.collage + userRealAuth.clazz"/>
						<u-select v-model="show" :list="list" mode="mutil-column-auto" @confirm="confirm"></u-select>
						
					</u-cell-item>
				</u-form-item>
				
				<u-form-item prop="clazz">
					<u-cell-item title="是否班委" required>
						<u-switch :disabled="use" v-model="form.charge"></u-switch>
					</u-cell-item>
				</u-form-item>
				
			</u-cell-group>
			</u-form>
			<view>
				<button v-if="use == true" type="warn" @click="update(userRealAuth)">修改</button>
				<button v-else type="primary" @click="submit">认证</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				openid: "",
				errorType: ['message', 'border-bottom'],
				form:{
					name:"",
					number:"",
					profile: "",
					tel:"",
					collage:"",
					clazz:"",
					charge:false
				},
				isAuth: "false",
				id:"",
				rules: {
					name: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					number: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					profile: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					tel: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					collage: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					clazz: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					],
					charge: [
						{
							required: true,
							message: '必填字段',
							trigger: ['blur', 'change']
						}
					]
				},
				list: [
					{
						value: 1,
						label: '电智学院',
						children: [
							{
								value: 2,
								label: '计算机类',
								children: [
									{
										value: 3,
										label: '计算机191'
									},
									{
										value: 4,
										label: '计算机192'
									},
									{
										value: 5,
										label: '计算机193'
									},
									{
										value: 6,
										label: '网络191'
									},
									{
										value: 7,
										label: '网络192'
									},,
									{
										value: 8,
										label: '物联网191'
									},,
									{
										value: 9,
										label: '物联网192'
									}
								]
							},
							{
								value: 10,
								label: '电信大类',
								children: [
									{
										value: 11,
										label: '信工191'
									},
									{
										value: 12,
										label: '信工192'
									},
									{
										value: 13,
										label: '信工193'
									},
									{
										value: 14,
										label: '信工194'
									},
									{
										value: 15,
										label: '人工智能191'
									},
									{
										value: 16,
										label: '人工智能192'
									},
									{
										value: 17,
										label: '人工智能193'
									},
									{
										value: 18,
										label: '光信191'
									},
									{
										value: 19,
										label: '光信192'
									}
								]
							}
						]
					},
					{
						value: 8,
						label: '美国',
						children: [
							{
								value: 9,
								label: '纽约',
								children: [
									{
										value: 10,
										label: '皇后街区'
									}
								]
							}
						]
					}
				]
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			},
			userRealAuth() {
				return this.$store.state.userRealAuth;
			},
			use() {
				return this.$store.state.use;
			}
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);//规范检查
		},
		onLoad(e) {
			//检验是否登录
			this.openid =e.id;
			console.log(this.openid);
			this.checkStatus();
			this.getAuthInfo();
		},
		methods: {
			confirm(e) {
				console.log(e);
				this.form.collage=e[0].label;
				this.form.clazz=e[2].label;
			},
			update(userRealAuth) { //更改实名信息 到那时仍然让没改的信息保持到表单中
				this.$store.state.use=false;
				this.isAuth = false;//更改为没有验证，显示绿色认证图标
				this.form.profile=userRealAuth.profileId;
				this.form.number = userRealAuth.number;//学号
				this.form.name = userRealAuth.username;//真实姓名
				this.form.tel = userRealAuth.phone;
				this.form.collage = userRealAuth.collage;
				this.form.clazz=userRealAuth.clazz;
				this.form.charge=userRealAuth.isCharge;
			},
			submit() { //认证
				this.$refs.uForm.validate(valid => {
					if(valid) {
						console.log("开始认证");
						
						this.$store.dispatch("subAuth",[this.openid,this.form.name,this.form.number,this.form.profile,this.form.tel,this.form.collage,this.form.clazz,this.form.charge]);
					}else {
						console.log("验证失败");
					}
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
		}
	}
</script>

<style>

</style>
