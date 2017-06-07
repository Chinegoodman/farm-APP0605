/**
 * Created by postm on 2017/5/22.
 */
var publicrooturl='http://www.9fat.com/H5test/farmapp0605/htmls/';
// setrootlocalstorageusermsg('用户id','用户id','用户登录名','用户昵称','邮箱','用户头像');
function setrootlocalstorageusermsg(userid,uid,username,nickname,email,htmlavatar) {
	localStorage.setItem('percenteruserid',userid);
	localStorage.setItem('percenteruid',uid);
	localStorage.setItem('percenterusername',username);
	localStorage.setItem('percenternickname',nickname);
	localStorage.setItem('percenteremail',email);
	localStorage.setItem('percenterhtmlavatar',htmlavatar);
}
function clearlocalstorageusermsg(userid,uid,username,nickname,email,htmlavatar) {
	/*localStorage.setItem('percenteruserid',userid);
	localStorage.setItem('percenteruid',uid);
	localStorage.setItem('percenterusername',username);
	localStorage.setItem('percenternickname',nickname);
	localStorage.setItem('percenteremail',email);
	localStorage.setItem('percenterhtmlavatar',htmlavatar);*/
	localStorage.clear();
}