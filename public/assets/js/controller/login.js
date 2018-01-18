$(function(){
	$('#loginSubmitBtn').click(function(){
		var username = $('#loginFormBox input[name="username"]').val();
		var password = $('#loginFormBox input[name="password"]').val();
		var paramObj = {
			username: username,
			password: password
		};
		$.post("/api/doLogin",paramObj,function(obj){
            if(obj.state == 1){
            	window.location.replace("/admin/employees");
            }else{
            	alert(obj.msg)
            }
		});
	})
})