/**
 * Created by postm on 2017/5/22.
 */
function ajaxsubmitpic() {
	$.ajax({
		type: "POST",
		url: "http://www.9fat.com/index.php?m=member&c=index&a=public_avatar",
		data: { avatardata: selfsetheaderpic },
		cache: false,
		success: function(data) {
			alert("上传成功");
			console.log(data);
			window.location.href=publicrooturl+'percenterdetails.html';
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("上传失败，请检查网络后重试");
		}
	});
}

var appbox=new Vue({
	el:'#appbox',
	data:{
        changeheaderpicstatus:false,
        percenterdetailsdata:''
	},
	methods:{
		alertfun:function () {
			// alert('加载完页面即调用的第一个方法！');
		},
        setappboxdata:function () {
            var _this=this;
            this.$http.get('http://www.9fat.com/index.php?m=member&c=index&a=public_user').then(function (msg) {
                console.log(msg.body.status);
                _this.percenterdetailsdata=msg.body.data;
                // setrootlocalstorageusermsg(msg.body.data.userid,msg.body.data.uid,msg.body.data.userName,msg.body.data.nickname,msg.body.data.email,msg.body.data.htmlavatar)
            },function (msg) {
                console.log('请求身份信息操作失败');
            })
        },
		// 退出登陆
        logoutclick:function () {
			this.$http.get('http://www.9fat.com/index.php?m=member&c=index&a=public_logout').then(function (msg) {
				if (msg.body.msg=='退出成功'){
					alert('推出成功');
					localStorage.clear();
					window.location.href=publicrooturl+'index.html';
				}
            },function () {
				console.log('退出登陆操作失败')
            })
        },
        dosssssubmit:function () {
			this.$http.post('http://www.9fat.com/index.php?m=member&c=index&a=public_avatar',{
                avatardata:selfsetheaderpic
			},{emulateJSON:true}).then(function (msg) {
				if (msg.ok){
					alert('上传成功');
					window.location.href=publicrooturl+'percenterdetails.html';
				}
            },function () {
				console.log('上传头像操作失败')
            })
			/*ajaxsubmitpic();*/
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
