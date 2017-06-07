/**
 * Created by postm on 2017/5/22.
 */
function GetQueryString(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}
var shopid=GetQueryString("shopid");

var appbox=new Vue({
	el:'#appbox',
	data:{
		appdata:''
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
		setappboxdata:function () {
			var _this=this;
			this.$http.get('http://www.9fat.com/api.php?op=trans_shop_list&id='+shopid).then(function (msg) {
				_this.appdata=msg.body.data;
			},function () {
				console.log('获取数据操作失败')
			})
		},
		// 跳转到商品详情页
		gotolink:function (id) {
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
			appbox.setappboxdata();
		})
	}
})
// 第一步优先检查是否登录

/*
setTimeout(function () {
	_this.logintip=false;
},2000)*/
