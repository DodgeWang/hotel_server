$(function(){	
	$('#submitBtn').click(function(){
		var name = $('#formBox input[name="name"]').val();
		var paramObj = {
			name: name
		};
		$.post("/api/department/add",paramObj,function(obj){
            if(obj.state == 1){
            	alert(obj.msg);
            	window.location.replace("/admin/departments");
            }else{
            	alert(obj.msg)
            }
		});
	})
})