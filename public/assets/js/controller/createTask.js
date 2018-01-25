$(function(){	
	$('#submitBtn').click(function(){		
		var roomId = $('#roomSelect').val();
		var tasktypeId = $('#typeSelect').val();
		var describe = $('#describe').val();
		
		
		var paramObj = {
			roomId: roomId,
			tasktypeId: tasktypeId,
			describe: describe
		};
		$.post("/api/task/add",paramObj,function(obj){
            if(obj.state == 1){
            	alert(obj.msg);
            	window.location.replace("/admin/tasks/create");
            }else{
            	alert(obj.msg)
            }
		});
	})
})