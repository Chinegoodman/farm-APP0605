/**
 * Created by postm on 2017/5/22.
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var gid=GetQueryString("id");
var uid=localStorage.getItem('percenteruserid');
if(gid !=null && gid.toString().length>1)
{
    console.log(GetQueryString("id"));
}

var appbox=new Vue({
	el:'#appbox',
	data:{
		appdata:'',
        count:0,
	},
	methods:{
		alertfun:function () {
			// alert('加载完页面即调用的第一个方法！');
		},
        setdata:function () {
			var _this=this;
			this.$http.get('http://www.9fat.com/api.php?op=trans_goods_content&id='+gid).then(function (msg) {
                _this.appdata=msg.body.data;
            },function () {
				console.log('获取数据操作失败')
            })
        },
        addtoshoppingcartclick:function () {
			appbox.iflogined();
        },
        addtoshoppingcart:function () {
			var _this=this;
			this.$http.post('http://www.9fat.com/api.php?op=trans_add_cart',{
				dosubmit:1,
				uid:uid,
				gid:gid,
				sid:_this.appdata.sid,
				count:_this.count
			},{emulateJSON:true}).then(function (msg) {
                console.log('添加到购物车成功');
            },function () {
				console.log('添加到购物车操作失败');
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

					_this.count=_this.count+1;
                    appbox.addtoshoppingcart();
                }
            },function (msg) {
                console.log('请求用户登录状态操作失败')
            })
        },
        gotoshoppingcartpage:function () {
			window.location.href=publicrooturl+'shoppingcartpage.html'
        },
		// 跳转到商品详情页
		gotosubpage:function (id) {
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
			appbox.setdata();
		})
	}
})
// 第一步优先检查是否登录

/*
setTimeout(function () {
	_this.logintip=false;
},2000)*/
