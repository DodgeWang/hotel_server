$(function(){	
	$('#submitBtn').click(function(){
		var name = $('#formBox input[name="name"]').val();
		var id = $('#formBox input[name="departmentId"]').val();
		var paramObj = {
			id: id,
			name: name
		};
		$.post("/api/department/edit",paramObj,function(obj){
            if(obj.state == 1){
            	window.location.replace("/admin/departments");
            }else{
            	alert(obj.msg)
            }
		});
	})
})