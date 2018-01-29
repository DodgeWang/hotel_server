$(function(){	
	$('#submitBtn').click(function(){
		var id = $('#taskTypeId').val();
		var allocatorRole = $('#allocatorSelect').val();  
		var executorRole = $('#executorSelect').val();
		var examinerRole = $('#examinerSelect').val();
		var paramObj = {
			id: id,
			allocatorRole: allocatorRole,
			executorRole: executorRole,
			examinerRole: examinerRole
		};
		$.post("/api/taskchain/edit",paramObj,function(obj){
            if(obj.state == 1){
            	alert(obj.msg);
            	window.location.replace("/admin/taskchains");
            }else{
            	alert(obj.msg)
            }
		});
	})
})