/**
 * Created by postm on 2017/5/22.
 */
var appbox=new Vue({
	el:'#appbox',
	data:{

	},
	methods:{
		alertfun:function () {
			alert('加载完页面即调用的第一个方法！');
		},
		// 登录验证
		iflogined:function () {
			var _this=this;
			this.$http.get('http://www.9fat.com/index.php?m=member&c=index&a=public_user').then(function (msg) {
				if (msg.body.status==0){
					// 未登录
					window.location.href=publicrooturl+'welcome.html'
				}else if (msg.body.status==1){
					// 已登录
					window.location.href=publicrooturl+'percenter.html'
				}
			},function (msg) {
				console.log('请求用户登录状态操作失败')
			})
		}
	},
	computed:{

	},
	watch:{

	},
	mounted:function () {
		Vue.nextTick(function () {
			appbox.alertfun();
		})
	}
})
// 第一步优先检查是否登录

/*
setTimeout(function () {
	_this.logintip=false;
},2000)*/

// setrootlocalstorageusermsg('用户id','用户id','用户登录名','用户昵称','邮箱','用户头像');