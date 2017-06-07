/**
 * Created by postm on 2017/5/22.
 */
var appbox=new Vue({
	el:'#appbox',
	data:{
		mobilenumber:'',
		checkruler1status:0,
	},
	methods:{
		alertfun:function () {
			// alert('加载完页面即调用的第一个方法！')
		},
		checkruler:function(newval,oldval){
			var _this=this;
			if((/^1(3|4|5|7|8)\d{9}$/).test(newval)){
				_this.checkruler1status=1;
			}else {
				_this.checkruler1status=0;
			}
		},
		forgetsubmitphonenumberclick:function () {
			var _this=this;
			if (!_this.checkruler1status){
			}else {
				appbox._getphonemsg();
			}
		},
		_getphonemsg:function () {
			var _this=this;
			this.$http.get('http://www.9fat.com/index.php?m=member&c=index&a=public_trans_verity_send&mobile='+_this.mobilenumber).then(function (msg) {
				localStorage.setItem('registphonemsg',msg.body.return_id);
				localStorage.setItem('registphonenumber',_this.mobilenumber);

				// 添加一个修改密码时的状态。。以便在修改密码时区分忘记密码接口的调用！
				localStorage.setItem('changepasswordstatus','forget');

				window.location.href=publicrooturl+'registphonemsg.html';
			},function () {
				console.log('发送验证码操作失败');
			})
		}
	},
	computed:{

	},
	watch:{
		mobilenumber:'checkruler',
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
