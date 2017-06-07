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
