$(function(){	
	//退出登录
	$('#logoutBtnTop').click(function(){
		logOut()
	})

	$('#logoutBtnMenu').click(function(){
		logOut()
	})

	function logOut(){
		alert("是否退出？")
		$.get("/api/logOut",{},function(obj){
            window.location.replace("/admin/login");
		});
	}
})