import Vue from "vue"
import Vuex from 'vuex'
import QQMapWX from "../static/js/qqmap-wx-jssdk.js"
import {getData} from "../apis"

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		city:"北京市",
		article: "",
		userInfo: {},
		userRealAuth: {},
		use:false,
		epdemicData:{},
		allCity: {},
	},
	//同步方法
	mutations: {
		
	},
	//异步方法
	actions: {
		//登录
		login(context,[code,user]) {
			getData({url:"user/code",header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",data:{"code":code,"nickname":user.nickName,"avator":user.avatarUrl,"sex":user.gender,"country":user.country,"province":user.province,"city":user.city}}).then(res=>{
				if(res.success) {
					uni.setStorageSync('token', res.data.token);
					context.state.userInfo = res.data;
					console.log(res);
					uni.showToast({title:"登录成功",icon:"success"});
				}else {
					uni.showToast({title:res.data,icon:"error"});
					context.state.userInfo = null;
				}
			})
		},
		//获取当前所在省市
		gitCity(context) {
			return new Promise((resolve,reject)=> {
				uni.authorize({
					scope: 'scope.userLocation',
						success(){ //已经授权
							let qqmapsdk = new QQMapWX({
								key: "JX6BZ-2QJEI-JICGR-5ENQ5-RFLV5-XVBND"
							});
							//拿到当前的经纬度
							uni.getLocation({
								type: 'gcj02',
								geocode: true,
								success:(res) => {
									qqmapsdk.reverseGeocoder({ //经纬度转换为地址
										location: {
											latitude: res.latitude,
											longitude: res.longitude
										},
										success: (res1)=> {
											context.state.city=res1.result.address_component.province.slice(0,-1);
											console.log(context.state.city);
										}
									})
								}
							});
						},
						fail: (res) => { //未授权
							uni.showToast({
								title:"需要获取您的位置，否则功能无法使用",
								icon: "error"
							})
							
						}
					
						
				})
			})
			
		},
		//获取文章列表
		getArticle(context,index) {
			getData({url: "article/" + index,header:{"content-type":"application/x-www-form-urlencoded"}})
			.then(res => {
				if(res.success) {
					console.log(res.data);
					context
					uni.showToast({title:"获取成功",icon: "success"});
				} else {
					uni.showToast({title:"获取失败",icon: "error"});
				}
			})
		},
		//获取指定id文章
		articleDetail(context,id) {
			getData({url:"article/" + id,header:{"content-type":"application/x-www-form-urlencoded"}}).then(res => {
				if(res.success) {
					console.log(res.data);
					context.state.article = res.data;
					uni.showToast({title:"获取成功",icon: "success"});
				} else {
					uni.showToast({title:"获取失败",icon: "fail"});
				}
			})
		},
		//拿取实名信息
		getRealAuthInfo(context,openid) {
			getData({url:"user",data:{"id": openid}}).then(res=> {
				if(res.success) {
					console.log("实名信息获取成功");
					uni.showToast({title:"您已实名认证",icon: "success"});
					context.state.use= true;
					context.state.userRealAuth = res.data;
				} else {
					console.log("实名信息获取失败");
					if(res.data.cause == "NOT_AUTH") {
						context.state.use= false;
					}
					context.state.userRealAuth = null;
				}
			});
		},
		//实名认证提交
		subAuth({context},[openid,name,number,profile,phone,collage,clazz,charge]) {
			console.log(openid);
			getData({url:"user/auth",data:{"openid":openid,"username":name,"number":number,"profile":profile,"phone":phone,"collage":collage,"clazz":clazz,"charge":charge},method:"POST"}).then(res=>{
				if(res.success) {
					uni.showToast({
						title:res.message,
						icon: "success"
					});
					setTimeout(function() {
						uni.navigateBack();
					},1000);
				} else{
					uni.showToast({
						title:res.message,
						icon: "error"
					})
				}
			})
		
		},
		//获取疫情数据
		epdemicData(context,param) {
			return new Promise((resolve,reject) => {
				getData({url:'epidemic-data/city/data/' + param}).then(res=> {
					console.log(res.data);
					if(res.success) {
						context.state.epdemicData = res.data;
					} else{
						context.state.epdemicData = null;
						uni.showToast({
							title:'网络错误',
							icon:"error"
						})
					}
				})
			})
		},
		allCity(context) {
			getData({url:'epidemic-data'}).then(res=> {
				if(res.success) {
					context.state.allCity=res.data.allGlobalData.globalDataList;
				} else {
					context.state.allCity="网络错误";
				}
			})
		}
		
	}
})

	