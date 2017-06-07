/**
 * Created by postm on 2017/5/22.
 */
var appbox=new Vue({
	el:'#appbox',
	data:{
		warningstatus:false,
		password:'',
		passwordhide:true,
		passwordhideeyeurl:'../images/eyeicon2.png',
		checkrulerstatus:false,
		passwordchangetipboxstatus:false,
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
		passwordchange:function (newval, oldval) {
			var _this=this;
			if((/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/).test(newval)){
				_this.checkrulerstatus=true;
			}else {
				_this.checkrulerstatus=false;
			}
		},
		registpasswordsubmitclick:function () {
			var _this=this;
			if(_this.checkrulerstatus){
				appbox.submitalldatatoregist();
			}else{
				_this.warningstatus=true;
				setTimeout(function () {
					_this.warningstatus=false;
				},2000)
			}
		},
		submitalldatatoregist:function () {
			var _this=this;
			if(localStorage.getItem('changepasswordstatus')=='regist'){
				appbox.registupdatafun();
			}else if(localStorage.getItem('changepasswordstatus')=='forget'){
				appbox.forgetupdatafun();
			}

		},
		registupdatafun:function () {
			var _this=this;
			this.$http.post('http://www.9fat.com/index.php?m=member&c=index&a=public_trans_register',{
				mobile:localStorage.getItem('registphonenumber'),
				mobile_verity:localStorage.getItem('registphonemsg'),
				'password':_this.password,
				dosubmit:1,
			},{emulateJSON:true}).then(function (msg) {
				// setrootlocalstorageusermsg(msg.body.data.userid,msg.body.data.uid,msg.body.data.userName,msg.body.data.nickname,msg.body.data.email,msg.body.data.htmlavatar)
				localStorage.removeItem('registphonenumber');
				localStorage.removeItem('registphonemsg');
				localStorage.removeItem('changepasswordstatus');
				window.location.href=publicrooturl+'index.html';
			},function (msg) {
				console.log('请求登录操作失败');
			})
		},
		forgetupdatafun:function () {
			var _this=this;
			this.$http.post('http://www.9fat.com/index.php?m=member&c=index&a=public_trans_retrieve_password',{
				mobile:localStorage.getItem('registphonenumber'),
				mobile_verity:localStorage.getItem('registphonemsg'),
				'newpassword':_this.password,
				dosubmit:1,
			},{emulateJSON:true}).then(function (msg) {
				if (msg.body.msg=='修改成功'){
					_this.passwordchangetipboxstatus=true;
				}
			},function (msg) {
				console.log('修改密码操作失败');
			})
		},
		successconfirmclick:function () {
			localStorage.removeItem('registphonenumber');
			localStorage.removeItem('registphonemsg');
			localStorage.removeItem('changepasswordstatus');
			window.location.href=publicrooturl+'index.html';
		}
	},
	computed:{

	},
	watch:{
		password:'passwordchange'
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
