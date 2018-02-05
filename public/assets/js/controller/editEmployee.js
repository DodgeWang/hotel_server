$(function(){	
	$('#submitBtn').click(function(){
		var id = $('#formBox input[name="userId"]').val();
		var name = $('#formBox input[name="name"]').val();
		var phone = $('#formBox input[name="phone"]').val();
		var email = $('#formBox input[name="email"]').val();
		var departmentId = $('#departmentSelect').val();
		var roleId = $('#roleSelect').val();

		var paramObj = {
			id: id,
			name: name,
			phone: phone,
			email: email,
			departmentId: departmentId,
			roleId: roleId
		};
		$.post("/api/employee/basicinfo/edit",paramObj,function(obj){
            if(obj.state == 1){
            	alert(obj.msg);
            	window.location.replace("/admin/employees");
            }else{
            	alert(obj.msg)
            }
		});
	})
})