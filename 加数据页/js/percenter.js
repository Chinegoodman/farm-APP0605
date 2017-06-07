/**
 * Created by postm on 2017/5/22.
 */
var appbox=new Vue({
	el:'#appbox',
	data:{
		percenterdata:'',
	},
	methods:{
		alertfun:function () {
			// alert('加载完页面即调用的第一个方法！')
		},
		iflogin:function () {
			var _this=this;
			this.$http.get('http://www.9fat.com/index.php?m=member&c=index&a=public_user').then(function (msg) {
				console.log(msg.body.status);
				_this.percenterdata=msg.body.data;
				// setrootlocalstorageusermsg(msg.body.data.userid,msg.body.data.uid,msg.body.data.userName,msg.body.data.nickname,msg.body.data.email,msg.body.data.htmlavatar)
			},function (msg) {
				console.log('请求身份信息操作失败');
			})
		},
		// 进入个人详情页
		gotopercenterdetails:function () {
			window.location.href=publicrooturl+'percenterdetails.html'
		},
		// 进入我的订单页面
		gotomyorderspage:function (status) {
			window.location.href=publicrooturl+'myorderspage.html?status='+status;
		}
	},
	computed:{

	},
	watch:{

	},
	mounted:function () {
		Vue.nextTick(function () {
			appbox.alertfun();
			appbox.iflogin();
		})
	}
})
// 第一步优先检查是否登录