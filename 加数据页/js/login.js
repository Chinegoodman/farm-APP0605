/**
 * Created by postm on 2017/5/22.
 */
var appbox=new Vue({
	el:'#appbox',
	data:{
		mobilenumber:'',
		passwordhide:true,
		password:'',
		passwordhideeyeurl:'../images/eyeicon2.png',
		checkrulerstatus:0,
		checkruler1status:0,
		checkruler2status:0,
	},
	methods:{
		alertfun:function () {
			// alert('加载完页面即调用的第一个方法！')
		},
		changeeyeiconurl:function () {
			console.log('切换密码显示状态');
			var _this=this;
			if (_this.passwordhide==true){
				_this.passwordhideeyeurl='../images/eyeicon.png';
			}else {
				_this.passwordhideeyeurl='../images/eyeicon2.png';
			}
		},
		checkruler:function(newval,oldval){
			var _this=this;
			if((/^1(3|4|5|7|8)\d{9}$/).test(newval)){
				_this.checkruler1status=1;
				_this.checkrulerstatus=_this.checkruler1status*_this.checkruler2status;
			}else {
				_this.checkruler1status=0;
				_this.checkrulerstatus=_this.checkruler1status*_this.checkruler2status;
			}
		},
		checkruler2:function(newval,oldval){
			var _this=this;
			if((/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/).test(newval)){
				_this.checkruler2status=1;
				_this.checkrulerstatus=_this.checkruler1status*_this.checkruler2status;
			}else {
				_this.checkruler2status=0;
				_this.checkrulerstatus=_this.checkruler1status*_this.checkruler2status;
			}
		},
		loginsubmitclick:function () {
			var _this=this;
			if (!_this.checkrulerstatus){
			}else {
				appbox.loginfun();
			}
		},
		loginfun:function () {
			var _this=this;
			this.$http.post('http://www.9fat.com/index.php?m=member&c=index&a=public_trans_login',{
				'mobile': _this.mobilenumber,
				'password':_this.password,
				'dosubmit':1
			},{emulateJSON:true}).then(function (msg) {
				console.log(msg.body.status);
				setrootlocalstorageusermsg(msg.body.data.userid,msg.body.data.uid,msg.body.data.userName,msg.body.data.nickname,msg.body.data.email,msg.body.data.htmlavatar);
				window.location.href=publicrooturl+'index.html';
			},function (msg) {
				console.log('发送登陆请求失败！')
			})
		},
		otherloginclick:function () {
			window.location.href=publicrooturl+'loginotherway.html';
		},
		forgetpasswordclick:function () {

			// 添加一个修改密码时的状态。。以便在修改密码时区分忘记密码接口的调用！
			localStorage.setItem('changepasswordstatus','forget');

			window.location.href=publicrooturl+'forgetpasswordpage.html';
		}
	},
	computed:{
	},
	watch:{
		mobilenumber:'checkruler',
		password:'checkruler2'
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
