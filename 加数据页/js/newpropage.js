/**
 * Created by postm on 2017/5/22.
 */
var appbox=new Vue({
	el:'#appbox',
	data:{
		appboxdata:'',
		'daiyang':'daiyang',
		'qindan':'qindan',
		'guoshu':'guoshu',
		'gaoding':'gaoding'
	},
	methods:{
		alertfun:function () {
			// alert('加载完页面即调用的第一个方法！')
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
		},
		gotolink:function (shopid) {
			switch (shopid){
				case 'daiyang':
					window.location.href=publicrooturl+'newprosubpage.html?typeid='+1;
					break;
				case 'qindan':
                    window.location.href=publicrooturl+'newprosubpage.html?typeid='+3;
                    break;
				case 'guoshu':
                    window.location.href=publicrooturl+'newprosubpage.html?typeid='+4;
                    break;
				case 'gaoding':
                    window.location.href=publicrooturl+'newprosubpage.html?typeid='+2;
			}

		},
		setappdata:function () {
			var _this=this;
			this.$http.get('http://www.9fat.com/api.php?op=trans_new_list').then(function (msg) {
				_this.appboxdata=msg.body.data;
			},function () {
				console.log('请求输出失败')
			})
		},
		shangpinliclick:function (id) {
			window.location.href=publicrooturl+'shoppingdetailspage.html?id='+id;
		}
	},
	computed:{

	},
	watch:{

	},
	mounted:function () {
		Vue.nextTick(function () {
			appbox.alertfun();
			appbox.setappdata();
		})
	}
})
// 第一步优先检查是否登录