$(function(){	
	$('#submitBtn').click(function(){
		var username = $('#formBox input[name="username"]').val();
		var password = $('#formBox input[name="password"]').val();
		var name = $('#formBox input[name="name"]').val();
		var phone = $('#formBox input[name="phone"]').val();
		var email = $('#formBox input[name="email"]').val();
		var departmentId = $('#departmentSelect').val();
		var roleId = $('#roleSelect').val();

		var paramObj = {
			username: username,
			password: password,
			name: name,
			phone: phone,
			email: email,
			departmentId: departmentId,
			roleId: roleId
		};
		$.post("/api/employee/add",paramObj,function(obj){
            if(obj.state == 1){
            	alert(obj.msg);
            	window.location.replace("/admin/employees");
            }else{
            	alert(obj.msg)
            }
		});
	})
})