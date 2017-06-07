/**
 * Created by postm on 2017/5/22.
 */
var appbox=new Vue({
	el:'#appbox',
	data:{
		registphonemsg:0,
		mobilenumber:'',
		checkruler1status:0,
	},
	methods:{
		alertfun:function () {
			// alert('加载完页面即调用的第一个方法！')
		},
		ceshitianjiafun:function () {
			this.registphonemsg=localStorage.getItem('registphonemsg');
		},
		setdata:function () {
			this.mobilenumber=localStorage.getItem('registphonenumber');
		},
		registsubmitphonenumberclick:function () {
			if(this.checkruler1status){
				window.location.href=publicrooturl+'registpassword.html';

			}
		},
		registphonemsgchange:function (newval,oldval) {
			var _this=this;
			if((/^\d{4,8}$/).test(newval)){
				_this.checkruler1status=1;
			}else {
				_this.checkruler1status=0;
			}
		}
	},
	computed:{
	},
	watch:{
		registphonemsg:'registphonemsgchange',
	},
	mounted:function () {
		Vue.nextTick(function () {
			appbox.alertfun();
			appbox.setdata();
			appbox.ceshitianjiafun();
		})
	}
})
// 第一步优先检查是否登录

/*
setTimeout(function () {
	_this.logintip=false;
},2000)*/
