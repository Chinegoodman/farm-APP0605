/**
 * Created by postm on 2017/5/22.
 */
var appbox=new Vue({
	el:'#appbox',
	data:{
		swiperdata:'',
		nongchanglisdata:'',
		farmid:'',
		contentlisdatatop2:[],
		contentlisdataothers:[],
		wupinid:'',
	},
	methods:{
		alertfun:function () {
			// alert('加载完页面即调用的第一个方法！')
		},
		// 赋值方法调用
		setdata:function () {
			appbox.setswiperdata();
			appbox.setnongchanglisdata();
			appbox.setcontentlisdata();
		},
		// 顶部大图赋值
		setswiperdata:function () {
			var _this=this;
			this.$http.get('http://www.9fat.com/api.php?op=trans_advertising_list').then(function (msg) {
				_this.swiperdata = msg.body.data;
				console.log(msg.body.msg);
			})
		},
		// 中间偏上的农场列表赋值
		setnongchanglisdata:function () {
			var _this=this;
			this.$http.get('http://www.9fat.com/api.php?op=trans_shop_list').then(function (msg) {
				_this.nongchanglisdata = msg.body.data;
				console.log(msg.body.msg);
			})

		},
		// 将内容部分划分为两块进行赋值操作
		setcontentlisdata:function () {
			var _this=this;
			this.$http.get('http://www.9fat.com/api.php?op=trans_goods_list').then(function (msg) {
				_this.contentlisdatatop2 = msg.body.data.slice(0,2);
				_this.contentlisdataothers = msg.body.data.slice(2,msg.body.data.length);
				console.log(msg.body.msg);
			})
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

					setrootlocalstorageusermsg(msg.body.data.userid,msg.body.data.uid,msg.body.data.userName,msg.body.data.nickname,msg.body.data.email,msg.body.data.htmlavatar);

					window.location.href=publicrooturl+'percenter.html'
				}
			},function (msg) {
				console.log('请求用户登录状态操作失败')
			})
		},

		// 点击列表进入详情页
		gotosubpage:function (id) {
			window.location.href=publicrooturl+'shoppingdetailspage.html?id='+id;
		},
		// 点击进入农场页、商家页面
		gotolink:function (shopid) {
			window.location.href=publicrooturl+'index-subpage.html?shopid='+shopid;
		},
		// 点击进入新品分类页面
		gotonewlink:function (typeid) {
			window.location.href=publicrooturl+'newprosubpage.html?typeid='+typeid;
		}
	},
	computed:{

	},
	watch:{

	},
	mounted:function () {
		Vue.nextTick(function () {
			// appbox.alertfun();
			appbox.setdata();
			// appbox.iflogined();
		})
	}
})
// 第一步优先检查是否登录