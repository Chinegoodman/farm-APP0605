/**
 * Created by postm on 2017/5/22.
 */
Array.prototype.contains = function (obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			// return false;
			return i;
		}
	}
	return false;
}

var uid=localStorage.getItem('percenteruserid');
var orderinfoArr=[],goodsinfoarr=[];
var appbox=new Vue({
	el:'#appbox',
	data:{
        appdata:[],
		totalmoney:0,
		fixedtips:0,
		// shopselectstatus:0,
		notallselectstatus:true,
		currentcountnumber:0,
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
					appbox.getsetdata1();
				}
			},function (msg) {
				console.log('请求用户登录状态操作失败')
			})
		},
        getsetdata:function () {
			appbox.iflogined();
        },
        getsetdata1:function () {
			var _this=this
			this.$http.post('http://www.9fat.com/api.php?op=trans_cart_list',{
				dosubmit:1,
				uid:uid,

			},{emulateJSON:true}).then(function (msg) {
				_this.appdata=msg.body.data;
            },function () {
				console.log('获取购物车列表操作失败')
            })
        },
		// 商品数量加减
		shangpinnum:function (status,item2,cartid,outitem) {
			var _this=this;
			if (status==-1){
				// 减
				item2.count=parseInt(item2.count)-1
				if(item2.count<=0){
					item2.count=1;
					return;
				}

				// appbox.shangjiachanpinselectclick(0,item2,outitem,1);
				if(parseInt(item2.selected)){
					var temp =item2.price;
					var historytotalmonye=parseFloat(_this.totalmoney);
					_this.totalmoney = historytotalmonye - parseFloat(temp);
					_this.totalmoney = _this.totalmoney.toFixed(2);
					temp = 0;

					item2.selected = 1;
				}else {
					appbox.shangjiachanpinselectclick(0,item2,outitem,1);
				}

			}else {
				// 加
				item2.count=parseInt(item2.count)+1

				// appbox.shangjiachanpinselectclick(1,item2,outitem,1);
				if(parseInt(item2.selected)){
					var temp =item2.price;
					var historytotalmonye=parseFloat(_this.totalmoney);
					_this.totalmoney = historytotalmonye + parseFloat(temp);
					_this.totalmoney = _this.totalmoney.toFixed(2);
					temp = 0;

					item2.selected = 1;
				}else {
					appbox.shangjiachanpinselectclick(1,item2,outitem,1);
				}
			}

			var selectnum=0;
			for(var i=0;i<outitem.goodsinfo.length;i++){

				var f=0;
				if(outitem.goodsinfo[i].selected!=0){
					f=f+1;
					selectnum=selectnum+1;
				}else {
					f=f-1;
					selectnum=selectnum-1;
				};
				if(selectnum==outitem.goodsinfo.length){
					outitem.shopselect=1;
				}else {
					outitem.shopselect=0;
				}
			}
		},

		// 购物车编辑 添加、减少或者删除操作
		shoppingcarteditor:function (changenumber,deletecart) {
			if(changenumber==null){
				this.$http.post('http://www.9fat.com/api.php?op=trans_cart_edit',{
					dosubmit:1,
					delete:[deletecart]
				},{emulateJSON:true}).then(function(msg){
					if (msg.body.msg!='success'){
						alert('提交失败');
						return;
					}
					appbox.getsetdata1();
					this.totalmoney=0;
				},function(msg){
					console.log('数据上传操作失败');
					return;
				})
			}else {
				this.$http.post('http://www.9fat.com/api.php?op=trans_cart_edit',{
					dosubmit:1,
					count:changenumber.count,
					cartid:changenumber.cartid
				},{emulateJSON:true}).then(function(msg){
					if (msg.body.msg!='success'){
						alert('提交失败');
						return;
					}
				},function(msg){
					console.log('数据上传操作失败');
					return;
				})}
		},
		// 购物车商品删除事件
		shangpindeleteclick:function (deletecart) {
			var confirmstatus=confirm('确认要在购物车删除此商品吗？')
			if(confirmstatus){
				appbox.shoppingcarteditor(null,deletecart);
			}

		},
		// 商品选中事件  itemsub即为购物车的单项商品。outitem即为商家
		shangjiachanpinselectclick:function (jiajianstatus,itemsub,outitem,checkstatus) {
			var _this=this;
			if (jiajianstatus){
				// 增加
				var shangpingouwucheid=itemsub.cartid;
				var shangpingoumaishuliang=itemsub.count;

				var changenumber={
					count:shangpingoumaishuliang,
					cartid:shangpingouwucheid
				}
				var deletecart=null;
				appbox.shoppingcarteditor(changenumber,deletecart);

				var temp =(itemsub.price*itemsub.count).toFixed(2);
				var historytotalmonye=parseFloat(_this.totalmoney);

				// goodsinfoarr=[];{itemsub.cartid,itemsub.count}
				// goodsinfoarr.push()
				goodsinfoarr.contains()

				appbox.setorderinfoArr(1,goodsinfoarr,sid,freight);

				_this.totalmoney = historytotalmonye + parseFloat(temp);
				_this.totalmoney = _this.totalmoney.toFixed(2);
				temp = 0;
				if(checkstatus){
					itemsub.selected = 1;
				}else {
					itemsub.selected = 0;
					// _this.notallselectstatus=false;
				}
			}else {
				// 减少
				var shangpingouwucheid=itemsub.cartid;
				var shangpingoumaishuliang=itemsub.count;

				var changenumber={
					count:shangpingoumaishuliang,
					cartid:shangpingouwucheid
				}
				var deletearr=null;
				appbox.shoppingcarteditor(changenumber,deletearr);

				var temp =(itemsub.price*itemsub.count).toFixed(2);
				var historytotalmonye=parseFloat(_this.totalmoney);
				_this.totalmoney = historytotalmonye - parseFloat(temp);
				_this.totalmoney = _this.totalmoney.toFixed(2);
				temp = 0;
				if(checkstatus){
					itemsub.selected = 1;
				}else {
					itemsub.selected = 0;
					_this.notallselectstatus=true;
				}
			}

			var selectnum=0;
			for(var i=0;i<outitem.goodsinfo.length;i++){

				var f=0;
				if(outitem.goodsinfo[i].selected!=0){
					f=f+1;
					selectnum=selectnum+1;
				}else {
					f=f-1;
					selectnum=selectnum-1;
				};
				if(selectnum==outitem.goodsinfo.length){
					outitem.shopselect=1;
				}else {
					outitem.shopselect=0;
				}
			}
		},
		setorderinfoArr:function (orderinfoArr) {

		},
		// 商家选中事件  status:0取消全选；1全选
		shopselectclick:function (status,item,chanpincheckstatus) {
			var _this=this;
			for(var h=0;h<item.goodsinfo.length;h++){
				_this.shangjiachanpinselectclick(status,item.goodsinfo[h],item,chanpincheckstatus);
			}
		},

		// 全选商品
		allselectclick:function (status) {
			var _this=this;
			if (status){
				// 取消全选操作

				for(var jj=0;jj<_this.appdata.length;jj++){
					appbox.shopselectclick(0,_this.appdata[jj],0);
				}

				_this.notallselectstatus=true;
				console.log('已取消全选操作');
			}else {
				// 全选操作
				_this.totalmoney = 0;

				for(var ii=0;ii<_this.appdata.length;ii++){
					appbox.shopselectclick(1,_this.appdata[ii],1);
				}

				_this.notallselectstatus=false;
				console.log('已全部选择');
			}
		},

		// 点击进入农场页、商家页面
		gotolink:function (shopid) {
			window.location.href=publicrooturl+'index-subpage.html?shopid='+shopid;
		},
		// 点击进入商品详情页面
		gotolink2:function (gid) {
			window.location.href=publicrooturl+'shoppingdetailspage.html?id='+gid;
		},
		// 点击下单按钮事件。检测是否选中。跳转到确认订单页
		shoppingnextgo:function (msg) {

		}

	},
	computed:{

	},
	watch:{
	},
	mounted:function () {
		Vue.nextTick(function () {
			appbox.alertfun();
			appbox.getsetdata();
		})
	}
})